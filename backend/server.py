from fastapi import FastAPI, APIRouter, Header, HTTPException
from dotenv import load_dotenv
import hmac
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    lot_size: str
    town: Optional[str] = ""
    message: Optional[str] = ""
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class QuoteCreate(BaseModel):
    name: str
    phone: str
    lot_size: str
    town: Optional[str] = ""
    message: Optional[str] = ""

QUOTE_STATUSES = {"new", "contacted", "booked", "closed"}

class QuoteStatusUpdate(BaseModel):
    status: str

class InboxLogin(BaseModel):
    password: str


def require_inbox_key(x_inbox_key: Optional[str] = Header(default=None)):
    expected = os.environ['INBOX_PASSWORD']
    if not x_inbox_key or not hmac.compare_digest(x_inbox_key, expected):
        raise HTTPException(status_code=401, detail="Unauthorized")


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/quote", response_model=QuoteRequest)
async def create_quote(input: QuoteCreate):
    quote = QuoteRequest(**input.model_dump())
    await db.quotes.insert_one(quote.model_dump())
    logger.info(f"New quote request from {quote.name} ({quote.phone}) - {quote.lot_size}")
    return quote

@api_router.post("/inbox/login")
async def inbox_login(input: InboxLogin):
    require_inbox_key(input.password)
    return {"ok": True}

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quotes(x_inbox_key: Optional[str] = Header(default=None)):
    require_inbox_key(x_inbox_key)
    quotes = await db.quotes.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return quotes

@api_router.patch("/quotes/{quote_id}", response_model=QuoteRequest)
async def update_quote_status(quote_id: str, input: QuoteStatusUpdate, x_inbox_key: Optional[str] = Header(default=None)):
    require_inbox_key(x_inbox_key)
    if input.status not in QUOTE_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    res = await db.quotes.find_one_and_update(
        {"id": quote_id}, {"$set": {"status": input.status}}, projection={"_id": 0}, return_document=True
    )
    if not res:
        raise HTTPException(status_code=404, detail="Quote not found")
    return res

@api_router.delete("/quotes/{quote_id}")
async def delete_quote(quote_id: str, x_inbox_key: Optional[str] = Header(default=None)):
    require_inbox_key(x_inbox_key)
    res = await db.quotes.delete_one({"id": quote_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"ok": True}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

"""Backend API tests for Jarjus Lawn Care marketing site."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://jarjus-service-area.preview.emergentagent.com').rstrip('/')
INBOX_KEY = "jarjus-inbox-2026"
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def created_quote_ids():
    ids = []
    yield ids
    # cleanup
    for qid in ids:
        try:
            requests.delete(f"{API}/quotes/{qid}", headers={"X-Inbox-Key": INBOX_KEY}, timeout=15)
        except Exception:
            pass


# --- Inbox login ---
class TestInboxLogin:
    def test_login_success(self):
        r = requests.post(f"{API}/inbox/login", json={"password": INBOX_KEY}, timeout=15)
        assert r.status_code == 200
        assert r.json() == {"ok": True}

    def test_login_wrong(self):
        r = requests.post(f"{API}/inbox/login", json={"password": "wrong"}, timeout=15)
        assert r.status_code == 401


# --- Quotes auth + list ---
class TestQuotesAuth:
    def test_get_quotes_no_key(self):
        r = requests.get(f"{API}/quotes", timeout=15)
        assert r.status_code == 401

    def test_get_quotes_with_key_returns_list_sorted(self, created_quote_ids):
        # Create a quote for sorted testing
        payload = {"name": "TEST_Alice", "phone": "217-555-0100", "lot_size": "Up to 1/4 acre", "town": "Neoga", "message": "test"}
        c = requests.post(f"{API}/quote", json=payload, timeout=15)
        assert c.status_code == 200
        q1 = c.json()
        created_quote_ids.append(q1["id"])
        assert q1["status"] == "new"

        r = requests.get(f"{API}/quotes", headers={"X-Inbox-Key": INBOX_KEY}, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # each has status
        for q in data:
            assert "status" in q
            assert "created_at" in q
        # sorted desc by created_at
        cas = [q["created_at"] for q in data]
        assert cas == sorted(cas, reverse=True)


# --- Public POST /quote ---
class TestQuoteCreate:
    def test_public_create_no_auth(self, created_quote_ids):
        payload = {"name": "TEST_Bob", "phone": "217-555-0101", "lot_size": "1/4 – 1/2 acre"}
        r = requests.post(f"{API}/quote", json=payload, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == "TEST_Bob"
        assert data["status"] == "new"
        assert "id" in data
        created_quote_ids.append(data["id"])


# --- PATCH status ---
class TestQuotePatch:
    def test_patch_valid(self, created_quote_ids):
        # create
        c = requests.post(f"{API}/quote", json={"name": "TEST_Patch", "phone": "217-555-0102", "lot_size": "1/2 – 1 acre"}, timeout=15).json()
        created_quote_ids.append(c["id"])
        r = requests.patch(f"{API}/quotes/{c['id']}", json={"status": "booked"}, headers={"X-Inbox-Key": INBOX_KEY}, timeout=15)
        assert r.status_code == 200
        assert r.json()["status"] == "booked"

    def test_patch_no_auth(self):
        r = requests.patch(f"{API}/quotes/some-id", json={"status": "booked"}, timeout=15)
        assert r.status_code == 401

    def test_patch_invalid_status(self, created_quote_ids):
        c = requests.post(f"{API}/quote", json={"name": "TEST_Inv", "phone": "217-555-0103", "lot_size": "Up to 1/4 acre"}, timeout=15).json()
        created_quote_ids.append(c["id"])
        r = requests.patch(f"{API}/quotes/{c['id']}", json={"status": "invalid"}, headers={"X-Inbox-Key": INBOX_KEY}, timeout=15)
        assert r.status_code == 400

    def test_patch_unknown_id(self):
        r = requests.patch(f"{API}/quotes/does-not-exist-xyz", json={"status": "booked"}, headers={"X-Inbox-Key": INBOX_KEY}, timeout=15)
        assert r.status_code == 404


# --- DELETE ---
class TestQuoteDelete:
    def test_delete_no_auth(self):
        r = requests.delete(f"{API}/quotes/some-id", timeout=15)
        assert r.status_code == 401

    def test_delete_success(self):
        c = requests.post(f"{API}/quote", json={"name": "TEST_Del", "phone": "217-555-0104", "lot_size": "Up to 1/4 acre"}, timeout=15).json()
        r = requests.delete(f"{API}/quotes/{c['id']}", headers={"X-Inbox-Key": INBOX_KEY}, timeout=15)
        assert r.status_code == 200
        assert r.json() == {"ok": True}

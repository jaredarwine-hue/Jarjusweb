import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Lock, LogOut, Phone, Trash2, RefreshCw, Inbox as InboxIcon } from "lucide-react";
import { BUSINESS } from "../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const KEY = "jarjus_inbox_key";
const STATUSES = ["new", "contacted", "booked", "closed"];
const STATUS_STYLE = {
  new: "bg-gold text-night",
  contacted: "bg-brand text-gold-light",
  booked: "bg-night text-gold-light",
  closed: "bg-edge text-muted",
};

export default function Inbox() {
  const [key, setKey] = useState(() => sessionStorage.getItem(KEY) || "");
  const logout = () => {
    sessionStorage.removeItem(KEY);
    setKey("");
  };
  return (
    <div className="min-h-screen bg-base text-ink" data-testid="inbox-page">
      <header className="border-b border-edge bg-base">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5" data-testid="inbox-brand-link">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-brand text-gold-light font-display text-xl leading-none">J</span>
            <span className="font-display text-xl font-bold tracking-tight">{BUSINESS.short} · Quote Inbox</span>
          </a>
          {key && (
            <button onClick={logout} data-testid="inbox-logout-button" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted hover:text-brand">
              <LogOut size={14} /> Sign out
            </button>
          )}
        </div>
      </header>
      {key ? <QuoteList apiKey={key} onUnauthorized={logout} /> : <Gate onSuccess={(k) => { sessionStorage.setItem(KEY, k); setKey(k); }} />}
    </div>
  );
}

const Gate = ({ onSuccess }) => {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/inbox/login`, { password: pw });
      onSuccess(pw);
    } catch {
      toast.error("Wrong password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-md px-5 py-24">
      <span className="grid place-items-center w-12 h-12 rounded-full bg-brand text-gold-light mb-6"><Lock size={18} /></span>
      <h1 className="font-display text-4xl font-bold tracking-tight">Private inbox</h1>
      <p className="mt-3 text-muted text-sm">Enter the inbox password to see quote requests.</p>
      <form onSubmit={submit} className="mt-8" data-testid="inbox-login-form">
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          data-testid="inbox-password-input"
          className="w-full bg-surface border border-edge rounded-md px-4 py-3 outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={loading || !pw}
          data-testid="inbox-login-button"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-gold-light px-6 py-3.5 font-semibold hover:bg-brand-hover disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : "Open inbox"}
        </button>
      </form>
    </div>
  );
};

const QuoteList = ({ apiKey, onUnauthorized }) => {
  const [quotes, setQuotes] = useState(null);
  const [filter, setFilter] = useState("all");
  const headers = { "X-Inbox-Key": apiKey };

  const load = async () => {
    try {
      const { data } = await axios.get(`${API}/quotes`, { headers });
      setQuotes(data);
    } catch (err) {
      if (err.response?.status === 401) onUnauthorized();
      else toast.error("Couldn't load quotes.");
    }
  };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (id, status) => {
    try {
      const { data } = await axios.patch(`${API}/quotes/${id}`, { status }, { headers });
      setQuotes((q) => q.map((x) => (x.id === id ? data : x)));
    } catch {
      toast.error("Couldn't update status.");
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this quote request?")) return;
    try {
      await axios.delete(`${API}/quotes/${id}`, { headers });
      setQuotes((q) => q.filter((x) => x.id !== id));
      toast.success("Deleted.");
    } catch {
      toast.error("Couldn't delete.");
    }
  };

  const shown = quotes?.filter((q) => filter === "all" || (q.status || "new") === filter) || [];
  const counts = STATUSES.reduce((a, s) => ({ ...a, [s]: quotes?.filter((q) => (q.status || "new") === s).length || 0 }), {});

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Quote requests</span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight" data-testid="inbox-heading">
            {quotes ? `${quotes.length} request${quotes.length === 1 ? "" : "s"}` : "Loading…"}
          </h1>
        </div>
        <button onClick={load} data-testid="inbox-refresh-button" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-brand border border-brand/30 rounded-full px-4 py-2 hover:bg-brand hover:text-gold-light transition-colors">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" data-testid="inbox-filters">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            data-testid={`inbox-filter-${s}`}
            className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] border transition-colors ${
              filter === s ? "bg-brand text-gold-light border-brand" : "border-edge text-muted hover:border-brand/40"
            }`}
          >
            {s}{s !== "all" && ` · ${counts[s]}`}
          </button>
        ))}
      </div>

      {quotes && shown.length === 0 && (
        <div className="border border-dashed border-edge rounded-sm p-14 text-center text-muted" data-testid="inbox-empty-state">
          <InboxIcon size={28} className="mx-auto mb-3 text-gold" />
          No quote requests here yet.
        </div>
      )}

      <ul className="grid gap-4">
        {shown.map((q) => <QuoteCard key={q.id} q={q} onStatus={setStatus} onDelete={remove} />)}
      </ul>
    </main>
  );
};

const QuoteCard = ({ q, onStatus, onDelete }) => {
  const status = q.status || "new";
  const when = new Date(q.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  const digits = q.phone.replace(/\D/g, "");
  return (
    <li data-testid={`quote-card-${q.id}`} className="bg-surface border border-edge rounded-sm p-6 sm:p-7 grid md:grid-cols-12 gap-6">
      <div className="md:col-span-4">
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] ${STATUS_STYLE[status]}`} data-testid={`quote-status-badge-${q.id}`}>{status}</span>
          <span className="font-mono text-[10px] text-muted">{when}</span>
        </div>
        <p className="mt-3 font-display text-2xl font-bold" data-testid={`quote-name-${q.id}`}>{q.name}</p>
        <a href={`tel:${digits}`} className="mt-1 inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover" data-testid={`quote-phone-${q.id}`}>
          <Phone size={14} /> {q.phone}
        </a>
      </div>
      <div className="md:col-span-5 text-sm">
        <p><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted mr-2">Lot</span>{q.lot_size}</p>
        <p className="mt-1"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted mr-2">Town</span>{q.town || "—"}</p>
        {q.message && <p className="mt-3 text-muted leading-relaxed">{q.message}</p>}
      </div>
      <div className="md:col-span-3 flex md:flex-col md:items-end justify-between gap-3">
        <select
          value={status}
          onChange={(e) => onStatus(q.id, e.target.value)}
          data-testid={`quote-status-select-${q.id}`}
          className="bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={() => onDelete(q.id)} data-testid={`quote-delete-button-${q.id}`} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-red-700">
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </li>
  );
};

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { BUSINESS, LOT_OPTIONS } from "../../data/site";
import { Reveal } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", lot_size: LOT_OPTIONS[0], town: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please add your name and phone number.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, form);
      toast.success("Thanks! We'll call you back with a quote shortly.");
      setForm({ name: "", phone: "", lot_size: LOT_OPTIONS[0], town: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-base py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Get a Quote</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
            Tell us about your yard.
          </h2>
          <p className="mt-5 text-muted leading-relaxed max-w-md">
            Send a few details and we'll follow up with a firm price. Prefer to talk it
            through? Give us a call — we answer.
          </p>

          <div className="mt-10 space-y-5">
            <a href={BUSINESS.phoneHref} data-testid="contact-phone" className="flex items-start gap-4 group">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-brand text-gold-light shrink-0"><Phone size={18} /></span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Call or text</span>
                <span className="block font-display text-2xl font-bold text-ink group-hover:text-brand transition-colors">{BUSINESS.phoneDisplay}</span>
              </span>
            </a>
            <div className="flex items-start gap-4" data-testid="contact-address">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-brand text-gold-light shrink-0"><MapPin size={18} /></span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Home base</span>
                <span className="block font-display text-xl font-bold text-ink">{BUSINESS.street}</span>
                <span className="block font-display text-xl font-bold text-ink">{BUSINESS.cityStateZip}</span>
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-brand text-gold-light shrink-0"><Clock size={18} /></span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Hours</span>
                <span className="block font-display text-xl font-bold text-ink">{BUSINESS.hours}</span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form onSubmit={submit} data-testid="quote-form" className="bg-surface border border-edge rounded-sm p-7 sm:p-9 shadow-[0_20px_60px_-30px_rgba(27,59,43,0.4)]">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name">
                <input data-testid="quote-form-name-input" value={form.name} onChange={update("name")} placeholder="Your name" className="ipt" />
              </Field>
              <Field label="Phone">
                <input data-testid="quote-form-phone-input" value={form.phone} onChange={update("phone")} placeholder="(217) 000-0000" className="ipt" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 mt-5">
              <Field label="Lot size">
                <select data-testid="quote-form-lot-size-select" value={form.lot_size} onChange={update("lot_size")} className="ipt">
                  {LOT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Town">
                <input data-testid="quote-form-town-input" value={form.town} onChange={update("town")} placeholder="e.g. Neoga" className="ipt" />
              </Field>
            </div>
            <Field label="Anything else?" className="mt-5">
              <textarea data-testid="quote-form-message-input" value={form.message} onChange={update("message")} rows={3} placeholder="Gates, slopes, how tall the grass is..." className="ipt resize-none" />
            </Field>
            <button
              type="submit"
              disabled={loading}
              data-testid="quote-form-submit-button"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-gold-light px-6 py-4 font-semibold hover:bg-brand-hover transition-colors disabled:opacity-70"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : "Request my quote"}
            </button>
            <p className="mt-4 text-center text-xs text-muted">Final quotes depend on lot size and condition.</p>
          </form>
        </Reveal>
      </div>

      <style>{`
        .ipt { width:100%; background:#F7F5F0; border:1px solid #E2DDD2; border-radius:6px; padding:0.75rem 0.9rem; font-size:0.95rem; color:#1A231E; outline:none; transition:border-color .15s, box-shadow .15s; }
        .ipt:focus { border-color:#1B3B2B; box-shadow:0 0 0 3px rgba(27,59,43,0.12); }
      `}</style>
    </section>
  );
};

const Field = ({ label, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted mb-2">{label}</span>
    {children}
  </label>
);

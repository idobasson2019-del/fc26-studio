import { useState, useRef, useEffect, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { ChevronDown, Search, X, Inbox } from 'lucide-react';

/* ---------- Button ---------- */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export function Button({ variant = 'secondary', size, block, icon, children, ...rest }:
  { variant?: BtnVariant; size?: 'sm' | 'lg'; block?: boolean; icon?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`btn btn-${variant}${size ? ` btn-${size}` : ''}${block ? ' btn-block' : ''}${!children ? ' btn-icon' : ''}`} {...rest}>
      {icon}{children}
    </button>
  );
}

/* ---------- Input / Textarea ---------- */
export function Input({ label, ...rest }: { label?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const el = <input className="input" {...rest} />;
  return label ? <div className="field"><label>{label}</label>{el}</div> : el;
}
export function Textarea({ label, ...rest }: { label?: string } & InputHTMLAttributes<HTMLTextAreaElement>) {
  const el = <textarea className="input" {...(rest as any)} />;
  return label ? <div className="field"><label>{label}</label>{el}</div> : el;
}

/* ---------- Select ---------- */
export function Select({ label, options, ...rest }:
  { label?: string; options: { value: string; label: string }[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  const el = (
    <select className="select" {...rest}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
  return label ? <div className="field"><label>{label}</label>{el}</div> : el;
}

/* ---------- SearchBox ---------- */
export function SearchBox({ value, onChange, placeholder }:
  { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="searchbox">
      <Search />
      <input className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

/* ---------- Badge ---------- */
export function Badge({ color = 'gray', dot, children }:
  { color?: 'accent' | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray'; dot?: boolean; children: ReactNode }) {
  return <span className={`badge badge-${color}`}>{dot && <span className="dot" />}{children}</span>;
}

/* ---------- Tabs ---------- */
export function Tabs({ tabs, active, onChange, stretch }:
  { tabs: { key: string; label: string; icon?: ReactNode }[]; active: string; onChange: (k: string) => void; stretch?: boolean }) {
  return (
    <div className={`tabs${stretch ? ' stretch' : ''}`}>
      {tabs.map((t) => (
        <button key={t.key} className={`tab${active === t.key ? ' active' : ''}`} onClick={() => onChange(t.key)}>
          {t.icon}{t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Slider ---------- */
export function Slider({ label, value, min = 0, max = 99, onChange, color }:
  { label?: string; value: number; min?: number; max?: number; onChange: (v: number) => void; color?: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  const c = color ?? (value >= 85 ? 'var(--green)' : value >= 70 ? 'var(--accent)' : value >= 55 ? 'var(--yellow)' : 'var(--orange)');
  return (
    <div className="slider-row">
      {label && <label>{label}</label>}
      <input type="range" className="slider" value={value} min={min} max={max}
        style={{ background: `linear-gradient(90deg, ${c} ${pct}%, var(--bg-elevated) ${pct}%)` }}
        onChange={(e) => onChange(+e.target.value)} />
      <span className="slider-val" style={{ color: c }}>{value}</span>
    </div>
  );
}

/* ---------- Switch ---------- */
export function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return <div className={`switch${on ? ' on' : ''}`} onClick={() => onChange(!on)}><div className="knob" /></div>;
}

/* ---------- Progress ---------- */
export function Progress({ value }: { value: number }) {
  return <div className="progress"><div style={{ width: `${value}%` }} /></div>;
}

/* ---------- Modal ---------- */
export function Modal({ title, onClose, children, footer, width = 520 }:
  { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; width?: number }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><h3>{title}</h3><Button variant="ghost" size="sm" onClick={onClose} icon={<X />} /></div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Dropdown ---------- */
export function Dropdown({ trigger, children }: { trigger: ReactNode; children: (close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="dropdown" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && <div className="dropdown-menu">{children(() => setOpen(false))}</div>}
    </div>
  );
}

/* ---------- States ---------- */
export function EmptyState({ title, sub, icon, action }: { title: string; sub?: string; icon?: ReactNode; action?: ReactNode }) {
  return (
    <div className="state">
      <div className="state-icon">{icon ?? <Inbox />}</div>
      <h4>{title}</h4>{sub && <p>{sub}</p>}{action}
    </div>
  );
}
export function LoadingState({ label }: { label?: string }) {
  return <div className="state"><div className="spinner" />{label && <p>{label}</p>}</div>;
}

/* ---------- Tooltip ---------- */
export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  return <span className="tip">{children}<span className="tip-body">{text}</span></span>;
}

export { ChevronDown };

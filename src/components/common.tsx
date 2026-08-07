import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import type { Player } from '../types';
import { fmtMoney } from '../data';

export function PageHeader({ title, sub, breadcrumb, actions }:
  { title: string; sub?: string; breadcrumb?: string[]; actions?: ReactNode }) {
  return (
    <div className="page-head">
      <div>
        {breadcrumb && (
          <div className="breadcrumb">
            {breadcrumb.map((b, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                {i > 0 && <ChevronLeft />}{b}
              </span>
            ))}
          </div>
        )}
        <h1>{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {actions && <div className="ph-actions">{actions}</div>}
    </div>
  );
}

export function OvrBadge({ value, size = 34 }: { value: number; size?: number }) {
  const c = value >= 85 ? 'var(--green)' : value >= 78 ? 'var(--accent)' : value >= 70 ? 'var(--yellow)' : 'var(--orange)';
  return (
    <div style={{ width: size, height: size, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontFamily: 'var(--mono)', fontSize: size * 0.4, color: '#04140e', background: c }}>
      {value}
    </div>
  );
}

export function StatTile({ icon, label, value, color, hint }:
  { icon: ReactNode; label: string; value: string | number; color?: string; hint?: string }) {
  return (
    <div className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>{label}</span>
        <span style={{ width: 32, height: 32, borderRadius: 9, background: `color-mix(in srgb, ${color ?? 'var(--accent)'} 14%, transparent)`,
          color: color ?? 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      </div>
      <div className="stat-num" style={{ fontSize: 26 }}>{value}</div>
      {hint && <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{hint}</div>}
    </div>
  );
}

export function PlayerRow({ p }: { p: Player }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ fontSize: 22 }}>{p.clubCrest}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13 }}>{p.commonName ?? `${p.firstName} ${p.lastName}`}</div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{p.flag} {p.club} · {p.position}</div>
      </div>
    </div>
  );
}

export function PlayerCard({ p, onClick, selected }: { p: Player; onClick?: () => void; selected?: boolean }) {
  const c = p.overall >= 85 ? 'var(--green)' : p.overall >= 78 ? 'var(--accent)' : 'var(--yellow)';
  return (
    <div className="card" onClick={onClick}
      style={{ padding: 14, cursor: onClick ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', gap: 12,
        borderColor: selected ? 'var(--accent)' : undefined, transition: 'all .15s',
        boxShadow: selected ? 'var(--sh-glow)' : undefined }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: 22, color: c }}>{p.overall}</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 700 }}>{p.position}</span>
        </div>
        <span style={{ fontSize: 28 }}>{p.flag}</span>
      </div>
      <div>
        <div style={{ fontWeight: 700 }}>{p.commonName ?? `${p.firstName} ${p.lastName}`}</div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{p.clubCrest} {p.club}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border-soft)' }}>
        <span style={{ fontSize: 12, color: 'var(--text-soft)' }}>גיל {p.age}</span>
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, color: 'var(--accent)' }}>{fmtMoney(p.value)}</span>
      </div>
    </div>
  );
}

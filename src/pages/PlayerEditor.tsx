import { useState } from 'react';
import { UserCog, Search, Save, Sparkles, ArrowLeft, Clock } from 'lucide-react';
import { useT } from '../i18n';
import { PageHeader } from '../components/common';
import { Button, Input, Select, Slider, Badge, Modal, EmptyState } from '../components/ui';
import { useToast } from '../components/ui/toast';
import { PLAYERS, TEAMS, LEAGUES, POSITIONS, fmtMoney } from '../data';
import type { Player } from '../types';

export function PlayerEditor() {
  const t = useT();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [fClub, setFClub] = useState('');
  const [fPos, setFPos] = useState('');
  const [sel, setSel] = useState<Player | null>(null);
  const [draft, setDraft] = useState<Player | null>(null);
  const [rejuv, setRejuv] = useState(false);
  const [newAge, setNewAge] = useState(20);

  const list = PLAYERS.filter((p) =>
    (`${p.firstName} ${p.lastName} ${p.commonName ?? ''}`.includes(q)) &&
    (!fClub || p.club === fClub) && (!fPos || p.position === fPos));

  const pick = (p: Player) => { setSel(p); setDraft({ ...p }); };
  const upd = (k: keyof Player, v: any) => setDraft((d) => d ? { ...d, [k]: v } : d);

  // Rejuvenate preview computation
  const rejuvPreview = draft ? (() => {
    const diff = draft.age - newAge;
    const birthYear = 2026 - newAge;
    return {
      age: newAge,
      birth: `${birthYear}`,
      potential: Math.min(99, draft.potential + Math.max(0, Math.round(diff * 0.8))),
      value: Math.round(draft.value * (1 + diff * 0.06)),
      contract: 2026 + Math.min(6, Math.max(2, Math.round(diff / 3) + 3)),
    };
  })() : null;

  return (
    <div className="page">
      <PageHeader title={t('nav.playerEditor')} sub="חפש שחקן קיים, ערוך את נתוניו, או השתמש ב'הצער שחקן'" breadcrumb={['שחקנים', 'עריכת שחקנים']} />

      <div className="grid" style={{ gridTemplateColumns: sel ? '340px 1fr' : '1fr', gap: 16, alignItems: 'start' }}>
        {/* Search list */}
        <div className="panel">
          <div className="panel-body col" style={{ gap: 12 }}>
            <div className="searchbox"><Search /><input className="input" placeholder="חפש שחקן..." value={q} onChange={(e) => setQ(e.target.value)} /></div>
            <div className="grid g-2" style={{ gap: 8 }}>
              <Select value={fClub} onChange={(e) => setFClub(e.target.value)} options={[{ value: '', label: 'כל המועדונים' }, ...TEAMS.map((x) => ({ value: x.name, label: x.name }))]} />
              <Select value={fPos} onChange={(e) => setFPos(e.target.value)} options={[{ value: '', label: 'כל העמדות' }, ...POSITIONS.map((x) => ({ value: x, label: x }))]} />
            </div>
            <div className="col" style={{ gap: 7, maxHeight: sel ? 520 : 'none', overflowY: 'auto' }}>
              {list.map((p) => (
                <div key={p.id} onClick={() => pick(p)}
                  style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 10, borderRadius: 'var(--r-sm)', cursor: 'pointer',
                    background: sel?.id === p.id ? 'var(--accent-soft)' : 'var(--bg-panel-2)',
                    border: `1px solid ${sel?.id === p.id ? 'var(--accent)' : 'var(--border-soft)'}` }}>
                  <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: 16, color: p.overall >= 85 ? 'var(--green)' : 'var(--accent)', width: 26 }}>{p.overall}</span>
                  <span style={{ fontSize: 20 }}>{p.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{p.commonName ?? `${p.firstName} ${p.lastName}`}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{p.clubCrest} {p.club} · {p.position} · גיל {p.age}</div>
                  </div>
                </div>
              ))}
              {list.length === 0 && <EmptyState title="לא נמצאו שחקנים" sub="נסה לשנות את החיפוש או הסינון" icon={<Search />} />}
            </div>
          </div>
        </div>

        {/* Editor */}
        {sel && draft && (
          <div className="panel">
            <div className="panel-head">
              <h3><UserCog />{draft.commonName ?? `${draft.firstName} ${draft.lastName}`}</h3>
              <div className="row" style={{ gap: 9 }}>
                <Button variant="secondary" size="sm" icon={<Clock size={14} />} onClick={() => { setNewAge(Math.max(16, draft.age - 10)); setRejuv(true); }}>הצער שחקן</Button>
                <Button variant="primary" size="sm" icon={<Save size={14} />} onClick={() => { setSel(draft); toast({ title: 'השינויים נשמרו', msg: draft.commonName ?? draft.lastName }); }}>{t('app.save')}</Button>
              </div>
            </div>
            <div className="panel-body col" style={{ gap: 18 }}>
              <div className="grid g-4">
                <Info label="Overall" val={draft.overall} accent />
                <Info label="Potential" val={draft.potential} />
                <Info label="גיל" val={draft.age} />
                <Info label="שווי" val={fmtMoney(draft.value)} money />
              </div>
              <div className="grid g-3">
                <Input label="שם פרטי" value={draft.firstName} onChange={(e) => upd('firstName', e.target.value)} />
                <Input label="שם משפחה" value={draft.lastName} onChange={(e) => upd('lastName', e.target.value)} />
                <Select label="לאום" value={draft.nationality} options={[{ value: draft.nationality, label: `${draft.flag} ${draft.nationality}` }]} />
              </div>
              <div className="grid g-4">
                <Input label="גיל" type="number" value={draft.age} onChange={(e) => upd('age', +e.target.value)} />
                <Input label="גובה" type="number" value={draft.height} onChange={(e) => upd('height', +e.target.value)} />
                <Select label="עמדה" value={draft.position} onChange={(e) => upd('position', e.target.value)} options={POSITIONS.map((x) => ({ value: x, label: x }))} />
                <Input label="מספר" type="number" value={draft.number} onChange={(e) => upd('number', +e.target.value)} />
              </div>
              <div className="grid g-3">
                <Select label="מועדון" value={draft.club} onChange={(e) => upd('club', e.target.value)} options={TEAMS.map((x) => ({ value: x.name, label: x.name }))} />
                <Select label="ליגה" value={draft.league} options={LEAGUES.map((x) => ({ value: x.name, label: x.name }))} />
                <Select label="רגל חזקה" value={draft.foot} options={[{ value: 'ימין', label: 'ימין' }, { value: 'שמאל', label: 'שמאל' }]} />
              </div>
              <div className="divider" />
              <div className="grid g-2" style={{ gap: '10px 24px' }}>
                <Slider label="Overall" value={draft.overall} min={40} max={99} onChange={(v) => upd('overall', v)} />
                <Slider label="Potential" value={draft.potential} min={40} max={99} onChange={(v) => upd('potential', v)} />
              </div>
              <div className="divider" />
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>כספים וחוזה</div>
              <div className="grid g-4">
                <Input label="שווי שוק (€)" type="number" value={draft.value} onChange={(e) => upd('value', +e.target.value)} />
                <Input label="שכר (€)" type="number" value={draft.wage} onChange={(e) => upd('wage', +e.target.value)} />
                <Input label="חוזה עד" type="number" value={draft.contractUntil} onChange={(e) => upd('contractUntil', +e.target.value)} />
                <Input label="סעיף שחרור (€)" type="number" value={draft.releaseClause ?? 0} onChange={(e) => upd('releaseClause', +e.target.value)} />
              </div>
              <div className="row wrap" style={{ gap: 7 }}>
                {draft.playStyles.map((s) => <Badge key={s} color="purple">{s}</Badge>)}
              </div>
            </div>
          </div>
        )}
      </div>

      {!sel && <div className="panel" style={{ marginTop: 16 }}><EmptyState title="בחר שחקן לעריכה" sub="חפש שחקן ברשימה כדי לראות ולערוך את כל נתוניו" icon={<UserCog />} /></div>}

      {/* Rejuvenate modal */}
      {rejuv && draft && rejuvPreview && (
        <Modal title="הצער שחקן" width={560} onClose={() => setRejuv(false)}
          footer={<>
            <Button variant="primary" icon={<Sparkles size={15} />} onClick={() => {
              setDraft((d) => d ? { ...d, age: rejuvPreview.age, potential: rejuvPreview.potential, value: rejuvPreview.value, contractUntil: rejuvPreview.contract } : d);
              setRejuv(false); toast({ title: 'השחקן הוצער', msg: `גיל חדש: ${newAge}` });
            }}>החל שינויים</Button>
            <Button variant="ghost" onClick={() => setRejuv(false)}>{t('app.cancel')}</Button>
          </>}>
          <div className="col" style={{ gap: 18 }}>
            <Slider label={`גיל חדש: ${newAge}`} value={newAge} min={16} max={draft.age} onChange={setNewAge} />
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>תצוגה מקדימה של השינויים לפני שמירה:</div>
            <div className="grid g-2" style={{ gap: 10 }}>
              <ChangeRow label="גיל" from={draft.age} to={rejuvPreview.age} />
              <ChangeRow label="תאריך לידה" from={String(2026 - draft.age)} to={rejuvPreview.birth} />
              <ChangeRow label="Potential" from={draft.potential} to={rejuvPreview.potential} up />
              <ChangeRow label="שווי שוק" from={fmtMoney(draft.value)} to={fmtMoney(rejuvPreview.value)} up />
              <ChangeRow label="חוזה עד" from={draft.contractUntil} to={rejuvPreview.contract} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Info({ label, val, accent, money }: { label: string; val: string | number; accent?: boolean; money?: boolean }) {
  return (
    <div className="card card-pad" style={{ padding: 12, textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: 20, color: accent ? 'var(--accent)' : money ? 'var(--green)' : 'var(--text)' }}>{val}</div>
    </div>
  );
}

function ChangeRow({ label, from, to, up }: { label: string; from: string | number; to: string | number; up?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--r-sm)', background: 'var(--bg-panel-2)', border: '1px solid var(--border-soft)' }}>
      <span style={{ fontSize: 12, color: 'var(--text-soft)' }}>{label}</span>
      <div className="row" style={{ gap: 10 }}>
        <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)' }}>{from}</span>
        <ArrowLeft size={14} style={{ color: 'var(--text-faint)' }} />
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: up ? 'var(--green)' : 'var(--accent)' }}>{to}</span>
      </div>
    </div>
  );
}

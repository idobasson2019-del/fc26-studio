import { useState } from 'react';
import {
  Globe, MapPin, Settings2, Users, Check, ChevronLeft, ChevronRight, Plus, X, Trophy, GripVertical, Search,
} from 'lucide-react';
import { useT } from '../i18n';
import { PageHeader } from '../components/common';
import { Button, Input, Select, Switch, Badge } from '../components/ui';
import { useToast } from '../components/ui/toast';
import { CONTINENTS, COUNTRIES, TEAMS } from '../data';
import type { Team, Continent } from '../types';

const STEPS = [
  { key: 'continent', label: 'יבשת', icon: Globe },
  { key: 'country', label: 'מדינה', icon: MapPin },
  { key: 'details', label: 'פרטי ליגה', icon: Settings2 },
  { key: 'teams', label: 'בחירת קבוצות', icon: Users },
];

export function LeagueBuilder() {
  const t = useT();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [continent, setContinent] = useState<Continent | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', short: '', teams: 20, rounds: 2, promo: 3, releg: 3, playoff: true, foreign: 5, squad: 25, homeAway: true });
  const [selected, setSelected] = useState<Team[]>([]);
  const [q, setQ] = useState('');
  const [dragId, setDragId] = useState<string | null>(null);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const available = TEAMS.filter((tm) => !selected.find((s) => s.id === tm.id) &&
    (tm.name.includes(q) || tm.country.includes(q) || tm.league.includes(q)));

  const add = (tm: Team) => setSelected((s) => [...s, tm]);
  const remove = (id: string) => setSelected((s) => s.filter((x) => x.id !== id));

  const canNext = step === 0 ? !!continent : step === 1 ? !!country : step === 2 ? form.name.length > 1 : true;

  return (
    <div className="page">
      <PageHeader title={t('nav.leagueBuilder')} sub="בנה ליגה חדשה בארבעה שלבים — יבשת, מדינה, פרטים וקבוצות"
        breadcrumb={['יצירת מוד', 'בונה ליגות']} />

      {/* Stepper */}
      <div className="card card-pad" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {STEPS.map((s, i) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i < step ? 'var(--accent)' : i === step ? 'var(--accent-soft)' : 'var(--bg-elevated)',
                  color: i < step ? '#04140e' : i === step ? 'var(--accent)' : 'var(--text-dim)',
                  border: i === step ? '1px solid var(--accent)' : '1px solid transparent', transition: 'all .2s' }}>
                  {i < step ? <Check size={18} /> : <s.icon size={18} />}
                </span>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>שלב {i + 1}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: i <= step ? 'var(--text)' : 'var(--text-dim)' }}>{s.label}</div>
                </div>
              </div>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, margin: '0 14px', background: i < step ? 'var(--accent)' : 'var(--border)', borderRadius: 2 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step body */}
      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-body">
          {step === 0 && (
            <div className="grid g-3">
              {CONTINENTS.map((c) => (
                <button key={c.name} onClick={() => setContinent(c.name)}
                  className="card" style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
                    borderColor: continent === c.name ? 'var(--accent)' : 'var(--border)',
                    boxShadow: continent === c.name ? 'var(--sh-glow)' : 'none', background: continent === c.name ? 'var(--accent-soft)' : 'var(--bg-panel)' }}>
                  <span style={{ fontSize: 38 }}>{c.icon}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{c.countries} מדינות</div>
                  </div>
                  {continent === c.name && <Check size={20} style={{ color: 'var(--accent)', marginRight: 'auto' }} />}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid g-4">
              {Object.entries(COUNTRIES).filter(([, v]) => v.continent === continent).map(([name, v]) => (
                <button key={name} onClick={() => setCountry(name)}
                  className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer',
                    borderColor: country === name ? 'var(--accent)' : 'var(--border)', background: country === name ? 'var(--accent-soft)' : 'var(--bg-panel)' }}>
                  <span style={{ fontSize: 36 }}>{v.flag}</span>
                  <span style={{ fontWeight: 700 }}>{name}</span>
                </button>
              ))}
              {Object.entries(COUNTRIES).filter(([, v]) => v.continent === continent).length === 0 &&
                <p style={{ color: 'var(--text-dim)', gridColumn: '1/-1', textAlign: 'center', padding: 30 }}>אין מדינות דמו ביבשת זו — בחר יבשת אחרת.</p>}
            </div>
          )}

          {step === 2 && (
            <div className="col" style={{ gap: 20 }}>
              <div className="grid g-3">
                <Input label="שם הליגה" placeholder="ליגת העל החדשה" value={form.name} onChange={(e) => set('name', e.target.value)} />
                <Input label="שם קצר" placeholder="LOL" value={form.short} onChange={(e) => set('short', e.target.value)} />
                <Input label="מדינה" value={country ?? ''} disabled />
              </div>
              <div className="grid g-4">
                <Input label="מספר קבוצות" type="number" value={form.teams} onChange={(e) => set('teams', +e.target.value)} />
                <Select label="מספר סיבובים" value={String(form.rounds)} onChange={(e) => set('rounds', +e.target.value)}
                  options={[{ value: '1', label: 'סיבוב אחד' }, { value: '2', label: 'בית וחוץ (2)' }]} />
                <Input label="מספר עולות" type="number" value={form.promo} onChange={(e) => set('promo', +e.target.value)} />
                <Input label="מספר יורדות" type="number" value={form.releg} onChange={(e) => set('releg', +e.target.value)} />
              </div>
              <div className="grid g-4">
                <Input label="מגבלת זרים" type="number" value={form.foreign} onChange={(e) => set('foreign', +e.target.value)} />
                <Input label="גודל סגל" type="number" value={form.squad} onChange={(e) => set('squad', +e.target.value)} />
                <ToggleField label="פלייאוף" on={form.playoff} onChange={(v) => set('playoff', v)} />
                <ToggleField label="משחקי בית וחוץ" on={form.homeAway} onChange={(v) => set('homeAway', v)} />
              </div>
              <div className="grid g-3">
                <UploadField label="לוגו הליגה" />
                <UploadField label="כדור רשמי" />
                <UploadField label="גרפיקת שידור" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid g-2" style={{ gap: 16 }}>
              {/* Available */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ fontSize: 14 }}>קבוצות זמינות</h3>
                  <Badge color="gray">{available.length}</Badge>
                </div>
                <div className="searchbox" style={{ marginBottom: 10 }}>
                  <Search /><input className="input" placeholder="חפש לפי שם / מדינה / ליגה" value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
                <div className="col" style={{ gap: 8, maxHeight: 380, overflowY: 'auto', paddingLeft: 4 }}>
                  {available.map((tm) => (
                    <div key={tm.id} draggable onDragStart={() => setDragId(tm.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 10, borderRadius: 'var(--r-sm)',
                        background: 'var(--bg-panel-2)', border: '1px solid var(--border-soft)', cursor: 'grab' }}>
                      <GripVertical size={15} style={{ color: 'var(--text-faint)' }} />
                      <span style={{ fontSize: 20 }}>{tm.crest}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{tm.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{tm.country} · {tm.league}</div>
                      </div>
                      <Button variant="ghost" size="sm" icon={<Plus size={15} />} onClick={() => add(tm)} />
                    </div>
                  ))}
                  {available.length === 0 && <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: 20, fontSize: 13 }}>אין קבוצות זמינות</p>}
                </div>
              </div>

              {/* Selected (drop zone) */}
              <div style={{ display: 'flex', flexDirection: 'column' }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { const tm = TEAMS.find((x) => x.id === dragId); if (tm && !selected.find((s) => s.id === tm.id)) add(tm); setDragId(null); }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ fontSize: 14 }}>קבוצות בליגה</h3>
                  <Badge color="accent">{selected.length} / {form.teams}</Badge>
                </div>
                <div style={{ flex: 1, borderRadius: 'var(--r-md)', border: '1.5px dashed var(--border-strong)', padding: 12,
                  background: 'var(--bg-base)', minHeight: 420, maxHeight: 428, overflowY: 'auto' }}>
                  {selected.length === 0 ? (
                    <div className="state" style={{ padding: 40 }}>
                      <div className="state-icon"><Users /></div>
                      <p>גרור קבוצות לכאן או לחץ על + כדי להוסיפן לליגה</p>
                    </div>
                  ) : (
                    <div className="col" style={{ gap: 8 }}>
                      {selected.map((tm, i) => (
                        <div key={tm.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 10, borderRadius: 'var(--r-sm)',
                          background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
                          <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontSize: 12, width: 18 }}>{i + 1}</span>
                          <span style={{ fontSize: 20 }}>{tm.crest}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 13 }}>{tm.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{tm.country} · OVR {tm.overall}</div>
                          </div>
                          <Button variant="ghost" size="sm" icon={<X size={15} />} onClick={() => remove(tm.id)} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <Button variant="secondary" disabled={step === 0} icon={<ChevronRight size={16} />} onClick={() => setStep((s) => s - 1)}>{t('app.prev')}</Button>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>{t('app.next')}<ChevronLeft size={16} /></Button>
        ) : (
          <Button variant="primary" icon={<Trophy size={16} />} onClick={() => toast({ title: 'הליגה נוצרה', msg: `${form.name} · ${selected.length} קבוצות` })}>צור ליגה</Button>
        )}
      </div>
    </div>
  );
}

function ToggleField({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="field"><label>{label}</label>
      <div style={{ height: 38, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)' }}>
        <Switch on={on} onChange={onChange} /><span style={{ fontSize: 12, color: 'var(--text-soft)' }}>{on ? 'מופעל' : 'כבוי'}</span>
      </div>
    </div>
  );
}

function UploadField({ label }: { label: string }) {
  return (
    <div className="field"><label>{label}</label>
      <div style={{ height: 72, borderRadius: 'var(--r-sm)', border: '1.5px dashed var(--border-strong)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', background: 'var(--bg-base)' }}>
        <Plus size={16} /> העלה קובץ
      </div>
    </div>
  );
}

import { useState } from 'react';
import { UserPlus, Save, RotateCcw, Sparkles, User, Activity, Wallet, Star } from 'lucide-react';
import { useT } from '../i18n';
import { PageHeader } from '../components/common';
import { Button, Input, Select, Slider, Tabs, Badge } from '../components/ui';
import { useToast } from '../components/ui/toast';
import { POSITIONS, PLAYSTYLES, COUNTRIES, TEAMS, fmtMoney } from '../data';

const ATTR_GROUPS: Record<string, string[]> = {
  'מהירות': ['Acceleration', 'Sprint Speed'],
  'ירי': ['Finishing', 'Shot Power', 'Long Shots'],
  'מסירה': ['Vision', 'Crossing', 'Short Passing', 'Long Passing'],
  'כדרור': ['Ball Control', 'Dribbling', 'Agility', 'Balance', 'Reactions'],
  'הגנה': ['Standing Tackle', 'Sliding Tackle', 'Defending'],
  'פיזי': ['Strength', 'Stamina', 'Aggression', 'Jumping'],
};

export function PlayerCreator() {
  const t = useT();
  const toast = useToast();
  const [tab, setTab] = useState('basic');
  const [p, setP] = useState({
    firstName: '', lastName: '', commonName: '', shirtName: '', nationality: 'ברזיל', age: 22,
    height: 180, weight: 75, foot: 'ימין', position: 'ST', number: 9, overall: 75, potential: 85,
    skillMoves: 3, weakFoot: 3, club: 'ריברסייד FC', value: 5_000_000, wage: 40_000, contract: 2029, clause: 0,
  });
  const [attrs, setAttrs] = useState<Record<string, number>>(() =>
    Object.fromEntries(Object.values(ATTR_GROUPS).flat().map((k) => [k, 70])));
  const [styles, setStyles] = useState<string[]>(['Technical']);

  const set = (k: string, v: any) => setP((s) => ({ ...s, [k]: v }));
  const flag = COUNTRIES[p.nationality]?.flag ?? '🏳️';
  const ovrColor = p.overall >= 85 ? 'var(--green)' : p.overall >= 78 ? 'var(--accent)' : p.overall >= 70 ? 'var(--yellow)' : 'var(--orange)';

  return (
    <div className="page">
      <PageHeader title={t('nav.playerCreator')} sub="צור שחקן חדש — שווי השוק עצמאי ואינו נגזר מה-Overall" breadcrumb={['שחקנים', 'יצירת שחקנים']}
        actions={<><Button variant="secondary" icon={<RotateCcw size={15} />}>{t('app.reset')}</Button>
          <Button variant="primary" icon={<Save size={15} />} onClick={() => toast({ title: 'השחקן נשמר', msg: `${p.firstName} ${p.lastName || 'חדש'} · OVR ${p.overall}` })}>{t('app.save')}</Button></>} />

      <div className="grid" style={{ gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>
        {/* Form */}
        <div className="panel">
          <div className="panel-body">
            <Tabs stretch active={tab} onChange={setTab} tabs={[
              { key: 'basic', label: 'פרטים', icon: <User size={15} /> },
              { key: 'attrs', label: 'נתונים', icon: <Activity size={15} /> },
              { key: 'styles', label: 'PlayStyles', icon: <Star size={15} /> },
              { key: 'finance', label: 'כספים', icon: <Wallet size={15} /> },
            ]} />
            <div style={{ marginTop: 20 }}>
              {tab === 'basic' && (
                <div className="col" style={{ gap: 16 }}>
                  <div className="grid g-3">
                    <Input label="שם פרטי" value={p.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="ליאו" />
                    <Input label="שם משפחה" value={p.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="סילבה" />
                    <Input label="שם מוכר" value={p.commonName} onChange={(e) => set('commonName', e.target.value)} placeholder="סילבינהו" />
                  </div>
                  <div className="grid g-3">
                    <Input label="שם על החולצה" value={p.shirtName} onChange={(e) => set('shirtName', e.target.value)} placeholder="SILVA" />
                    <Select label="לאום" value={p.nationality} onChange={(e) => set('nationality', e.target.value)}
                      options={Object.keys(COUNTRIES).map((c) => ({ value: c, label: `${COUNTRIES[c].flag} ${c}` }))} />
                    <Input label="מספר חולצה" type="number" value={p.number} onChange={(e) => set('number', +e.target.value)} />
                  </div>
                  <div className="grid g-4">
                    <Input label="גיל" type="number" value={p.age} onChange={(e) => set('age', +e.target.value)} />
                    <Input label="גובה (ס״מ)" type="number" value={p.height} onChange={(e) => set('height', +e.target.value)} />
                    <Input label="משקל (ק״ג)" type="number" value={p.weight} onChange={(e) => set('weight', +e.target.value)} />
                    <Select label="רגל חזקה" value={p.foot} onChange={(e) => set('foot', e.target.value)}
                      options={[{ value: 'ימין', label: 'ימין' }, { value: 'שמאל', label: 'שמאל' }]} />
                  </div>
                  <div className="grid g-3">
                    <Select label="עמדה ראשית" value={p.position} onChange={(e) => set('position', e.target.value)} options={POSITIONS.map((x) => ({ value: x, label: x }))} />
                    <Select label="קבוצה" value={p.club} onChange={(e) => set('club', e.target.value)} options={TEAMS.map((x) => ({ value: x.name, label: `${x.crest} ${x.name}` }))} />
                    <Select label="ליגה" value="" options={[{ value: '', label: TEAMS.find((x) => x.name === p.club)?.league ?? '—' }]} disabled />
                  </div>
                  <div className="divider" />
                  <div className="grid g-2">
                    <div><Slider label="Overall" value={p.overall} min={40} max={99} onChange={(v) => set('overall', v)} /></div>
                    <div><Slider label="Potential" value={p.potential} min={40} max={99} onChange={(v) => set('potential', v)} /></div>
                    <StarPicker label="Skill Moves" value={p.skillMoves} onChange={(v) => set('skillMoves', v)} />
                    <StarPicker label="Weak Foot" value={p.weakFoot} onChange={(v) => set('weakFoot', v)} />
                  </div>
                </div>
              )}

              {tab === 'attrs' && (
                <div className="col" style={{ gap: 20 }}>
                  {Object.entries(ATTR_GROUPS).map(([group, keys]) => (
                    <div key={group}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.05em' }}>{group}</div>
                      <div className="grid g-2" style={{ gap: '10px 24px' }}>
                        {keys.map((k) => (
                          <div key={k} className="row" style={{ gap: 10 }}>
                            <span style={{ fontSize: 12, color: 'var(--text-soft)', minWidth: 108 }}>{k}</span>
                            <Slider value={attrs[k]} onChange={(v) => setAttrs((a) => ({ ...a, [k]: v }))} />
                            <input className="input" type="number" style={{ width: 58, height: 30, padding: '0 6px', textAlign: 'center' }}
                              value={attrs[k]} onChange={(e) => setAttrs((a) => ({ ...a, [k]: Math.min(99, +e.target.value) }))} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'styles' && (
                <div>
                  <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 14 }}>בחר את ה-PlayStyles של השחקן (נבחרו {styles.length})</p>
                  <div className="row wrap" style={{ gap: 9 }}>
                    {PLAYSTYLES.map((s) => (
                      <button key={s} className={`chip${styles.includes(s) ? ' active' : ''}`}
                        onClick={() => setStyles((cur) => cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s])}>
                        <Sparkles size={13} />{s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'finance' && (
                <div className="col" style={{ gap: 16 }}>
                  <div className="card card-pad" style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)', display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Sparkles size={18} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: 12.5, color: 'var(--text-soft)' }}>שווי השוק <b style={{ color: 'var(--text)' }}>עצמאי לחלוטין</b> ואינו משתנה אוטומטית לפי ה-Overall. לדוגמה: Overall 82 עם שווי €4M.</span>
                  </div>
                  <div className="grid g-2">
                    <MoneyField label="שווי שוק" value={p.value} onChange={(v) => set('value', v)} />
                    <MoneyField label="שכר שבועי" value={p.wage} onChange={(v) => set('wage', v)} />
                    <Input label="אורך חוזה (שנה)" type="number" value={p.contract} onChange={(e) => set('contract', +e.target.value)} />
                    <MoneyField label="סעיף שחרור" value={p.clause} onChange={(v) => set('clause', v)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div className="panel" style={{ position: 'sticky', top: 0 }}>
          <div className="panel-head"><h3><UserPlus />תצוגה מקדימה</h3></div>
          <div className="panel-body">
            <div style={{ borderRadius: 'var(--r-lg)', padding: 20, background: 'linear-gradient(160deg,var(--bg-elevated),var(--bg-panel-2))', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontWeight: 900, fontSize: 40, color: ovrColor, lineHeight: 1 }}>{p.overall}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-soft)' }}>{p.position}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>POT {p.potential}</div>
                </div>
                <span style={{ fontSize: 52 }}>{flag}</span>
              </div>
              <div style={{ width: 96, height: 96, borderRadius: 99, margin: '10px auto', background: 'radial-gradient(circle,var(--bg-hover),var(--bg-base))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border-strong)' }}>
                <User size={44} style={{ color: 'var(--text-faint)' }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{p.firstName || 'שם'} {p.lastName || 'השחקן'}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>{p.club} · #{p.number}</div>
              <div className="row" style={{ justifyContent: 'center', gap: 8, marginBottom: 12 }}>
                <Badge color="gray">גיל {p.age}</Badge>
                <Badge color="gray">{p.height}ס״מ</Badge>
                <Badge color="gray">{p.foot}</Badge>
              </div>
              <div className="divider" />
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>שווי שוק</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: 'var(--accent)', fontSize: 16 }}>{fmtMoney(p.value)}</span>
              </div>
              <div className="row" style={{ justifyContent: 'center', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
                {styles.slice(0, 4).map((s) => <span key={s} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 700 }}>{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarPicker({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="field"><label>{label}</label>
      <div className="row" style={{ gap: 5, height: 38, alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={22} onClick={() => onChange(n)} style={{ cursor: 'pointer',
            fill: n <= value ? 'var(--yellow)' : 'transparent', color: n <= value ? 'var(--yellow)' : 'var(--text-faint)' }} />
        ))}
      </div>
    </div>
  );
}

function MoneyField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="field"><label>{label} <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)' }}>{fmtMoney(value)}</span></label>
      <input className="input" type="number" value={value} step={100000} onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}

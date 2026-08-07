import { useState } from 'react';
import { Plus, MoreVertical, Hammer, Download, Copy, Trash2, Pencil, Package, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../i18n';
import { PageHeader } from '../components/common';
import { Button, Badge, Dropdown, SearchBox, Tabs, Modal, Progress } from '../components/ui';
import { useToast } from '../components/ui/toast';
import { MODS } from '../data';

const COVERS: Record<string, string> = {
  a: 'linear-gradient(135deg,#16d3a3,#0a7c63)', b: 'linear-gradient(135deg,#3d8bfd,#1a3a7a)',
  c: 'linear-gradient(135deg,#9d7bff,#4a2f8a)', d: 'linear-gradient(135deg,#ff5c8a,#8a2f4f)',
  e: 'linear-gradient(135deg,#ff9f45,#8a5220)', f: 'linear-gradient(135deg,#35d0d8,#1a6a70)',
};
const BUILD_STEPS = ['הכנת קבצים', 'בדיקת נתונים', 'Build', 'Packaging', 'בדיקת התנגשויות', 'השלמה'];

export function MyMods() {
  const t = useT();
  const nav = useNavigate();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [building, setBuilding] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const list = MODS.filter((m) => m.name.includes(q) &&
    (filter === 'all' || (filter === 'installed' && m.installed) || (filter === 'dev' && m.status === 'בפיתוח')));

  const runBuild = (name: string) => {
    setBuilding(name); setStep(0);
    const iv = setInterval(() => setStep((s) => {
      if (s >= BUILD_STEPS.length - 1) { clearInterval(iv); return s; }
      return s + 1;
    }), 700);
  };

  return (
    <div className="page">
      <PageHeader title={t('nav.myMods')} sub="כל הפרויקטים שלך — פתח, ערוך, בנה או התקן"
        actions={<Button variant="primary" icon={<Plus size={15} />} onClick={() => nav('/create-mod')}>{t('dashboard.createNew')}</Button>} />

      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <Tabs active={filter} onChange={setFilter} tabs={[
          { key: 'all', label: 'הכל' }, { key: 'installed', label: 'מותקנים' }, { key: 'dev', label: 'בפיתוח' }]} />
        <div style={{ width: 260 }}><SearchBox value={q} onChange={setQ} placeholder="חפש מוד..." /></div>
      </div>

      <div className="grid g-auto">
        {list.map((m) => (
          <div key={m.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 100, background: COVERS[m.cover], position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={34} style={{ color: 'rgba(255,255,255,.9)' }} />
              <div style={{ position: 'absolute', top: 10, left: 10 }}>
                {m.conflict === 'critical' ? <Badge color="red" dot>התנגשות</Badge> : m.conflict === 'possible' ? <Badge color="orange" dot>אזהרה</Badge> : <Badge color="green" dot>תקין</Badge>}
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <Dropdown trigger={<button className="tb-icon-btn" style={{ width: 30, height: 30, background: 'rgba(0,0,0,.3)' }}><MoreVertical size={16} /></button>}>
                  {(close) => (<>
                    <button className="dropdown-item" onClick={close}><Pencil />{t('app.edit')}</button>
                    <button className="dropdown-item" onClick={close}><Copy />{t('app.duplicate')}</button>
                    <button className="dropdown-item" onClick={() => { close(); toast({ kind: 'info', title: 'ייצוא', msg: m.name }); }}><Download />{t('app.export')}</button>
                    <div className="divider" style={{ margin: '4px 0' }} />
                    <button className="dropdown-item danger" onClick={close}><Trash2 />{t('app.delete')}</button>
                  </>)}
                </Dropdown>
              </div>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{m.type} · v{m.version} · {m.size}</div>
              </div>
              <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                <Badge color="gray">{m.gameVersion}</Badge>
                {m.installed ? <Badge color="green">מותקן</Badge> : <Badge color="gray">לא מותקן</Badge>}
                <Badge color={m.status === 'פורסם' ? 'blue' : m.status === 'בפיתוח' ? 'orange' : 'gray'}>{m.status}</Badge>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>עודכן {m.updated}</div>
              <div className="row" style={{ gap: 8, marginTop: 'auto' }}>
                <Button variant="secondary" size="sm" block onClick={() => nav('/create-mod')}>{t('app.open')}</Button>
                <Button variant="primary" size="sm" icon={<Hammer size={14} />} onClick={() => runBuild(m.name)}>Build</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Build modal */}
      {building && (
        <Modal title={`Build · ${building}`} width={480} onClose={() => setBuilding(null)}
          footer={step >= BUILD_STEPS.length - 1 ? <>
            <Button variant="primary" icon={<Download size={15} />} onClick={() => { setBuilding(null); toast({ title: 'התקנה', msg: 'דרוש חיבור ל-Mod Manager' }); }}>התקן ל-Mod Manager</Button>
            <Button variant="secondary" onClick={() => setBuilding(null)}>סגור</Button>
          </> : undefined}>
          <div className="col" style={{ gap: 14 }}>
            <Progress value={((step + 1) / BUILD_STEPS.length) * 100} />
            {BUILD_STEPS.map((s, i) => (
              <div key={s} className="row" style={{ gap: 11, opacity: i <= step ? 1 : 0.4 }}>
                <span style={{ width: 24, height: 24, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i < step ? 'var(--accent)' : i === step ? 'var(--accent-soft)' : 'var(--bg-elevated)', color: i < step ? '#04140e' : 'var(--accent)' }}>
                  {i < step ? <CheckCircle2 size={14} /> : i === step && step < BUILD_STEPS.length - 1 ? <div className="spinner" style={{ width: 13, height: 13, borderWidth: 2 }} /> : i === step ? <CheckCircle2 size={14} /> : <span style={{ fontSize: 11 }}>{i + 1}</span>}
                </span>
                <span style={{ fontSize: 13, fontWeight: i === step ? 700 : 500 }}>{s}</span>
              </div>
            ))}
            {step >= BUILD_STEPS.length - 1 && (
              <div className="card card-pad" style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} /><span style={{ fontSize: 13, fontWeight: 700 }}>המוד נבנה בהצלחה!</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy, Award, Shield, Users, Briefcase, Shirt, Building2, Music, Database,
  UserRoundPlus, Gamepad2, Sparkles, Wrench, Plus,
} from 'lucide-react';
import { useT } from '../i18n';
import { PageHeader } from '../components/common';
import { Modal, Input, Select, Button, SearchBox } from '../components/ui';
import { useToast } from '../components/ui/toast';

const TYPES = [
  { key: 'league', name: 'מוד ליגה', desc: 'בנה ליגה חדשה עם קבוצות, פורמט ופרסים', icon: Trophy, color: 'var(--accent)', to: '/league-builder' },
  { key: 'competition', name: 'מוד מפעל', desc: 'צור מפעל/גביע עם פורמט נוקאאוט ומיתוג', icon: Award, color: 'var(--purple)', to: '/competition-builder' },
  { key: 'team', name: 'מוד קבוצה', desc: 'ערוך פרטי קבוצה, סגל וצבעים', icon: Shield, color: 'var(--blue)', to: '/team-editor' },
  { key: 'players', name: 'מוד שחקנים', desc: 'צור וערוך שחקנים, נתונים ו-PlayStyles', icon: Users, color: 'var(--cyan)', to: '/player-creator' },
  { key: 'career', name: 'מוד קריירה', desc: 'ערוך שמירת קריירה, העברות וכספים', icon: Briefcase, color: 'var(--orange)', to: '/career' },
  { key: 'kits', name: 'מוד מדים', desc: 'עצב מדי בית, חוץ ושוער', icon: Shirt, color: 'var(--pink)', to: '/kit-designer' },
  { key: 'stadium', name: 'מוד אצטדיון', desc: 'בנה אצטדיון מותאם עם יציעים ותאורה', icon: Building2, color: 'var(--green)', to: '/stadium-creator' },
  { key: 'audio', name: 'מוד אודיו', desc: 'שירי כניסה, מוזיקת שערים וקהל', icon: Music, color: 'var(--yellow)', to: '/audio' },
  { key: 'database', name: 'מוד Database', desc: 'עריכה מקיפה של טבלאות הנתונים', icon: Database, color: 'var(--red)', to: '/database' },
  { key: 'managers', name: 'מוד מאמנים', desc: 'צור וערוך מאמנים ושוק מאמנים', icon: UserRoundPlus, color: 'var(--blue)', to: '/manager-creator' },
  { key: 'gameplay', name: 'מוד Gameplay', desc: 'חוקי משחק, אורך משחק וחילופים', icon: Gamepad2, color: 'var(--purple)', to: '/match-rules' },
  { key: 'visual', name: 'מוד Visual', desc: 'גרפיקה, שידור ואפקטים חזותיים', icon: Sparkles, color: 'var(--pink)', to: '/broadcast' },
  { key: 'custom', name: 'מוד מותאם אישית', desc: 'התחל מאפס ובנה מוד לפי הצורך שלך', icon: Wrench, color: 'var(--text-soft)', to: '/my-mods' },
];

export function CreateMod() {
  const t = useT();
  const nav = useNavigate();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [modal, setModal] = useState<typeof TYPES[0] | null>(null);
  const [name, setName] = useState('');

  const list = TYPES.filter((x) => x.name.includes(q) || x.desc.includes(q));

  return (
    <div className="page">
      <PageHeader title={t('nav.createMod')} sub="בחר את סוג המוד שברצונך ליצור. כל סוג פותח את הכלי המתאים לבנייה."
        actions={<div style={{ width: 240 }}><SearchBox value={q} onChange={setQ} placeholder="חפש סוג מוד..." /></div>} />

      <div className="grid g-auto">
        {list.map((tp) => (
          <div key={tp.key} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, transition: 'all .16s', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = tp.color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => { setModal(tp); setName(''); }}>
            <span style={{ width: 52, height: 52, borderRadius: 14, background: `color-mix(in srgb, ${tp.color} 15%, transparent)`,
              color: tp.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><tp.icon size={26} /></span>
            <div>
              <h3 style={{ fontSize: 16, marginBottom: 5 }}>{tp.name}</h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.55 }}>{tp.desc}</p>
            </div>
            <Button variant="secondary" size="sm" block icon={<Plus size={15} />} style={{ marginTop: 'auto' }}>{t('app.create')}</Button>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={`יצירת ${modal.name}`} onClose={() => setModal(null)}
          footer={<>
            <Button variant="primary" icon={<Plus size={15} />} onClick={() => {
              toast({ title: 'המוד נוצר', msg: `${name || modal.name} · פותח את הכלי` });
              setModal(null); nav(modal.to);
            }}>צור ופתח כלי</Button>
            <Button variant="ghost" onClick={() => setModal(null)}>{t('app.cancel')}</Button>
          </>}>
          <div className="col" style={{ gap: 16 }}>
            <div className="row" style={{ gap: 14, alignItems: 'center' }}>
              <span style={{ width: 56, height: 56, borderRadius: 14, background: `color-mix(in srgb, ${modal.color} 15%, transparent)`,
                color: modal.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><modal.icon size={28} /></span>
              <div><div style={{ fontWeight: 700, fontSize: 15 }}>{modal.name}</div><div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{modal.desc}</div></div>
            </div>
            <Input label="שם המוד" placeholder={`לדוגמה: ${modal.name} 26/27`} value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <div className="grid g-2">
              <Select label="גרסת משחק" options={[{ value: '1.8', label: 'FC 26 · 1.8' }, { value: '1.7', label: 'FC 26 · 1.7' }]} />
              <Input label="גרסת מוד" defaultValue="1.0.0" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

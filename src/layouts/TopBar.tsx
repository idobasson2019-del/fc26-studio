import { useNavigate } from 'react-router-dom';
import { Search, Bell, Save, Hammer, Download, HelpCircle } from 'lucide-react';
import { useT } from '../i18n';
import { useToast } from '../components/ui/toast';
import { Dropdown } from '../components/ui';

export function TopBar() {
  const t = useT();
  const toast = useToast();
  const nav = useNavigate();

  return (
    <header className="topbar">
      <div className="tb-project" onClick={() => nav('/my-mods')}>
        <span className="p-dot" />
        <div>
          <div className="p-name">עונת 2026/27 מלאה</div>
        </div>
        <span className="p-ver">v2.4.1</span>
      </div>

      <div className="tb-search">
        <div className="searchbox">
          <Search />
          <input className="input" placeholder={t('app.searchGlobal')} />
        </div>
      </div>

      <div className="tb-spacer" />

      <div className="tb-status-pill">
        <span className="s-dot ok" />
        <span className="s-label">FC 26</span>
      </div>
      <div className="tb-status-pill">
        <span className="s-dot off" />
        <span className="s-label">Mod Manager</span>
      </div>

      <div className="row" style={{ gap: 6 }}>
        <button className="tb-icon-btn" title={t('app.save')} onClick={() => toast({ title: t('app.saved'), msg: 'הפרויקט נשמר' })}><Save /></button>
        <button className="tb-icon-btn" title={t('app.build')} onClick={() => nav('/my-mods')}><Hammer /></button>
        <button className="tb-icon-btn" title={t('app.install')} onClick={() => toast({ kind: 'info', title: 'התקנה', msg: 'דרוש חיבור ל-Mod Manager' })}><Download /></button>
      </div>

      <div className="statusbar" style={{ background: 'transparent', border: 'none', padding: 0 }}>
        <span className="sb-sep" style={{ height: 24 }} />
      </div>

      <Dropdown trigger={<button className="tb-icon-btn"><Bell /><span className="tb-badge-count">3</span></button>}>
        {() => (
          <div style={{ minWidth: 260 }}>
            {[
              ['Build הושלם בהצלחה', 'לפני 5 דקות'],
              ['התנגשות אפשרית במוד אגדות', 'לפני שעה'],
              ['עדכון זמין ל-Mod Manager', 'אתמול'],
            ].map(([txt, time], i) => (
              <div key={i} className="dropdown-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{txt}</span>
                <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{time}</span>
              </div>
            ))}
          </div>
        )}
      </Dropdown>
      <button className="tb-icon-btn" title="עזרה"><HelpCircle /></button>
      <Dropdown trigger={<div className="tb-avatar">אי</div>}>
        {() => (
          <>
            <button className="dropdown-item">הפרופיל שלי</button>
            <button className="dropdown-item" onClick={() => nav('/settings')}>הגדרות</button>
            <div className="divider" style={{ margin: '4px 0' }} />
            <button className="dropdown-item danger">התנתקות</button>
          </>
        )}
      </Dropdown>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import { HardDrive } from 'lucide-react';
import { NAV } from '../config/nav';
import { useT } from '../i18n';
import { Progress } from '../components/ui';

export function Sidebar() {
  const t = useT();
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-logo">FC</div>
        <div>
          <div className="b-name">FC 26 Studio</div>
          <div className="b-sub">Modding Platform</div>
        </div>
      </div>
      <nav className="sb-nav">
        {NAV.map((section) => (
          <div className="sb-section" key={section.title}>
            <div className="sb-section-title">{t(`nav.${section.title}`)}</div>
            {section.items.map((item) => (
              <NavLink key={item.key} to={item.path} end={item.path === '/'}
                className={({ isActive }) => `sb-link${isActive ? ' active' : ''}`}>
                <item.icon />
                <span>{t(`nav.${item.key}`)}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="sb-storage"><span><HardDrive size={12} style={{ verticalAlign: '-2px', marginLeft: 4 }} />אחסון מודים</span><span>2.6 / 8 GB</span></div>
        <Progress value={33} />
      </div>
    </aside>
  );
}

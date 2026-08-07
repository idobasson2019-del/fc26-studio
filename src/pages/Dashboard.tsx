import { useNavigate } from 'react-router-dom';
import {
  UserPlus, Trophy, Award, Shirt, Briefcase, Building2, Bot, Package, FolderGit2,
  HardDrive, Gamepad2, Activity as ActIcon, Plug, CheckCircle2, ArrowUpRight, Save, ArrowLeftRight,
} from 'lucide-react';
import { useT } from '../i18n';
import { PageHeader, StatTile } from '../components/common';
import { Badge, Button, Progress } from '../components/ui';
import { MODS, ACTIVITIES } from '../data';

const ACT_ICONS: Record<string, any> = { save: Save, 'user-plus': UserPlus, shirt: Shirt, package: Package, 'arrow-left-right': ArrowLeftRight };

const QUICK = [
  { key: 'createPlayer', icon: UserPlus, to: '/player-creator', color: 'var(--blue)' },
  { key: 'buildLeague', icon: Trophy, to: '/league-builder', color: 'var(--accent)' },
  { key: 'buildCompetition', icon: Award, to: '/competition-builder', color: 'var(--purple)' },
  { key: 'designKit', icon: Shirt, to: '/kit-designer', color: 'var(--pink)' },
  { key: 'editCareer', icon: Briefcase, to: '/career', color: 'var(--orange)' },
  { key: 'createStadium', icon: Building2, to: '/stadium-creator', color: 'var(--cyan)' },
  { key: 'aiScout', icon: Bot, to: '/ai-scout', color: 'var(--green)' },
];

const COVERS: Record<string, string> = {
  a: 'linear-gradient(135deg,#16d3a3,#0a7c63)', b: 'linear-gradient(135deg,#3d8bfd,#1a3a7a)',
  c: 'linear-gradient(135deg,#9d7bff,#4a2f8a)', d: 'linear-gradient(135deg,#ff5c8a,#8a2f4f)',
  e: 'linear-gradient(135deg,#ff9f45,#8a5220)', f: 'linear-gradient(135deg,#35d0d8,#1a6a70)',
};

export function Dashboard() {
  const t = useT();
  const nav = useNavigate();
  const inDev = MODS.filter((m) => m.status === 'בפיתוח');
  const installed = MODS.filter((m) => m.installed);

  return (
    <div className="page">
      <PageHeader title={`${t('dashboard.welcome')}, אידו 👋`} sub={t('dashboard.welcomeSub')}
        actions={<><Button variant="secondary" icon={<FolderGit2 />} onClick={() => nav('/my-mods')}>{t('dashboard.openProject')}</Button>
          <Button variant="primary" icon={<Package />} onClick={() => nav('/create-mod')}>{t('dashboard.createNew')}</Button></>} />

      {/* Stat tiles */}
      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <StatTile icon={<Package />} label={t('dashboard.installedMods')} value={installed.length} color="var(--accent)" hint="מתוך 5 מודים" />
        <StatTile icon={<FolderGit2 />} label={t('dashboard.modsInDev')} value={inDev.length} color="var(--blue)" hint="פרויקטים פעילים" />
        <StatTile icon={<Gamepad2 />} label={t('dashboard.gameVersion')} value="1.8.0" color="var(--purple)" hint="FC 26 · מעודכן" />
        <StatTile icon={<HardDrive />} label={t('dashboard.storage')} value="2.6GB" color="var(--orange)" hint="33% מתוך 8GB" />
      </div>

      {/* Quick actions */}
      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-head"><h3><Trophy />{t('dashboard.quickActions')}</h3></div>
        <div className="panel-body">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(7,1fr)', gap: 12 }}>
            {QUICK.map((q) => (
              <button key={q.key} onClick={() => nav(q.to)}
                style={{ background: 'var(--bg-panel-2)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
                  padding: '18px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'all .15s', color: 'var(--text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = q.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
                <span style={{ width: 42, height: 42, borderRadius: 11, background: `color-mix(in srgb, ${q.color} 15%, transparent)`,
                  color: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><q.icon size={21} /></span>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{t(`qa.${q.key}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        {/* Recent projects */}
        <div className="panel">
          <div className="panel-head">
            <h3><FolderGit2 />{t('dashboard.recentProjects')}</h3>
            <Button variant="ghost" size="sm" onClick={() => nav('/my-mods')}>{t('dashboard.viewAll')}</Button>
          </div>
          <div className="panel-body col">
            {MODS.slice(0, 4).map((m) => (
              <div key={m.id} onClick={() => nav('/my-mods')}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, borderRadius: 'var(--r-md)',
                  background: 'var(--bg-panel-2)', border: '1px solid var(--border-soft)', cursor: 'pointer' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: COVERS[m.cover], flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>{m.type[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{m.type} · {m.version} · {m.updated}</div>
                </div>
                {m.installed ? <Badge color="green" dot>{t('common.installed')}</Badge> : <Badge color="gray">{t('common.notInstalled')}</Badge>}
                <ArrowUpRight size={16} style={{ color: 'var(--text-dim)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="col">
          {/* System status */}
          <div className="panel">
            <div className="panel-head"><h3><Plug />{t('dashboard.systemStatus')}</h3></div>
            <div className="panel-body col" style={{ gap: 14 }}>
              <StatusLine ok label="חיבור ל-FC 26" value="פעיל · v1.8.0" />
              <StatusLine label="חיבור ל-Mod Manager" value="מנותק" />
              <StatusLine ok label="גרסת המוד האחרון" value="v2.4.1" />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 7, color: 'var(--text-soft)' }}>
                  <span>{t('dashboard.storage')}</span><span>2.6 / 8 GB</span>
                </div>
                <Progress value={33} />
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="panel">
            <div className="panel-head"><h3><ActIcon />{t('dashboard.recentActivity')}</h3></div>
            <div className="panel-body col" style={{ gap: 4 }}>
              {ACTIVITIES.map((a) => {
                const Icon = ACT_ICONS[a.icon] ?? CheckCircle2;
                return (
                  <div key={a.id} style={{ display: 'flex', gap: 12, padding: '8px 0' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `color-mix(in srgb, ${a.color} 14%, transparent)`, color: a.color }}><Icon size={15} /></span>
                    <div>
                      <div style={{ fontSize: 12.5 }}>{a.text}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{a.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 8 }} />
      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-faint)' }}>
        מצב Demo · כל הפעולות (Build, Install, Transfer, AI) פועלות כ-Mock ואינן משנות קבצי FC 26 אמיתיים.
      </p>
    </div>
  );
}

function StatusLine({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 13, color: 'var(--text-soft)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: ok ? 'var(--green)' : 'var(--text-faint)', boxShadow: ok ? '0 0 7px var(--green)' : 'none' }} />
        {label}
      </span>
      <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: ok ? 'var(--green)' : 'var(--text-dim)' }}>{value}</span>
    </div>
  );
}

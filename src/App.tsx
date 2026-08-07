import { HashRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { CreateMod } from './pages/CreateMod';
import { MyMods } from './pages/MyMods';
import { LeagueBuilder } from './pages/LeagueBuilder';
import { PlayerCreator } from './pages/PlayerCreator';
import { PlayerEditor } from './pages/PlayerEditor';
import { KitDesigner } from './pages/KitDesigner';
import { Placeholder } from './pages/Placeholder';

// Routes not yet fully built render a themed placeholder (infrastructure ready).
const STUBS: [string, string][] = [
  ['/competition-builder', 'competitionBuilder'],
  ['/team-editor', 'teamEditor'],
  ['/stadium-creator', 'stadiumCreator'],
  ['/stadium-assign', 'stadiumAssign'],
  ['/audio', 'audioFans'],
  ['/legends', 'legends'],
  ['/youth-academy', 'youthAcademy'],
  ['/face-creator', 'faceCreator'],
  ['/ai-scout', 'aiScout'],
  ['/career', 'career'],
  ['/transfers', 'transfers'],
  ['/manager-market', 'managerMarket'],
  ['/manager-creator', 'managerCreator'],
  ['/club-management', 'clubManagement'],
  ['/database', 'databaseEditor'],
  ['/trophy-creator', 'trophyCreator'],
  ['/boot-editor', 'bootEditor'],
  ['/broadcast', 'broadcastEditor'],
  ['/weather', 'weather'],
  ['/match-rules', 'matchRules'],
  ['/marketplace', 'marketplace'],
  ['/installed-mods', 'installedMods'],
  ['/mod-manager', 'modManager'],
  ['/settings', 'settings'],
];

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-mod" element={<CreateMod />} />
          <Route path="/my-mods" element={<MyMods />} />
          <Route path="/league-builder" element={<LeagueBuilder />} />
          <Route path="/player-creator" element={<PlayerCreator />} />
          <Route path="/player-editor" element={<PlayerEditor />} />
          <Route path="/kit-designer" element={<KitDesigner />} />
          {STUBS.map(([path, key]) => (
            <Route key={path} path={path} element={<Placeholder titleKey={key} />} />
          ))}
          <Route path="*" element={<Placeholder titleKey="dashboard" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { StatusBar } from './StatusBar';

export function MainLayout() {
  return (
    <div className="shell">
      <TopBar />
      <Sidebar />
      <main className="content"><Outlet /></main>
      <StatusBar />
    </div>
  );
}

import { CheckCircle2, CircleSlash, GitBranch, Cpu, Package } from 'lucide-react';

export function StatusBar() {
  return (
    <footer className="statusbar">
      <span className="sb-item"><CheckCircle2 className="ok" /> FC 26 מחובר · v1.8.0</span>
      <span className="sb-sep" />
      <span className="sb-item"><CircleSlash style={{ color: 'var(--text-faint)' }} /> Mod Manager מנותק</span>
      <span className="sb-sep" />
      <span className="sb-item"><GitBranch /> עונת 2026/27 · v2.4.1</span>
      <span className="push" />
      <span className="sb-item"><Package /> 5 מודים · 3 מותקנים</span>
      <span className="sb-sep" />
      <span className="sb-item"><Cpu /> מצב Demo · Frontend בלבד</span>
    </footer>
  );
}

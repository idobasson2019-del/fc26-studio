import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

type ToastKind = 'success' | 'error' | 'info' | 'warn';
interface ToastItem { id: number; kind: ToastKind; title: string; msg?: string; }

const icons = { success: <CheckCircle2 />, error: <XCircle />, info: <Info />, warn: <AlertTriangle /> };

const Ctx = createContext<(t: { kind?: ToastKind; title: string; msg?: string }) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((t: { kind?: ToastKind; title: string; msg?: string }) => {
    const id = Date.now() + Math.floor(performance.now());
    setItems((s) => [...s, { id, kind: t.kind ?? 'success', title: t.title, msg: t.msg }]);
    setTimeout(() => setItems((s) => s.filter((x) => x.id !== id)), 3600);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {items.map((t) => (
          <div key={t.id} className={`toast ${t.kind}`}>
            <div className="t-icon">{icons[t.kind]}</div>
            <div><div className="t-title">{t.title}</div>{t.msg && <div className="t-msg">{t.msg}</div>}</div>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { he } from './he';
import { en } from './en';

export type Lang = 'he' | 'en';
const DICTS = { he, en } as Record<Lang, any>;
export const DIRS: Record<Lang, 'rtl' | 'ltr'> = { he: 'rtl', en: 'ltr' };

interface I18nCtx {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (l: Lang) => void;
  t: (path: string) => string;
}

const Ctx = createContext<I18nCtx>(null!);

function resolve(dict: any, path: string): string | undefined {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('he');

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = DIRS[l];
  }, []);

  const t = useCallback(
    (path: string) => resolve(DICTS[lang], path) ?? resolve(he, path) ?? path,
    [lang],
  );

  return <Ctx.Provider value={{ lang, dir: DIRS[lang], setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
export const useT = () => useContext(Ctx).t;

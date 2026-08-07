import { useRef, useState } from 'react';
import { Shirt, Save, RotateCw, Sun, Moon, Upload, X, Image as ImageIcon, Type, Palette, Sparkles } from 'lucide-react';
import { useT } from '../i18n';
import { PageHeader } from '../components/common';
import { Button, Tabs, Select, Input, Badge } from '../components/ui';
import { useToast } from '../components/ui/toast';

const KIT_TABS = [
  { key: 'home', label: 'בית' }, { key: 'away', label: 'חוץ' }, { key: 'third', label: 'שלישית' },
  { key: 'gk1', label: 'שוער 1' }, { key: 'gk2', label: 'שוער 2' },
];
const PATTERNS = ['ללא', 'פסים אנכיים', 'פסים אופקיים', 'פסים אלכסוניים', 'שברון', 'חצי-חצי', 'gradient'];
const COLLARS = ['V', 'עגול', 'פולו', 'קלאסי'];

type SponsorMode = 'text' | 'image';
type KitSource = 'design' | 'image';
type KitCfg = { primary: string; secondary: string; third: string; pattern: string; collar: string; sponsor: string; maker: string; numFont: string; sponsorMode: SponsorMode; sponsorLogo: string | null; source: KitSource; kitImage: string | null; };
const DEFAULT: KitCfg = { primary: '#1e63d6', secondary: '#ffffff', third: '#0a2240', pattern: 'פסים אנכיים', collar: 'V', sponsor: 'RIVERTECH', maker: 'PULSE', numFont: 'Modern', sponsorMode: 'text', sponsorLogo: null, source: 'design', kitImage: null };

export function KitDesigner() {
  const t = useT();
  const toast = useToast();
  const [tab, setTab] = useState('home');
  const [kits, setKits] = useState<Record<string, KitCfg>>(() => Object.fromEntries(KIT_TABS.map((k) => [k.key, { ...DEFAULT }])));
  const [view, setView] = useState<'front' | 'back'>('front');
  const [night, setNight] = useState(false);
  const [rot, setRot] = useState(0);

  const kit = kits[tab];
  const set = <K extends keyof KitCfg>(k: K, v: KitCfg[K]) => setKits((s) => ({ ...s, [tab]: { ...s[tab], [k]: v } }));

  return (
    <div className="page">
      <PageHeader title={t('nav.kitDesigner')} sub="עצב מדים לכל ערכה — בית, חוץ, שלישית ושוערים, עם תצוגה תלת-ממדית" breadcrumb={['בנייה ועיצוב', 'מעצב מדים']}
        actions={<Button variant="primary" icon={<Save size={15} />} onClick={() => toast({ title: 'המדים נשמרו', msg: `ערכת ${KIT_TABS.find((k) => k.key === tab)?.label}` })}>{t('app.save')}</Button>} />

      <Tabs active={tab} onChange={setTab} tabs={KIT_TABS.map((k) => ({ ...k, icon: <Shirt size={14} /> }))} />

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16, alignItems: 'start' }}>
        {/* Controls */}
        <div className="panel">
          <div className="panel-head"><h3><Shirt />עיצוב הערכה</h3><Badge color="accent">{KIT_TABS.find((k) => k.key === tab)?.label}</Badge></div>
          <div className="panel-body col" style={{ gap: 18 }}>
            {/* Source: designed mockup vs. uploaded AI/real kit image */}
            <Tabs stretch active={kit.source} onChange={(v) => set('source', v as KitSource)}
              tabs={[{ key: 'design', label: 'עיצוב מצויר', icon: <Palette size={14} /> }, { key: 'image', label: 'תמונת מדים (AI)', icon: <ImageIcon size={14} /> }]} />

            {kit.source === 'image' ? (
              <>
                <div className="card card-pad" style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Sparkles size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 12.5, color: 'var(--text-soft)', lineHeight: 1.6 }}>
                    העלה תמונת מדים שיצרת (למשל ב-ChatGPT / DALL·E) — עדיף תמונה אחת שמראה את המדים <b style={{ color: 'var(--text)' }}>מכל הכיוונים</b> (חזית, גב, צד). התמונה תוצג כמדים בתצוגה המקדימה.
                  </span>
                </div>
                <KitImageUpload image={kit.kitImage} onChange={(v) => set('kitImage', v)} />
                <div className="grid g-2">
                  <Input label="שם החסות (אופציונלי)" value={kit.sponsor} onChange={(e) => set('sponsor', e.target.value)} />
                  <Input label="Manufacturer" value={kit.maker} onChange={(e) => set('maker', e.target.value)} />
                </div>
              </>
            ) : (
            <>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', marginBottom: 10 }}>צבעים</div>
              <div className="grid g-3">
                <ColorField label="צבע ראשי" value={kit.primary} onChange={(v) => set('primary', v)} />
                <ColorField label="צבע משני" value={kit.secondary} onChange={(v) => set('secondary', v)} />
                <ColorField label="צבע שלישי" value={kit.third} onChange={(v) => set('third', v)} />
              </div>
            </div>
            <div className="grid g-2">
              <Select label="Pattern" value={kit.pattern} onChange={(e) => set('pattern', e.target.value)} options={PATTERNS.map((p) => ({ value: p, label: p }))} />
              <Select label="Collar" value={kit.collar} onChange={(e) => set('collar', e.target.value)} options={COLLARS.map((c) => ({ value: c, label: c }))} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)' }}>חסות (Sponsor)</div>
                <Tabs active={kit.sponsorMode} onChange={(m) => set('sponsorMode', m as SponsorMode)}
                  tabs={[{ key: 'text', label: 'טקסט', icon: <Type size={13} /> }, { key: 'image', label: 'לוגו אמיתי', icon: <ImageIcon size={13} /> }]} />
              </div>
              {kit.sponsorMode === 'text'
                ? <Input label="שם החסות" value={kit.sponsor} onChange={(e) => set('sponsor', e.target.value)} placeholder="RIVERTECH" />
                : <SponsorUpload logo={kit.sponsorLogo} onChange={(v) => set('sponsorLogo', v)} />}
            </div>
            <Input label="Manufacturer" value={kit.maker} onChange={(e) => set('maker', e.target.value)} />
            <div className="grid g-2">
              <Select label="Number Font" value={kit.numFont} onChange={(e) => set('numFont', e.target.value)} options={[{ value: 'Modern', label: 'Modern' }, { value: 'Classic', label: 'Classic' }, { value: 'Bold', label: 'Bold' }]} />
              <Select label="Name Font" options={[{ value: 'a', label: 'Standard' }, { value: 'b', label: 'Condensed' }]} />
            </div>
            <div className="divider" />
            <div className="grid g-3">
              {['חולצה', 'מכנסיים', 'גרביים'].map((el) => (
                <div key={el} className="card card-pad" style={{ padding: 12, textAlign: 'center', fontSize: 12, color: 'var(--text-soft)' }}>{el}<div style={{ height: 20, borderRadius: 6, marginTop: 6, background: kit.primary }} /></div>
              ))}
            </div>
            </>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="panel" style={{ position: 'sticky', top: 0 }}>
          <div className="panel-head">
            <h3><RotateCw />תצוגה מקדימה 360°</h3>
            <div className="row" style={{ gap: 6 }}>
              <button className="tb-icon-btn" style={{ width: 32, height: 32 }} onClick={() => setNight((n) => !n)}>{night ? <Moon size={16} /> : <Sun size={16} />}</button>
            </div>
          </div>
          <div className="panel-body">
            <div style={{ borderRadius: 'var(--r-lg)', padding: 30, minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: night ? 'radial-gradient(circle at 50% 30%, #1a2438, #060810)' : 'radial-gradient(circle at 50% 30%, #2a3550, #12161f)', position: 'relative', overflow: 'hidden' }}>
              {kit.source === 'image'
                ? (kit.kitImage
                    ? <img src={kit.kitImage} alt="תמונת מדים" style={{ maxWidth: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 'var(--r-md)', filter: night ? 'brightness(0.7)' : 'none' }} />
                    : <div className="state" style={{ color: 'var(--text-dim)' }}><div className="state-icon"><ImageIcon /></div><p>העלה תמונת מדים כדי לראות אותה כאן</p></div>)
                : <KitSVG kit={kit} view={view} rot={rot} />}
            </div>
            {kit.source === 'design' ? (
              <>
                <div className="row" style={{ justifyContent: 'center', gap: 10, marginTop: 14 }}>
                  <Tabs active={view} onChange={(v) => setView(v as any)} tabs={[{ key: 'front', label: 'חזית' }, { key: 'back', label: 'גב' }]} />
                  <Button variant="secondary" size="sm" icon={<RotateCw size={14} />} onClick={() => setRot((r) => r + 15)}>סובב</Button>
                </div>
                <div className="row" style={{ justifyContent: 'center', marginTop: 8, fontSize: 11, color: 'var(--text-dim)' }}>
                  זווית: {rot % 360}° · {night ? 'לילה' : 'יום'}
                </div>
              </>
            ) : (
              <div className="row" style={{ justifyContent: 'center', marginTop: 12, fontSize: 11, color: 'var(--text-dim)' }}>
                תמונת מדים שהועלתה · {night ? 'לילה' : 'יום'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsorUpload({ logo, onChange }: { logo: string | null; onChange: (v: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const handle = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="field"><label>לוגו החסות (PNG/SVG/JPG)</label>
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handle(e.target.files?.[0])} />
      {logo ? (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--r-sm)', border: '1px solid var(--border-strong)', flexShrink: 0,
            background: 'repeating-conic-gradient(#2a2f3a 0% 25%, #1c212b 0% 50%) 0 / 14px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={logo} alt="לוגו חסות" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div className="col" style={{ gap: 6, flex: 1 }}>
            <Button variant="secondary" size="sm" icon={<Upload size={14} />} onClick={() => ref.current?.click()}>החלף לוגו</Button>
            <Button variant="danger" size="sm" icon={<X size={14} />} onClick={() => onChange(null)}>הסר</Button>
          </div>
        </div>
      ) : (
        <div onClick={() => ref.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handle(e.dataTransfer.files?.[0]); }}
          style={{ height: 84, borderRadius: 'var(--r-sm)', border: '1.5px dashed var(--border-strong)', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', background: 'var(--bg-base)' }}>
          <Upload size={18} /> גרור לכאן לוגו או לחץ להעלאה
        </div>
      )}
    </div>
  );
}

function KitImageUpload({ image, onChange }: { image: string | null; onChange: (v: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const handle = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="field"><label>תמונת המדים (PNG/JPG/WebP)</label>
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handle(e.target.files?.[0])} />
      {image ? (
        <div className="col" style={{ gap: 10 }}>
          <div style={{ borderRadius: 'var(--r-md)', border: '1px solid var(--border-strong)', overflow: 'hidden',
            background: 'repeating-conic-gradient(#2a2f3a 0% 25%, #1c212b 0% 50%) 0 / 18px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
            <img src={image} alt="תצוגת מדים" style={{ maxWidth: '100%', maxHeight: 220, objectFit: 'contain' }} />
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Button variant="secondary" size="sm" icon={<Upload size={14} />} onClick={() => ref.current?.click()}>החלף תמונה</Button>
            <Button variant="danger" size="sm" icon={<X size={14} />} onClick={() => onChange(null)}>הסר</Button>
          </div>
        </div>
      ) : (
        <div onClick={() => ref.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handle(e.dataTransfer.files?.[0]); }}
          style={{ minHeight: 180, borderRadius: 'var(--r-md)', border: '1.5px dashed var(--border-strong)', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-dim)', fontSize: 13, cursor: 'pointer', background: 'var(--bg-base)', padding: 20, textAlign: 'center' }}>
          <Upload size={26} />
          <div style={{ fontWeight: 700, color: 'var(--text-soft)' }}>גרור לכאן תמונת מדים או לחץ להעלאה</div>
          <div style={{ fontSize: 11 }}>תמונה אחת מכל הכיוונים (חזית / גב / צד) — עד ~10MB</div>
        </div>
      )}
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="field"><label>{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ width: 38, height: 38, borderRadius: 8, background: value, border: '1px solid var(--border-strong)', cursor: 'pointer', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
        </label>
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} style={{ fontFamily: 'var(--mono)', fontSize: 12 }} />
      </div>
    </div>
  );
}

/* ---- color helpers for realistic fabric shading ---- */
function shade(hex: string, pct: number): string {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  let r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (pct < 0 ? c : 255 - c) * pct)));
  return `#${[f(r), f(g), f(b)].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}
function readable(hex: string): string {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#111820' : '#ffffff';
}

// Jersey silhouette — short/boxy football-shirt proportions (collar, shoulders, tapered short sleeves, cuffs, torso, hem)
const SHIRT_PATH = 'M116 54 Q96 58 70 78 Q56 88 50 110 Q48 118 56 122 L78 136 Q86 139 90 130 L98 112 L90 230 Q140 242 190 230 L182 112 L190 130 Q194 139 202 136 L224 122 Q232 118 230 110 Q224 88 210 78 Q184 58 164 54 Q140 68 116 54 Z';
// chest panel between the raglan seams — lets stripes run from collar to hem
const BODY_PATH = 'M116 54 Q140 68 164 54 Q194 78 182 112 L190 230 Q140 242 90 230 L98 112 Q86 78 116 54 Z';
const LSLEEVE_PATH = 'M116 54 Q96 58 70 78 Q56 88 50 110 Q48 118 56 122 L78 136 Q86 139 90 130 L98 112 Q86 78 116 54 Z';
const RSLEEVE_PATH = 'M164 54 Q184 58 210 78 Q224 88 230 110 Q232 118 224 122 L202 136 Q194 139 190 130 L182 112 Q194 78 164 54 Z';

function KitSVG({ kit, view, rot }: { kit: KitCfg; view: 'front' | 'back'; rot: number }) {
  const { primary: p, secondary: s, collar } = kit;
  const stripes = kit.pattern === 'פסים אנכיים';
  const horiz = kit.pattern === 'פסים אופקיים';
  const diag = kit.pattern === 'פסים אלכסוניים';
  const half = kit.pattern === 'חצי-חצי';
  const chevron = kit.pattern === 'שברון';
  const grad = kit.pattern === 'gradient';
  const hasLogo = kit.sponsorMode === 'image' && !!kit.sponsorLogo;
  const ink = readable(p);
  const numFill = readable(p);

  return (
    <svg width="230" height="300" viewBox="0 0 280 320"
      style={{ transform: `perspective(900px) rotateY(${((rot % 30) - 5)}deg)`, transition: 'transform .3s var(--ease)', filter: 'drop-shadow(0 26px 34px rgba(0,0,0,.55))' }}>
      <defs>
        <linearGradient id="fabric" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(p, 0.16)} />
          <stop offset="0.42" stopColor={p} />
          <stop offset="1" stopColor={shade(p, -0.2)} />
        </linearGradient>
        <linearGradient id="sleeveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(p, 0.06)} />
          <stop offset="1" stopColor={shade(p, -0.28)} />
        </linearGradient>
        <radialGradient id="chestLight" cx="0.5" cy="0.32" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sideShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.16" stopColor="#000" stopOpacity="0" />
          <stop offset="0.84" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p} /><stop offset="1" stopColor={s} />
        </linearGradient>
        <clipPath id="bodyClip"><path d={BODY_PATH} /></clipPath>
      </defs>

      {/* base shirt */}
      <path d={SHIRT_PATH} fill="url(#fabric)" />
      {/* sleeves shaded slightly differently for depth */}
      <path d={LSLEEVE_PATH} fill="url(#sleeveGrad)" />
      <path d={RSLEEVE_PATH} fill="url(#sleeveGrad)" />

      {/* patterns clipped to torso */}
      <g clipPath="url(#bodyClip)">
        {grad && <rect x="86" y="56" width="110" height="176" fill="url(#pgrad)" opacity="0.9" />}
        {stripes && [98, 112, 126, 140, 154, 168, 182].map((x) => <rect key={x} x={x} y="56" width="7" height="176" fill={s} opacity="0.9" />)}
        {horiz && [64, 86, 108, 130, 152, 174, 196, 218].map((y) => <rect key={y} x="86" y={y} width="110" height="10" fill={s} opacity="0.9" />)}
        {diag && [-40, -12, 16, 44, 72, 100, 128, 156].map((x) => <rect key={x} x={x} y="56" width="11" height="240" fill={s} opacity="0.85" transform="skewX(-22)" />)}
        {half && <rect x="140" y="56" width="60" height="176" fill={s} opacity="0.92" />}
        {chevron && [0, 1, 2].map((i) => <path key={i} d={`M86 ${120 + i * 34} L140 ${146 + i * 34} L194 ${120 + i * 34} L194 ${132 + i * 34} L140 ${158 + i * 34} L86 ${132 + i * 34} Z`} fill={s} opacity="0.85" />)}
        <rect x="86" y="56" width="110" height="176" fill="url(#sideShade)" />
      </g>

      {/* chest highlight + fabric folds */}
      <path d={SHIRT_PATH} fill="url(#chestLight)" />
      <path d="M118 118 Q114 180 120 228" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="3" />
      <path d="M162 118 Q166 180 156 228" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="3" />
      <path d="M98 112 Q140 124 182 112" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="2" />

      {/* cuffs (secondary trim) */}
      <path d="M56 122 L78 136 Q86 139 90 130 L93 121 Q86 126 78 124 Q66 120 60 112 Z" fill={s} opacity="0.92" />
      <path d="M224 122 L202 136 Q194 139 190 130 L187 121 Q194 126 202 124 Q214 120 220 112 Z" fill={s} opacity="0.92" />

      {/* collar */}
      {collar === 'V' && (
        <g><path d="M116 54 Q140 64 164 54" fill="none" stroke={s} strokeWidth="5" strokeLinecap="round" />
          <path d="M126 56 L140 76 L154 56" fill="none" stroke={s} strokeWidth="5" strokeLinejoin="round" /></g>
      )}
      {collar === 'עגול' && (
        <g><path d="M116 54 Q140 74 164 54" fill="none" stroke={s} strokeWidth="6" strokeLinecap="round" />
          <path d="M120 56 Q140 72 160 56" fill="none" stroke={shade(p, -0.15)} strokeWidth="2" /></g>
      )}
      {collar === 'פולו' && (
        <g><path d="M118 52 L108 62 L126 60 L140 68 L154 60 L172 62 L162 52 Z" fill={s} />
          <path d="M132 58 L140 74 L148 58" fill={p} stroke={s} strokeWidth="1.5" /></g>
      )}
      {collar === 'קלאסי' && <path d="M114 54 Q140 68 166 54 L162 62 Q140 74 118 62 Z" fill={s} opacity="0.92" />}

      {/* outline */}
      <path d={SHIRT_PATH} fill="none" stroke={shade(p, -0.35)} strokeWidth="1.4" strokeOpacity="0.5" />

      {view === 'back' ? (
        <>
          {/* player name */}
          <text x="140" y="150" textAnchor="middle" fontSize="15" fontWeight="800" fill={numFill} fontFamily="Heebo" letterSpacing="2.5">SILVA</text>
          <text x="140" y="216" textAnchor="middle" fontSize="72" fontWeight="900" fill={numFill}
            fontFamily={kit.numFont === 'Classic' ? 'Georgia, serif' : 'JetBrains Mono, monospace'}
            style={{ paintOrder: 'stroke', stroke: shade(numFill === '#ffffff' ? p : s, -0.25), strokeWidth: 2.5 }}>10</text>
        </>
      ) : (
        <>
          {/* manufacturer + club badge */}
          <text x="172" y="132" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={ink} fontFamily="Heebo" opacity="0.9">{kit.maker}</text>
          <g transform="translate(104 132)">
            <path d="M0 -8 L8 -4 L8 4 Q8 11 0 13 Q-8 11 -8 4 L-8 -4 Z" fill={s} opacity="0.9" />
            <path d="M0 -5 L4.5 -2.5 L4.5 3.5 Q4.5 7 0 8.5 Q-4.5 7 -4.5 3.5 L-4.5 -2.5 Z" fill={p} />
          </g>
          {/* sponsor */}
          {hasLogo
            ? <image href={kit.sponsorLogo!} x="98" y="168" width="84" height="42" preserveAspectRatio="xMidYMid meet" />
            : <text x="140" y="196" textAnchor="middle" fontSize="18" fontWeight="900" fill={ink} fontFamily="Heebo" letterSpacing="0.5">{kit.sponsor}</text>}
        </>
      )}
    </svg>
  );
}

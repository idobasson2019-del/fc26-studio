import { Construction, Sparkles } from 'lucide-react';
import { useT } from '../i18n';
import { PageHeader } from '../components/common';
import { Badge } from '../components/ui';

export function Placeholder({ titleKey }: { titleKey: string }) {
  const t = useT();
  return (
    <div className="page">
      <PageHeader title={t(`nav.${titleKey}`)} actions={<Badge color="orange" dot>בבנייה</Badge>} />
      <div className="panel">
        <div className="state">
          <div className="state-icon" style={{ color: 'var(--accent)' }}><Construction /></div>
          <h4>{t('wip.title')}</h4>
          <p>{t('wip.sub')}</p>
          <div className="row" style={{ marginTop: 8, color: 'var(--text-dim)', fontSize: 12 }}>
            <Sparkles size={14} /> המודול <b style={{ color: 'var(--text)' }}>{t(`nav.${titleKey}`)}</b> חלק מהתשתית המלאה
          </div>
        </div>
      </div>
    </div>
  );
}

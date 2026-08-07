import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/theme.css';
import './components/ui/ui.css';
import './layouts/layout.css';
import { I18nProvider } from './i18n';
import { ToastProvider } from './components/ui/toast';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </I18nProvider>
  </StrictMode>,
);

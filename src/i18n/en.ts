import type { Dict } from './he';

// Partial English locale — infrastructure ready for full translation later.
// Falls back to Hebrew for any missing key.
export const en: Partial<Dict> = {
  app: {
    name: 'FC 26 Modding Studio',
    save: 'Save', build: 'Build', install: 'Install',
    search: 'Search...', searchGlobal: 'Search everything...',
    cancel: 'Cancel', confirm: 'Confirm', create: 'Create', edit: 'Edit',
    delete: 'Delete', duplicate: 'Duplicate', close: 'Close', back: 'Back',
    next: 'Next', prev: 'Previous', apply: 'Apply', reset: 'Reset',
    preview: 'Preview', export: 'Export', open: 'Open', all: 'All', none: 'None',
    yes: 'Yes', no: 'No', loading: 'Loading...', saved: 'Saved successfully', version: 'Version',
  },
};

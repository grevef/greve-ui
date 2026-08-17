import type { Position } from './types';

export type Locale = 'en' | 'no';

const dictionaries: Record<Locale, Record<string, string>> = {
  en: {
    title: 'Title',
    content: 'Content',
    position: 'Position',
    open: 'Open',
    openNoContent: 'Open (no content)',
    close: 'Close',
  },
  no: {
    title: 'Tittel',
    content: 'Innhold',
    position: 'Posisjon',
    open: 'Åpne',
    openNoContent: 'Åpne (uten innhold)',
    close: 'Lukk',
  },
};

const positionLabels: Record<Locale, Record<Position, string>> = {
  en: {
    center: 'Center',
    bottom: 'Bottom',
    'left-center': 'Left center',
    'right-center': 'Right center',
    'top-left': 'Top left',
    'top-center': 'Top center',
    'top-right': 'Top right',
    'bottom-left': 'Bottom left',
    'bottom-center': 'Bottom center',
    'bottom-right': 'Bottom right',
  },
  no: {
    center: 'Midtstilt',
    bottom: 'Bunn',
    'left-center': 'Venstre, midtstilt',
    'right-center': 'Høyre, midtstilt',
    'top-left': 'Topp venstre',
    'top-center': 'Topp midtstilt',
    'top-right': 'Topp høyre',
    'bottom-left': 'Bunn venstre',
    'bottom-center': 'Bunn midtstilt',
    'bottom-right': 'Bunn høyre',
  },
};

// This UI ships on a Norwegian roleplay server, so default to Norwegian
// regardless of the dev machine's browser/OS language.
export const DEFAULT_LOCALE: Locale = 'no';

export const translate = (locale: Locale, key: keyof (typeof dictionaries)['en']): string => dictionaries[locale][key];

export const translatePosition = (locale: Locale, position: Position): string => positionLabels[locale][position];

import { useEffect, useState } from 'react';
import { sendMockMessage } from '../utils/debug';
import { DEFAULT_LOCALE, translate, translatePosition, type Locale } from '../i18n';
import type { Position } from '../types';

const SAMPLE: Record<Locale, { title: string; content: string }> = {
  en: { title: 'Waiting for orders...', content: 'Chicken Burger 1x and Sousage 3x' },
  no: { title: 'Venter på ordre...', content: 'Kyllingburger 1x og Pølse 3x' },
};

const POSITIONS: Position[] = [
  'center',
  'bottom',
  'left-center',
  'right-center',
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

function DevTools() {
  const [title, setTitle] = useState(SAMPLE[DEFAULT_LOCALE].title);
  const [content, setContent] = useState(SAMPLE[DEFAULT_LOCALE].content);
  const [position, setPosition] = useState<Position>('left-center');
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key);

  const switchLocale = (next: Locale) => {
    setLocale(next);
    // Only swap the sample text if the fields still hold a known sample,
    // so edits the user typed in are never clobbered by a locale toggle.
    if (title === SAMPLE[locale].title) setTitle(SAMPLE[next].title);
    if (content === SAMPLE[locale].content) setContent(SAMPLE[next].content);
  };

  // Auto-open with sample data on load so `npm run dev` shows the in-game
  // look immediately, without needing to click anything first.
  useEffect(() => {
    sendMockMessage({ action: 'open', title, content, position });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dev-tools">
      <div className="dev-tools__row dev-tools__buttons">
        <button onClick={() => switchLocale('en')} disabled={locale === 'en'}>
          EN
        </button>
        <button onClick={() => switchLocale('no')} disabled={locale === 'no'}>
          NO
        </button>
      </div>
      <div className="dev-tools__row">
        <label>
          {t('title')}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>
      <div className="dev-tools__row">
        <label>
          {t('content')}
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
      </div>
      <div className="dev-tools__row">
        <label>
          {t('position')}
          <select value={position} onChange={(e) => setPosition(e.target.value as Position)}>
            {POSITIONS.map((pos) => (
              <option key={pos} value={pos}>
                {translatePosition(locale, pos)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="dev-tools__row dev-tools__buttons">
        <button onClick={() => sendMockMessage({ action: 'open', title, content, position })}>{t('open')}</button>
        <button onClick={() => sendMockMessage({ action: 'open', title, position })}>{t('openNoContent')}</button>
        <button onClick={() => sendMockMessage({ action: 'close' })}>{t('close')}</button>
      </div>
    </div>
  );
}

export default DevTools;

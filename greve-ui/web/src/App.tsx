import { useEffect, useRef, useState } from 'react';
import type { NuiMessage, Position } from './types';
import { isEnvBrowser } from './utils/debug';
import DevTools from './components/DevTools';
import './App.css';

const CLOSE_ANIMATION_MS = 1000;
const DEFAULT_POSITION: Position = 'left-center';

function App() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>(undefined);
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const closeTimeout = useRef<number>();

  useEffect(() => {
    if (isEnvBrowser()) {
      document.body.classList.add('dev-preview');
    }
  }, []);

  useEffect(() => {
    const listener = (event: MessageEvent<NuiMessage>) => {
      const data = event.data;

      if (data.action === 'open') {
        window.clearTimeout(closeTimeout.current);
        setTitle(data.title);
        setContent(data.content);
        setPosition(data.position ?? DEFAULT_POSITION);
        setVisible(true);
        // Mount at the closed position first, then flip to open on the
        // next frame so the transition actually animates.
        requestAnimationFrame(() => setOpen(true));
      } else if (data.action === 'close') {
        setOpen(false);
        closeTimeout.current = window.setTimeout(() => {
          setVisible(false);
          setTitle('');
          setContent(undefined);
        }, CLOSE_ANIMATION_MS);
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <>
      {visible && (
        <div className={`overlay overlay--${position}`}>
          <div id="main" className={`container ${open ? 'container--open' : ''}`}>
            <div className="title" id="content1">
              {title}
            </div>
            <div className="separator" />
            <div className="separator2" />
            {content !== undefined && (
              <div className="content" id="content2">
                {content}
              </div>
            )}
          </div>
        </div>
      )}
      {isEnvBrowser() && <DevTools />}
    </>
  );
}

export default App;

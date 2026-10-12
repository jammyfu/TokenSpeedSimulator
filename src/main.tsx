import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function dismissBootLoading() {
  const boot = document.getElementById('boot-loading');
  if (!boot) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const remove = () => boot.remove();
  if (reduce || typeof boot.animate !== 'function') {
    remove();
    return;
  }
  const animation = boot.animate([{opacity: 1}, {opacity: 0}], {duration: 180, easing: 'ease'});
  animation.finished.then(remove).catch(remove);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

requestAnimationFrame(() => requestAnimationFrame(dismissBootLoading));

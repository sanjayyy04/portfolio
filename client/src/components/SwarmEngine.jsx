import { useEffect } from 'react';

/** Start the shared cursor engine only after critical first-view assets are ready. */
export default function SwarmEngine() {
  useEffect(() => {
    let cancelled = false;
    let cleanup;
    let hideFallback;

    const waitForCriticalAssets = async () => {
      const fontReady = document.fonts?.ready ?? Promise.resolve();
      const firstViewImages = [...document.images].filter((image) => {
        if (!image.currentSrc && !image.src) return false;
        const rect = image.getBoundingClientRect();
        return image.loading !== 'lazy' || (rect.bottom > 0 && rect.top < window.innerHeight);
      });
      const imageReady = Promise.all(firstViewImages.map(async (image) => {
        if (image.complete && image.naturalWidth > 0) return;
        if (typeof image.decode === 'function') {
          try { await image.decode(); return; } catch { /* broken/unsupported images must not block the page */ }
        }
        await new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      }));
      // Keep the loader useful on slow connections, but never trap a visitor on it.
      await Promise.race([
        Promise.all([fontReady, imageReady]),
        new Promise((resolve) => { hideFallback = window.setTimeout(resolve, 10000); }),
      ]);
    };

    const start = async () => {
      await waitForCriticalAssets();
      if (cancelled) return;
      // Keep the animation engine out of the initial module graph. Load it only
      // after critical assets are ready, then start it asynchronously.
      const engine = await import('./swarmEngine.js');
      if (cancelled) return;
      cleanup = engine.initSwarmEngine();
      // Give the engine a frame to create its canvas before revealing the first cursor pass.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (cancelled) return;
        const loader = document.getElementById('portfolio-loader');
        if (loader) {
          loader.classList.add('is-hidden');
          window.setTimeout(() => loader.remove(), 450);
        }
        document.documentElement.classList.add('app-ready');
      }));
    };

    start();
    return () => {
      cancelled = true;
      if (hideFallback) window.clearTimeout(hideFallback);
      if (cleanup) cleanup();
    };
  }, []);
  return null;
}

import { useEffect, useRef, useState } from 'react';
import './scrollProgress.css';

export default function ScrollProgress() {
  const [metrics, setMetrics] = useState({ top: 0, height: 100, progress: 0, visible: false });
  const trackRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const update = () => {
      const scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const trackHeight = Math.max(1, window.innerHeight - 24);
      const thumbHeight = scrollable <= 0 ? trackHeight : Math.max(42, trackHeight * window.innerHeight / document.documentElement.scrollHeight);
      const maxTravel = Math.max(0, trackHeight - thumbHeight);
      const progress = scrollable ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setMetrics({ top: maxTravel * progress, height: thumbHeight, progress, visible: scrollable > 8 });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); observer.disconnect(); };
  }, []);

  const scrollToPointer = (clientY) => {
    const track = trackRef.current;
    if (!track) return;
    const bounds = track.getBoundingClientRect();
    const trackHeight = bounds.height;
    const thumbHeight = metrics.height;
    const maxTravel = Math.max(1, trackHeight - thumbHeight);
    const thumbTop = Math.min(maxTravel, Math.max(0, clientY - bounds.top - thumbHeight / 2));
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: (thumbTop / maxTravel) * maxScroll, behavior: dragging.current ? 'auto' : 'smooth' });
  };
  const onPointerDown = (event) => { dragging.current = true; event.currentTarget.setPointerCapture?.(event.pointerId); scrollToPointer(event.clientY); };
  const onPointerMove = (event) => { if (dragging.current) scrollToPointer(event.clientY); };
  const onPointerUp = () => { dragging.current = false; };
  const onKeyDown = (event) => {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const current = window.scrollY;
    let next = current;
    if (event.key === 'ArrowDown' || event.key === 'PageDown') next += window.innerHeight * .8;
    else if (event.key === 'ArrowUp' || event.key === 'PageUp') next -= window.innerHeight * .8;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = max;
    else return;
    event.preventDefault(); window.scrollTo({ top: Math.max(0, Math.min(max, next)), behavior: 'smooth' });
  };

  return <div className={`scroll-progress ${metrics.visible ? 'is-visible' : ''}`} aria-hidden={!metrics.visible}>
    <div className="scroll-progress-track" ref={trackRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerLeave={onPointerUp} onKeyDown={onKeyDown} role="scrollbar" tabIndex={metrics.visible ? 0 : -1} aria-label="Page scroll position" aria-orientation="vertical" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(metrics.progress * 100)}>
      <span className="scroll-progress-rail" />
      <span className="scroll-progress-thumb" style={{ top: metrics.top, height: metrics.height }} />
    </div>
    <span className="scroll-progress-readout">{String(Math.round(metrics.progress * 100)).padStart(2, '0')}<small>%</small></span>
  </div>;
}

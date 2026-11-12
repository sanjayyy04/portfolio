import { useEffect, useRef } from 'react';
import './journey.css';

const milestones = [
  {
    period: '2020 — 2026',
    index: '01',
    title: 'College & foundations',
    type: 'EDUCATION',
    description: 'Completed a Diploma in Computer Engineering (2020–2023) and continued with a B.E. in Computer Engineering at Gyanmanjari Institute of Technology (2023–2026).',
    tags: ['Diploma · 2020–2023', 'B.E. · 2023–2026', 'Gyanmanjari Institute of Technology'],
  },
  {
    period: 'FEB — AUG 2026',
    index: '02',
    title: 'Frontend Developer',
    type: 'PROFESSIONAL EXPERIENCE',
    description: 'Worked as a Junior Frontend Developer at NITSAN Technologies, building responsive interfaces, translating designs into reusable layouts, maintaining website content and templates in TYPO3 CMS, and fixing cross-device UI issues.',
    tags: ['HTML / CSS', 'JavaScript', 'TYPO3 CMS', 'Responsive UI'],
  },
  {
    period: 'NEXT CHAPTER',
    index: '03',
    title: 'Building full-stack products',
    type: 'MERN DEVELOPMENT',
    description: 'Expanding from interfaces into complete applications with React, Node.js, Express, MongoDB, authentication, and real-time features.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
  },
];

export default function Journey() {
  const listRef = useRef(null);

  // Keep animation-engine classes intact: React state updates would rewrite className
  // and accidentally remove .swarm-revealed while a card is hovered/focused.
  const activateItem = (index) => {
    const list = listRef.current;
    if (!list) return;
    list.querySelectorAll('.journey-item').forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
  };

  useEffect(() => {
    const section = document.querySelector('#journey');
    if (!section) return undefined;
    const items = [...section.querySelectorAll('.journey-item')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = items.indexOf(entry.target);
          if (index >= 0 && !listRef.current?.dataset.journeyActiveByUser) activateItem(index);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    items.forEach((item) => observer.observe(item));
    activateItem(0);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="journey-section" aria-labelledby="journey-title">
      <div className="journey-shell container">
        <div className="journey-topline"><span><i /> PERSONAL TIMELINE</span><span>[ 04 ] / THE JOURNEY</span></div>
        <div className="journey-heading-row">
          <div>
            <p className="journey-eyebrow">LEARNING → BUILDING → SHIPPING</p>
            <h2 id="journey-title">The path<br /><span>so far.</span></h2>
          </div>
          <p className="journey-intro">Every step added a new layer — from computer engineering foundations to professional frontend work and building full-stack products.</p>
        </div>
        <div className="journey-list" ref={listRef}>
          {milestones.map((item, index) => (
            <article className={`journey-item${index === 0 ? ' is-active' : ''}`} key={item.index} tabIndex={0} aria-current={index === 0 ? 'step' : undefined} onMouseEnter={() => { if (listRef.current) listRef.current.dataset.journeyActiveByUser = 'true'; activateItem(index); }} onFocus={() => { if (listRef.current) listRef.current.dataset.journeyActiveByUser = 'true'; activateItem(index); }} onClick={() => { if (listRef.current) listRef.current.dataset.journeyActiveByUser = 'true'; activateItem(index); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (listRef.current) listRef.current.dataset.journeyActiveByUser = 'true'; activateItem(index); } }}>
              <div className="journey-marker"><span>{item.index}</span><i /></div>
              <div className="journey-period">{item.period}</div>
              <div className="journey-detail">
                <p className="journey-type">{item.type}</p>
                <h3>{item.title}</h3>
                <p className="journey-description">{item.description}</p>
                <div className="journey-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <span className="journey-corner" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <div className="journey-endline"><span>STILL IN MOTION</span><span>BUILD / LEARN / REPEAT <b>↗</b></span></div>
      </div>
    </section>
  );
}

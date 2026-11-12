import { lazy, Suspense } from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Journey from './components/Journey.jsx';
import DeveloperTerminal from './components/DeveloperTerminal.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import SwarmEngine from './components/SwarmEngine.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';

// Route-specific pages are split into separate chunks so the homepage does not
// download their markup and styles before a visitor opens those routes.
const ProjectDetail = lazy(() => import('./components/ProjectDetail.jsx'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage.jsx'));
const ContactPage = lazy(() => import('./components/ContactPage.jsx'));
const RouteFallback = () => <main className="route-loading" aria-live="polite">Loading page…</main>;
import './App.css';
import './layout.css';

export default function App() {
  const match = window.location.pathname.match(/^\/project\/([^/]+)\/?$/);
  if (/^\/projects\/?$/.test(window.location.pathname)) {
    return <><a className="skip-link" href="#main-content">Skip to main content</a><SwarmEngine /><Suspense fallback={<RouteFallback />}><ProjectsPage /></Suspense><ScrollProgress /></>;
  }
  if (/^\/contact\/?$/.test(window.location.pathname)) {
    return <><a className="skip-link" href="#main-content">Skip to main content</a><SwarmEngine /><Suspense fallback={<RouteFallback />}><ContactPage /></Suspense><ScrollProgress /></>;
  }
  if (match) {
    return <><a className="skip-link" href="#main-content">Skip to main content</a><SwarmEngine /><Suspense fallback={<RouteFallback />}><ProjectDetail slug={decodeURIComponent(match[1])} /></Suspense><ScrollProgress /></>;
  }
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SwarmEngine />
    <ScrollProgress />
    <main id="main-content" className="portfolio-main">
      <Hero />
      <About />
      <Skills />
      <Journey />
      <DeveloperTerminal />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>;
}

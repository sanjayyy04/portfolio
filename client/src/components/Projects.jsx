import { useEffect, useRef } from 'react';
import { sitePath } from '../sitePath.js';

const projects = [
  { slug: 'chatme', no: '01', name: 'CHATME — MERN CHAT', type: 'REAL-TIME MESSAGING', description: 'A full-stack MERN messaging experience with friend requests, one-to-one and group conversations, media sharing, live presence, typing indicators, and message status updates. Built around React/Vite, Express, MongoDB, and Socket.IO, with PWA and security-focused messaging features.', stack: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'JWT'], theme: 'project-dark', signal: 'REAL-TIME MESSAGING', summary: 'Friend requests · Direct and group chats · Media attachments · Online presence and typing · Delivery/read receipts · PWA and encrypted DM features.', liveUrl: 'https://sanjayyy04.github.io/ChatApp-MERN-complate/users', repoUrl: 'https://github.com/sanjayyy04/ChatApp-MERN-complate' },
  { slug: 'genz-ai', no: '02', name: 'GENZ AI', type: 'GEMINI AI CLONE', description: 'A responsive Gemini-inspired AI chat interface built to explore prompt-and-response interactions. The project also documents hands-on deployment workflow practice with Docker, Jenkins, GitHub Actions, AWS EC2, and Nginx.', stack: ['React.js', 'Gemini API', 'Docker', 'Jenkins', 'AWS EC2'], theme: 'project-yellow', signal: 'AI APPLICATION', summary: 'Gemini API chat experience · Responsive React UI · Docker packaging · CI/CD practice with Jenkins and GitHub Actions · EC2/Nginx deployment workflow.', liveUrl: 'https://sanjayyy04.github.io/GenZ-AI/', repoUrl: 'https://github.com/sanjayyy04/GenZ-AI' },
  { slug: 'ai-website-analyzer', no: '03', name: 'AI WEBSITE ANALYZER', type: 'AI / WEB TOOLING', description: 'A website-auditing tool concept that combines Lighthouse metrics and Cheerio-based HTML signals with Gemini-generated explanations. The workflow is designed to surface performance, accessibility, SEO, and best-practice findings with suggested fixes, visual summaries, and exportable reports.', stack: ['React.js', 'Node.js', 'Lighthouse', 'Cheerio', 'Gemini'], theme: 'project-violet', signal: 'WEBSITE AUDITS', summary: 'Lighthouse audit categories · Cheerio HTML inspection · Gemini summaries and code-fix ideas · Rule-based fallback · Charts and downloadable reports · Light/dark responsive interface.' },
  { slug: 'my-tasks', no: '04', name: 'MY TASKS', type: 'REACT TASK MANAGER', description: 'A React 19 task manager for capturing and organizing everyday work. It includes task editing and completion, due dates, tags, active/completed views, filters, undo actions, keyboard shortcuts, and browser-local persistence.', stack: ['React 19', 'JavaScript', 'localStorage', 'GitHub Actions'], theme: 'project-dark', signal: 'TASKS ORGANIZED', summary: 'Create/edit/complete tasks · Due dates and tags · Filtered active/completed views · Undo and keyboard shortcuts · localStorage persistence · Test/build workflow and GitHub Pages deployment.', liveUrl: 'https://sanjayyy04.github.io/todo-react-app/', repoUrl: 'https://github.com/sanjayyy04/todo-react-app' },
];

function ProjectArtwork({ project }) {
  return <div className={`project-art ${project.theme}`} aria-hidden="true"><div className="art-top"><span className="art-dot" /> {project.no} / FEATURED PROJECT <span className="art-arrow">↗</span></div><h3>{project.name}</h3><p>{project.type}</p><div className="art-live"><i /> {project.signal}<small>BUILD / LEARN / DEPLOY</small></div><div className="art-bars">{Array.from({length: 19}, (_, i) => <i key={i} />)}</div><div className="art-tags">{project.stack.slice(0,4).map(tag => <span key={tag}>{tag}</span>)}</div></div>
}

export default function Projects() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll('.project-panel')];
    const update = () => {
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
      const active = Math.min(cards.length - 1, Math.floor(progress * cards.length));
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === active);
        card.classList.toggle('was-active', i < active);
        card.classList.toggle('project-in-view', i === active);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return <section className="projects-section" id="projects" ref={sectionRef} aria-labelledby="projects-title">
    <div className="projects-sticky container">
      <div className="projects-header"><span className="projects-eyebrow"><i /> PROJECTS <b /></span><span className="projects-index">[ 04 ]</span></div>
      <div className="projects-intro"><p className="projects-overline">A FEW THINGS I'VE BUILT</p><h2 id="projects-title">SELECTED<br/><span>WORK</span></h2><p>A collection of projects I’ve built to solve real problems, explore new technologies, and turn ideas into working products.</p><a className="projects-explore" href={sitePath('projects')}>EXPLORE PROJECTS <span>↗</span></a></div>
      <div className="projects-stack" id="project-stack">
        {projects.map((project, i) => <article className={`project-panel panel-${i+1}`} key={project.slug} data-project-target>
          <a className="project-panel-link" href={sitePath(`project/${project.slug}`)} aria-label={`Open ${project.name} project details`}><ProjectArtwork project={project}/><span className="project-panel-open">↗</span></a>
          <div className="project-panel-meta"><span>{project.no} / {project.type}</span><p>{project.summary}</p><div>{project.stack.slice(0,4).map(tag => <small key={tag}>{tag}</small>)}</div></div>
        </article>)}
      </div>
      <div className="projects-footer"><span>TURNING IDEAS<br/>INTO PRODUCTS</span><i/><span className="projects-footer-right">BUILD / LEARN / DEPLOY</span></div>
    </div>
    <div className="projects-scroll-track" aria-hidden="true" />
  </section>;
}

import './projectsPage.css';

const projects = [
  {
    slug: 'chatme', no: '01', name: 'CHATME', type: 'MERN REAL-TIME MESSAGING',
    description: 'A full-stack messaging experience with direct and group conversations, friend requests, media sharing, online presence, typing indicators, and delivery/read states. Built with React, Node.js, Express, MongoDB, and Socket.IO, with PWA and security-focused messaging features.',
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'JWT'],
    liveUrl: 'https://sanjayyy04.github.io/ChatApp-MERN-complate/users', repoUrl: 'https://github.com/sanjayyy04/ChatApp-MERN-complate', accent: 'mint', signal: 'REAL-TIME / CONNECTED'
  },
  {
    slug: 'genz-ai', no: '02', name: 'GENZ AI', type: 'GEMINI-INSPIRED AI APPLICATION',
    description: 'A responsive AI chat interface built around prompt-and-response interactions. The project also explores practical delivery workflows with Docker, Jenkins, GitHub Actions, AWS EC2, and Nginx.',
    stack: ['React.js', 'Gemini API', 'Docker', 'Jenkins', 'AWS EC2'],
    liveUrl: 'https://sanjayyy04.github.io/GenZ-AI/', repoUrl: 'https://github.com/sanjayyy04/GenZ-AI', accent: 'yellow', signal: 'AI / PROMPT INTERFACE'
  },
  {
    slug: 'ai-website-analyzer', no: '03', name: 'AI WEBSITE ANALYZER', type: 'AI / WEB TOOLING',
    description: 'A website-audit tool concept combining Lighthouse metrics and Cheerio-based HTML signals with AI-generated explanations. It is designed to summarize performance, accessibility, SEO, and best-practice findings with suggested fixes, charts, and exportable reports.',
    stack: ['React.js', 'Node.js', 'Lighthouse', 'Cheerio', 'Gemini'],
    accent: 'violet', signal: 'AUDIT / ANALYZE / IMPROVE'
  },
  {
    slug: 'my-tasks', no: '04', name: 'MY TASKS', type: 'REACT TASK MANAGER',
    description: 'A task manager for capturing and organizing work with editing, due dates, tags, completion states, filters, undo actions, keyboard shortcuts, and local browser persistence.',
    stack: ['React 19', 'JavaScript', 'Vite', 'localStorage', 'GitHub Actions'],
    liveUrl: 'https://sanjayyy04.github.io/todo-react-app/', repoUrl: 'https://github.com/sanjayyy04/todo-react-app', accent: 'blue', signal: 'TASKS / IN CONTROL'
  }
];

export default function ProjectsPage() {
  return <main id="main-content" className="project-detail-page projects-index-page">
    <header className="detail-nav projects-index-nav" data-projects-target>
      <a href="/#projects">← BACK TO HOME</a>
      <span>PROJECT ARCHIVE / 04 BUILDS</span>
    </header>
    <section className="projects-index-hero container" data-projects-target>
      <p className="detail-eyebrow"><i /> PROJECT ARCHIVE / SELECTED BUILDS</p>
      <h1>ALL <span>PROJECTS</span></h1>
      <p className="projects-index-lede">A closer look at the applications, experiments, and tools I’ve built. Open a case study for the feature breakdown and workflow, or jump straight into a live build or its source when available.</p>
      <div className="projects-index-stats"><span><b>04</b> PROJECTS</span><span><b>01</b> FULL-STACK CHAT</span><span><b>03</b> LIVE DEMOS</span></div>
    </section>
    <section className="projects-index-grid container" aria-label="All projects">
      {projects.map((project) => <article className={`projects-index-card ${project.accent}`} key={project.slug} data-projects-target>
        <div className="projects-index-card-top"><span>{project.no} / SELECTED BUILD</span><span className="projects-index-signal"><i /> {project.signal}</span></div>
        <a className="projects-index-card-title" href={`/project/${project.slug}`} aria-label={`Open ${project.name} case study`}>
          <span className="projects-index-type">{project.type}</span>
          <h2>{project.name}</h2>
          <span className="projects-index-arrow">↗</span>
        </a>
        <p className="projects-index-description">{project.description}</p>
        <div className="projects-index-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="projects-index-actions">
          <a href={`/project/${project.slug}`}>CASE STUDY <span>↗</span></a>
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">LIVE DEMO <span>↗</span></a> : <span className="projects-index-unavailable">LIVE DEMO NOT PROVIDED</span>}
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">SOURCE CODE <span>↗</span></a>}
        </div>
      </article>)}
    </section>
    <section className="projects-index-end container" data-projects-target><p className="detail-label">NEXT / COLLABORATION</p><h2>Have a good<br/><em>problem to solve?</em></h2><a href="/#contact">GET IN TOUCH ↗</a></section>
    <footer className="detail-footer"><a href="/#projects">← HOME / SELECTED WORK</a><a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>BACK TO TOP ↑</a></footer>
  </main>;
}

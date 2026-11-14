export default function About() {
  return (
    <section id="about" aria-label="About Sanjay Chauhan">
      <div className="about-top container">
        <span>
          <i className="about-dot" />
          SANJAY CHAUHAN / PROFILE
        </span>
        <span>MODULE 02 — ABOUT</span>
      </div>
      <div className="about-layout container">
        <div className="about-main">
          <div className="about-kicker about-reveal d1">
            A LITTLE ABOUT ME / 001
          </div>
          <h2 className="about-title about-reveal d2">
            Curious by nature.
            <br />
            <span>Built to</span> <em>create.</em>
          </h2>
          <p className="about-copy about-reveal d3">
            I’m <strong>Sanjay Chauhan</strong>, a developer from Palitana,
            Gujarat. I have six months of professional frontend experience,
            working on responsive interfaces, reusable page layouts, and TYPO3
            CMS.
          </p>
          <p className="about-copy about-reveal d4">
            Alongside frontend work, I build full-stack applications with{" "}
            <strong>React, Node.js, Express, and MongoDB</strong>. My projects
            include a real-time chat application, an AI Website Analyzer using
            Gemini and Lighthouse, and a React task manager. I also explore
            Docker, Jenkins, GitHub Actions, AWS EC2, and Nginx to understand
            how applications are shipped.
          </p>
          <div className="about-tags about-reveal d4">
            <span className="about-tag">REACT.JS</span>
            <span className="about-tag">JAVASCRIPT</span>
            <span className="about-tag">NODE.JS</span>
            <span className="about-tag">EXPRESS</span>
            <span className="about-tag">MONGODB</span>
            <span className="about-tag">TYPO3 CMS</span>
            <span className="about-tag">SOCKET.IO</span>
            <span className="about-tag">DOCKER / CI-CD</span>
            <span className="about-tag">GEMINI API</span>
          </div>
          <div className="about-stats about-reveal d5">
            <div className="about-stat">
              <strong>06 MO.</strong>
              <span>Professional frontend experience</span>
            </div>
            <div className="about-stat">
              <strong>MERN</strong>
              <span>Full-stack development</span>
            </div>
            <div className="about-stat">
              <strong>CI/CD</strong>
              <span>Deployment workflows</span>
            </div>
          </div>
        </div>
        <aside className="about-side about-reveal d4">
          <div className="about-index">SELECTED BUILDS / 003</div>
          <article className="about-project">
            <span className="project-num">PROJECT_01 / REALTIME</span>
            <h3>ChatMe — MERN Chat</h3>
            <p>
              Real-time direct and group messaging with Socket.IO, JWT sessions,
              PWA support, presence, and end-to-end encryption features.
            </p>
          </article>
          <article className="about-project red">
            <span className="project-num">PROJECT_02 / AI TOOLS</span>
            <h3>AI Website Analyzer</h3>
            <p>
              Website audits for performance, accessibility, SEO, and best
              practices with Gemini-powered summaries and fix suggestions.
            </p>
          </article>
          <article className="about-project">
            <span className="project-num">PROJECT_03 / DELIVERY</span>
            <h3>GenZ AI &amp; deployment</h3>
            <p>
              A Gemini-inspired AI application supported by deployment practice
              with Docker, Jenkins, GitHub Actions, AWS EC2, and Nginx.
            </p>
          </article>
        </aside>
      </div>
    </section>
  );
}

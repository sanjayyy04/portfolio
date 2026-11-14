import { sitePath } from '../sitePath.js';

const skillGroups = [
  { name: 'React.js', mark: '⚛', kind: 'react', level: 'UI / COMPONENTS' },
  { name: 'TypeScript', mark: 'TS', kind: 'ts', level: 'TYPED JAVASCRIPT' },
  { name: 'JavaScript', mark: 'JS', kind: 'js', level: 'LANGUAGE' },
  { name: 'Node.js', mark: '⬡', kind: 'node', level: 'RUNTIME' },
  { name: 'Express.js', mark: 'EX', kind: 'express', level: 'API LAYER' },
  { name: 'MongoDB', mark: '◖', kind: 'mongo', level: 'DATABASE' },
  { name: 'Socket.IO', mark: '↔', kind: 'socket', level: 'REALTIME' },
  { name: 'Docker', mark: '▤', kind: 'docker', level: 'CONTAINERS' },
  { name: 'AWS', mark: 'aws', kind: 'aws', level: 'CLOUD' },
  { name: 'GitHub Actions', mark: '⌘', kind: 'git', level: 'CI / CD' },
  { name: 'Nginx', mark: 'N', kind: 'nginx', level: 'WEB SERVER' },
  { name: 'Jenkins', mark: 'J', kind: 'jenkins', level: 'AUTOMATION' },
  { name: 'Terraform', mark: 'TF', kind: 'terraform', level: 'INFRA AS CODE' },
  { name: 'TYPO3 CMS', mark: 'T3', kind: 'typo3', level: 'CONTENT PLATFORM' },
  { name: 'Gemini API', mark: '✳', kind: 'ai', level: 'AI INTEGRATION' },
];

const frontendSkills = skillGroups.filter((skill) => ['react', 'ts', 'js', 'typo3'].includes(skill.kind));
const backendSkills = skillGroups.filter((skill) => ['node', 'express', 'mongo', 'socket', 'ai', 'docker', 'aws', 'git', 'nginx', 'jenkins', 'terraform'].includes(skill.kind));

function SkillCard({ skill }) {
  return (
    <div className="skill-card">
      <span className={`skill-mark mark-${skill.kind}`} aria-hidden="true">{skill.mark}</span>
      <span className="skill-card-copy">
        <strong>{skill.name}</strong>
        <small>{skill.level}</small>
      </span>
      <span className="skill-slash" aria-hidden="true">/</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <div className="skills-frame container">
        <div className="skills-topline">
          <span className="skills-chip"><i /> TECH STACK</span>
          <span className="skills-module">[ 03 ] / TOOLKIT</span>
        </div>

        <div className="skills-intro-grid">
          <div className="skills-heading-block">
            <p className="skills-eyebrow">MY SKILLS / ALWAYS EVOLVING</p>
            <h2 id="skills-title" className="skills-title"><span>SKILLS</span><br />I WORK WITH</h2>
            <p className="skills-summary">A practical toolkit for building, shipping, and improving digital products — from polished interfaces to real-time apps and deployment workflows.</p>
          </div>
          <div className="skills-intro-aside">
            <div className="skills-note">
              <span className="skills-note-dot" />
              <div>
                <p className="skills-note-label">CONTINUOUSLY EXPLORING</p>
                <p>Frontend to backend, cloud to automation, and AI integration — I enjoy connecting the pieces that turn an idea into a working product.</p>
              </div>
            </div>
            <a className="skills-opportunity" href={sitePath('#contact')} aria-label="Contact Sanjay about opportunities">
              <span className="skills-opportunity-icon">↗</span>
              <span><strong>[ OPEN TO OPPORTUNITIES ]</strong><small>Let’s build something great together.</small></span>
            </a>
          </div>
        </div>

        <div className="skills-marquee-stage" aria-label="Frontend and backend technologies">
          <div className="skills-lane skills-lane-frontend">
            <div className="skills-lane-label"><span className="lane-index">01</span><span><strong>FRONTEND</strong><small>INTERFACES / EXPERIENCE</small></span><i>↗</i></div>
            <div className="skills-lane-viewport">
              <div className="skills-track skills-track-forward">
                {[0, 1].map((copy) => <div className="skills-track-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
                  {frontendSkills.map((skill) => <SkillCard key={`${copy}-${skill.name}`} skill={skill} />)}
                </div>)}
              </div>
            </div>
          </div>
          <div className="skills-lane skills-lane-backend">
            <div className="skills-lane-label"><span className="lane-index">02</span><span><strong>BACKEND</strong><small>LOGIC / DATA / DELIVERY</small></span><i>↙</i></div>
            <div className="skills-lane-viewport">
              <div className="skills-track skills-track-reverse">
                {[0, 1].map((copy) => <div className="skills-track-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
                  {backendSkills.map((skill) => <SkillCard key={`${copy}-${skill.name}`} skill={skill} />)}
                </div>)}
              </div>
            </div>
          </div>
        </div>

        <div className="skills-footer">
          <span />
          <p><i /> SCROLLING SKILLS <b>/</b> ALWAYS LEARNING <b>/</b> KEEP EXPLORING</p>
          <span />
        </div>
      </div>
    </section>
  );
}

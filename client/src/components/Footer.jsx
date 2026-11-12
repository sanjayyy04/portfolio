import './footer.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/sanjay-chauhan-537517375/';
const GITHUB_URL = 'https://github.com/sanjayyy04';
const CONTACT_EMAIL = 'smchauhan2004@gmail.com';

export default function Footer() {
  const top = () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });

  return (
    <footer className="site-footer" id="footer" aria-labelledby="footer-title">
      <div className="footer-light-scene">


        <section className="footer-light-surface">
<div className="orbital footer-orbital" aria-hidden="true"><svg viewBox="0 0 300 300" fill="none"><g className="orbit-spin"><ellipse cx="150" cy="150" rx="124" ry="49" stroke="#476cff" strokeOpacity=".65" strokeWidth=".8" transform="rotate(-42 150 150)"/><ellipse cx="150" cy="150" rx="110" ry="68" stroke="#5a8bff" strokeOpacity=".38" strokeWidth=".7" transform="rotate(37 150 150)"/><path d="M37 159C69 64 199 31 258 104" stroke="#6af5f0" strokeOpacity=".6" strokeWidth=".8" strokeDasharray="3 8"/><circle cx="248" cy="104" r="3" fill="#6af5f0"/><circle cx="52" cy="189" r="2.5" fill="#ff655c"/></g><g className="orbit-reverse"><ellipse cx="150" cy="150" rx="88" ry="115" stroke="#6684ff" strokeOpacity=".55" strokeWidth=".7" transform="rotate(51 150 150)"/><path d="M66 78L235 217M84 235L219 64" stroke="#4269ff" strokeOpacity=".22" strokeWidth=".7"/><circle cx="150" cy="150" r="91" stroke="#5e7cff" strokeOpacity=".25" strokeDasharray="1 7"/></g><g className="core"><path d="M150 81L184 111L200 153L171 197L132 208L101 174L106 128Z" fill="#17358d" fillOpacity=".22" stroke="#5277ff" strokeWidth="1.1"/><path d="M150 81L161 143L200 153M161 143L101 174M161 143L171 197M106 128L161 143L184 111" stroke="#5d7eff" strokeOpacity=".7" strokeWidth=".8"/><path d="M150 81L184 111L161 143L106 128Z" fill="#3e62f7" fillOpacity=".14"/><path d="M161 143L200 153L171 197Z" fill="#61e9e4" fillOpacity=".12"/><circle cx="161" cy="143" r="4" fill="#9cafff"/><circle cx="161" cy="143" r="10" stroke="#6789ff" strokeOpacity=".45"/></g><circle cx="150" cy="150" r="139" stroke="#4266ff" strokeOpacity=".16" strokeDasharray="2 9"/></svg></div>
          <p className="footer-kicker">05 / END OF TRANSMISSION</p>
          <h2 id="footer-title">The next idea<br /><em>starts here.</em></h2>
          <p className="footer-message">Built with curiosity. Engineered with intent.</p>
        </section>
      </div>

      <div className="footer-bottom container">
        <span>DESIGNED &amp; BUILT BY SANJAY</span>
        <nav className="footer-links" aria-label="Footer links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>EMAIL ↗</a>
          <a href="/Sanjay-Chauhan-Resume.pdf" target="_blank" rel="noreferrer">RESUME ↗</a>
          <button type="button" onClick={top}>BACK TO TOP ↑</button>
        </nav>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

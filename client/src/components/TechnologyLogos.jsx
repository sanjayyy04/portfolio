import './technologyLogos.css';

const technologyIcons = {
  'React.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', tint: '#61dafb', short: 'R' },
  'Node.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', tint: '#83cd29', short: 'N' },
  'Express': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', tint: '#eeeeee', short: 'Ex', invert: true },
  'MongoDB': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', tint: '#47a248', short: 'M' },
  'Socket.IO': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg', tint: '#ffffff', short: 'S', invert: true },
  'JWT': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jwt/jwt-original.svg', tint: '#d63aff', short: 'JWT' },
  'PWA': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg', tint: '#8ab4f8', short: 'PWA' },
  'Gemini API': { src: 'https://cdn.simpleicons.org/googlegemini/8E75B2', tint: '#8E75B2', short: 'AI' },
  'JavaScript': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', tint: '#f7df1e', short: 'JS' },
  'CSS': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', tint: '#1572b6', short: 'CSS' },
  'Vite': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg', tint: '#bd34fe', short: 'V' },
  'Local Storage': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', tint: '#e34f26', short: 'LS' },
  'AI API': { src: 'https://cdn.simpleicons.org/openai/ffffff', tint: '#ffffff', short: 'AI' },
};

export default function TechnologyLogos({ technologies = [] }) {
  return (
    <ul className="technology-logo-grid" aria-label="Technologies used in this project">
      {technologies.map((name) => {
        const icon = technologyIcons[name];
        return (
          <li className="technology-logo-item" key={name}>
            <span className="technology-logo-tile" tabIndex="0" aria-label={name}>
              {icon ? (
                <img
                  src={icon.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ '--technology-tint': icon.tint, '--technology-invert': icon.invert ? '1' : '0' }}
                  onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.nextElementSibling.hidden = false; }}
                />
              ) : null}
              <span className="technology-logo-fallback" hidden={!icon} aria-hidden="true">{icon?.short || name.slice(0, 2)}</span>
              <span className="technology-logo-name">{name}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

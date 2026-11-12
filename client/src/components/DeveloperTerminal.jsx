import { useEffect, useRef, useState } from 'react';
import './developerTerminal.css';

const COMMANDS = [
  ['help', 'Show all available commands'], ['about', 'Learn about Sanjay'], ['skills', 'Explore the tech stack'],
  ['stack', 'Print technologies by category'], ['journey', 'View the career timeline'], ['projects', 'Explore selected work'],
  ['contact', 'Jump to contact options'], ['github', 'Open Sanjay’s GitHub profile'],
  ['email', 'Open a new email to Sanjay'], ['resume', 'Open Sanjay’s resume PDF'], ['whoami', 'Show developer identity'],
  ['date', 'Show today’s date'], ['banner', 'Print the welcome banner'], ['clear', 'Clear terminal output'],
];
const INITIAL_LINES = [
  { type: 'system', text: 'Initializing developer terminal...' },
  { type: 'system', text: 'Connected to local portfolio interface.' },
  { type: 'system', text: "Type 'help' to see available commands." },
  { type: 'output', text: 'Welcome to my interactive terminal.' },
  { type: 'output', text: 'Explore my work, skills, and journey using simple commands.' },
];
const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function DeveloperTerminal() {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState(INITIAL_LINES);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState(null);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const move = (event) => {
      if (!dragRef.current) return;
      const { offsetX, offsetY } = dragRef.current;
      const width = Math.min(900, window.innerWidth - 24);
      setPosition({ x: Math.max(12, Math.min(window.innerWidth - width - 12, event.clientX - offsetX)), y: Math.max(12, Math.min(window.innerHeight - 60, event.clientY - offsetY)) });
    };
    const up = () => { dragRef.current = null; document.body.classList.remove('terminal-dragging'); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
  }, []);

  const launch = () => { setIsOpen(true); setIsMinimized(false); window.setTimeout(() => inputRef.current?.focus(), 80); };
  const runCommand = (raw) => {
    const command = raw.trim().toLowerCase().replace(/^\$\s*/, '');
    if (!command) return;
    setHistory((old) => [...old, command]); setHistoryIndex(history.length + 1);
    if (command === 'clear') { setLines([]); setInput(''); return; }
    const output = [];
    const go = (id, message) => { output.push({ type: 'success', text: message }); window.setTimeout(() => scrollToSection(id), 120); };
    switch (command) {
      case 'help': output.push({ type: 'output', text: 'Available commands:' }); COMMANDS.forEach(([name, description]) => output.push({ type: 'command-help', text: `${name.padEnd(10, ' ')} — ${description}` })); break;
      case 'about': go('about', 'Opening the About section…'); break;
      case 'skills': go('skills', 'Opening the Skills section…'); break;
      case 'journey': go('journey', 'Opening the Journey timeline…'); break;
      case 'projects': go('projects', 'Opening Selected Work…'); break;
      case 'contact': go('contact', 'Opening Contact…'); break;
      case 'stack': output.push({ type: 'output', text: 'FRONTEND  React.js · JavaScript · TypeScript · HTML · CSS · TYPO3 CMS' }, { type: 'output', text: 'BACKEND   Node.js · Express.js · MongoDB · Socket.IO · REST APIs' }, { type: 'output', text: 'DELIVERY  Docker · Jenkins · GitHub Actions · AWS EC2 · Nginx · Terraform' }); break;
      case 'whoami': output.push({ type: 'output', text: 'Sanjay Chauhan — developer from Gujarat, India.' }, { type: 'output', text: 'Focus: MERN stack, real-time applications, and practical deployment workflows.' }); break;
      case 'date': output.push({ type: 'output', text: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }); break;
      case 'banner': output.push({ type: 'banner', text: 'SANJAY' }, { type: 'output', text: 'Build / Learn / Ship / Repeat.' }); break;
      case 'github': output.push({ type: 'success', text: 'Opening github.com/sanjayyy04…' }); window.open('https://github.com/sanjayyy04', '_blank', 'noopener,noreferrer'); break;
      case 'email': output.push({ type: 'success', text: 'Opening an email draft to smchauhan2004@gmail.com…' }); window.location.href = 'mailto:smchauhan2004@gmail.com'; break;
      case 'resume': output.push({ type: 'success', text: 'Opening Sanjay Chauhan’s resume PDF…' }); window.open('/Sanjay-Chauhan-Resume.pdf', '_blank', 'noopener,noreferrer'); break;
      default: output.push({ type: 'error', text: `Command not found: ${command}. Type 'help' to see available commands.` });
    }
    setLines((old) => [...old, { type: 'prompt', text: command }, ...output]); setInput('');
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') { event.preventDefault(); runCommand(input); }
    if (event.key === 'ArrowUp' && history.length) { event.preventDefault(); const next = Math.max(0, historyIndex - 1); setHistoryIndex(next); setInput(history[next] || ''); }
    if (event.key === 'ArrowDown' && history.length) { event.preventDefault(); const next = Math.min(history.length, historyIndex + 1); setHistoryIndex(next); setInput(history[next] || ''); }
  };
  const startDrag = (event) => {
    if (event.target.closest('button')) return;
    if (window.matchMedia('(max-width: 600px)').matches) return;
    const rect = event.currentTarget.closest('.terminal-dock-window').getBoundingClientRect();
    dragRef.current = { offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
    setPosition({ x: rect.left, y: rect.top });
    document.body.classList.add('terminal-dragging');
    event.preventDefault();
  };

  return <>
      {!isOpen && <button className="terminal-floating-badge" type="button" onClick={launch} aria-label="Open portfolio terminal" title="Explore my portfolio">
        <span className="terminal-badge-glyph" aria-hidden="true">&gt;_</span>
        <span className="terminal-badge-label">Portfolio terminal</span>
      </button>}
      {isOpen && !isMinimized && <div className={`terminal-dock-window${position ? ' terminal-positioned' : ''}`} style={position ? { left: position.x, top: position.y, bottom: 'auto' } : undefined} role="dialog" aria-label="Interactive developer terminal">
        <div className="terminal-window-bar terminal-dock-bar" onPointerDown={startDrag} title="Drag to move terminal"><div className="terminal-lights" aria-hidden="true"><i/><i/><i/></div><span className="terminal-window-user">sanjay@portfolio ~</span><span className="terminal-online"><i/> READY</span><div className="terminal-window-controls"><button type="button" aria-label="Minimize terminal" title="Minimize" onClick={() => setIsMinimized(true)}>−</button><button type="button" aria-label="Close terminal" title="Close" onClick={() => { setIsOpen(false); setIsMinimized(false); setPosition(null); }}>×</button></div></div>
        <div className="terminal-dock-body"><div className="terminal-output" ref={outputRef} aria-live="polite" aria-label="Terminal output">
          {lines.map((line, index) => <div className={`terminal-line terminal-line-${line.type}`} key={`${index}-${line.text}`}>{line.type === 'prompt' ? <><span className="terminal-prompt-label">sanjay@portfolio:~$</span> {line.text}</> : line.text}</div>)}
          <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); runCommand(input); }}><label className="terminal-prompt-label" htmlFor="terminal-command">sanjay@portfolio:~$</label><input id="terminal-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} autoComplete="off" autoCapitalize="none" spellCheck="false" aria-label="Enter a terminal command" placeholder="type help…"/><button type="submit" aria-label="Run command">↵</button></form>
        </div><aside className="terminal-command-panel" aria-label="Available terminal commands"><h3>Available commands</h3><ul>{COMMANDS.map(([name, description]) => <li key={name}><button type="button" onClick={() => { runCommand(name); inputRef.current?.focus(); }}><code>{name}</code><span>{description}</span></button></li>)}</ul></aside></div>
      </div>}
      {isMinimized && isOpen && <div className="terminal-mini-dock"><span><i/> sanjay@portfolio ~</span><button type="button" onClick={() => { setIsMinimized(false); window.setTimeout(() => inputRef.current?.focus(), 80); }}>Restore terminal</button><button type="button" aria-label="Close terminal" onClick={() => { setIsOpen(false); setIsMinimized(false); setPosition(null); }}>×</button></div>}
  </>;
}

import { useState } from 'react';
import { sitePath } from '../sitePath.js';
import './contact.css';

// Replace this placeholder with the email address you want visitors to contact.
const CONTACT_EMAIL = 'smchauhan2004@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/sanjay-chauhan-537517375/';
const GITHUB_URL = 'https://github.com/sanjayyy04';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    if (feedback.text) setFeedback({ type: '', text: '' });
  }

  async function submit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) {
      setFeedback({ type: 'error', text: 'Please complete all three fields.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback({ type: 'error', text: 'Enter a valid email address so a reply can reach you.' });
      return;
    }
    setIsSubmitting(true);
    setFeedback({ type: '', text: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();
      if (!response.ok) {
        setFeedback({ type: 'error', text: result.error || 'Your message could not be sent. Please try again.' });
        return;
      }
      setForm({ name: '', email: '', message: '' });
      setFeedback({ type: 'success', text: 'Message sent. Thanks for reaching out — I’ll be in touch.' });
    } catch {
      setFeedback({ type: 'error', text: 'Unable to reach the server. Please try again in a moment.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-shell container">
        <header className="contact-heading" data-contact-target>
          <p className="contact-index"><span>04</span> / CONTACT</p>
          <h2 id="contact-title">Have a good<br /><em>one to build?</em></h2>
          <p className="contact-intro">Have a role, an idea, or a tricky problem to solve? Send a note. I’m open to thoughtful conversations and opportunities to build useful things.</p>
          <div className="contact-availability"><span className="contact-live-dot" /> OPEN TO OPPORTUNITIES <span className="contact-availability-line" /></div>
          <div className="contact-links" aria-label="Contact links">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href={sitePath('Sanjay-Chauhan-Resume.pdf')} target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email <span aria-hidden="true">↗</span></a>
            <a href="tel:+919737327918">Phone <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="contact-form-top" data-contact-target><span>LET’S START A CONVERSATION</span><span>FORM / 01</span></div>
          <label data-contact-target>
            <span>01 — YOUR NAME</span>
            <input name="name" autoComplete="name" value={form.name} onChange={update} placeholder="How should I call you?" maxLength={100} required />
          </label>
          <label data-contact-target>
            <span>02 — EMAIL ADDRESS</span>
            <input name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@company.com" maxLength={254} required />
          </label>
          <label data-contact-target>
            <span>03 — WHAT ARE YOU THINKING?</span>
            <textarea name="message" value={form.message} onChange={update} placeholder="A project, an opportunity, or just an interesting idea…" rows={4} maxLength={4000} required />
          </label>
          <div className="contact-submit-row" data-contact-target>
            <p>Your message is sent securely and stored so I can follow up with you.</p>
            <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? 'SENDING…' : 'SEND MESSAGE'} <span aria-hidden="true">{isSubmitting ? '…' : '↗'}</span>
            </button>
          </div>
          <p className={`contact-feedback ${feedback.type}`} role="status" aria-live="polite">{feedback.text}</p>
        </form>
        <footer className="contact-bottom"><span>BHAVNAGAR, GUJARAT / INDIA</span><span>BUILT WITH CURIOSITY <i>✳</i></span></footer>
      </div>
    </section>
  );
}

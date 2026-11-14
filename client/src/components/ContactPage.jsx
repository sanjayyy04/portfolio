import Contact from "./Contact.jsx";
import { sitePath } from "../sitePath.js";
import "./contactPage.css";

export default function ContactPage() {
  return (
    <main id="main-content" className="project-detail-page contact-index-page">
      <header className="detail-nav contact-index-nav" data-contact-page-target>
        <span className="contact-index-route">
          <i /> CONTACT <b>/</b> DIRECT CHANNEL
        </span>
        <a
          className="contact-index-crumb contact-index-crumb-forward"
          href={sitePath("projects")}
        >
          EXPLORE PROJECTS <span aria-hidden="true">↗</span>
        </a>
      </header>
      <section
        className="contact-index-intro container"
        data-contact-page-target
      >
        <p className="detail-eyebrow">
          <i /> OPEN CHANNEL / 04
        </p>
        <h1>
          LET’S BUILD
          <br />
          <span>SOMETHING USEFUL.</span>
        </h1>
        <p>
          Have an opportunity, a project idea, or a problem worth solving? Send
          a message and let’s start a conversation.
        </p>
      </section>
      <Contact />
      <footer
        className="detail-footer contact-index-footer"
        data-contact-page-target
      >
        <a
          className="contact-index-crumb contact-index-crumb-back"
          href={sitePath("#home")}
        >
          ← BACK TO HOME
        </a>
        <a
          className="contact-index-crumb contact-index-crumb-forward"
          href={sitePath("projects")}
        >
          VIEW ALL PROJECTS <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </main>
  );
}

import { useEffect, useRef, useState } from "react";
import { sitePath } from "../sitePath.js";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [LaserFlow, setLaserFlow] = useState(null);
  const [isSmallViewport, setIsSmallViewport] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );
  const menuButtonRef = useRef(null);

  // Defer the decorative WebGL scene until after the first useful paint. This keeps
  // hero text and primary actions responsive on slower phones without removing the effect.
  useEffect(() => {
    let cancelled = false;
    let timer;
    const media = window.matchMedia("(max-width: 768px)");
    const updateViewport = () => setIsSmallViewport(media.matches);
    media.addEventListener?.("change", updateViewport);
    const loadScene = () => {
      import("./LaserFlow.jsx")
        .then((module) => {
          if (!cancelled) setLaserFlow(() => module.default);
        })
        .catch(() => {
          /* Keep the CSS atmosphere if WebGL module loading fails. */
        });
    };
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadScene, { timeout: 1800 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(idleId);
        media.removeEventListener?.("change", updateViewport);
      };
    }
    timer = window.setTimeout(loadScene, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      media.removeEventListener?.("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      className="hero"
      id="home"
      aria-label="Sanjay Chauhan portfolio hero"
    >
      <div className="hero-light-scene" aria-hidden="true">
        {LaserFlow ? (
          <LaserFlow
            surfaceLevel={0.94}
            beamPosition={0.78}
            color="#7955ff"
            intensity={isSmallViewport ? 1.35 : 1.8}
            beamWidth={1.65}
            flare={isSmallViewport ? 1.25 : 1.6}
            spread={1.4}
            spill={1.1}
            fog={isSmallViewport ? 0.12 : 0.18}
            dust={isSmallViewport ? 0.25 : 0.45}
            streaks={isSmallViewport ? 0.55 : 0.9}
            dots={isSmallViewport ? 0.3 : 0.55}
            pulse={1.0}
            speed={0.95}
            seed={5}
            mouseInteraction={false}
            intro
            theme="dark"
            dpr={isSmallViewport ? 1 : 1.25}
          />
        ) : (
          <div className="hero-scene-placeholder" />
        )}
      </div>
      <nav
        className={`nav container${menuOpen ? " menu-open" : ""}`}
        aria-label="Main navigation"
      >
        <a
          className="brand"
          href={sitePath("#home")}
          aria-label="Sanjay Chauhan home"
          onClick={closeMenu}
        >
          {/* <span className="brandmark">
            <span>SC</span>
          </span> */}
          <span>SANJAY CHAUHAN</span>
        </a>
        <div className="navlinks" id="primary-navigation">
          <a href={sitePath("#about")} onClick={closeMenu}>
            PROFILE
          </a>
          <a href={sitePath("#skills")} onClick={closeMenu}>
            TECH STACK
          </a>
          <a href={sitePath("#journey")} onClick={closeMenu}>
            TIMELINE
          </a>
          <a href={sitePath("projects")} onClick={closeMenu}>
            PROJECTS
          </a>
          <a href={sitePath("contact")} onClick={closeMenu}>
            CONTACT
          </a>
        </div>
        <a className="status" href={sitePath("contact")} onClick={closeMenu}>
          <span>LET’S TALK</span>
          <i aria-hidden="true">↗</i>
        </a>
        <div className="mobile-nav-actions">
          <a
            className="mobile-project-shortcut"
            href={sitePath("projects")}
            aria-label="Explore projects"
          >
            ↗
          </a>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-controls="mobile-menu-panel"
            aria-expanded={menuOpen}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
        {menuOpen && (
          <div
            className="mobile-menu-backdrop"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
        <section
          className={`mobile-menu-panel${menuOpen ? " is-open" : ""}`}
          id="mobile-menu-panel"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <button
            className="mobile-menu-close"
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
          <nav
            className="mobile-menu-links"
            aria-label="Mobile menu links"
            tabIndex={menuOpen ? 0 : -1}
          >
            <a
              tabIndex={menuOpen ? 0 : -1}
              href={sitePath("#about")}
              onClick={closeMenu}
            >
              Profile <span>↗</span>
            </a>
            <a
              tabIndex={menuOpen ? 0 : -1}
              href={sitePath("#skills")}
              onClick={closeMenu}
            >
              Tech Stack <span>↗</span>
            </a>
            <a
              tabIndex={menuOpen ? 0 : -1}
              href={sitePath("#journey")}
              onClick={closeMenu}
            >
              Personal Timeline <span>↗</span>
            </a>
            <a
              tabIndex={menuOpen ? 0 : -1}
              href={sitePath("projects")}
              onClick={closeMenu}
            >
              Projects <span>↗</span>
            </a>
            <a
              tabIndex={menuOpen ? 0 : -1}
              href={sitePath("contact")}
              onClick={closeMenu}
            >
              Contact <span>↗</span>
            </a>
          </nav>
          <p className="mobile-menu-footer">
            SANJAY CHAUHAN <span> / </span> MERN STACK DEVELOPER
          </p>
        </section>
      </nav>

      <div className="code-label">
        INTERACTIVE SYSTEMS
        <br />
        <strong>DESIGN / ENGINEERING</strong>
        <br />
        PALITANA / GUJARAT / INDIA
      </div>
      <div className="hero-content container">
        <div className="eyebrow">
          MERN STACK DEVELOPER <span className="hero-eyebrow-divider">/</span>{" "}
          BUILDING FOR THE WEB
        </div>
        <h1 className="headline">
          Systems
          <br />
          <span className="line2">
            that <span className="accent">hold up.</span>
          </span>
        </h1>
        <div className="subrow">
          <p className="intro">
            I’m Sanjay Chauhan — a developer with professional frontend
            experience and hands-on full-stack projects, building{" "}
            <strong>thoughtful digital products</strong>, real-time experiences,
            and practical AI-powered tools.
          </p>
          <div>
            <div className="actions">
              <a className="btn primary" href={sitePath("projects")}>
                Explore my work <span>↗</span>
              </a>
              <a className="btn" href={sitePath("contact")}>
                Get in touch <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <div className="scroll">SCROLL TO EXPLORE</div>
        <div className="coordinates">
          <span>REACT / NODE / SYSTEMS</span>
          <b>© 2026</b>
        </div>
      </div>
    </section>
  );
}

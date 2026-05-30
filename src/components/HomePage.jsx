import { useState, useEffect, useRef } from 'react';
import '../styles/HomePage.css';

/* global Calendly */

// ── IMAGE IMPORTS ──────────────────────────────────────────────────────────────
import imgIntelligent from '../assets/imgIntelligent.png';
import imgExecution from '../assets/imgExecution.png';
import imgImmersive from '../assets/solutions-jewellery.png';
import workcommit from '../assets/workcommit.png';
import oneteam from '../assets/oneteam.png';
import builttolast from '../assets/builttolast.png';
import logoNav from '../assets/PHOTO-2025-12-18-10-27-20.png';
import logoFooter from '../assets/logo-inverted.png';

// ── VIDEO ──────────────────────────────────────────────────────────────────────
const demoVideo = '/video/AI3Dgenerator.mp4';
const videoJewellery = '/video/Virtual_tryon.mp4';
const videoAdvertising = '/video/print_adsV11.mp4';
const industrialsol = '/video/industrialsol.mp4';

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function useVideoIntersection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

function CardVideo({ src, tintClass }) {
  const videoRef = useVideoIntersection();

  return (
    <div className={`card-video-wrap ${tintClass || ''}`}>
      <video
        ref={videoRef}
        className="card-video"
        src={src}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

function StepIcon({ type }) {
  const commonProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  if (type === 'introduction') {
    return (
      <svg {...commonProps}>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    );
  }

  if (type === 'prototype') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6" />
        <path d="M9 13h4" />
        <path d="M7 20v2" />
        <path d="M17 20v2" />
        <path d="M12 2v2" />
      </svg>
    );
  }

  if (type === 'build') {
    return (
      <svg {...commonProps}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a6 6 0 0 1-7.9 7.9l-5.7 5.7a2.1 2.1 0 0 1-3-3l5.7-5.7a6 6 0 0 1 7.9-7.9z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
      <path d="M3 21h18" />
    </svg>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('solutions');

  const [beliefRef, beliefVisible] = useScrollReveal();
  const [whatRef, whatVisible] = useScrollReveal();
  const [solutionsRef, solutionsVisible] = useScrollReveal();
  const [howRef, howVisible] = useScrollReveal();
  const [whyRef, whyVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();
  const [cta2Ref, cta2Visible] = useScrollReveal();

  useEffect(() => {
    const calendlyCssId = 'calendly-widget-css';
    const calendlyScriptId = 'calendly-widget-script';

    if (!document.getElementById(calendlyCssId)) {
      const link = document.createElement('link');
      link.id = calendlyCssId;
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById(calendlyScriptId)) {
      const script = document.createElement('script');
      script.id = calendlyScriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    const handleOutsideClick = (e) => {
      const menu = document.getElementById('menu');
      const toggle = document.getElementById('open-menu');
      if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCalendly = () => {
    if (typeof Calendly !== 'undefined') {
      Calendly.initPopupWidget({
        url: 'https://calendly.com/pixrity-info/new-meeting',
      });
    } else {
      window.open(
        'https://calendly.com/pixrity-info/new-meeting',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSmoothScroll = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      }
    }
  };

  const solutions = [
    {
      title: 'Immersive Jewellery Solutions',
      desc: 'Where XR transforms how products are experienced and sold.',
      path: '/jewellery-solutions',
      video: videoJewellery,
    },
    {
      title: 'Immersive Industrial Solutions',
      desc: 'Where XR makes complex products understandable from anywhere.',
      path: '/immersive-industrial',
      video: industrialsol,
    },
    {
      title: 'Agentic AI Solutions',
      desc: 'Where AI handles the work that slows your business down.',
      path: '/ai-solutions',
      video: demoVideo,
    },
    {
      title: 'Immersive Advertising',
      desc: 'Where XR turns passive campaigns into active experiences.',
      path: '/immersive-advertising',
      video: videoAdvertising,
    },
  ];

  const whatPillars = [
    {
      title: 'Immersive Experiences',
      desc: 'We build environments where your customers can see, feel, and interact with your world — not just read about it.',
      img: imgImmersive,
    },
    {
      title: 'Intelligent Systems',
      desc: 'We deploy AI that works inside your business — learning, responding, generating, and scaling what human teams cannot do alone.',
      img: imgIntelligent,
    },
    {
      title: 'End-to-End Execution',
      desc: 'From strategy to deployment, we own the full build. One team. One quality standard. Nothing handed off.',
      img: imgExecution,
    },
  ];

  const whyPillars = [
    {
      title: 'We show the work before you commit.',
      desc: 'Every engagement starts with a working prototype built from your real product or workflow. You see it running before you pay for it.',
      img: workcommit,
    },
    {
      title: 'One team. Full ownership.',
      desc: 'Strategy, engineering, design, deployment — all in-house. The same people who designed it deploy it.',
      img: oneteam,
    },
    {
      title: 'Built to last, not just to launch.',
      desc: 'Everything runs in standard browsers, scales to any volume, and integrates with your existing stack. No proprietary lock-in.',
      img: builttolast,
    },
  ];

  const steps = [
    {
      step: 'Step 1',
      icon: 'introduction',
      title: 'Understand',
      body: 'A 30-minute call to understand your business, goals, and direction — no technical knowledge needed.',
    },
    {
      step: 'Step 2',
      icon: 'prototype',
      title: 'Prototype',
      body: 'Before you commit, we build a live version so you can see exactly what we propose.',
    },
    {
      step: 'Step 3',
      icon: 'build',
      title: 'Build',
      body: 'Full solution designed and deployed into your environment. Web, mobile, AR, in-store, or API. Built to your timeline.',
    },
    {
      step: 'Step 4',
      icon: 'scale',
      title: 'Scale',
      body: 'What starts as one use case grows into a platform. Scalability is built in from day one.',
    },
  ];

  return (
    <>
      {/* ── NAV ── */}
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div id="menu" className={menuOpen ? 'open' : ''}>
          <a href="/product" onClick={(e) => { e.preventDefault(); navigate('/product'); }}>
            Product
          </a>

          <div
            className="dropdown cmd-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span>Solutions</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#050040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {dropdownOpen && (
              <div className="cmd-panel">
                <a href="/jewellery-solutions" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/jewellery-solutions'); setDropdownOpen(false); }}>
                  Immersive Jewellery Solutions
                </a>
                <a href="/immersive-industrial" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); setDropdownOpen(false); }}>
                  Immersive Industrial Solutions
                </a>
                <a href="/immersive-advertising" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); setDropdownOpen(false); }}>
                  Immersive Advertising
                </a>
                <a href="/ai-solutions" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); setDropdownOpen(false); }}>
                  Agentic AI Solutions
                </a>
              </div>
            )}
          </div>

          <a href="#how" onClick={handleSmoothScroll}>About</a>
          <a href="#why" onClick={handleSmoothScroll}>Insights</a>

          <button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="nav-right">
          <button className="contact-btn" onClick={openCalendly}>Contact Us</button>
          <button className="menu-toggle" id="open-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── LOGO WATERMARK ── */}
      <a
        href="#home"
        className={`logo-watermark${scrolled ? ' logo-scrolled' : ''}`}
        aria-label="Pixrity home"
        onClick={handleSmoothScroll}
      >
        <img
          src={logoNav}
          alt="Pixrity Logo"
          className="logo-watermark-icon"
          style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block', flexShrink: 0 }}
        />
        <div className="logo-text-group">
          <span className="logo-text">PIXRITY</span>
        </div>
      </a>

      {/* ── HERO ── */}
      <section className="hero-section" id="home">
        <div className="hero-body">
          <h1 className="hero-headline">
            We Build the Future of Business with{' '}
            <span className="headline-accent">XR and AI.</span>
          </h1>
          <p className="hero-description">
            PIXRITY helps businesses transform how they engage customers,
            present products, and operate at scale through Extended Reality
            and Artificial Intelligence.
          </p>
          <div className="cta-container">
            <button className="btn-primary" onClick={() => scrollTo('#what-we-do')}>Explore Our Solutions</button>
            <button className="btn-secondary" onClick={openCalendly}>Book a Demo</button>
          </div>
        </div>
      </section>

      {/* ── BELIEF ── */}
      <section className="belief-section" ref={beliefRef}>
        <div className={`belief-inner ${beliefVisible ? 'reveal' : ''}`}>
          <p className="belief-text">
            The world is moving from{' '}
            <em className="headline-accent">showing</em> to{' '}
            <em className="headline-accent">experiencing.</em>
          </p>
          <p className="belief-close belief-sub">
            From products people look at to products people interact with.<br />
            From businesses people visit to businesses people inhabit.
          </p>
          <div className="belief-divider" />
          <p className="belief-close">
            XR makes your product experienceable from anywhere.<br />
            AI makes your business intelligent at every scale.<br /><br />
            <strong>PIXRITY builds both.</strong>
          </p>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="what-section" id="what-we-do" ref={whatRef}>
        <div className={`section-inner ${whatVisible ? 'reveal' : ''}`}>
          <span className="section-label">What We Do</span>
          <h2 className="section-headline">
            We <span className="headline-accent">sit at the intersection </span> of <br />XR and AI
          </h2>
          <div className="what-body">
            <p>
              Extended Reality puts your customer inside an experience. They interact with your product as if it is in front of them from any device, from anywhere in the world, with nothing to download. Artificial Intelligence gives your business capability at scale. It generates, automates, personalises, and responds at a speed and consistency no team can match alone. Individually, each technology changes what is possible. Together, they redefine what a business can become. That is where <strong className="pixrity-bold">PIXRITY</strong> operates.
            </p>
          </div>
          <div className="pillars-grid">
            {whatPillars.map((p, i) => (
              <div className="pillar-card" key={i}>
                <div className="pillar-card-img-wrap">
                  <img src={p.img} alt={p.title} className="pillar-card-img" />
                  <div className="pillar-card-overlay">
                    <p className="pillar-card-overlay-desc">{p.desc}</p>
                  </div>
                </div>
                <div className="pillar-card-body">
                  <h3 className="pillar-title">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="solutions-section" id="solutions" ref={solutionsRef}>
        <div className={`section-inner ${solutionsVisible ? 'reveal' : ''}`}>
          <span className="section-label">Our Solutions</span>
          <h2 className="section-headline">
            Built with <span className="headline-accent">XR and AI</span><br />
            Applied where it changes the most.
          </h2>
          <p className="section-intro">
            Four solutions. One product. Each one a different application of the same foundation — click any to explore it in full.
          </p>
          <div className="solutions-tabs">
            <button className={`sol-tab ${activeTab === 'solutions' ? 'sol-tab-active' : ''}`} onClick={() => setActiveTab('solutions')}>Solutions</button>
            <button className={`sol-tab ${activeTab === 'product' ? 'sol-tab-active' : ''}`} onClick={() => setActiveTab('product')}>Product</button>
          </div>

          {activeTab === 'solutions' && (
            <div className="solutions-grid tab-panel">
              {solutions.map((s, i) => (
                <div className="solution-tile" key={i} onClick={() => navigate(s.path)}>
                  <CardVideo src={s.video} tintClass={s.tint} />
                  <h3 className="tile-title">{s.title}</h3>
                  <p className="tile-desc">{s.desc}</p>
                  <a href={s.path} className="tile-link" onClick={(e) => { e.preventDefault(); navigate(s.path); }}>Explore</a>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'product' && (
            <div className="solutions-grid tab-panel">
              <div className="solution-tile product-video-tile" onClick={() => navigate('/product')}>
                <div className="product-tile-text">
                  <span className="coming-soon-badge">✦ Coming Soon</span>
                  <h3 className="tile-title">AI 3D Content Generator</h3>
                  <p className="tile-desc">Where AI generates production-ready 3D from a single image or prompt.</p>
                  <a href="#" className="tile-link tile-link-accent" onClick={(e) => { e.preventDefault(); navigate('/product'); }}>Join Early Access</a>
                </div>
                <div className="product-video-wrap">
                  <video className="product-video" src={demoVideo} autoPlay loop muted playsInline />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="how-section" id="how" ref={howRef}>
        <div className={`section-inner ${howVisible ? 'reveal' : ''}`}>
          <span className="section-label">How We Work</span>
          <h2 className="section-headline">
            From your first conversation<br />
            to a live experience. <span className="headline-accent">In weeks.</span>
          </h2>
          <div className="is-steps-grid steps-horizontal-grid">
            {steps.map((s, i) => (
              <div className="is-step-card home-step-card" key={i}>
                <div className="step-icon-wrap" aria-label={`${s.title} icon`}>
                  <StepIcon type={s.icon} />
                </div>
                <div className="is-step-top">
                  <span className="is-step-label">{s.step}</span>
                </div>
                <h3 className="is-step-title">{s.title}</h3>
                <p className="is-step-desc">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="how-cta">
            <button className="btn-primary" onClick={openCalendly}>Start With a Free Discovery Call</button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="why-section" id="why" ref={whyRef}>
        <div className={`section-inner ${whyVisible ? 'reveal' : ''}`}>
          <span className="section-label">Why Us</span>
          <h2 className="section-headline">
            PIXRITY was built around inside of <br />
            <span className="headline-accent">XR and AI.</span>
          </h2>
          <p className="why-body">
            We are a team of visual intelligence experts, AI specialists, and technology innovators with deep experience in computer vision, XR, and applied AI. Our focus is on turning emerging technologies into practical solutions that solve real business problems and create measurable impact.
            We believe technology delivers value only when it moves beyond ideas and into real-world execution. That is why we combine strong research foundations with hands-on product thinking, engineering expertise, and a commitment to building solutions that are scalable, intuitive, and outcome-driven.
          </p>
          <div className="pillars-grid">
            {whyPillars.map((p, i) => (
              <div className="pillar-card" key={i}>
                <div className="pillar-card-img-wrap">
                  <img src={p.img} alt={p.title} className="pillar-card-img" />
                  <div className="pillar-card-overlay">
                    <p className="pillar-card-overlay-desc">{p.desc}</p>
                  </div>
                </div>
                <div className="pillar-card-body">
                  <h3 className="pillar-title">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION CTA ── */}
      <section className="final-cta-section vision-cta-section" ref={ctaRef}>
        <div className={`section-inner ${ctaVisible ? 'reveal' : ''}`}>
          <h2 className="Hero-headline cta-headline vision-cta-headline">
            <span className="vision-cta-line">Building the intelligence that connects,</span><br />
            <span className="headline-accent">business to human experience.</span>
          </h2>
          <div className="vision-cta-actions">
            <button className="btn-primary" onClick={openCalendly}>Book a Demo</button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta-section last-snap" id="final-cta" ref={cta2Ref}>
        <div className={`section-inner ${cta2Visible ? 'reveal' : ''}`}>
          <h2 className="cta-headline">
            <span className="headline-accent">Ready to transform </span><br />
            how people experience your business?
          </h2>
          <div className="cta-container">
            <button className="btn-primary" onClick={openCalendly}>Book a Free Demo</button>
            <button className="btn-secondary" onClick={() => scrollTo('#solutions')}>Explore Our Solutions</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
            <div className="footer-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={logoFooter}
                alt="PIXRITY Logo"
                className="footer-logo-img"
                style={{ width: '36px', height: '36px', objectFit: 'contain', display: 'block', flexShrink: 0 }}
              />
              <span className="footer-logo">PIXRITY</span>
            </div>
            <span className="footer-tagline">Transforming Experience</span>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <span className="footer-col-label">Solutions</span>
              <a href="/jewellery-solutions" onClick={(e) => { e.preventDefault(); navigate('/jewellery-solutions'); }}>Immersive Jewellery</a>
              <a href="/immersive-industrial" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); }}>Immersive Industrial</a>
              <a href="/immersive-advertising" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); }}>Immersive Advertising</a>
              <a href="/ai-solutions" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); }}>Agentic AI</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Product</span>
              <a href="/product" onClick={(e) => { e.preventDefault(); navigate('/product'); }}>AI 3D Generator <span className="footer-badge">✦ Soon</span></a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Company</span>
              <a href="#how" onClick={handleSmoothScroll}>About</a>
              <a href="#why" onClick={handleSmoothScroll}>Insights</a>
              <a href="#final-cta" onClick={handleSmoothScroll}>Contact</a>
              <a href="https://wa.me/917204466161" target="_blank" rel="noopener noreferrer" className="footer-whatsapp-link">
                <span className="footer-whatsapp-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.47 0 .08 5.39.08 12c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62A11.94 11.94 0 0 0 12.08 24C18.69 24 24 18.61 24 12c0-3.2-1.24-6.21-3.48-8.52ZM12.08 21.97c-1.79 0-3.54-.48-5.07-1.39l-.36-.21-3.66.96.98-3.57-.23-.37A9.9 9.9 0 0 1 2.1 12c0-5.5 4.48-9.97 9.98-9.97 2.66 0 5.16 1.04 7.04 2.92A9.88 9.88 0 0 1 21.97 12c0 5.5-4.39 9.97-9.89 9.97Zm5.47-7.46c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                </span>
                Chat with us
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>info@pixrity.com · +91 7204466161 · pixrity.com</span>
          <span>© 2026 PIXRITY Private Limited. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
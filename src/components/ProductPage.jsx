import { useEffect, useRef, useState } from 'react';
import '../styles/ProductPage.css';
import '../styles/HomePage.css'; // nav styles live here
import logoIcon from '../assets/PHOTO-2025-12-18-10-27-20.png';

const demoVideo = '/video/prod_main_vid.mp4';

const TYPEWRITER_LINES = [
  'Turn one image into a scene.',
  'Describe it. See it in 3D.',
  'From concept to asset in seconds.',
  'Production-ready. No modelling skills needed.',
];

function Typewriter({ lines, speed = 40 }) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [pausing, setPausing]     = useState(false);

  useEffect(() => {
    if (pausing) {
      const t = setTimeout(() => {
        setPausing(false);
        setLineIdx(i => (i + 1) % lines.length);
        setCharIdx(0);
        setDisplayed('');
      }, 1800);
      return () => clearTimeout(t);
    }
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplayed(d => d + lines[lineIdx][charIdx]);
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      setPausing(true);
    }
  }, [charIdx, lineIdx, pausing, lines, speed]);

  return (
    <span className="pp-typewriter-text">
      {displayed}
      <span className="pp-cursor">|</span>
    </span>
  );
}

export default function ProductPage() {
  const [entered,      setEntered]      = useState(false);
  const [formSent,     setFormSent]     = useState(false);
  const [formError,    setFormError]    = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [email,        setEmail]        = useState('');
  const [playing,      setPlaying]      = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Nav scroll glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape / outside-click to close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setDropdownOpen(false); }
    };
    const handleOutsideClick = (e) => {
      const menu   = document.getElementById('menu');
      const toggle = document.getElementById('open-menu');
      if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMenuOpen(false);
  };

  // ── Web3Forms submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setFormError(false);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          email,
          subject: 'New Early Access Signup — Pixrity',
          message: `Someone signed up for early access to Pixrity's AI 3D Generator.\n\nEmail: ${email}`,
        }),
      });

      if (res.ok) {
        setFormSent(true);
      } else {
        setFormError(true);
      }
    } catch {
      setFormError(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const handleVideoEnd = () => setPlaying(false);

  return (
    <div className={`pp-page ${entered ? 'pp-entered' : ''}`}>

      {/* ── FULL HOMEPAGE NAV ── */}
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div id="menu" className={menuOpen ? 'open' : ''}>

          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
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
                  Immersive Advertising Solutions
                </a>
                <a href="/ai-solutions" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); setDropdownOpen(false); }}>
                  Agentic AI Solutions
                </a>
              </div>
            )}
          </div>

          <a href="/#about" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
            About
          </a>
          <a href="/#why" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.querySelector('#why')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
            Insights
          </a>

          <button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="nav-right">
          <button className="contact-btn" onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#final-cta')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
            Contact Us
          </button>
          <button className="menu-toggle" id="open-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* LOGO WATERMARK */}
      <a href="/" className={`logo-watermark${scrolled ? ' logo-scrolled' : ''}`} aria-label="Pixrity home" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        <img src={logoIcon} alt="Pixrity Logo" className="logo-watermark-icon" />
        <div className="logo-text-group">
          <span className="logo-text">PIXRITY</span>
        </div>
      </a>

      {/* ── HERO ── */}
      <main className="pp-hero">

        {/* Badge */}
        <div className="pp-badge">
          <span className="pp-badge-star">✦</span>
          Coming Soon
          <span className="pp-badge-sep">·</span>
          AI-Powered
        </div>

        {/* Headline */}
        <h1 className="pp-headline">
          AI 3D Content<br />
          <span className="pp-headline-accent">Generator</span>
        </h1>

        {/* Typewriter */}
        <p className="pp-typewriter">
          <Typewriter lines={TYPEWRITER_LINES} />
        </p>

        {/* Description */}
        <p className="pp-desc">
          Where AI generates production-ready 3D assets from a single image
          or a natural language prompt — no modelling software, no specialist skills,
          no waiting weeks.
        </p>

        {/* ── VIDEO PLAYER ── */}
        <div className="pp-video-wrap" onClick={togglePlay}>
          <video
            ref={videoRef}
            className="pp-video"
            src={demoVideo}
            autoPlay={false}
            loop
            playsInline
            onEnded={handleVideoEnd}
          />

          <div className={`pp-video-overlay ${playing ? 'pp-video-overlay--hidden' : ''}`}>
            <button className="pp-play-btn" aria-label="Play">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polygon points="8,4 24,14 8,24" fill="currentColor" />
              </svg>
            </button>
            <span className="pp-video-hint">Click to play</span>
          </div>
        </div>

        {/* Feature pills */}
        <div className="pp-features">
          {[
            { icon: '⚡', label: 'Instant generation' },
            { icon: '🎯', label: 'Production-ready output' },
            { icon: '🔗', label: 'Drop-in to your pipeline' },
          ].map((f, i) => (
            <div className="pp-pill" key={i} style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
              <span>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>

        {/* ── Early Access Form ── */}
        <div className="pp-form-wrap">
          {!formSent ? (
            <>
              <p className="pp-form-label">Be first to access it —</p>
              <form className="pp-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="pp-email-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <button type="submit" className="pp-submit-btn" disabled={loading}>
                  {loading ? 'Sending…' : 'Join Early Access →'}
                </button>
              </form>
              <p className="pp-form-note">No spam. We'll reach out when it's ready.</p>
              {formError && (
                <p style={{ color: '#e10f4e', fontSize: '12px', marginTop: '6px' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          ) : (
            <div className="pp-success">
              <span>✓</span>
              You're on the list. We'll be in touch.
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
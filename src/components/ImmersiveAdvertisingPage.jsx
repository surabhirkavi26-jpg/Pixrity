/* global Calendly */
import { useState, useEffect, useRef } from 'react';
import '../styles/ImmersiveAdvertisingPage.css';
import logoNav from '../assets/PHOTO-2025-12-18-10-27-20.png';
import logoFooter from '../assets/logo-inverted.png';

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function AskQuestion() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setSubmitted(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const reset = () => { setQuery(''); setSubmitted(false); };

  const suggestions = [
    'How long does it take to go live?',
    'Which industries work best with this?',
    'Does this work for a small catalogue?',
  ];

  return (
    <div className="ia-ask-section">
      <div className="ia-ask-header">
        <span className="ia-ask-icon">◈</span>
        <div>
          <h3 className="ia-ask-title">Still have a question?</h3>
          <p className="ia-ask-subtitle">Ask anything about immersive advertising — we'll get back to you shortly.</p>
        </div>
      </div>

      {!submitted ? (
        <>
          <div className="ia-ask-suggestions">
            {suggestions.map((s) => (
              <button key={s} className="ia-ask-suggestion-pill" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="ia-ask-input-row">
            <textarea
              className="ia-ask-textarea"
              placeholder="e.g. Can this work for a furniture brand?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <button
              className="ia-ask-send-btn"
              onClick={handleSubmit}
              disabled={!query.trim()}
              aria-label="Send question"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="ia-ask-confirmation">
          <div className="ia-ask-confirm-icon">✓</div>
          <h4 className="ia-ask-confirm-title">We've received your question.</h4>
          <p className="ia-ask-confirm-body">
            You'll receive your answer soon — our team typically responds within a few hours.
            Prefer a faster answer?{' '}
            <button
              className="contact-btn"
              onClick={() =>
                Calendly.initPopupWidget({
                  url: 'https://calendly.com/pixrity-info/new-meeting'
                })
              }
            >
              Book a Demo
            </button>
          </p>
          <button className="ia-ask-reset" onClick={reset}>Ask another question</button>
        </div>
      )}
    </div>
  );
}

export default function ImmersiveAdvertisingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [closeLearnMoreOpen, setCloseLearnMoreOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  const [service1Open, setService1Open] = useState(false);
  const [service2Open, setService2Open] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setDropdownOpen(false); }
    };
    const handleOutsideClick = (e) => {
      const menu = document.getElementById('menu');
      const toggle = document.getElementById('open-menu');
      if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) setMenuOpen(false);
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

  const handleSmoothScroll = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }
    }
  };

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const [problemRef, problemVisible] = useScrollReveal();
  const [solutionRef, solutionVisible] = useScrollReveal();
  const [service1Ref, service1Visible] = useScrollReveal();
  const [service2Ref, service2Visible] = useScrollReveal();
  const [comparisonRef, comparisonVisible] = useScrollReveal();
  const [processRef, processVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [closeRef, closeVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Do customers need to download an app?',
      a: 'No. Everything runs in a standard mobile browser — Chrome, Safari, any browser. Your customer scans a QR code or taps a link in your social Ad. The experience opens immediately. No app store. No download. No friction. If their phone runs social media, it runs this.'
    },
    {
      q: 'I do not have 3D models of my products. Can I still do this?',
      a: 'Yes. We produce all 3D models from your product photographs the same photos you already use for marketing or your catalogue. You do not need to arrange anything special. We handle the 3D production entirely.'
    },
    {
      q: 'What is the production time? Can this be done quickly?',
      a: 'For a focused campaign a small product selection, one channel we can be live in two to three days. For more complex builds across multiple channels and a larger catalogue, four to six weeks. We give you an honest timeline in the first call. Not a promise to win the business. The actual number.'
    },
    {
      q: 'How is this measured? How do I know it worked?',
      a: 'Every interaction is tracked. How many people engaged with the experience. How long they stayed. Which product features they explored. Whether they clicked through to your site or visited your store. You get clear data, something most advertising formats cannot give you, and something print advertising has never been able to give you before.'
    },
    {
      q: 'What does it cost?',
      a: 'It depends on the number of products, the type of experience, and which channels you activate. We give a clear number in the first strategy call, no vague ranges, no hidden setup fees. If the investment does not make sense for your business right now, we will say so.'
    },
  ];

  const painPoints = [
    {
      num: '01',
      title: 'Your Ad disappears in seconds.',
      body: 'A static image, a video that gets skipped at second five, a banner that blends into the page none of it stays. Your customer saw it. They moved on. They do not remember your brand by evening.',
    },
    {
      num: '02',
      title: 'Your customer cannot feel confident enough to buy.',
      body: 'For anything beyond a low value impulse purchase, a photograph is never enough. Your customer has questions your Ad cannot answer. So instead of buying, they think about it. And thinking about it usually means not buying.',
    },
    {
      num: '03',
      title: 'You are paying to compete in a crowded format.',
      body: 'Every brand runs the same type of Ad. Every brand has the same reach strategy. The more crowded the format, the more expensive the attention. You are spending more every quarter to get the same result.',
    },
  ];

  return (
    <>
      {/* ── NAV ── */}
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div id="menu" className={menuOpen ? 'open' : ''}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <a href="/product" onClick={(e) => { e.preventDefault(); navigate('/product'); }}>Product</a>

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
                  Jewellery Solutions
                </a>
                <a href="/immersive-industrial" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); setDropdownOpen(false); }}>
                  Industrial Solutions
                </a>
                <a href="/ai-solutions" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); setDropdownOpen(false); }}>
                  Agentic AI Solutions
                </a>
                <a href="/immersive-advertising" className="cmd-item cmd-item-active">
                  Immersive Advertising
                </a>
              </div>
            )}
          </div>

          <a href="#ia-close" onClick={handleSmoothScroll}>About</a>
          <a href="#ia-final-cta" onClick={handleSmoothScroll}>Insights</a>

          <button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="nav-right">
          <button
            className="contact-btn"
            onClick={() =>
              Calendly.initPopupWidget({
                url: 'https://calendly.com/pixrity-info/new-meeting'
              })
            }
          >
            Contact Us
          </button>
          <button className="menu-toggle" id="open-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── LOGO WATERMARK ── */}
      <a href="/" className={`logo-watermark${scrolled ? ' logo-scrolled' : ''}`} aria-label="Pixrity home" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        <img src={logoNav} alt="Pixrity Logo" className="logo-watermark-icon" style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block', flexShrink: 0 }} />
        <div className="logo-text-group">
          <span className="logo-text">PIXRITY</span>
          <span className="logo-tagline">Transforming Experience</span>
        </div>
      </a>

      {/* ── 01 HERO ── */}
      <section className="ia-hero-section" id="ia-home">
        <div className="ia-hero-body">
          <h1 className="ia-hero-headline">
            <span className="ia-heading-line">Your customers are not <br />watching your ads. </span><br />
            <span className="headline-accent ia-heading-line">They are skipping them.</span>
          </h1>
          <p className="ia-hero-description">
            Pixrity builds immersive advertising where your customer does not just see
            your product in an Ad, they interact with it. Try it. Explore it. Feel it.
            All before they ever visit your store or website.
          </p>
          <div className="cta-container">
            <button
              className="btn-primary"
              onClick={() =>
                Calendly.initPopupWidget({
                  url: 'https://calendly.com/pixrity-info/new-meeting'
                })
              }
            >
              Book a Demo
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('#ia-solution')}>How Does This Work?</button>
          </div>
        </div>
      </section>

      {/* ── 02 THE PROBLEM ── */}
      <section className="ia-section ia-problem-section" id="ia-problem" ref={problemRef}>
        <div className={`section-inner ${problemVisible ? 'reveal' : ''}`}>
          <span className="section-label">What's Not Working</span>
          <h2 className="section-headline">
            <span className="ia-heading-line">Every brand is running the same Ads.</span><br />
            <span className="headline-accent ia-heading-line">Yours looks exactly like your competitor's.</span>
          </h2>
          <div className="ia-problem-body">
            <p>Think about the last advertisement you scrolled past. You do not remember what it was for. Neither does your customer. The problem is not your product. The problem is not your budget. The problem is that your Ad asks your customer to <em>look</em> and they have seen ten thousand things to look at today.</p>
            <p className="ia-problem-bold">People do not buy what they look at. They buy what they experience.</p>
          </div>
          <div className="ia-pain-grid">
            {painPoints.map((p) => (
              <div className="ia-pain-card" key={p.num}>
                <h3 className="ia-pain-title">{p.title}</h3>
                <div className="ia-pain-extra">
                  <p className="ia-pain-body">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 THE SOLUTION ── */}
      <section className="ia-section ia-solution-section" id="ia-solution" ref={solutionRef}>
        <div className={`section-inner ${solutionVisible ? 'reveal' : ''}`}>
          <span className="section-label">Immersive Advertising</span>
          <h2 className="section-headline">
            <span className="ia-heading-line">What if your Ad gave customers <span className="headline-accent">something to do,</span></span><br />
            <span className="ia-heading-line">not just something to see?</span>
          </h2>
          <div className="section-intro">
            <p>Immersive advertising is not a better version of what you are already running. It is a different category entirely.
              <button
                type="button"
                className="ia-learn-more-btn ia-solution-learn-more"
                onClick={() => setLearnMoreOpen(v => !v)}
                aria-expanded={learnMoreOpen}
              >
                {learnMoreOpen ? 'Show less' : 'Learn more'}
              </button>
            </p>

            <div className={`ia-learn-more-content ${learnMoreOpen ? 'open' : ''}`}>
              <p>Instead of showing your customer what your product looks like, you let them experience it inside the Ad itself. They interact with it. They try it. They rotate it, explore it, personalise it. They spend two to three minutes with your product before they have clicked anything. They arrive at your store or website having already decided.</p>
              <p className="ia-solution-highlight">No app to download. No special device required. Works in any browser, on any smartphone your customer already owns.</p>
            </div>
          </div>
          <div className="ia-services-intro">
            <p className="ia-services-intro-label">We do this through two types of campaigns:</p>
            <div className="ia-service-cards-grid">

              <div className="ia-service-preview-card" onClick={() => scrollTo('#ia-service1')}>
                <div className="ia-service-card-img-wrap">
                  <video
                    src="/video/jewelcard1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="ia-service-card-video"
                  />
                </div>
                <div className="ia-service-card-body">
                  <span className="ia-service-card-tag">Solution 01</span>
                  <h3 className="ia-service-card-title">Immersive Social Media Ads</h3>
                  <p className="ia-service-card-desc">AR try-on, 3D product exploration and branded filters — all inside the social feed.</p>
                  <span className="ia-service-card-link">See how it works →</span>
                </div>
              </div>

              <div className="ia-service-preview-card" onClick={() => scrollTo('#ia-service2')}>
                <div className="ia-service-card-img-wrap">
                  <video
                    src="/video/jewelcardup2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="ia-service-card-video"
                  />
                </div>
                <div className="ia-service-card-body">
                  <span className="ia-service-card-tag">Solution 02</span>
                  <h3 className="ia-service-card-title">Immersive Print Media Ads</h3>
                  <p className="ia-service-card-desc">A QR code turns any print Ad into a live, interactive 3D or AR experience.</p>
                  <span className="ia-service-card-link">See how it works →</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 04 SERVICE 01 — SOCIAL ── */}
      <section className="ia-section ia-service1-section" id="ia-service1" ref={service1Ref}>
        <div className={`section-inner ia-service-two-col ${service1Visible ? 'reveal' : ''}`}>
          <div className="ia-service-left">
            <span className="section-label">Solution</span>
            <h2 className="section-headline">
              <span className="ia-heading-line">Immersive Social</span><br />
              <span className="headline-accent ia-heading-line">Media Ads</span>
            </h2>
            <p className="ia-service-subhead">Your social Ad should be something your customer plays with, not scrolls past.</p>
            <div className="ia-explainer-box">
              <p className="ia-explainer-lead">You know how Instagram and Snapchat let you put filters on your face using the camera?</p>
              <p>That same technology applied to your product.</p>
              <p>Your Ad appears in a customer's feed. They tap one button. Your product appears in their space or on them in real time through their camera. They interact with it. They move around it. They try different options. They screenshot what they love. They share it.</p>
              <p className="ia-explainer-close">Because they have already experienced owning it, the gap between interest and purchase nearly disappears.</p>

              <button
                type="button"
                className="ia-learn-more-btn"
                onClick={() => setService1Open(v => !v)}
                aria-expanded={service1Open}
                style={{ marginTop: '12px' }}
              >
                {service1Open ? 'Show less' : 'Learn more'}
              </button>
            </div>

            <div className={`ia-learn-more-content ${service1Open ? 'open' : ''}`} style={{ border: 'none', padding: 0, boxShadow: 'none' }}>
              <div className="ia-features-grid">
                {[
                  { icon: '◈', title: 'AR Try-On Inside the Ad', body: 'Your customer tries your product on themselves directly inside the social Ad no redirect, no app, no extra steps. The experience lives inside the Ad placement they are already looking at.' },
                  { icon: '⬡', title: 'Interactive 3D Product Exploration', body: 'Your product appears as a fully interactive 3D model inside the Ad. Your customer rotates it, zooms in on detail, changes colours or variants in real time the way they would in person.' },
                  { icon: '◎', title: 'Branded AR Filters and Effects', body: 'Campaign specific AR experiences that customers use, screenshot, and share — turning your paid Ad reach into organic word-of-mouth. One share from one customer becomes free exposure to everyone they know.' },
                ].map((f) => (
                  <div className="ia-feature-card" key={f.title}>
                    <span className="ia-feature-icon">{f.icon}</span>
                    <h3 className="ia-feature-title">{f.title}</h3>
                    <p className="ia-feature-body">{f.body}</p>
                  </div>
                ))}
              </div>
              <div className="ia-outcomes-row">
                <div className="ia-outcome">
                  <span className="ia-outcome-stat">2–3 min</span>
                  <span className="ia-outcome-label">Average customer engagement with immersive Ad</span>
                </div>
                <div className="ia-outcome">
                  <span className="ia-outcome-stat">Zero</span>
                  <span className="ia-outcome-label">Apps to download. Works on any modern smartphone.</span>
                </div>
                <div className="ia-outcome">
                  <span className="ia-outcome-stat">Organic</span>
                  <span className="ia-outcome-label">Screenshots shared extend your campaign for free.</span>
                </div>
              </div>
              <div className="ia-works-on">
                <span className="ia-works-label">Works on</span>
                <div className="ia-works-pills">
                  {['Instagram', 'Facebook', 'Snapchat', 'Social web campaigns'].map(p => (
                    <span className="ia-works-pill" key={p}>{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="ia-service-cta">
              <button className="btn-primary" onClick={() => scrollTo('#ia-final-cta')}>See a Social Ad Demo for Your Product</button>
            </div>
          </div>

          <div className="ia-service-right">
            <div className="ia-phone-wrap">
              <div className="ia-phone-shell">
                <div className="ia-phone-notch" />
                <div className="ia-phone-screen">
                  <video src="/video/Yru_on_inside_ad.mp4" autoPlay loop muted playsInline />
                </div>
                <div className="ia-phone-chin" />
              </div>
              <div className="ia-phone-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 SERVICE 02 — PRINT ── */}
      <section className="ia-section ia-service2-section" id="ia-service2" ref={service2Ref}>
        <div className={`section-inner ia-service2-three-col ${service2Visible ? 'reveal' : ''}`}>
          <div className="ia-service2-video-left">
            <div className="ia-screen-wrap">
              <div className="ia-screen-shell">
                <div className="ia-screen-bar">
                  <div className="ia-screen-dot" /><div className="ia-screen-dot" /><div className="ia-screen-dot" />
                </div>
                <div className="ia-screen-display">
                  <video src="/video/print_adsV3.mp4" autoPlay loop muted playsInline />
                </div>
              </div>
              <div className="ia-screen-base" />
              <div className="ia-screen-glow" />
            </div>
          </div>

          <div className="ia-service2-content">
            <span className="section-label">Solution</span>
            <h2 className="section-headline">
              <span className="ia-heading-line">Immersive Print</span><br />
              <span className="headline-accent ia-heading-line">Media Ads</span>
            </h2>
            <p className="ia-service-subhead">Your print Ad is being read for 30 seconds and forgotten. It does not have to be.</p>
            <div className="ia-explainer-box ia-explainer-dark">
              <p className="ia-explainer-lead">You run a newspaper advertisement. A magazine spread. A brochure. A hoarding. A catalogue.</p>
              <p>In the corner: a QR code. Below it: one line — <em>Scan to experience this.</em></p>
              <p>Your reader scans with their phone. Your product appears on their screen in interactive 3D or in augmented reality, placed in their actual physical space. They rotate it. Explore it. See it from angles your photograph could never show.</p>
              <p className="ia-explainer-close">They spend two to three minutes with your product, right there with your physical Ad in their hands.</p>

              <button
                type="button"
                className="ia-learn-more-btn"
                onClick={() => setService2Open(v => !v)}
                aria-expanded={service2Open}
                style={{ marginTop: '12px' }}
              >
                {service2Open ? 'Show less' : 'Learn more'}
              </button>
            </div>

            <div className={`ia-learn-more-content ${service2Open ? 'open' : ''}`} style={{ border: 'none', padding: 0, boxShadow: 'none' }}>
              <div className="ia-features-grid">
                {[
                  { icon: '⬚', title: '3D Product Experience from Print', body: 'Scan the QR code on any print material and your product opens in a fully interactive 3D viewer. Customers rotate, zoom, and explore in complete detail all triggered from something as simple as a newspaper page or brochure.' },
                  { icon: '⟐', title: 'AR Placement from Print', body: "Your product appears in augmented reality placed in the customer's real physical environment at true scale, through their phone camera. They see your product in their space before they have bought it." },
                  { icon: '◻', title: 'QR-Activated Brand Stories', body: 'Scan the code and the Ad becomes a richer experience, product demonstrations, interactive lookbooks, behind the scenes content. Your print material becomes an entry point into deeper brand engagement, not a dead end.' },
                ].map((f) => (
                  <div className="ia-feature-card ia-feature-card-alt" key={f.title}>
                    <span className="ia-feature-icon">{f.icon}</span>
                    <h3 className="ia-feature-title">{f.title}</h3>
                    <p className="ia-feature-body">{f.body}</p>
                  </div>
                ))}
              </div>
              <div className="ia-print-change">
                <h3 className="ia-print-change-title">What changes for your business</h3>
                <div className="ia-print-change-list">
                  <div className="ia-change-item">
                    <p>Your print advertising budget which was previously impossible to measure becomes trackable. How many people scanned. How long they stayed. What they interacted with. Whether they visited your store or website after.</p>
                  </div>
                  <div className="ia-change-item">
                    <p>Your existing print campaigns carry more weight. The same newspaper Ad, the same exhibition brochure, the same catalogue you already produce each one now has a layer of interaction your competitors cannot match.</p>
                  </div>
                  <div className="ia-change-item">
                    <p>Your customer arrives with a level of understanding and confidence that a static Ad could never build because they spent real time with your product, not a photograph of it.</p>
                  </div>
                </div>
              </div>
              <div className="ia-works-on">
                <span className="ia-works-label">Works on</span>
                <div className="ia-works-pills">
                  {['Newspaper ads', 'Magazine spreads', 'Brochures', 'Product catalogues', 'Exhibition standees', 'Hoardings', 'Direct mailers'].map(p => (
                    <span className="ia-works-pill" key={p}>{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="ia-service-cta">
              <button className="btn-primary" onClick={() => scrollTo('#ia-final-cta')}>See a Print Ad Demo</button>
            </div>
          </div>

          <div className="ia-service2-video-right">
            <div className="ia-phone-wrap">
              <div className="ia-phone-shell">
                <div className="ia-phone-notch" />
                <div className="ia-phone-screen">
                  <video src="/video/print_adsV11.mp4" autoPlay loop muted playsInline />
                </div>
                <div className="ia-phone-chin" />
              </div>
              <div className="ia-phone-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 COMPARISON ── */}
      <section className="ia-comparison-section" id="ia-comparison" ref={comparisonRef}>
        <div className={`ia-comparison-inner ${comparisonVisible ? 'reveal' : ''}`}>
          <span className="section-label">What Changes</span>
          <h2 className="ia-comparison-headline">
            <span className="ia-heading-line">Same Ad budget.</span><br />
            <span className="headline-accent ia-heading-line">Completely different result.</span>
          </h2>
          <div className="ia-comparison-grid">
            <div className="ia-compare-col ia-compare-before">
              <div className="ia-compare-header">
                <span className="ia-compare-tag ia-compare-tag-muted">Regular Ad</span>
                <h3>When your customer watches a regular Ad</h3>
              </div>
              <ul className="ia-compare-list">
                <li>They see your product for a few seconds.</li>
                <li>They scroll past.</li>
                <li>They forget it by the time they reach the next post.</li>
                <li>If they remember anything, it is a vague impression not a feeling.</li>
                <li>They might visit you eventually, with plenty of doubt still in their mind.</li>
              </ul>
            </div>
            <div className="ia-compare-col ia-compare-after">
              <div className="ia-compare-header">
                <span className="ia-compare-tag ia-compare-tag-accent">Immersive Ad</span>
                <h3>When your customer experiences an immersive Ad</h3>
              </div>
              <ul className="ia-compare-list ia-compare-list-accent">
                <li>They interact with your product for two to three minutes.</li>
                <li>They screenshot what they love.</li>
                <li>They share it with someone they trust.</li>
                <li>They arrive at your store or website already emotionally connected.</li>
                <li>They buy with confidence because they have already experienced what they are getting.</li>
              </ul>
            </div>
          </div>
          <p className="ia-comparison-statement">
            <em>The first brand in any market to give its customers this experience is the one they remember. The brand that follows is the one that copied.</em>
          </p>
        </div>
      </section>

      {/* ── 07 PROCESS ── */}
      <section className="ia-section ia-process-section" id="ia-process" ref={processRef}>
        <div className={`section-inner ${processVisible ? 'reveal' : ''}`}>
          <h2 className="ia-hero-headline ia-process-headline">
            <span className="ia-heading-line">From your first call to a live campaign,</span><br />
            <span className="headline-accent ia-heading-line">In Days.</span>
          </h2>
        </div>
      </section>

      {/* ── 10 COMPETITIVE CLOSE ── */}
      <section className="ia-close-section" id="ia-close" ref={closeRef}>
        <div className={`ia-close-inner ${closeVisible ? 'reveal' : ''}`}>
          <span className="section-label ia-label-light">The Decision</span>
          <h2 className="ia-close-headline">
            <span className="ia-heading-line">The brand that does this first in your market</span><br />
            <span className="headline-accent ia-heading-line">is the brand that gets remembered.</span>
          </h2>
          <div className="ia-close-body">
            <p>You are reading this before your main competitor has. That means the decision you make today determines which side of that line you stand on when your next campaign goes live.</p>

            <button
              type="button"
              className="ia-learn-more-btn"
              onClick={() => setCloseLearnMoreOpen((current) => !current)}
              aria-expanded={closeLearnMoreOpen}
              aria-controls="ia-close-learn-more"
            >
              {closeLearnMoreOpen ? 'Show less' : 'Learn more'}
            </button>

            <div
              id="ia-close-learn-more"
              className={`ia-learn-more-content ${closeLearnMoreOpen ? 'open' : ''}`}
            >
              <p>Right now, the brand competing with you for the same customers has not run an immersive campaign yet. That window to be first is open.</p>
              <p>When a brand is first to give its customers a new kind of experience, two things happen. Customers remember them as the brand that showed them something new. Competitors notice and start asking questions.</p>
              <p className="ia-close-bold">The first brand gets the story. The second brand gets compared.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11 FINAL CTA ── */}
      <section className="ia-section ia-cta-section" id="ia-final-cta" ref={ctaRef}>
        <div className={`section-inner ${ctaVisible ? 'reveal' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className="cta-headline">
            <span className="ia-heading-line">See your product inside an immersive Ad.</span><br />
            <span className="headline-accent ia-heading-line">Before this call ends.</span>
          </h2>
          <p className="cta-sub">
            Book 30 minutes. Tell us what you sell. We will build a working sample from your product
            and show it to you live on the call so you see exactly what your customer will
            experience, before you commit to anything.
          </p>
          <div className="cta-container" style={{ marginTop: '40px' }}>
            <button
              className="btn-primary"
              onClick={() =>
                Calendly.initPopupWidget({
                  url: 'https://calendly.com/pixrity-info/new-meeting'
                })
              }
            >
              Book a Demo
            </button>
            <button className="btn-secondary ia-whatsapp-btn" onClick={() => window.open('https://api.whatsapp.com/send/?phone=917204466161&text=Hello+Pixrity%2C+I+want+to+explore+your+solutions+across+immersive+AI+experiences&type=phone_number&app_absent=0', '_blank')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat With Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ── 08 FAQ ── */}
      <section className="ia-section ia-faq-section" id="ia-faq" ref={faqRef}>
        <div className={`section-inner ${faqVisible ? 'reveal' : ''}`}>
          <span className="section-label">FAQ</span>
          <h2 className="section-headline">
            <span className="ia-heading-line">Answers to the questions</span><br />
            <span className="headline-accent ia-heading-line">every brand asks first.</span>
          </h2>
          <div className="ia-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`ia-faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="ia-faq-question">
                  <span>{faq.q}</span>
                  <span className="ia-faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p className="ia-faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>

          <AskQuestion />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
            <div className="footer-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={logoFooter} alt="PIXRITY Logo" className="footer-logo-img" style={{ width: '36px', height: '36px', objectFit: 'contain', display: 'block', flexShrink: 0 }} />
              <span className="footer-logo">PIXRITY</span>
            </div>
            <span className="footer-tagline">Transforming Experience</span>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <span className="footer-col-label">Solutions</span>
              <a href="/jewellery-solutions" onClick={(e) => { e.preventDefault(); navigate('/jewellery-solutions'); }}>Immersive Jewellery</a>
              <a href="/immersive-industrial" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); }}>Immersive Industrial</a>
              <a href="/ai-solutions" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); }}>Agentic AI</a>
              <a href="/immersive-advertising" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); }}>Immersive Advertising</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Product</span>
              <a href="/product" onClick={(e) => { e.preventDefault(); navigate('/product'); }}>AI 3D Generator <span className="footer-badge">✦ Soon</span></a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Company</span>
              <a href="#ia-close" onClick={handleSmoothScroll}>About</a>
              <a href="#ia-final-cta" onClick={handleSmoothScroll}>Insights</a>
              <a href="#ia-final-cta" onClick={handleSmoothScroll}>Contact</a>
              <a
                href="https://wa.me/917204466161"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp-link"
              >
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
          <span>© 2026 Pixrity Private Limited. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
/* global Calendly */
import { useState, useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import '../styles/IndustrialSolutionsPage.css';
import logoIcon     from '../assets/PHOTO-2025-12-18-10-27-20.png';
import logoInverted from '../assets/logo-inverted.png';

// ── Project asset images ──
import imgHero            from '../assets/product_visualization.png';
import imgExecution       from '../assets/industrial_workful.png';
import imgIntelligent     from '../assets/card3.png';
import imgBuiltToLast     from '../assets/Training_Onboarding.png';
import imgOneteam         from '../assets/card5real.png';
import imgSolutionsJewel  from '../assets/card6.png';

function useSnapReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

export default function IndustrialSolutionsPage() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const snapPageRef = useRef(null);

  useSnapReveal();

  useEffect(() => {
    const el = snapPageRef.current;
    const handleScroll = () => setScrolled((el ? el.scrollTop : window.scrollY) > 60);
    const target = el || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleSmoothScroll = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }
    }
  };

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMenuOpen(false);
  };

  // ── DATA ──────────────────────────────────────────────────────────────────

  const problems = [
    { num: '01', title: 'Large & Complex',        label: 'Size & Complexity',  desc: 'Industrial products are often too massive or intricate to convey through standard photography or 2D catalogs.' },
    { num: '02', title: 'Expensive to Transport', label: 'Logistics Cost',     desc: 'Moving heavy machinery for exhibitions or client trials incurs massive shipping and insurance costs.' },
    { num: '03', title: 'Hard to Explain',        label: 'Static Limits',      desc: 'Static images fail to show internal assemblies, mechanical movements, or the true scale of the equipment.' },
    { num: '04', title: 'Sample Costs',           label: 'Sample Waste',       desc: 'Shipping physical samples globally is not just slow but often prohibitively expensive for industrial components.' },
    { num: '05', title: 'Catalog Failure',        label: 'Documentation Gap',  desc: 'Traditional PDF catalogs lack interactivity, leaving buyers with unanswered questions about fitment and operation.' },
    { num: '06', title: 'Assembly Struggle',      label: 'Complexity Hurdle',  desc: 'Without being able to "see inside," buyers struggle to grasp complex assemblies and maintenance requirements.' },
  ];

  // 6 XR solution cards — images from project assets
  const xrSolutions = [
    {
      num: '01',
      title: 'Immersive Product Visualization',
      img: imgHero,
      desc: 'Experience products in lifelike 3D through interactive XR for better understanding and faster decisions.',
      points: [
        'View products in true and across scale',
        'Transform (rotate, zoom), inspect, and explore',
        'Understand dimensions, finishes, assemblies',
        'Show fitment in real environments',
        'Reduce installation and service errors',
      ],
    },
    {
      num: '02',
      title: 'Interactive Product Exploration',
      img: imgExecution,
      desc: 'Explore every layer, component, and detail of complex products with intuitive interactive views.',
      points: [
        'Drill down into internal components',
        'Explode-view assemblies in real time',
        'Highlight specific parts on demand',
        'Works on any modern smartphone',
      ],
    },
    {
      num: '03',
      title: 'Product Understanding & Simulation',
      img: imgIntelligent,
      desc: 'Understand product functionality through realistic simulations and real world use case demonstrations.',
      points: [
        'Simulate operating conditions',
        'Visualise flow paths and mechanical motion',
        'Replace long PDFs with interactive demos',
        'Reduce buyer objections instantly',
      ],
    },
    {
      num: '04',
      title: 'Immersive Training & Simulation',
      img: imgBuiltToLast,
      desc: 'Enable safer, faster, and more effective workforce training through realistic virtual scenarios.',
      points: [
        'AR-guided step-by-step training modules',
        'Faster technician onboarding',
        'Higher retention, fewer field mistakes',
        'No physical equipment required',
      ],
    },
    {
      num: '05',
      title: 'Guided Assembly & Maintenance',
      img: imgOneteam,
      desc: 'Simplify assembly and servicing with step by step AR guided instructions and workflows.',
      points: [
        'Overlay instructions directly on the product',
        'Reduce service call duration',
        'Works offline after first load',
        'Compatible with field technician tablets',
      ],
    },
    {
      num: '06',
      title: 'AR Wayfinder for Inventory & Logistics',
      img: imgSolutionsJewel,
      desc: 'Navigate spaces and locate products efficiently with smart AR based wayfinding and indoor guidance.',
      points: [
        'Real-time indoor navigation via AR',
        'Locate SKUs in large warehouses instantly',
        'Integrate with existing ERP/WMS systems',
        'Reduce pick errors and search time',
      ],
    },
  ];

  const steps = [
    {
      num: '01', label: 'Preparation', title: 'Provide 2D Files',
      desc: 'Simply share your CAD or product design files with us. We handle the heavy lifting of conversion.',
      points: ['Compatible with major 2D formats', 'Secure data handling', 'Optimization for web performance'],
    },
    {
      num: '02', label: 'Transformation', title: 'Asset Optimization',
      desc: 'PIXRITY converts complex models into high fidelity, optimized 3D XR assets ready for instant web access.',
      points: ['Photorealistic materials', 'Lightweight loading', 'Cross-device compatibility'],
    },
    {
      num: '03', label: 'Deployment', title: 'Share Globally',
      desc: 'Your product becomes a digital link or QR code, accessible via WhatsApp, email, or your website instantly.',
      points: ['No apps required', 'Instant distribution to buyers', 'Embed in digital brochures'],
    },
  ];

  const enables = [
    { icon: '🎯', text: 'Sales Visualization Without Samples' },
    { icon: '🔬', text: 'Visual Clarity for Complex Mechanisms' },
    { icon: '🎓', text: 'Accelerated Training & Onboarding' },
    { icon: '🔧', text: 'Installation & Maintenance Guidance' },
    { icon: '✅', text: 'Quality Validation Before Manufacturing' },
    { icon: '🌐', text: 'Global Product Reach via Simple Links' },
    { icon: '📦', text: 'Massive Reduction in Sample Logistics' },
    { icon: '⚡', text: 'Accelerated Buyer Decision Cycles' },
  ];

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* FIXED NAV */}
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#050040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {dropdownOpen && (
              <div className="cmd-panel">
                <a href="/jewellery-solutions" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/jewellery-solutions'); setMenuOpen(false); setDropdownOpen(false); }}>
                  Immersive Jewellery Solutions
                </a>
                <a href="/immersive-industrial" className="cmd-item cmd-item-active">
                  Immersive Industrial Solutions
                </a>
                <a href="/immersive-advertising" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); setMenuOpen(false); setDropdownOpen(false); }}>
                  Immersive Advertising
                </a>
                <a href="/ai-solutions" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); setMenuOpen(false); setDropdownOpen(false); }}>
                  Agentic AI Solutions
                </a>
              </div>
            )}
          </div>
          <a href="#is-enables" onClick={handleSmoothScroll}>About</a>
          <a href="#is-how" onClick={handleSmoothScroll}>Insights</a>
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

      {/* LOGO WATERMARK */}
      <a href="/" className={`logo-watermark${scrolled ? ' logo-scrolled' : ''}`} aria-label="Pixrity home" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        <img src={logoIcon} alt="Pixrity Logo" className="logo-watermark-icon" />
        <div className="logo-text-group">
          <span className="logo-text">PIXRITY</span>
        </div>
      </a>

      {/* ══ SCROLL SNAP CONTAINER ══ */}
      <div className="snap-page" ref={snapPageRef}>

        {/* ── 01 HERO ── */}
        <section className="snap-section is-hero-snap" id="is-home">
          <div className="is-hero-body">
            <h1 className="is-hero-headline">
              Market Your Industrial<br />
              Products <span className="headline-accent">Worldwide</span>
            </h1>
            <p className="is-hero-description">
              Help buyers visualize complex machinery, equipment, and components in true scale
              interactive 3D and XR, directly from their phone or browser. Turn heavy industrial
              products into digital experiences that sell globally.
            </p>
            <div className="cta-container">
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
              <button className="btn-secondary" onClick={() => scrollTo('#is-problems')}>Explore the Solutions</button>
            </div>
          </div>
        </section>

        {/* ── 02 PROBLEMS ── */}
        <section className="snap-section is-problems-snap" id="is-problems">
          <div className="is-problems-inner">
            <div className="is-problems-top">
              <div>
                <span className="section-label">The Challenge</span>
                <h2 className="is-problems-headline" style={{ marginTop: '14px' }}>
                  Industrial Products Are<br />
                  Hard to Sell <span className="headline-accent">Digitally.</span>
                </h2>
              </div>
            </div>
            <div className="is-problems-grid">
              {problems.map((p) => (
                <div className="is-problem-card" key={p.num}>
                  <div className="is-problem-header">
                    <span className="is-problem-label">{p.label}</span>
                  </div>
                  <h3 className="is-problem-title">{p.title}</h3>
                  <p className="is-problem-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 XR SOLUTIONS — 2×3 card grid ── */}
        <section className="snap-section is-solutions-snap" id="is-solutions">
          <div className="section-inner">
            <span className="section-label">Our Solutions</span>
            <h2 className="section-headline">
              Turn Industrial Products Into<br />
              <span className="headline-accent">Interactive XR Experiences.</span>
            </h2>

            <div className="is-xr-cards-grid">
              {xrSolutions.map((s) => (
                <div className="is-xr-card" key={s.num}>
                  {/* Image with hover overlay */}
                  <div className="is-xr-card-img-wrap">
                    <img src={s.img} alt={s.title} className="is-xr-card-img" />
                    <div className="is-xr-card-overlay">
                      <p className="is-xr-card-overlay-desc">{s.desc}</p>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="is-xr-card-body">
                    <span className="is-xr-card-num">{s.num}</span>
                    <h3 className="is-xr-card-title">{s.title}</h3>
                    <button
                      className="is-xr-card-learn-more"
                      onClick={() => scrollTo('#is-final-cta')}
                    >
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 HOW IT WORKS ── */}
        <section className="snap-section is-how-snap" id="is-how">
          <div className="section-inner">
            <span className="section-label">The Process</span>
            <h2 className="section-headline">
              From a simple image to<br />
              <span className="headline-accent">Global XR Experience.</span>
            </h2>
            <p className="section-intro">
              How PIXRITY transforms your industrial product marketing into a streamlined digital workflow.
            </p>
            <div className="is-steps-grid">
              {steps.map((s, i) => (
                <div className="is-step-card" key={s.num}>
                  <div className="is-step-top">
                    <span className="is-step-label">Step {s.num}</span>
                    <span className="is-step-phase">{s.label}</span>
                  </div>
                  <h3 className="is-step-title">{s.title}</h3>
                  <p className="is-step-desc">{s.desc}</p>
                  <ul className="is-step-points">
                    {s.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  {i < steps.length - 1 && <div className="is-step-connector" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 ENABLES ── */}
        <section className="snap-section is-enables-snap" id="is-enables">
          <div className="is-enables-inner">
            <span className="section-label">Capabilities</span>
            <h2 className="is-enables-headline">What PIXRITY Enables.</h2>
            <span className="is-enables-sub">
              Eight ways immersive XR changes how industrial products are sold, trained, and understood.
            </span>
            <div className="is-enables-grid">
              {enables.map((item) => (
                <div className="is-enable-item" key={item.text}>
                  <span className="is-enable-icon">{item.icon}</span>
                  <span className="is-enable-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 CTA ── */}
        <section className="snap-section is-cta-snap" id="is-final-cta">
          <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 className="cta-headline">
              Make Your Industrial Products<br /><span className="j-grad-text">Visible to the World</span>
            </h2>
            <p className="cta-sub">
              Stop relying on photos, videos, and physical samples.<br />
              Start showcasing with interactive XR.
            </p>
            <div className="cta-container">
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
              <button className="btn-secondary" onClick={() => scrollTo('#is-solutions')}>
                Explore Solutions →
              </button>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer snap-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src={logoInverted} alt="Pixrity Logo" className="footer-logo-img" />
              <span className="footer-logo">PIXRITY</span>
              <span className="footer-tagline">TransformING Experience</span>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <span className="footer-col-label">Solutions</span>
                <a href="/jewellery-solutions" onClick={(e) => { e.preventDefault(); navigate('/jewellery-solutions'); }}>Immersive Jewellery Solutions</a>
                <a href="/immersive-industrial" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); }}>Immersive Industrial Solutions</a>
                <a href="/immersive-advertising" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); }}>Immersive Advertising</a>
                <a href="/ai-solutions" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); }}>Agentic AI</a>
              </div>
              <div className="footer-col">
                <span className="footer-col-label">Product</span>
                <a href="/product" onClick={(e) => { e.preventDefault(); navigate('/product'); }}>AI 3D Generator <span className="footer-badge">✦ Soon</span></a>
              </div>
              <div className="footer-col">
                <span className="footer-col-label">Company</span>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>About</a>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Insights</a>
                <a href="#is-final-cta" onClick={handleSmoothScroll}>Contact</a>
                <a
                  href="https://wa.me/917204466161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-whatsapp-link"
                >
                  <span className="footer-whatsapp-icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.47 0 .08 5.39.08 12c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62A11.94 11.94 0 0 0 12.08 24C18.69 24 24 18.61 24 12c0-3.2-1.24-6.21-3.48-8.52ZM12.08 21.97c-1.79 0-3.54-.48-5.07-1.39l-.36-.21-3.66.96.98-3.57-.23-.37A9.9 9.9 0 0 1 2.1 12c0-5.5 4.48-9.97 9.98-9.97 2.66 0 5.16 1.04 7.04 2.92A9.88 9.88 0 0 1 21.97 12c0 5.5-4.39 9.97-9.89 9.97Zm5.47-7.46c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                    </svg>
                  </span>
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>info@pixrity.com · +91 7204466161 · pixrity.com</span>
            <span>© 2026 PIXRITY Private Limited. All rights reserved.</span>
          </div>
        </footer>

      </div>
    </>
  );
}
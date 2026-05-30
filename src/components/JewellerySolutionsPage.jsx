/* global Calendly */
import { useState, useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import '../styles/JewellerySolutionsPage.css';
import logoIcon from '../assets/PHOTO-2025-12-18-10-27-20.png';
import logoInverted from '../assets/logo-inverted.png';

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

export default function JewellerySolutionsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeAd, setActiveAd] = useState(0);
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  // Sol1 & Sol2 card expansion state
  const [expandedSol1, setExpandedSol1] = useState(null);
  const [expandedSol2, setExpandedSol2] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const vidRef = useRef(null);

  const handlePlayVideo = () => {
    if (vidRef.current) {
      vidRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') { setMenuOpen(false); setDropdownOpen(false); } };
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

  useEffect(() => { document.body.classList.toggle('menu-open', menuOpen); }, [menuOpen]);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSmoothScroll = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const [problemRef, problemVisible] = useScrollReveal();
  const [videoRef, videoVisible] = useScrollReveal();
  const [platformRef, platformVisible] = useScrollReveal();
  const [sol1Ref, sol1Visible] = useScrollReveal();
  const [sol2Ref, sol2Visible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [sol3Ref, sol3Visible] = useScrollReveal();
  const [benefitsRef, benefitsVisible] = useScrollReveal();
  const [whyRef, whyVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const handleFormSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim()) return;

    setFormLoading(true);
    setFormError(false);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'New Enquiry — Pixrity Jewellery Solutions',
          name: formData.name,
          email: formData.email,
          message: `New enquiry received from the Jewellery Solutions page.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nEnquiry For: ${formData.service || 'Not selected'}`,
        }),
      });

      if (res.ok) {
        setFormSubmitted(true);
      } else {
        setFormError(true);
      }
    } catch {
      setFormError(true);
    } finally {
      setFormLoading(false);
    }
  };

  const problems = [
    { num: '01', label: 'Inventory Cost', title: 'Capital Stuck in Inventory', preview: 'Unsold jewellery ties up working capital without guaranteeing a sale.', desc: 'Money should not sit in showcases. Unsold jewellery ties up working capital, storage space, insurance, and daily operational effort without guaranteeing a sale.' },
    { num: '02', label: 'Stuck Economics', title: 'Beautiful Designs. Broken Economics.', preview: 'Capital locked in stock, limited displays, customers hesitate at the final moment.', desc: 'Behind every showroom lies a quiet struggle — capital locked in stock, limited displays, and customers who hesitate at the final moment.' },
    { num: '03', label: 'Trend Delay', title: 'When Trends Move Faster Than Stock', preview: 'Slow-moving designs block cash flow and restrict variety.', desc: 'What sold yesterday does not always sell today. Customer preferences change quickly, but inventory does not. Slow moving designs block cash flow and restrict variety.' },
    { num: '04', label: 'Display Limits', title: 'Limited Displays. Limited Selling.', preview: 'Physical space lets you show only a fraction of your collection.', desc: 'Your showroom cannot show everything you own. Physical space allows you to present only a fraction of your collection, while customers want choice, comparison, and exploration.' },
    { num: '05', label: 'Scalability Gap', title: 'An Experience That Cannot Scale', preview: 'Customers wait. Staff juggle. Opportunities slip — especially during peak hours.', desc: 'Customers wait. Staff juggle. Opportunities slip. Not every customer can try everything, and not every staff member can assist everyone at once especially during peak hours.' },
    { num: '06', label: 'Lost Conversion', title: 'The Moment Where Sales Are Lost', preview: 'Customers who cannot visualise jewellery walk away to "think about it."', desc: 'Interest is high. Confidence is not. When customers cannot clearly visualise how jewellery looks on them, they walk away to "think about it."' },
  ];

  const sharedFeatures = [
    {
      icon: '', title: 'XR Visualisation', subtitle: 'Let customers see every detail before they decide.',
      video: '/video/Visualization1.mp4',
      desc: 'A high-fidelity product explorer that brings jewellery to life with realistic lighting, depth, and scale — so customers do not just see jewellery, they experience it.',
      points: ['True-to-life materials and reflections', 'Explore every design from every angle', 'Craftsmanship and fine detail highlighted precisely', 'Runs directly in the browser — no app, no setup'],
    },
    {
      icon: '', title: 'XR Try-On', subtitle: 'Precision that builds confidence.',
      video: '/video/XR_tryon.mp4',
      desc: 'Accurate try-on that places jewellery naturally on the customer in real time — so they know exactly how it looks on them, before they have committed to anything.',
      points: ['Accurate placement for rings, necklaces, bangles, and earrings', 'Real-time movement and alignment as they move', 'Natural, believable on-body experience', 'Runs directly in the browser'],
    },
    {
      icon: '', title: 'Virtual Try-On', subtitle: 'Instant. Effortless.',
      video: '/video/Virtual_tryon.mp4',
      desc: 'Turn your current product catalogue into an interactive try-on experience — ready to scale as your business grows.',
      points: ['Try any design from your full catalogue instantly', 'Runs directly in the browser', 'Works across mobile, tablet, and desktop', 'Easy to deploy, easy to scale'],
    },
  ];

  const adTabs = [
    {
      label: 'Social Media Ads',
      title: 'Try on jewellery inside the ad itself.',
      subtitle: 'Immersive Social Media Ads',
      video: '/video/Yru_on_inside_ad.mp4',
      pill: 'Social Media Ads',
      outcomesTitle: 'What Immersive Social Media Ads Deliver',
      outcomesDesc: 'One tap. Your jewellery appears on your customer in real time — inside the Instagram or Facebook ad. They switch designs, screenshot, and arrive at your store having already decided.',
      outcomes: [
        'AR try-on inside the social ad — no redirect, no friction',
        'Real-time accurate jewellery placement on the customer\'s face and body',
        'Switch designs without leaving the ad — explore the full collection',
        'Screenshot and share instantly — built-in social proof',
        'Higher engagement and qualified traffic arriving ready to buy',
      ],
    },
    {
      label: 'Print Media Ads',
      title: 'Your print ad comes alive in their hands.',
      subtitle: 'Immersive Print Media Ads',
      video: '/video/print_adsV11.mp4',
      pill: 'Print Media Ads',
      outcomesTitle: 'What Immersive Print Media Ads Deliver',
      outcomesDesc: 'One QR code on any print material. Your jewellery opens in full 3D or AR on their phone — in the real space around them. The page they used to turn becomes three minutes of exploration.',
      outcomes: [
        'QR code launches instantly in any browser — nothing to download',
        'Full 3D view — rotatable, zoomable, every angle explored',
        'AR placement of jewellery in the customer\'s real environment',
        'Works on any smartphone, any print format — catalogues, hoardings, spreads',
        'Measurable engagement: dwell time, interactions, and conversions tracked',
      ],
    },
  ];

  const whyPoints = [
    { label: 'Reduced inventory holding costs',       sub: 'Show more with less physical stock on hand.',               icon: '📦' },
    { label: 'Faster sales cycles',                   sub: 'From curious browser to confident buyer — quickly.',        icon: '⚡' },
    { label: 'Higher conversion rates',               sub: 'Immersive try-on turns interest into decisions.',            icon: '📈' },
    { label: 'Lower return rates',                    sub: 'Customers know exactly what they are buying.',              icon: '↩️' },
    { label: 'Stronger brand perception & loyalty',   sub: 'Premium experiences build lasting relationships.',          icon: '👑' },
    { label: 'Jewellery-first design & realism',      sub: 'Built specifically for the craft and detail of jewellery.', icon: '💎' },
    { label: 'Focused on cost savings & conversions', sub: 'Every feature is tied to a measurable outcome.',            icon: '🎯' },
    { label: 'Secure, scalable, enterprise-ready',    sub: 'Grows with your business without compromise.',              icon: '🔒' },
  ];

  const sol1Cards = [
    {
      id: 'customer',
      label: 'What Customers Experience',
      icon: '✦',
      items: [
        'Immersive visualisation of jewellery at true-to-life quality',
        'Real-time jewellery try-on with accurate placement',
        'Instant comparison of designs, styles, and variations',
        'Products viewed and explored from every angle',
        'Smart mirrors and interactive display formats',
        'One tap journey from exploration to purchase',
      ],
    },
    {
      id: 'business',
      label: 'What It Delivers for Your Business',
      icon: '✦',
      items: [
        'Higher walk-in to purchase conversion',
        'Reduced dependency on physical stock',
        'Faster decision-making with fewer staff interventions',
        'Lower staff effort in handling and showcasing products',
        'Optimised inventory and lower operational costs',
      ],
    },
  ];

  const sol2Cards = [
    {
      id: 'customer',
      label: 'What Customers Experience',
      icon: '✦',
      items: [
        'Try jewellery on themselves directly from product pages',
        'Visualise products from every angle in full 3D',
        'Explore designs on mobile, tablet, and desktop',
        'No app downloads required at any step',
        'Checkout instantly after the immersive experience',
      ],
    },
    {
      id: 'business',
      label: 'What It Delivers for Your Business',
      icon: '✦',
      items: [
        'Higher add-to-cart and checkout conversions',
        'Fewer online returns',
        'Increased confidence for high value online purchases',
        'Online shopping that feels as real as the showroom',
        'Stronger brand trust and differentiation from competitors',
      ],
    },
  ];

  const handleSolCardClick = (cardId, expanded, setExpanded) => {
    setExpanded(expanded === cardId ? null : cardId);
  };

  return (
    <>
      {/* NAV */}
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
                <a href="/jewellery-solutions" className="cmd-item cmd-item-active">
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
          <a href="#j-benefits" onClick={handleSmoothScroll}>About</a>
          <a href="#j-why" onClick={handleSmoothScroll}>Insights</a>
          <button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="nav-right">
          <button className="contact-btn" onClick={() => scrollTo('#j-contact-form')}>Contact Us</button>
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

      {/* ── 01 HERO ── */}
      <section className="j-hero-section" id="j-home">
        <div className="j-hero-body">
          <h1 className="j-hero-headline">
            The Jewellery Experience<br />
            <span className="j-headline-accent">Reimagined.</span>
          </h1>
          <p className="j-hero-sub">
            At Pixrity we deliver immersive experiences that accelerate sales and bring jewellery shopping to life.
            Let your customers visualise, try on, and confidently purchase jewellery wherever they shop
            whether they are in-store, online, or discovering your brand through ads.
          </p>
          <div className="j-hero-cta-row">
            <button className="btn-primary" onClick={() => scrollTo('#j-platform')}>Explore Our Solutions</button>
            <button className="contact-btn" onClick={() => scrollTo('#j-contact-form')}>Book a Demo</button>
          </div>
        </div>
        <div className="j-hero-bg-orbs">
          <div className="j-orb j-orb-1"></div>
          <div className="j-orb j-orb-2"></div>
          <div className="j-orb j-orb-3"></div>
        </div>
      </section>

      {/* ── VIDEO SHOWCASE ── */}
      <section className="j-section j-video-section" id="j-video">
        <div className={`section-inner ${videoVisible ? 'reveal' : ''}`} ref={videoRef}>
          <div className="j-video-split">
            <div className="j-video-left">
              <span className="section-label">See It In Action</span>
              <h2 className="section-headline">
                Experience the Future of
                <span className="j-headline-accent"> Jewellery Retail.</span>
              </h2>
              <p className="section-intro">
                Watch how Pixrity transforms the way customers discover, visualise, and purchase jewellery
                in-store, online, and through every touchpoint of their journey.
              </p>
              <div className="j-video-stats-col">
                <div className="j-video-stat-row">
                  <div className="j-video-stat-num">3×</div>
                  <div className="j-video-stat-label">Higher conversion rates vs traditional retail</div>
                </div>
                <div className="j-video-stat-row">
                  <div className="j-video-stat-num j-stat-60">60%</div>
                  <div className="j-video-stat-label">Reduction in product returns</div>
                </div>
                <div className="j-video-stat-row">
                  <div className="j-video-stat-num j-infinity-fix">∞</div>
                  <div className="j-video-stat-label">Digital catalogue — no physical limits</div>
                </div>
              </div>
              <div className="j-video-cta-row">
                <button className="contact-btn"
                  onClick={() => Calendly.initPopupWidget({ url: 'https://calendly.com/pixrity-info/new-meeting' })}>
                  Book a Demo
                </button>
                <button className="btn-secondary" onClick={() => scrollTo('#j-platform')}>Explore Solutions</button>
              </div>
            </div>
            <div className="j-video-right">
              <div className="j-video-glow-wrap">
                <div className="j-video-frame">
                  <video
                    ref={vidRef}
                    src="/video/jewel_main_vid.mp4"
                    controls={isPlaying}
                    playsInline
                    preload="metadata"
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <div
                    className={`j-video-overlay ${isPlaying ? 'hidden' : ''}`}
                    onClick={handlePlayVideo}
                  >
                    <div className="j-play-ring"></div>
                    <div className="j-play-ring j-play-ring-2"></div>
                    <div className="j-play-btn">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {!isPlaying && (
                    <div className="j-video-duration">Click to play</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 PROBLEM ── */}
      <section className="j-section j-problem-section" id="j-problem">
        <div className={`section-inner ${problemVisible ? 'reveal' : ''}`} ref={problemRef}>
          <span className="section-label">The Reality</span>
          <h2 className="section-headline">
            The Real Cost of Selling<br />
            <span className="j-headline-accent">Jewellery Today.</span>
          </h2>
          <div className="j-problem-grid">
            {problems.map((p, i) => (
              <div
                className={`j-problem-card ${expandedProblem === i ? 'j-problem-card--expanded' : ''}`}
                key={i}
                onClick={() => setExpandedProblem(expandedProblem === i ? null : i)}
              >
                <div className="j-problem-card-top">
                  <span className="j-problem-label">{p.label}</span>
                </div>
                <h3 className="j-problem-title">{p.title}</h3>
                <p className="j-problem-preview">{p.preview}</p>
                <div className="j-problem-expandable">
                  <p className="j-problem-desc">{p.desc}</p>
                </div>
                <button
                  className="j-learn-more-btn"
                  onClick={(e) => { e.stopPropagation(); setExpandedProblem(expandedProblem === i ? null : i); }}
                >
                  {expandedProblem === i ? 'Show less ↑' : 'Learn more ↓'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 PLATFORM INTRO ── */}
      <section className="j-section j-platform-section" id="j-platform">
        <div className={`section-inner ${platformVisible ? 'reveal' : ''}`} ref={platformRef}>
          <span className="section-label">One Platform</span>
          <h2 className="section-headline">
            One Platform .
            <span className="j-headline-accent"> Three Solutions.</span>
          </h2>
          <p className="section-intro">
            Pixrity is a single immersive platform designed to help jewellery businesses show more, sell faster, and stock smarter
            without changing how you operate today. We deliver this across three solutions each built for a different part of your customer's journey.
          </p>
          <div className="j-platform-anchors">
            <a href="#j-sol1" className="j-anchor-card j-anchor-card--img" onClick={handleSmoothScroll}>
              <div className="j-anchor-img-wrap">
                <img src="src/assets/instore11.jpg" alt="In-Store Smart Solution" />
              </div>
              <div className="j-anchor-card-body">
                <span className="j-anchor-title">In-Store Smart Solution</span>
                <span className="j-anchor-desc">Turn your showroom into an immersive experience.</span>
              </div>
            </a>
            <a href="#j-sol2" className="j-anchor-card j-anchor-card--img" onClick={handleSmoothScroll}>
              <div className="j-anchor-img-wrap">
                <img src="src/assets/ecommerce1.jpeg" alt="Ecommerce Integration Solution" />
              </div>
              <div className="j-anchor-card-body">
                <span className="j-anchor-title">Ecommerce Integration Solution</span>
                <span className="j-anchor-desc">Let customers try jewellery before they buy online.</span>
              </div>
            </a>
            <a href="#j-sol3" className="j-anchor-card j-anchor-card--img" onClick={handleSmoothScroll}>
              <div className="j-anchor-img-wrap">
                <img src="src/assets/Digitalads1.jpg" alt="Immersive Advertising Solution" />
              </div>
              <div className="j-anchor-card-body">
                <span className="j-anchor-title">Immersive Advertising Solution</span>
                <span className="j-anchor-desc">Make your ads shoppable and unforgettable.</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── 04 SOLUTION 01 ── */}
      <section className="j-section j-sol-section" id="j-sol1">
        <div className={`section-inner ${sol1Visible ? 'reveal' : ''}`} ref={sol1Ref}>
          <span className="j-sol-badge">Solution 01</span>
          <h2 className="section-headline">
            <span className="headline-thin">Turn your showroom into an experience.</span><br />
            <span className="j-grad-text">In-Store Smart Solution</span>
          </h2>
          <p className="section-intro">
            A premium smart device inside your store that allows customers to explore, try, and compare jewellery digitally
            without relying on physical inventory. Your staff shows more. Your customer decides faster.
            Your showroom works at a scale no physical display case ever could.
          </p>
          <div className="j-sol-video-layout">
            <div className="j-sol-video-col">
              <div className="j-sol-video-wrap">
                <video src="/video/instore.mp4" autoPlay loop muted playsInline className="j-sol-video" />
              </div>
            </div>
            <div className="j-sol-content-col">
              <div className="j-sol-info-cards">
                {sol1Cards.map((card) => (
                  <div
                    key={card.id}
                    className={`j-sol-info-card ${expandedSol1 === card.id ? 'j-sol-info-card--expanded' : ''}`}
                    onClick={() => handleSolCardClick(card.id, expandedSol1, setExpandedSol1)}
                  >
                    <div className="j-sol-info-card-header">
                      <h3 className="j-sol-info-card-title">{card.label}</h3>
                    </div>
                    <div className="j-sol-info-card-preview">
                      {card.items.slice(0, 2).map((item, i) => (
                        <span key={i} className="j-sol-info-card-preview-pill">{item}</span>
                      ))}
                      {card.items.length > 2 && (
                        <span className="j-sol-info-card-preview-more">+{card.items.length - 2} more</span>
                      )}
                    </div>
                    <div className="j-sol-info-card-body">
                      <ul className="j-sol-list j-sol-info-list">
                        {card.items.map((item, i) => (
                          <li key={i}><span className="j-check">✦</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 SOLUTION 02 ── */}
      <section className="j-section j-sol-section" id="j-sol2">
        <div className={`section-inner ${sol2Visible ? 'reveal' : ''}`} ref={sol2Ref}>
          <span className="j-sol-badge">Solution 02</span>
          <h2 className="section-headline">
            <span className="headline-thin">Let customers try jewellery before it reaches the cart.</span><br />
            <span className="j-grad-text">Ecommerce Integration Solution</span>
          </h2>
          <p className="section-intro">
            Pixrity lets your customers see and try jewellery while browsing your website
            helping them buy with confidence from anywhere in the world.
            No showroom visit required. No uncertainty at checkout.
            The online experience becomes as real as the in-store one.
          </p>
          <div className="j-sol-video-layout j-sol-video-layout--reverse">
            <div className="j-sol-content-col">
              <div className="j-sol-info-cards">
                {sol2Cards.map((card) => (
                  <div
                    key={card.id}
                    className={`j-sol-info-card ${expandedSol2 === card.id ? 'j-sol-info-card--expanded' : ''}`}
                    onClick={() => handleSolCardClick(card.id, expandedSol2, setExpandedSol2)}
                  >
                    <div className="j-sol-info-card-header">
                      <h3 className="j-sol-info-card-title">{card.label}</h3>
                    </div>
                    <div className="j-sol-info-card-preview">
                      {card.items.slice(0, 2).map((item, i) => (
                        <span key={i} className="j-sol-info-card-preview-pill">{item}</span>
                      ))}
                      {card.items.length > 2 && (
                        <span className="j-sol-info-card-preview-more">+{card.items.length - 2} more</span>
                      )}
                    </div>
                    <div className="j-sol-info-card-body">
                      <ul className="j-sol-list j-sol-info-list">
                        {card.items.map((item, i) => (
                          <li key={i}><span className="j-check">✦</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="j-sol-video-col">
              <div className="j-sol-video-wrap">
                <video src="/video/ecommerce.mp4" autoPlay loop muted playsInline className="j-sol-video" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 SHARED FEATURES ── */}
      <section className="j-section j-features-section" id="j-features">
        <div className={`section-inner ${featuresVisible ? 'reveal' : ''}`} ref={featuresRef}>
          <span className="section-label">What Powers Both Solutions</span>
          <h2 className="section-headline">
            Three Core Immersive<br />
            <span className="j-grad-text">Capabilities.</span>
          </h2>
          <p className="section-intro">
            Both the In-Store Smart Solution and the Ecommerce Integration Solution run on three core immersive capabilities.
            Together, they give your customer every tool they need to go from curious to confident.
          </p>
          <div className="j-cap-layout">
            <div className="j-cap-tabs">
              {sharedFeatures.map((f, i) => (
                <button
                  key={i}
                  className={`j-cap-tab ${activeFeature === i ? 'active' : ''}`}
                  onClick={() => setActiveFeature(i)}
                >
                  <span className="j-cap-tab-icon">{f.icon}</span>
                  <div className="j-cap-tab-text">
                    <span className="j-cap-tab-title">{f.title}</span>
                    <span className="j-cap-tab-sub">{f.subtitle}</span>
                  </div>
                  <span className="j-cap-tab-arrow">→</span>
                </button>
              ))}
            </div>
            <div className="j-cap-detail">
              <div className="j-cap-video-wrap">
                <video
                  key={activeFeature}
                  ref={(el) => {
                    if (el) { el.load(); el.play().catch(() => {}); }
                  }}
                  src={sharedFeatures[activeFeature].video}
                  loop muted playsInline
                  className="j-cap-video"
                />
                <div className="j-cap-video-overlay"></div>
              </div>
              <div className="j-cap-info" key={`info-${activeFeature}`}>
                <div className="j-cap-info-icon">{sharedFeatures[activeFeature].icon}</div>
                <div className="j-cap-info-body">
                  <h3 className="j-cap-info-title">{sharedFeatures[activeFeature].title}</h3>
                  <p className="j-cap-info-subtitle">{sharedFeatures[activeFeature].subtitle}</p>
                  <p className="j-cap-info-desc">{sharedFeatures[activeFeature].desc}</p>
                  <ul className="j-feat-points">
                    {sharedFeatures[activeFeature].points.map((pt, i) => (
                      <li key={i}><span className="j-check">✦</span>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 SOLUTION 03 ── */}
      <section className="j-section j-sol-section j-adv-section" id="j-sol3">
        <div className={`section-inner ${sol3Visible ? 'reveal' : ''}`} ref={sol3Ref}>
          <span className="j-sol-badge">Solution 03</span>
          <h2 className="section-headline">
            Immersive Advertising Solution.
            <span className="headline-thin"> Make your ads <span className="j-grad-text">shoppable and unforgettable.</span></span>
          </h2>
          <p className="section-intro">
            Pixrity transforms jewellery advertising into an interactive experience that lets customers explore and try jewellery
            before they have ever visited your store or website.
            An ad they interact with is an ad they remember.
            An ad they try on is a sale that has already started.
          </p>
          <div className="j-sol3-tab-bar">
            {adTabs.map((tab, i) => (
              <button
                key={i}
                className={`j-sol3-tab ${activeAd === i ? 'active' : ''}`}
                onClick={() => setActiveAd(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="j-sol3-content-row">
            <div className="j-sol3-phone-col">
              <div className="ia-phone-wrap">
                <div className="ia-phone-shell">
                  <div className="ia-phone-notch"></div>
                  <div className="ia-phone-screen">
                    <video key={activeAd} src={adTabs[activeAd].video} autoPlay loop muted playsInline />
                  </div>
                  <div className="ia-phone-chin"></div>
                </div>
                <div className="ia-phone-glow"></div>
              </div>
            </div>
            <div className="j-sol3-outcomes-col" key={activeAd}>
              <h3 className="j-sol3-outcomes-title">{adTabs[activeAd].outcomesTitle}</h3>
              <p className="j-sol3-outcomes-desc">{adTabs[activeAd].outcomesDesc}</p>
              <div className="j-sol3-outcomes-list">
                {adTabs[activeAd].outcomes.map((item, i) => (
                  <div className="j-sol3-outcome-item" key={i}>
                    <span className="j-check">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="j-sol3-cta-row">
                <button
                  className="contact-btn"
                  onClick={() => Calendly.initPopupWidget({ url: 'https://calendly.com/pixrity-info/new-meeting' })}
                >
                  Book a Demo
                </button>
                <button className="btn-secondary" onClick={() => navigate('/immersive-advertising')}>
                  Explore Immersive Advertising in Full →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 BRAND BENEFITS ── */}
      <section className="j-section j-benefits-section" id="j-benefits">
        <div className={`section-inner ${benefitsVisible ? 'reveal' : ''}`} ref={benefitsRef}>
          <span className="section-label">Brand Benefits</span>
          <h2 className="section-headline">
            Elevate Your Brand<br />
            <span className="j-headline-accent">With Pixrity.</span>
          </h2>
          <div className="j-benefits-grid">
            <div className="j-benefit-card">
              <h3 className="j-benefit-title">Unlocking Digital Inventory</h3>
              <p className="j-benefit-sub">Precision-crafted digital stock for the modern jeweller.</p>
              <ul className="j-sol-list">
                {['Showcase your entire catalogue digitally — no physical limits', 'Eliminate the constraints of showroom space', 'Reduce security and insurance overheads', 'Sell bespoke designs before manufacturing begins'].map((item, i) => (
                  <li key={i}><span className="j-check">✦</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="j-benefit-card">
              <h3 className="j-benefit-title">The Luxury of Certainty</h3>
              <p className="j-benefit-sub">Where innovation meets the standard of luxury.</p>
              <ul className="j-sol-list">
                {['Instant visualisation builds deep buyer confidence', 'Reduce return rates through accurate AR placement', 'Accelerate high-ticket decision-making cycles', 'A premium experience that builds lasting trust'].map((item, i) => (
                  <li key={i}><span className="j-check">✦</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 WHY PIXRITY ── */}
      <section className="j-section j-why-section" id="j-why">
        <div className={`section-inner ${whyVisible ? 'reveal' : ''}`} ref={whyRef}>
          <span className="section-label">Why Pixrity</span>
          <h2 className="section-headline">
            Eight Reasons Jewellery Brands<br />
            <span className="j-headline-accent">Choose PIXRITY.</span>
          </h2>
          <div className="j-why-grid">
            {whyPoints.map((item, i) => (
              <div className="j-why-item" key={i}>
                <div className="j-why-icon">{item.icon}</div>
                <div className="j-why-content">
                  <span className="j-why-text">{item.label}</span>
                  <span className="j-why-sub">{item.sub}</span>
                </div>
                <div className="j-why-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 FINAL CTA + FORM ── */}
      <section className="j-section j-cta-section" id="j-cta">
        <div className={`section-inner ${ctaVisible ? 'reveal' : ''}`} ref={ctaRef}>
          <div className="j-cta-split">
            <div className="j-cta-left">
              <span className="section-label">Let's Talk</span>
              <h2 className="j-cta-headline">
                Ready to Transform Your<br />
                Jewellery Business?<br />
                <span className="j-headline-accent">Sell More. Invest Less.</span>
              </h2>
              <p className="j-cta-sub">Let customers experience more. Let inventory do less.</p>
              <ul className="j-cta-list">
                <li><span className="j-check">✦</span> Free — no advance required</li>
                <li><span className="j-check">✦</span> We come prepared with ideas for your business</li>
                <li><span className="j-check">✦</span> Honest about whether we are the right fit</li>
              </ul>
              <button
                className="contact-btn"
                onClick={() => Calendly.initPopupWidget({ url: 'https://calendly.com/pixrity-info/new-meeting' })}
              >
                Book a Demo
              </button>
            </div>
            <div className="j-contact-form-wrap" id="j-contact-form">
              {formSubmitted ? (
                <div className="j-form-success">
                  <div className="j-success-icon">✦</div>
                  <h3>Thank You!</h3>
                  <p>We've received your enquiry and will be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <h3 className="j-form-title">Get in Touch</h3>
                  <p className="j-form-sub">Share your details and we'll reach out.</p>
                  <div className="j-form">
                    <div className="j-field">
                      <label>Name</label>
                      <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="j-field">
                      <label>Email ID</label>
                      <input type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="j-field">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="j-field">
                      <label>Enquiry For</label>
                      <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                        <option value="">Select a Service</option>
                        <option>In-Store Smart Solution</option>
                        <option>Ecommerce Integration Solution</option>
                        <option>Immersive Advertising Solution</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="btn-primary j-submit-btn"
                      onClick={handleFormSubmit}
                      disabled={formLoading}
                    >
                      {formLoading ? 'Sending…' : 'Submit'}
                    </button>
                    {formError && (
                      <p style={{ color: '#e10f4e', fontSize: '12px', marginTop: '6px', textAlign: 'center' }}>
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
            <img src={logoInverted} alt="Pixrity Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', display: 'block' }} />
            <span className="footer-logo">PIXRITY</span>
            <span className="footer-tagline">Transforming Experience</span>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <span className="footer-col-label">Solutions</span>
              <a href="/jewellery-solutions" className="active-nav-link">Immersive Jewellery Solutions</a>
              <a href="/immersive-industrial" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); }}>Immersive Industrial Solutions</a>
              <a href="/immersive-advertising" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); }}>Immersive Advertising Solutions</a>
              <a href="/ai-solutions" onClick={(e) => { e.preventDefault(); navigate('/ai-solutions'); }}>Agentic AI Solutions</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Contact</span>
              <a href="mailto:info@pixrity.com">info@pixrity.com</a>
              <a href="tel:+917204466161">+91 7204466161</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Company</span>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>About</a>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Insights</a>
              <a href="#j-cta" onClick={handleSmoothScroll}>Contact</a>
              <a href="https://wa.me/917204466161" target="_blank" rel="noopener noreferrer" className="footer-whatsapp-link">
                <span className="footer-whatsapp-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
          <span>© 2026 PIXRITY PVT LTD. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
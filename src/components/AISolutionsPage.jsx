import { useState, useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import '../styles/AISolutionsPage.css';
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function CustomRequirementCard() {
  const [reqData, setReqData] = useState({ email: '', requirement: '' });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!reqData.requirement.trim()) return;
    const subject = encodeURIComponent('Custom AI Requirement – Pixrity');
    const body = encodeURIComponent(
      `From: ${reqData.email || '(no email provided)'}\n\nRequirement:\n${reqData.requirement}`
    );
    window.location.href = `mailto:info@pixrity.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="ai-fn-detail-card">
        <div className="ai-form-success">
          <div className="ai-success-icon">✓</div>
          <h3>Mail Client Opened!</h3>
          <p>Your requirement has been pre-filled. Just hit send in your mail app and we'll get back to you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-fn-detail-card">
      <div className="ai-fn-detail-icon">✉️</div>
      <h3 className="ai-fn-detail-title">Send Your Requirement</h3>
      <p className="ai-fn-detail-desc">
        Don't see your use case above? Tell us what you need and we'll figure out how AI can help — no jargon, no obligations.
      </p>
      <div className="ai-custom-req-form">
        <div className="ai-field">
          <label>Your Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={reqData.email}
            onChange={(e) => setReqData({ ...reqData, email: e.target.value })}
          />
        </div>
        <div className="ai-field">
          <label>Describe Your Requirement</label>
          <textarea
            placeholder="Tell us about your business challenge or the process you'd like to automate..."
            rows={5}
            value={reqData.requirement}
            onChange={(e) => setReqData({ ...reqData, requirement: e.target.value })}
          />
        </div>
        <button type="button" className="btn-primary ai-submit-btn" onClick={handleSend}>
          Send via Email →
        </button>
      </div>
      <p className="ai-functions-note" style={{ marginTop: '14px' }}>
        Opens your mail client with everything pre-filled
      </p>
    </div>
  );
}

function ContactFormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
        {formSubmitted ? (
          <div className="ai-form-success">
            <div className="ai-success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>We've received your inquiry and will get back to you shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Tell Us Your Use Case</h2>
            <p className="modal-sub">We'll get back to you with a clear direction — no pressure, no obligations.</p>
            <form className="ai-contact-form" onSubmit={handleSubmit}>
              <div className="ai-field">
                <label>Name</label>
                <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="ai-field">
                <label>Email</label>
                <input type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div className="ai-field">
                <label>Phone</label>
                <input type="tel" placeholder="+91 00000 00000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="ai-field">
                <label>What are you looking to solve?</label>
                <textarea placeholder="Describe your challenge or goal..." rows={4} value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary ai-submit-btn">Send Message</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function AISolutionsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFunction, setActiveFunction] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 60); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setDropdownOpen(false); setModalOpen(false); }
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
  };

  const [problemRef, problemVisible] = useScrollReveal();
  const [solutionRef, solutionVisible] = useScrollReveal();
  const [functionsRef, functionsVisible] = useScrollReveal();
  const [processRef, processVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const businessFunctions = [
    { icon: '⚙️', title: 'Operations & IT', desc: 'Automate repetitive workflows, intelligent document processing, smart routing, predictive maintenance alerts, and IT helpdesk bots that resolve tickets before humans even see them.', examples: ['Process automation', 'Predictive alerts', 'Smart ticket routing'] },
    { icon: '👥', title: 'HR & Admin', desc: 'Automate onboarding, leave management, policy Q&A bots, resume screening, and employee engagement freeing your HR team for what actually needs human judgment.', examples: ['Resume screening', 'Onboarding automation', 'Policy Q&A bots'] },
    { icon: '💰', title: 'Finance', desc: 'Intelligent invoice processing, anomaly detection in transactions, automated reconciliation, expense categorisation, and financial report generation at the click of a button.', examples: ['Invoice automation', 'Anomaly detection', 'Auto reconciliation'] },
    { icon: '🎧', title: 'Customer Service', desc: 'AI agents that handle 80% of inbound queries 24/7 with human escalation only when it truly matters. Faster resolution. Happier customers. Fewer support costs.', examples: ['24/7 AI agents', 'Smart escalation', 'Sentiment analysis'] },
    { icon: '📈', title: 'Sales', desc: 'Lead scoring, automated follow-ups, CRM data enrichment, call summarisation, and pipeline health analysis so your sales team sells instead of doing admin.', examples: ['Lead scoring', 'Call summaries', 'CRM enrichment'] },
    { icon: '📣', title: 'Marketing', desc: 'Personalised content at scale, competitor monitoring, campaign performance analysis, SEO content generation, and audience segmentation powered by behavioural AI.', examples: ['Content generation', 'Competitor monitoring', 'Audience segmentation'] },
    { icon: '✉️', title: 'Custom Requirement', desc: '', examples: [] },
  ];

  const processSteps = [
    { label: 'Understand', title: 'Discovery Call', desc: 'We get on a call to understand your business, workflows, and challenges. No pitch decks. Just listening.' },
    { label: 'Identify', title: 'Impact Analysis', desc: 'We pinpoint where AI can actually create impact and ROI not just where it sounds impressive.' },
    { label: 'Recommend', title: 'Custom Roadmap', desc: 'We suggest practical solutions tailored to your needs. Everything is custom built, not pre-packaged.' },
    { label: 'Build', title: 'Implementation', desc: 'We design and implement custom AI systems for your business. One team, end to end.' },
  ];

  const faqs = [
    { q: 'Do I need a technical team to use AI solutions?', a: 'No. We handle all the technical heavy lifting from design and development to deployment and monitoring. Your team interacts with the final interface, not the underlying system. We train your staff to use it confidently.' },
    { q: 'How long does it take to see results?', a: 'Depends on the solution. Simple automation workflows can be live in 2-3 weeks. More complex multi-system AI integrations take 6-12 weeks. We give honest timelines upfront not optimistic sales numbers.' },
    { q: 'Will this integrate with our existing tools?', a: 'Yes. We design solutions to work with what you already use — CRMs, ERPs, communication platforms, databases. We do not ask you to rip and replace. We build around your existing stack.' },
    { q: 'How is this different from off-the-shelf AI tools?', a: 'Off-the-shelf tools are built for everyone, which means they are optimised for no one. We build specifically for your processes, your data, your terminology, and your team structure. The result is something that actually fits.' },
    { q: 'What does it cost?', a: 'We quote after understanding your needs not before. Every solution is different. What we can say: we are transparent, we do not hide fees, and if the investment does not make sense for your stage right now, we will tell you.' },
  ];

  return (
    <>
      <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div id="menu" className={menuOpen ? 'open' : ''}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <a href="/product" onClick={(e) => { e.preventDefault(); navigate('/product'); }}>Product</a>

          <div className="dropdown cmd-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <span>Solutions</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#050040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {dropdownOpen && (
              <div className="cmd-panel">
                <a href="/jewellery-solutions" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/jewellery-solutions'); setDropdownOpen(false); }}>Jewellery Solutions</a>
                <a href="/immersive-industrial" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); setDropdownOpen(false); }}>Industrial Solutions</a>
                <a href="/ai-solutions" className="cmd-item cmd-item-active">Agentic AI Solutions</a>
                <a href="/immersive-advertising" className="cmd-item" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); setDropdownOpen(false); }}>Immersive Advertising</a>
              </div>
            )}
          </div>

          <a href="#ai-functions" onClick={handleSmoothScroll}>About</a>
          <a href="#ai-process" onClick={handleSmoothScroll}>Insights</a>
          <button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="nav-right">
          <button className="contact-btn" onClick={() => setModalOpen(true)}>Contact Us</button>
          <button className="menu-toggle" id="open-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
            </svg>
          </button>
        </div>
      </nav>

      <a href="/" className={`logo-watermark${scrolled ? ' logo-scrolled' : ''}`} aria-label="Pixrity home" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        <img src={logoNav} alt="Pixrity Logo" className="logo-watermark-icon" />
        <div className="logo-text-group">
          <span className="logo-text">PIXRITY</span>
          <span className="logo-tagline">Transforming Experience</span>
        </div>
      </a>

      <section className="ai-hero-section" id="ai-home">
        <div className="ai-hero-body">
          <h1 className="ai-hero-headline">
            We Don't Just <span className="headline-accent">Talk AI.</span><br />
            <span className="headline-accent">We Make It Work for Your Business.</span>
          </h1>
          <p className="ai-hero-sub">
            We help businesses identify where AI actually fits, and build solutions tailored to their workflows that drive real growth across operations, sales, customer service, HR, and more.
          </p>
          <div className="ai-hero-cta-row">
            <button className="contact-btn" onClick={() => setModalOpen(true)}>Book a Demo</button>
            <button className="btn-secondary" onClick={() => scrollTo('#ai-functions')}>See What We Build</button>
          </div>
        </div>
        <div className="ai-hero-bg-orbs">
          <div className="ai-orb ai-orb-1"></div>
          <div className="ai-orb ai-orb-2"></div>
          <div className="ai-orb ai-orb-3"></div>
        </div>
      </section>

      <section className="ai-section ai-problem-section" id="ai-problem">
        <div className={`section-inner ${problemVisible ? 'reveal' : ''}`} ref={problemRef}>
          <span className="section-label">The Reality</span>
          <h2 className="section-headline">
            Most Businesses <span className="headline-accent">Fail At</span><br />
            <span className="headline-accent">Adopting AI</span>
          </h2>
          <p className="section-intro">They fail because they don't know where to start or what actually delivers ROI.</p>
          <div className="ai-problem-grid">
            {[
              { icon: '🧩', text: "They don't know what to build or how to implement it properly." },
              { icon: '🎲', text: "They end up testing random tools that go nowhere." },
              { icon: '💡', text: <span>AI isn't the problem. <strong>Lack of clarity is.</strong></span> },
            ].map((item, i) => (
              <div className="ai-problem-card" key={i}>
                <span className="ai-problem-icon">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-section ai-solution-section" id="ai-solution">
        <div className={`section-inner ${solutionVisible ? 'reveal' : ''}`} ref={solutionRef}>
          <span className="section-label">For your business</span>
          <h2 className="section-headline">
            We Help You Figure Out<br />
            <span className="headline-accent">And Build What Actually Works.</span>
          </h2>
          <p className="section-intro">Instead of selling you tools, we partner with you to design AI solutions tailored to your workflows.</p>
          <div className="ai-pillars-row">
            {[
              { step: 'Analysis', title: 'Understand your business deeply', desc: 'We dive into your current processes to find real pain points, not just tech trends.' },
              { step: 'Strategy', title: 'Identify high impact opportunities', desc: 'We pinpoint exactly where AI can save time, reduce costs, or increase revenue.' },
              { step: 'Execution', title: 'Design & Build solutions', desc: 'We create custom AI systems tailored to your workflows, not pre packaged tools.' },
            ].map((p, i) => (
              <div className="ai-pillar" key={i}>
                <div className="ai-pillar-step">{p.step}</div>
                <div className="ai-pillar-connector"></div>
                <h3 className="ai-pillar-title">{p.title}</h3>
                <p className="ai-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="ai-solution-note">
            <span>Everything is custom built based on your needs, not pre packaged.</span>
            <button className="btn-primary" onClick={() => setModalOpen(true)}>Let's Discuss Your Use Case</button>
          </div>
        </div>
      </section>

      <section className="ai-section ai-functions-section" id="ai-functions">
        <div className={`section-inner ${functionsVisible ? 'reveal' : ''}`} ref={functionsRef}>
          <span className="section-label">Our offerings</span>
          <h2 className="section-headline">
            AI Solutions Across Your<br />
            <span className="headline-accent">Business Functions.</span>
          </h2>
          <p className="section-intro">We work across key areas to design solutions specifically for your business.</p>
          <div className="ai-functions-layout">
            <div className="ai-functions-tabs">
              {businessFunctions.map((fn, i) => (
                <button key={i} className={`ai-fn-tab ${activeFunction === i ? 'active' : ''} ${i === 6 ? 'ai-fn-tab-custom' : ''}`} onClick={() => setActiveFunction(i)}>
                  <span className="ai-fn-tab-icon">{fn.icon}</span>
                  <span className="ai-fn-tab-label">{fn.title}</span>
                </button>
              ))}
            </div>
            <div className="ai-functions-detail">
              {activeFunction === 6 ? (
                <CustomRequirementCard key="custom" />
              ) : (
                <>
                  <div className="ai-fn-detail-card" key={activeFunction}>
                    <div className="ai-fn-detail-icon">{businessFunctions[activeFunction].icon}</div>
                    <h3 className="ai-fn-detail-title">{businessFunctions[activeFunction].title}</h3>
                    <p className="ai-fn-detail-desc">{businessFunctions[activeFunction].desc}</p>
                    <div className="ai-fn-examples">
                      {businessFunctions[activeFunction].examples.map((ex, i) => (
                        <span className="ai-fn-tag" key={i}>{ex}</span>
                      ))}
                    </div>
                  </div>
                  <p className="ai-functions-note">Every solution is designed specifically for your business</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section ai-process-section" id="ai-process">
        <div className={`section-inner ${processVisible ? 'reveal' : ''}`} ref={processRef}>
          <span className="section-label">How It Works</span>
          <h2 className="section-headline">
            A Simple <span className="headline-accent">Process</span><br />
            <span className="headline-thin">Transform Your Business with AI.</span>
          </h2>
          <div className="ai-steps-grid">
            {processSteps.map((step, i) => (
              <div className="ai-step-card" key={i}>
                <div className="ai-step-num-row">
                  <span className="ai-step-label-badge">{step.label}</span>
                </div>
                <h3 className="ai-step-title">{step.title}</h3>
                <p className="ai-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button className="contact-btn" onClick={() => setModalOpen(true)}>Book a Demo</button>
          </div>
        </div>
      </section>

      <section className="ai-section ai-faq-section" id="ai-faq">
        <div className={`section-inner ${faqVisible ? 'reveal' : ''}`} ref={faqRef}>
          <span className="section-label">FAQ</span>
          <h2 className="section-headline">
            <span className="headline-accent">Answers to the Questions</span><br />
            <span className="headline-thin">You're Already Thinking.</span>
          </h2>
          <div className="ai-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`ai-faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="ai-faq-question">
                  <span>{faq.q}</span>
                  <span className="ai-faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </div>
                <div className={`ai-faq-answer-wrap ${openFaq === i ? 'open' : ''}`}>
                  <p className="ai-faq-answer">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-section ai-cta-section" id="ai-cta">
        <div className={`section-inner ${ctaVisible ? 'reveal' : ''}`} ref={ctaRef}>
          <div className="ai-cta-centered">
            <span className="section-label">Let's Talk</span>
            <h2 className="ai-cta-headline">
              Not Sure Where AI Fits?<br />
              <span className="headline-accent">Let's Figure It Out Together.</span>
            </h2>
            <p className="ai-cta-sub">In one conversation, we'll help you understand:</p>
            <ul className="ai-cta-list">
              <li><span className="ai-check">✓</span> Where AI can create impact</li>
              <li><span className="ai-check">✓</span> What's worth investing in</li>
              <li><span className="ai-check">✓</span> What you should avoid</li>
            </ul>
            <button className="contact-btn" onClick={() => setModalOpen(true)}>Book a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img src={logoFooter} alt="PIXRITY Logo" className="footer-logo-img" />
              <span className="footer-logo">PIXRITY</span>
            </div>
            <span className="footer-tagline">Transforming Experience</span>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <span className="footer-col-label">Solutions</span>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Immersive Jewellery</a>
              <a href="/immersive-industrial" onClick={(e) => { e.preventDefault(); navigate('/immersive-industrial'); }}>Industrial Solutions</a>
              <a href="/ai-solutions" className="active-nav-link">AI Solutions</a>
              <a href="/immersive-advertising" onClick={(e) => { e.preventDefault(); navigate('/immersive-advertising'); }}>Immersive Advertising</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Contact</span>
              <a href="mailto:info@pixrity.com">info@pixrity.com</a>
              <a href="tel:+917204466161">+91 7204466161</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Company</span>
              <a href="#ai-functions" onClick={handleSmoothScroll}>About</a>
              <a href="#ai-process" onClick={handleSmoothScroll}>Insights</a>
              <a href="#ai-cta" onClick={handleSmoothScroll}>Contact</a>
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
          <span>© 2026 PIXRITY PVT LTD. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
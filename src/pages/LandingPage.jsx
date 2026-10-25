import bannerImage from '../../banner.png';
import Brand from '../components/Brand.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const steps = [
  {
    number: '01',
    title: 'Show what you’re building',
    description:
      'Share the work, goals, and direction you care about. Find people and companies looking for exactly that.',
  },
  {
    number: '02',
    title: 'Get in the room',
    description:
      'Join the networks and conversations where hiring managers, founders, and peers are already talking.',
  },
  {
    number: '03',
    title: 'Move forward',
    description:
      'Turn a conversation into a role, a project, or a partnership. Your next step starts with a real connection.',
  },
];

const audiences = [
  {
    number: '01',
    title: 'Emerging talent',
    description: 'Students and early-career professionals ready for access, not another application queue.',
  },
  {
    number: '02',
    title: 'Companies',
    description: 'Teams looking to meet people with real momentum before everyone else does.',
  },
  {
    number: '03',
    title: 'Networks',
    description: 'Communities and mentors opening their circles to the next generation.',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M10 5l5 5-5 5" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#why">Why Riseup.ai</a>
            <a href="#path">How it works</a>
            <a href="#who">Who it’s for</a>
          </nav>
          <a className="button button-small nav-cta" href="/intern.html">
            Get started <ArrowIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span /> A new way in</div>
              <h1>Make your next move <em>mean something.</em></h1>
              <p className="hero-lede">
                Real access to the people and places that move careers forward. No applications into the void.
              </p>
              <div className="hero-actions">
                <a className="button" href="/intern.html">
                  Find your starting point <ArrowIcon />
                </a>
                <a className="text-link" href="#why">Discover Riseup.ai</a>
              </div>
              <div className="hero-note">
                <span className="note-mark">✳</span>
                <span>For the ones already building what’s next.</span>
              </div>
            </div>
            <div className="hero-art">
              <img src={bannerImage} alt="A glowing amber gemstone against a warm, sunlit backdrop" />
              <div className="art-caption">
                <span>YOUR NEXT CHAPTER</span>
                <span>STARTS HERE ↗</span>
              </div>
              <div className="art-stamp" aria-hidden="true">O</div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>ACCESS, WITH INTENTION</span>
            <span>01 - 03</span>
          </div>
        </section>

        <section className="intro-section section-pad" id="why">
          <div className="container intro-grid">
            <div className="section-label"><span>01</span> WHY RISEUP.AI</div>
            <div className="intro-content">
              <h2>The old way asks you to wait. <em>We’d rather open a door.</em></h2>
              <p>
                Early careers shouldn’t be built on cold applications and lucky timing. Riseup.ai brings
                emerging talent closer to the people, companies, and communities that can help them
                make their next move.
              </p>
              <a className="inline-link" href="/intern.html">Take the first step <ArrowIcon /></a>
              <div className="difference">
                <div>
                  <span className="difference-kicker">THE USUAL PATH</span>
                  <p>Endless listings. Silence after send. Connections you’re expected to already have.</p>
                </div>
                <div className="difference-now">
                  <span className="difference-kicker">A MORE HUMAN WAY</span>
                  <p>Real conversations. Relevant opportunities. A network that grows with you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="path-section section-pad" id="path">
          <div className="container">
            <div className="section-label"><span>02</span> YOUR WAY FORWARD</div>
            <div className="path-heading">
              <h2>Good things happen<br />when you’re <em>in the room.</em></h2>
              <p>A clearer path from showing up to moving forward.</p>
            </div>
            <div className="path-list">
              {steps.map((step) => (
                <article className="path-row" key={step.number}>
                  <span className="path-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="path-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="audience-section section-pad" id="who">
          <div className="container">
            <div className="section-label"><span>03</span> MADE TO MOVE TOGETHER</div>
            <div className="audience-heading">
              <h2>There’s room for <em>your kind of ambition.</em></h2>
              <p>Riseup.ai connects the people looking for a way in with those ready to make one.</p>
            </div>
            <div className="audience-grid">
              {audiences.map((audience) => (
                <article className="audience-card" key={audience.number}>
                  <span className="audience-number">{audience.number}</span>
                  <h3>{audience.title}</h3>
                  <p>{audience.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="container">
            <div className="closing-card">
              <div className="closing-orbit" aria-hidden="true">✳</div>
              <span className="closing-kicker">YOUR NEXT MOVE STARTS HERE</span>
              <h2>Don’t wait for a way in.<br /><em>Make one.</em></h2>
              <p>Start with one minute. See where it can take you.</p>
              <a className="button button-light" href="/intern.html">
                Meet your next step <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

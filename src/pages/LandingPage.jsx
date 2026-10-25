import Brand, { BrandMark } from '../components/Brand.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const steps = [
  {
    number: '01',
    title: 'Pick what sounds interesting',
    description:
      'Choose business or technology. Not sure yet? Pick the one you’re curious about today.',
  },
  {
    number: '02',
    title: 'Try a quick prompt',
    description:
      'Get one short, real-world question. There’s no perfect answer—just show how you think.',
  },
  {
    number: '03',
    title: 'See what’s out there',
    description:
      'Browse a few sample internships and get ideas for the kinds of roles you could explore.',
  },
];

const audiences = [
  {
    number: '01',
    title: 'Still in school',
    description: 'Get a feel for different kinds of work before you have it all figured out.',
  },
  {
    number: '02',
    title: 'Just getting started',
    description: 'Try a prompt, find a direction, and take one small step toward your first role.',
  },
  {
    number: '03',
    title: 'Changing your mind',
    description: 'Curiosity counts. Explore something new without making a big commitment.',
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
            <a href="#why">Why we made this</a>
            <a href="#path">The quick version</a>
            <a href="#who">Who it’s for</a>
          </nav>
          <a className="button button-small nav-cta" href="/intern.html">
            Try a prompt <ArrowIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><BrandMark className="brand-gem eyebrow-mark" /> Thinking about what comes after school?</div>
              <h1>Not sure what’s next? <em>Start here.</em></h1>
              <p className="hero-lede">
                Try a one-minute prompt, explore a few work paths, and see what feels like you.
              </p>
              <div className="hero-actions">
                <a className="button" href="/intern.html">
                  Try a one-minute prompt <ArrowIcon />
                </a>
                <a className="text-link" href="#path">How it works</a>
              </div>
              <div className="hero-note">
                <BrandMark className="brand-gem note-mark" />
                <span>For students, new grads, and the still-figuring-it-out crowd.</span>
              </div>
            </div>
            <div className="hero-art">
              <div className="starter-board">
                <div className="starter-board-heading">
                  <span className="starter-board-kicker">TRY A QUESTION LIKE THIS</span>
                  <p>Your student club has a small budget and one week to get more people to an event. What would you try first?</p>
                </div>
                <div className="starter-board-footer">
                  <span>60 seconds</span>
                  <span>No perfect answer</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>NO EXPERIENCE REQUIRED</span>
            <span>TAKE IT AT YOUR OWN PACE</span>
          </div>
        </section>

        <section className="intro-section section-pad" id="why">
          <div className="container intro-grid">
            <div className="section-label"><span>01</span> WHY WE MADE THIS</div>
            <div className="intro-content">
              <h2>Getting started can feel like a lot. <em>This part doesn’t have to.</em></h2>
              <p>
                Looking for a first job or internship can feel confusing, especially when everyone seems
                to know what they’re doing already. Try a short prompt and explore a couple of work areas.
                No résumé or big decision needed.
              </p>
              <a className="inline-link" href="/intern.html">Give it a try <ArrowIcon /></a>
              <div className="difference">
                <div>
                  <span className="difference-kicker">YOU DON’T NEED</span>
                  <p>A perfect résumé, years of experience, or a friend who knows someone.</p>
                </div>
                <div className="difference-now">
                  <span className="difference-kicker">JUST BRING</span>
                  <p>A little curiosity. You can figure out the rest as you go.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="path-section section-pad" id="path">
          <div className="container">
            <div className="section-label"><span>02</span> HOW IT WORKS</div>
            <div className="path-heading">
              <h2>Small steps count.<br /><em>Here’s the first one.</em></h2>
              <p>No big application. Just a quick way to try something on for size.</p>
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
            <div className="section-label"><span>03</span> MADE FOR THE EARLY DAYS</div>
            <div className="audience-heading">
              <h2>Wherever you’re at, <em>you can start here.</em></h2>
              <p>There’s no one right timeline for figuring out what you want to do.</p>
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
              <span className="closing-kicker">NO PERFECT PLAN NEEDED</span>
              <h2>Curious about what’s next?<br /><em>Start with a minute.</em></h2>
              <p>Pick a prompt, give it a go, and see how it feels.</p>
              <a className="button button-light" href="/intern.html">
                Give it a try <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

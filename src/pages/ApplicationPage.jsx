import { useEffect, useState } from 'react';
import Brand from '../components/Brand.jsx';

const prompts = {
  business:
    'You’re pitching a new product to a skeptical investor. They have 30 seconds to decide if they care. What’s your hook?',
  tech:
    'You shipped a feature this week. Your team is split on whether it’s worth keeping. Build the case for why it matters.',
};

const tracks = [
  {
    id: 'business',
    label: 'Business',
    title: 'Strategy & growth',
    description: 'Marketing, sales, business development. Think in pitches and plans.',
  },
  {
    id: 'tech',
    label: 'Technology',
    title: 'Build & ship',
    description: 'Engineering, product, AI. Think in features and trade-offs.',
  },
];

function ApplicationHeader() {
  return (
    <header className="application-header">
      <Brand />
      <a className="application-home-link" href="/">Back to Onyx <span aria-hidden="true">↗</span></a>
    </header>
  );
}

export default function ApplicationPage() {
  const [step, setStep] = useState('landing');
  const [track, setTrack] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (step !== 'prompt' || timeLeft === 0) return undefined;

    const timer = window.setInterval(() => {
      setTimeLeft((time) => Math.max(0, time - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, timeLeft]);

  function chooseTrack(selectedTrack) {
    setTrack(selectedTrack);
    setStep('signup');
  }

  function startPrompt(event) {
    event.preventDefault();
    setTimeLeft(60);
    setStep('prompt');
  }

  function returnToTracks() {
    setStep('landing');
  }

  function restart() {
    setStep('landing');
    setTrack('');
    setName('');
    setEmail('');
    setResponse('');
    setTimeLeft(60);
  }

  return (
    <div className="application-shell">
      <ApplicationHeader />
      <main className="application-main">
        {step === 'landing' && (
          <>
            <section className="application-hero">
              <div className="application-eyebrow"><span /> YOUR FIRST STEP</div>
              <h1>Show us how <em>you think.</em></h1>
              <p className="application-lede">
                No long process. Choose a track, take on one real prompt, and start with something that’s yours.
              </p>
              <div className="application-proof">
                <span>01</span> CHOOSE A TRACK <i /> <span>02</span> ANSWER A PROMPT <i /> <span>03</span> TAKE IT WITH YOU
              </div>
            </section>
            <section className="track-section" aria-labelledby="track-heading">
              <div className="track-section-heading">
                <div>
                  <span className="form-kicker">PICK YOUR DIRECTION</span>
                  <h2 id="track-heading">Where do you want to start?</h2>
                </div>
                <span className="step-count">01 <span>/ 03</span></span>
              </div>
              <div className="track-grid">
                {tracks.map((item) => (
                  <button
                    className={`track-option track-option-${item.id}`}
                    key={item.id}
                    type="button"
                    onClick={() => chooseTrack(item.id)}
                  >
                    <span className="track-option-label">{item.label}</span>
                    <span className="track-option-icon" aria-hidden="true">{item.id === 'tech' ? '⌘' : '↗'}</span>
                    <span className="track-option-title">{item.title}</span>
                    <span className="track-option-description">{item.description}</span>
                    <span className="track-option-link">Choose this track <span aria-hidden="true">→</span></span>
                  </button>
                ))}
              </div>
            </section>
            <p className="privacy-note">No account needed. Your response stays in this browser and isn’t sent to a server.</p>
          </>
        )}

        {step === 'signup' && (
          <section className="application-panel">
            <button className="back-link" type="button" onClick={returnToTracks}>← <span>Back to tracks</span></button>
            <span className="form-kicker">STEP 02 <span>/ 03</span></span>
            <h1>First, the <em>introductions.</em></h1>
            <p className="panel-description">
              You picked {track === 'business' ? 'Business' : 'Technology'}. What should we call you?
            </p>
            <form className="application-form" onSubmit={startPrompt}>
              <label htmlFor="applicant-name">Your name</label>
              <input
                autoComplete="name"
                id="applicant-name"
                name="name"
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Jordan Lee"
                required
                value={name}
              />
              <label htmlFor="applicant-email">Email address</label>
              <input
                autoComplete="email"
                id="applicant-email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
              <button className="button application-submit" type="submit">
                Let’s do this <span aria-hidden="true">→</span>
              </button>
              <p className="privacy-note form-privacy">
                This demo doesn’t send or store your personal information.
              </p>
            </form>
          </section>
        )}

        {step === 'prompt' && (
          <section className="application-panel prompt-panel">
            <button className="back-link" type="button" onClick={() => setStep('signup')}>← <span>Back to details</span></button>
            <span className="form-kicker">STEP 03 <span>/ 03</span></span>
            <p className="applicant-greeting">A little something for you, {name.trim().split(/\s+/)[0]}.</p>
            <h1>Your perspective <em>is the point.</em></h1>
            <div className="prompt-card">
              <div className="prompt-card-top"><span>YOUR {track.toUpperCase()} PROMPT</span><span>✳</span></div>
              <p>{prompts[track]}</p>
            </div>
            <div className={`timer-display${timeLeft <= 10 ? ' timer-urgent' : ''}`} aria-live="polite">
              <span>{String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</span>
              <span>{timeLeft === 0 ? 'Time’s up - finish your thought.' : 'A minute. Your words.'}</span>
            </div>
            <form className="application-form response-form" onSubmit={(event) => {
              event.preventDefault();
              setStep('confirmation');
            }}>
              <label htmlFor="applicant-response">Your answer</label>
              <textarea
                id="applicant-response"
                onChange={(event) => setResponse(event.target.value)}
                placeholder="Start wherever you are. Write it in your own words..."
                required
                rows="6"
                value={response}
              />
              <button className="button application-submit" type="submit">
                Keep my response <span aria-hidden="true">→</span>
              </button>
              <p className="privacy-note form-privacy">Your response stays in this browser and isn’t sent to a server.</p>
            </form>
          </section>
        )}

        {step === 'confirmation' && (
          <section className="application-panel confirmation-panel" aria-live="polite">
            <div className="confirmation-symbol" aria-hidden="true">✳</div>
            <span className="form-kicker">A GOOD FIRST STEP</span>
            <h1>You showed up.<br /><em>That matters.</em></h1>
            <p className="panel-description">
              Your response is here for this browser session. It hasn’t been sent to or saved by Onyx.
            </p>
            <div className="response-recap">
              <span>YOUR RESPONSE</span>
              <p>{response}</p>
            </div>
            <button className="button" type="button" onClick={restart}>Start over <span aria-hidden="true">↗</span></button>
          </section>
        )}
      </main>
      <footer className="application-footer">
        <Brand />
        <span>Built for people who build things.</span>
        <span>© 2026 Onyx</span>
      </footer>
    </div>
  );
}

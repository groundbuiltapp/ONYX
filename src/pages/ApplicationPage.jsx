import { useEffect, useRef, useState } from 'react';
import Brand from '../components/Brand.jsx';

const defaultPrompts = {
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

const fields = {
  business: ['sales', 'marketing', 'partnerships', 'ai-engineering', 'product', 'other'],
  tech: ['sales', 'marketing', 'partnerships', 'ai-engineering', 'product', 'other'],
};

const prompts = {
  sales: "You're on a call with a buyer who says they already have a vendor. You have 60 seconds to earn a second meeting. What do you say?",
  marketing: "Your product has a 2% click rate on its ads. You have 60 seconds to tell your boss what to test first. What's your plan?",
  partnerships: 'A company you admire has 30 seconds to decide whether to co-host an event with a student group. Make the case.',
  'ai-engineering': "Your team's chatbot gives confident wrong answers to customers. You have 60 seconds to explain how you'd fix it. What's your approach?",
  product: 'Users sign up but never finish onboarding. You have 60 seconds to pitch the one change you’d test first. What is it, and why?',
};

const fieldLabels = {
  sales: 'Sales',
  marketing: 'Marketing',
  partnerships: 'Partnerships',
  'ai-engineering': 'AI engineering',
  product: 'Product',
  other: 'Other',
};

function ApplicationHeader() {
  return (
    <header className="application-header">
      <Brand />
      <a className="application-home-link" href="/">Back to Riseup.ai <span aria-hidden="true">↗</span></a>
    </header>
  );
}

export default function ApplicationPage() {
  const [flow, setFlow] = useState({
    step: 'landing',
    track: '',
    field: '',
    prompt: '',
    name: '',
    email: '',
    response: '',
    timeLeft: 60,
    saveMessage: '',
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (flow.step !== 'prompt') return undefined;

    timerRef.current = window.setInterval(() => {
      setFlow((current) => ({
        ...current,
        timeLeft: Math.max(0, current.timeLeft - 1),
      }));
    }, 1000);

    return () => {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [flow.step]);

  useEffect(() => {
    if (flow.timeLeft === 0 && timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [flow.timeLeft]);

  function chooseTrack(selectedTrack) {
    setFlow((current) => ({ ...current, track: selectedTrack, step: 'field' }));
  }

  function chooseField(selectedField) {
    setFlow((current) => ({
      ...current,
      field: selectedField,
      prompt: prompts[selectedField] || defaultPrompts[current.track],
      step: 'signup',
    }));
  }

  function startPrompt(event) {
    event.preventDefault();
    setFlow((current) => ({ ...current, timeLeft: 60, step: 'prompt' }));
  }

  function submitResponse(event) {
    event.preventDefault();
    if (flow.timeLeft === 0) return;
    setFlow((current) => ({ ...current, step: 'confirmation' }));
  }

  function savePitch() {
    try {
      window.localStorage.setItem('onyx-saved-pitch', JSON.stringify({
        response: flow.response,
        track: flow.track,
      }));
      setFlow((current) => ({
        ...current,
        saveMessage: 'Saved in this browser only.',
      }));
    } catch {
      setFlow((current) => ({
        ...current,
        saveMessage: 'Could not save this pitch in your browser.',
      }));
    }
  }

  function restart() {
    setFlow({
      step: 'landing',
      track: '',
      field: '',
      prompt: '',
      name: '',
      email: '',
      response: '',
      timeLeft: 60,
      saveMessage: '',
    });
  }

  return (
    <div className="application-shell">
      <ApplicationHeader />
      <main className="application-main">
        {flow.step === 'landing' && (
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
                <span className="step-count">01 <span>/ 04</span></span>
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

        {flow.step === 'field' && (
          <section className="application-panel field-panel">
            <button className="back-link" type="button" onClick={() => setFlow((current) => ({ ...current, step: 'landing' }))}>← <span>Back to tracks</span></button>
            <span className="form-kicker">STEP 02 <span>/ 04</span></span>
            <h1>What field are you going into?</h1>
            <p className="panel-description">
              Pick the area that feels closest. We’ll find a prompt to match.
            </p>
            <div className="field-options">
              {fields[flow.track].map((fieldId) => (
                <button
                  className="field-option"
                  key={fieldId}
                  type="button"
                  onClick={() => chooseField(fieldId)}
                >
                  {fieldLabels[fieldId]}<span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {flow.step === 'signup' && (
          <section className="application-panel">
            <button className="back-link" type="button" onClick={() => setFlow((current) => ({ ...current, step: 'field' }))}>← <span>Back to field</span></button>
            <span className="form-kicker">STEP 03 <span>/ 04</span></span>
            <h1>First, the <em>introductions.</em></h1>
            <p className="panel-description">
              You picked {flow.track === 'business' ? 'Business' : 'Technology'}. What should we call you?
            </p>
            <form className="application-form" onSubmit={startPrompt}>
              <label htmlFor="applicant-name">Your name</label>
              <input
                autoComplete="name"
                id="applicant-name"
                name="name"
                onChange={(event) => setFlow((current) => ({ ...current, name: event.target.value }))}
                placeholder="e.g. Jordan Lee"
                required
                value={flow.name}
              />
              <label htmlFor="applicant-email">Email address</label>
              <input
                autoComplete="email"
                id="applicant-email"
                name="email"
                onChange={(event) => setFlow((current) => ({ ...current, email: event.target.value }))}
                placeholder="you@example.com"
                required
                type="email"
                value={flow.email}
              />
              <button className="button application-submit" type="submit">
                Let’s do this <span aria-hidden="true">→</span>
              </button>
              <p className="privacy-note form-privacy">
                We’ll use your email only to send your pitch card and internship matches.
              </p>
            </form>
          </section>
        )}

        {flow.step === 'prompt' && (
          <section className="application-panel prompt-panel">
            <button className="back-link" type="button" onClick={() => setFlow((current) => ({ ...current, step: 'signup' }))}>← <span>Back to details</span></button>
            <span className="form-kicker">STEP 04 <span>/ 04</span></span>
            <p className="applicant-greeting">A little something for you, {flow.name.trim().split(/\s+/)[0] || 'there'}.</p>
            <h1>Your perspective <em>is the point.</em></h1>
            <div className="prompt-card">
              <div className="prompt-card-top"><span>YOUR {fieldLabels[flow.field].toUpperCase()} PROMPT</span><span>✳</span></div>
              <p>{flow.prompt}</p>
            </div>
            <div className="timer-display" aria-live="polite">
              {flow.timeLeft === 0
                ? <span>Time&apos;s up</span>
                : <><span>{String(Math.floor(flow.timeLeft / 60)).padStart(2, '0')}:{String(flow.timeLeft % 60).padStart(2, '0')}</span><span>A minute. Your words.</span></>}
            </div>
            <form className="application-form response-form" onSubmit={submitResponse}>
              <label htmlFor="applicant-response">Your answer</label>
              <textarea
                id="applicant-response"
                disabled={flow.timeLeft === 0}
                onChange={(event) => setFlow((current) => ({ ...current, response: event.target.value }))}
                placeholder="Start wherever you are. Write it in your own words..."
                required
                rows="6"
                value={flow.response}
              />
              <button className="button application-submit" disabled={flow.timeLeft === 0} type="submit">
                Keep my response <span aria-hidden="true">→</span>
              </button>
              <p className="privacy-note form-privacy">Your response stays in this browser and isn’t sent to a server.</p>
            </form>
          </section>
        )}

        {flow.step === 'confirmation' && (
          <section className="application-panel confirmation-panel" aria-live="polite">
            <div className="confirmation-symbol" aria-hidden="true">✳</div>
            <span className="form-kicker">A GOOD FIRST STEP</span>
            <h1>You showed up.<br /><em>That matters.</em></h1>
            <p className="panel-description">
              Your response is here for this browser session. It hasn’t been sent to or saved by Riseup.ai.
            </p>
            <div className="response-recap">
              <span>YOUR RESPONSE</span>
              <p>{flow.response}</p>
            </div>
            <div className="confirmation-actions">
              <section className="confirmation-action">
                <h2>Save your pitch</h2>
                <p>Create an account so this doesn’t disappear when you close the tab.</p>
                <button className="button" type="button" onClick={savePitch}>
                  {flow.saveMessage.startsWith('Saved') ? 'Saved' : 'Save my pitch'}
                </button>
                {flow.saveMessage && <p className="save-message" role="status">{flow.saveMessage}</p>}
              </section>
              <section className="confirmation-action">
                <h2>See internships for your track</h2>
                <a className="button button-secondary" href={`/internships.html?track=${flow.track}`}>
                  View 3 {flow.track === 'business' ? 'business' : 'technology'} internships
                </a>
              </section>
            </div>
          </section>
        )}
      </main>
      <footer className="application-footer">
        <Brand />
        <span>Built for people who build things.</span>
        <span>© 2026 Riseup.ai</span>
      </footer>
    </div>
  );
}

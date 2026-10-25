import { useEffect, useRef, useState } from 'react';
import Brand, { BrandMark } from '../components/Brand.jsx';
import InternshipExamples from '../components/InternshipExamples.jsx';
import { careerOptions, getCareerField } from '../data/careerOptions.js';

const tracks = [
  {
    id: 'business',
    label: 'Business',
    title: 'Ideas & business',
    description: 'Marketing, business development, or planning events. Pick what sounds fun.',
  },
  {
    id: 'tech',
    label: 'Technology',
    title: 'Tech & building things',
    description: 'AI, software, and engineering. Pick something you’d like to build.',
  },
];

function ApplicationHeader() {
  return (
    <header className="application-header">
      <Brand />
      <a className="application-home-link" href="/">Back to Riseup.AI <span aria-hidden="true">↗</span></a>
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
      prompt: getCareerField(current.track, selectedField).prompt,
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
        field: flow.field,
      }));
      setFlow((current) => ({
        ...current,
        saveMessage: 'Saved in this browser only.',
      }));
    } catch {
      setFlow((current) => ({
        ...current,
        saveMessage: 'Could not save your answer in this browser.',
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
              <div className="application-eyebrow"><span /> A ONE-MINUTE BREAK</div>
              <h1>Try a one-minute <em>challenge.</em></h1>
              <p className="application-lede">
                This isn’t a test. Pick something you’re curious about and answer a short prompt. No experience needed.
              </p>
              <div className="application-proof">
                <span>01</span> PICK A DIRECTION <i /> <span>02</span> TRY A PROMPT <i /> <span>03</span> SEE WHAT YOU THINK
              </div>
            </section>
            <section className="track-section" aria-labelledby="track-heading">
              <div className="track-section-heading">
                <div>
                  <span className="form-kicker">STEP 01</span>
                  <h2 id="track-heading">What sounds interesting?</h2>
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
                    <span className="track-option-title">{item.title}</span>
                    <span className="track-option-description">{item.description}</span>
                    <span className="track-option-link">Give this a try <span aria-hidden="true">→</span></span>
                  </button>
                ))}
              </div>
            </section>
            <p className="privacy-note">No account needed. Your answer stays on this device and isn’t sent anywhere.</p>
          </>
        )}

        {flow.step === 'field' && (
          <section className="application-panel field-panel">
            <button className="back-link" type="button" onClick={() => setFlow((current) => ({ ...current, step: 'landing' }))}>← <span>Back to tracks</span></button>
            <span className="form-kicker">STEP 02 <span>/ 04</span></span>
            <h1>What are you curious about?</h1>
            <p className="panel-description">
              Choose whatever sounds interesting. You can always change your mind later.
            </p>
            <div className="field-options">
              {careerOptions[flow.track].fields.map((field) => (
                <button
                  className="field-option"
                  key={field.id}
                  type="button"
                  onClick={() => chooseField(field.id)}
                >
                  {field.label}<span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {flow.step === 'signup' && (
          <section className="application-panel">
            <button className="back-link" type="button" onClick={() => setFlow((current) => ({ ...current, step: 'field' }))}>← <span>Back to field</span></button>
            <span className="form-kicker">STEP 03 <span>/ 04</span></span>
            <h1>Quick intro, <em>then you’re off.</em></h1>
            <p className="panel-description">
              You picked {getCareerField(flow.track, flow.field).label}. What should we call you?
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
                Your details stay on this device and aren’t sent anywhere.
              </p>
            </form>
          </section>
        )}

        {flow.step === 'prompt' && (
          <section className="application-panel prompt-panel">
            <button className="back-link" type="button" onClick={() => setFlow((current) => ({ ...current, step: 'signup' }))}>← <span>Back to details</span></button>
            <span className="form-kicker">STEP 04 <span>/ 04</span></span>
            <p className="applicant-greeting">You’ve got this, {flow.name.trim().split(/\s+/)[0] || 'there'}.</p>
            <h1>Here’s your <em>one-minute prompt.</em></h1>
            <div className="prompt-card">
              <div className="prompt-card-top"><span>A quick question about {getCareerField(flow.track, flow.field).label.toLowerCase()}</span><BrandMark className="brand-gem prompt-mark" /></div>
              <p>{flow.prompt}</p>
            </div>
            <div className="timer-display" aria-live="polite">
              {flow.timeLeft === 0
                ? <span>Time&apos;s up</span>
                : <><span>{String(Math.floor(flow.timeLeft / 60)).padStart(2, '0')}:{String(flow.timeLeft % 60).padStart(2, '0')}</span><span>You have one minute to write.</span></>}
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
              <p className="privacy-note form-privacy">Your answer stays on this device and isn’t sent anywhere.</p>
            </form>
          </section>
        )}

        {flow.step === 'confirmation' && (
          <section className="application-panel confirmation-panel" aria-live="polite">
            <div className="confirmation-symbol" aria-hidden="true">✓</div>
            <span className="form-kicker">NICE WORK</span>
            <h1>You gave it a go.<br /><em>That counts.</em></h1>
            <p className="panel-description">
              Your answer is only on this device. It hasn’t been sent to Riseup.AI.
            </p>
            <div className="response-recap">
              <span>YOUR ANSWER</span>
              <p>{flow.response}</p>
            </div>
            <section className="confirmation-internships" aria-labelledby="example-internships-heading">
              <span className="form-kicker">BASED ON YOUR PICK: {getCareerField(flow.track, flow.field).label.toUpperCase()}</span>
              <h2 id="example-internships-heading">Five internship ideas to explore</h2>
              <p className="panel-description">These are examples to help you brainstorm, not live job openings.</p>
              <InternshipExamples internships={getCareerField(flow.track, flow.field).internships} />
            </section>
            <div className="confirmation-actions">
              <section className="confirmation-action">
                <h2>Keep a copy</h2>
                <p>Save your answer in this browser so you can come back to it later.</p>
                <button className="button" type="button" onClick={savePitch}>
                  {flow.saveMessage.startsWith('Saved') ? 'Saved' : 'Save on this device'}
                </button>
                {flow.saveMessage && <p className="save-message" role="status">{flow.saveMessage}</p>}
              </section>
            </div>
          </section>
        )}
      </main>
      <footer className="application-footer">
        <Brand />
        <span>For the early steps, too.</span>
        <span>© 2026 Riseup.AI</span>
      </footer>
    </div>
  );
}

import Brand from '../components/Brand.jsx';
import InternshipExamples from '../components/InternshipExamples.jsx';
import { careerOptions, getCareerField } from '../data/careerOptions.js';

function ApplicationHeader() {
  return (
    <header className="application-header">
      <Brand />
      <a className="application-home-link" href="/intern.html">Back to the prompt <span aria-hidden="true">↗</span></a>
    </header>
  );
}

export default function InternshipsPage() {
  const params = new URLSearchParams(window.location.search);
  const requestedTrack = params.get('track');
  const track = careerOptions[requestedTrack] ? requestedTrack : 'business';
  const requestedField = params.get('field');
  const field = getCareerField(track, requestedField);

  return (
    <div className="application-shell">
      <ApplicationHeader />
      <main className="application-main">
        <section className="application-panel internships-panel">
          <span className="form-kicker">{careerOptions[track].label.toUpperCase()} · {field.label.toUpperCase()}</span>
          <h1>Five ideas to <em>look into.</em></h1>
          <p className="panel-description">Examples picked for {field.label.toLowerCase()}. They’re here to spark ideas, not represent live job openings.</p>
          <InternshipExamples internships={field.internships} />
          <a className="back-link internship-back-link" href="/intern.html">← Back to the prompt</a>
        </section>
      </main>
      <footer className="application-footer">
        <Brand />
        <span>For the early steps, too.</span>
        <span>© 2026 Riseup.AI</span>
      </footer>
    </div>
  );
}

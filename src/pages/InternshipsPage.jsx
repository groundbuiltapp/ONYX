import Brand from '../components/Brand.jsx';

const internships = {
  business: [
    { title: 'Growth Marketing Intern', company: 'Northstar Labs', location: 'New York, NY' },
    { title: 'Business Development Intern', company: 'Common Ground', location: 'Remote' },
    { title: 'Partnerships Intern', company: 'Fieldwork', location: 'Austin, TX' },
  ],
  tech: [
    { title: 'AI Engineering Intern', company: 'Signal Works', location: 'Remote' },
    { title: 'Associate Product Intern', company: 'Brightside', location: 'San Francisco, CA' },
    { title: 'Software Engineering Intern', company: 'Northstar Labs', location: 'New York, NY' },
  ],
};

function ApplicationHeader() {
  return (
    <header className="application-header">
      <Brand />
      <a className="application-home-link" href="/intern.html">Back to your pitch <span aria-hidden="true">↗</span></a>
    </header>
  );
}

export default function InternshipsPage() {
  const requestedTrack = new URLSearchParams(window.location.search).get('track');
  const track = requestedTrack === 'tech' ? 'tech' : 'business';
  const trackLabel = track === 'business' ? 'Business' : 'Technology';

  return (
    <div className="application-shell">
      <ApplicationHeader />
      <main className="application-main">
        <section className="application-panel internships-panel">
          <span className="form-kicker">{trackLabel.toUpperCase()} OPPORTUNITIES</span>
          <h1>Three places to <em>start.</em></h1>
          <p className="panel-description">Sample internships to help you explore what’s next.</p>
          <div className="internship-list">
            {internships[track].map((internship) => (
              <article className="internship-card" key={internship.title}>
                <h2>{internship.title}</h2>
                <p>{internship.company}</p>
                <span>{internship.location}</span>
              </article>
            ))}
          </div>
          <a className="back-link internship-back-link" href="/intern.html">← Back to Riseup.AI</a>
        </section>
      </main>
      <footer className="application-footer">
        <Brand />
        <span>Built for people who build things.</span>
        <span>© 2026 Riseup.AI</span>
      </footer>
    </div>
  );
}

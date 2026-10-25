export default function InternshipExamples({ internships }) {
  return (
    <div className="internship-list">
      {internships.map((internship) => (
        <article className="internship-card" key={internship.title}>
          <span className="internship-label">EXAMPLE ROLE · NOT A LIVE OPENING</span>
          <h2>{internship.title}</h2>
          <p>{internship.company}</p>
          <span>{internship.location}</span>
        </article>
      ))}
    </div>
  );
}

import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { resumeSkills } from "@/data/skills";
import { personal } from "@/data/personal";

/** Display date ranges with a hyphen separator ("09/2024 - 10/2025"); data uses an en dash. */
const formatDates = (dates: string) => dates.replace(/–/g, "-");

/**
 * ATS-friendly resume: single column, plain dark text on white, Inter only,
 * no icons or colors. Deliberately boring — built for resume parsers.
 */
export default function AtsResumeLayout() {
  return (
    <div className="ats-resume">
      <style>{atsCSS}</style>

      <header>
        <h1>{personal.name}</h1>
        <p className="ats-title">{personal.title}</p>
        <p className="ats-contact">
          {personal.email} | {personal.phone} | linkedin.com/in/b-c-s | github.com/brendancsmith
        </p>
      </header>

      <section>
        <h2>EXPERIENCE</h2>
        {experience.map((entry) => (
          <div key={entry.company} className="ats-entry">
            <p className="ats-role">{entry.resumeRole ?? entry.role}</p>
            <p className="ats-meta">
              {entry.resumeCompany ?? entry.company} | {entry.location} | {formatDates(entry.dates)}
            </p>
            <ul>
              {(entry.resumeBullets ?? entry.bullets).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>EDUCATION</h2>
        {education.map((entry) => {
          const highlights = entry.resumeHighlights ?? entry.highlights;
          return (
            <div key={entry.institution} className="ats-entry">
              <p className="ats-role">{entry.degree}</p>
              <p className="ats-meta">
                {entry.institution} | {formatDates(entry.dates)} | GPA: {entry.gpa}
              </p>
              {highlights.length > 0 && (
                <ul>
                  {highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>

      <section>
        <h2>SKILLS</h2>
        {resumeSkills.map((cat) => (
          <p key={cat.category} className="ats-skill-line">
            {cat.category}: {cat.skills.join(", ")}
          </p>
        ))}
      </section>
    </div>
  );
}

const atsCSS = `
/* Override portfolio dark mode and hide chrome */
html, html.dark { background: #fff !important; }
body, body[class] {
  background: #fff !important;
  color: #1a1a1a !important;
  margin: 0;
}
body > nav { display: none !important; }

@page {
  size: 8.5in 11in;
  margin: 0;
}

.ats-resume {
  width: 8.5in;
  min-height: 11in;
  margin: 0 auto;
  padding: 0.6in 0.7in;
  background: #fff;
  color: #1a1a1a;
  font-family: var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 10pt;
  line-height: 1.35;
  box-sizing: border-box;
}

.ats-resume h1 {
  font-size: 16pt;
  font-weight: 700;
  margin: 0 0 2pt;
}

.ats-title {
  font-size: 11pt;
  font-weight: 400;
  margin: 0 0 4pt;
}

.ats-contact {
  font-size: 10pt;
  margin: 0 0 14pt;
}

.ats-resume h2 {
  font-size: 11pt;
  font-weight: 700;
  margin: 14pt 0 6pt;
}

.ats-entry {
  margin-bottom: 10pt;
}

.ats-role {
  font-size: 10.5pt;
  font-weight: 700;
  margin: 0;
}

.ats-meta {
  font-size: 10pt;
  margin: 0 0 2pt;
}

.ats-resume ul {
  margin: 2pt 0 0;
  padding-left: 16pt;
  list-style: disc;
}

.ats-resume li {
  margin-bottom: 1.5pt;
}

.ats-skill-line {
  margin: 0 0 4pt;
}
`;

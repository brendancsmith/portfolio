import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skills } from "@/data/skills";
import { personal } from "@/data/personal";

interface ResumeLayoutProps {
  variant: "standard" | "extended";
}

export default function ResumeLayout({ variant }: ResumeLayoutProps) {
  return (
    <div className="resume">
      <style>{resumeCSS}</style>

      {/* Two-column body */}
      <div className="resume-body">
        {/* Left column — Header + Experience */}
        <div className="resume-left">
          <header className="resume-header">
            <h1 className="resume-name">{personal.name.toUpperCase()}</h1>
            <p className="resume-title">{personal.title}</p>
            <div className="resume-contact">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
                </svg>
                {personal.email}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                {personal.phone}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
                linkedin.com/in/b-c-s
              </span>
            </div>
          </header>

          <section>
            <h2>EXPERIENCE</h2>
            {experience.map((entry) => {
              const bullets =
                variant === "standard"
                  ? entry.resumeBullets ?? entry.bullets
                  : entry.bullets;

              return (
                <div key={entry.company} className="resume-entry">
                  <div className="resume-entry-row">
                    <span className="resume-role">{entry.role}</span>
                    <span className="resume-dates">{entry.dates}</span>
                  </div>
                  <div className="resume-entry-row">
                    <span className="resume-company">{entry.company}</span>
                    <span className="resume-location">{entry.location}</span>
                  </div>
                  {variant === "extended" && entry.description && (
                    <p className="resume-description">{entry.description}</p>
                  )}
                  <ul>
                    {bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        </div>

        {/* Right column — Education + Skills */}
        <div className="resume-right">
          <section>
            <h2>EDUCATION</h2>
            {education.map((entry) => (
              <div key={entry.institution} className="resume-edu">
                <p className="resume-degree">{entry.degree}</p>
                <p className="resume-institution">{entry.institution}</p>
                <p className="resume-edu-dates">{entry.dates}</p>
                {entry.highlights.length > 0 && (
                  <ul>
                    {entry.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                <p className="resume-gpa">
                  GPA | <strong>{entry.gpa}</strong>
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2>SKILLS</h2>
            {skills.map((cat) => (
              <div key={cat.category} className="resume-skill-group">
                <p className="resume-skill-category">{cat.category}</p>
                <p className="resume-skill-list">
                  {cat.skills.join(" \u00b7 ")}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Raw CSS — no Tailwind, precise print control                      */
/* ------------------------------------------------------------------ */

const ACCENT = "#2563eb";

const resumeCSS = `
/* Override portfolio dark mode and hide chrome */
html, html.dark { background: #fff !important; }
body, body[class] {
  background: #fff !important;
  color: #1e293b !important;
  margin: 0;
}
body > nav { display: none !important; }

@page {
  size: 8.5in 15in;
  margin: 0;
}

@media print {
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}

.resume {
  width: 8.5in;
  height: 15in;
  margin: 0 auto;
  padding: 0.45in 0.55in 0.4in 0.35in;
  background: #fff;
  color: #1e293b;
  font-family: var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 9pt;
  line-height: 1.35;
  box-sizing: border-box;
  display: flex;
  gap: 0.35in;
}

/* ---- Header ---- */
.resume-header {
  margin-bottom: 0.2in;
}

.resume-name {
  font-size: 22pt;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.1;
  color: #0f172a;
  margin: 0 0 2pt;
}

.resume-title {
  font-size: 11pt;
  font-weight: 500;
  color: ${ACCENT};
  margin: 0 0 6pt;
}

.resume-contact {
  display: flex;
  gap: 16pt;
  font-size: 8.5pt;
  color: #475569;
}

.resume-contact span {
  display: flex;
  align-items: center;
  gap: 4pt;
}

.resume-contact svg {
  width: 10pt;
  height: 10pt;
  flex-shrink: 0;
  color: ${ACCENT};
}

/* ---- Two-column layout ---- */
.resume-body {
  display: contents;
}

.resume-left {
  flex: 0 0 61%;
  background: #fff;
}

.resume-right {
  flex: 1;
  background: #2b3544;
  padding: 1.48in 0.35in 0.3in;
  margin: -0.45in -0.55in -0.4in 0;
  color: #fff;
}

/* ---- Section headers ---- */
.resume h2 {
  font-size: 10.5pt;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #0f172a;
  border-bottom: 1.5pt solid ${ACCENT};
  padding-bottom: 3pt;
  margin: 0 0 8pt;
}

.resume-right h2 {
  color: #fff;
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

/* ---- Experience entries ---- */
.resume-entry {
  margin-bottom: 8pt;
}

.resume-entry-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.resume-role {
  font-weight: 700;
  font-size: 9.5pt;
  color: #0f172a;
}

.resume-dates {
  font-size: 8.5pt;
  color: #475569;
  white-space: nowrap;
}

.resume-company {
  font-weight: 600;
  color: ${ACCENT};
  font-size: 9pt;
}

.resume-location {
  font-size: 8.5pt;
  color: #475569;
}

.resume-description {
  font-size: 8.5pt;
  font-style: italic;
  color: #475569;
  margin: 2pt 0 3pt;
  line-height: 1.3;
}

/* ---- Bullet lists ---- */
.resume ul {
  margin: 3pt 0 0;
  padding-left: 12pt;
  list-style: disc;
}

.resume li {
  font-size: 8.5pt;
  line-height: 1.3;
  margin-bottom: 1.5pt;
  color: #334155;
}

.resume li::marker {
  color: #94a3b8;
  font-size: 7pt;
}

.resume-right li {
  color: rgba(255, 255, 255, 0.85);
}

.resume-right li::marker {
  color: rgba(255, 255, 255, 0.5);
}

/* ---- Education ---- */
.resume-edu {
  margin-bottom: 10pt;
}

.resume-degree {
  font-weight: 700;
  font-size: 9.5pt;
  color: #fff;
  margin: 0;
}

.resume-institution {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  font-size: 9pt;
  margin: 0;
}

.resume-edu-dates {
  font-size: 8.5pt;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 2pt;
}

.resume-gpa {
  font-size: 8.5pt;
  color: rgba(255, 255, 255, 0.7);
  margin: 4pt 0 0;
}

.resume-gpa strong {
  color: #fff;
}

/* ---- Skills ---- */
.resume-skill-group {
  margin-bottom: 6pt;
}

.resume-skill-category {
  font-weight: 700;
  font-size: 9pt;
  color: #fff;
  margin: 0 0 1pt;
}

.resume-skill-list {
  font-size: 8.5pt;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.4;
  margin: 0;
}

/* ---- Print overrides ---- */
@media print {
  .resume {
    width: auto;
    margin: 0;
    padding: 0.45in 0.55in 0.4in 0.35in;
  }
  .resume-right {
    margin: -0.45in -0.55in -0.4in 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
`;

import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { resumeSkills } from "@/data/skills";
import { personal } from "@/data/personal";
import { formatDates } from "./utils";

interface ResumeLayoutProps {
  variant: "standard" | "extended";
}

/** "3.89 / 4.00" -> GPA | <b>3.89</b> / 4.00, matching the target's bold-value treatment. */
function GpaLine({ gpa }: { gpa: string }) {
  const [value, scale] = gpa.split(" / ");
  return (
    <p className="resume-gpa">
      GPA <span className="resume-gpa-bar" />{" "}
      {scale ? (
        <>
          <strong>{value}</strong> / {scale}
        </>
      ) : (
        <strong>{gpa}</strong>
      )}
    </p>
  );
}

export default function ResumeLayout({ variant }: ResumeLayoutProps) {
  const isStandard = variant === "standard";

  return (
    <div className={`resume ${isStandard ? "resume--standard" : "resume--extended"}`}>
      <style>{resumeCSS}</style>

      {/* DOM order: header, all experience, then sidebar (education/skills).
          Keeps extracted PDF text linear for ATS parsers despite the two-column visual. */}
      <div className="resume-left">
        <header className="resume-header">
          <h1 className="resume-name">{personal.name.toUpperCase()}</h1>
          <p className="resume-title">{personal.title}</p>
          <div className="resume-contact">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              {personal.phone}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
              </svg>
              {personal.email}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
              linkedin.com/in/b-c-s
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              github.com/brendancsmith
            </span>
          </div>
        </header>

        <section>
          <h2>EXPERIENCE</h2>
          {experience.map((entry) => {
            const role = isStandard ? (entry.resumeRole ?? entry.role) : entry.role;
            const company = isStandard ? (entry.resumeCompany ?? entry.company) : entry.company;
            const bullets = isStandard ? (entry.resumeBullets ?? entry.bullets) : entry.bullets;

            return (
              <div key={entry.company} className="resume-entry">
                <div className="resume-entry-row">
                  <span className="resume-role">{role}</span>
                  <span className="resume-dates">{formatDates(entry.dates)}</span>
                </div>
                <div className="resume-entry-row">
                  <span className="resume-company">{company}</span>
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

      {/* Dark sidebar — education + skills */}
      <div className="resume-right">
        <section>
          <h2>EDUCATION</h2>
          {education.map((entry) => {
            const highlights = isStandard
              ? (entry.resumeHighlights ?? entry.highlights)
              : entry.highlights;

            return (
              <div key={entry.institution} className="resume-edu">
                <p className="resume-degree">{entry.degree}</p>
                <p className="resume-institution">{entry.institution}</p>
                <p className="resume-edu-dates">{formatDates(entry.dates)}</p>
                {highlights.length > 0 && (
                  <ul>
                    {highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                <GpaLine gpa={entry.gpa} />
              </div>
            );
          })}
        </section>

        <section>
          <h2>SKILLS</h2>
          {resumeSkills.map((cat) => (
            <div key={cat.category} className="resume-skill-group">
              <p className="resume-skill-category">{cat.category}</p>
              <p className="resume-skill-list">{cat.skills.join(" · ")}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Raw CSS — no Tailwind, precise print control                      */
/*                                                                    */
/*  Values sampled from the target Enhancv design (rescaled from A4   */
/*  to US Letter): accent #008CFF, ink #3E3E3E, sidebar #22405C,      */
/*  sidebar starting at 65.2% of the page width; Rubik for the name/  */
/*  headings/roles, Inter for body text.                              */
/* ------------------------------------------------------------------ */

const ACCENT = "#008CFF";
const INK = "#3E3E3E";
const SIDEBAR_BG = "#22405C";

const resumeCSS = `
/* Override portfolio dark mode and hide chrome */
html, html.dark { background: #fff !important; }
body, body[class] {
  background: #fff !important;
  color: ${INK} !important;
  margin: 0;
}
body > nav { display: none !important; }

@page {
  size: 8.5in 11in;
  margin: 0;
}

@media print {
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}

.resume {
  width: 8.5in;
  min-height: 11in;
  margin: 0 auto;
  background: #fff;
  color: ${INK};
  font-family: var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 7.6pt;
  line-height: 1.3;
  box-sizing: border-box;
  display: flex;
}

/* The standard variant must fit exactly one Letter page; extended paginates. */
.resume--standard { height: 11in; }

/* ---- Columns ----
   Flex items have min-width:auto — pin both columns explicitly so no
   non-wrapping content can silently widen a column past its basis. */
.resume-left {
  flex: 0 0 5.54in; /* sidebar starts at 65.2% of the page, as in the target */
  min-width: 0;
  box-sizing: border-box;
  padding: 0.27in 0.22in 0.15in 0.36in;
}

.resume-right {
  flex: 1 1 auto;
  min-width: 0;
  box-sizing: border-box;
  background: ${SIDEBAR_BG};
  color: #fff;
  /* padding-top aligns the EDUCATION heading with EXPERIENCE in the left column */
  padding: 1.36in 0.3in 0.24in 0.32in;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ---- Header ---- */
.resume-header {
  margin-bottom: 0.17in;
}

.resume-name {
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-size: 17.8pt;
  font-weight: 500;
  line-height: 1.18;
  color: ${INK};
  margin: 0 0 1pt;
}

.resume-title {
  font-size: 10.2pt;
  font-weight: 400;
  line-height: 1.25;
  color: ${ACCENT};
  margin: 0 0 7pt;
}

.resume-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 3pt 12pt;
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-size: 8.25pt;
  color: ${INK};
}

/* Wrap between items, never inside one — hyphenated values (phone, handles)
   must not break mid-value. */
.resume-contact span {
  display: flex;
  align-items: center;
  gap: 4pt;
  white-space: nowrap;
}

.resume-contact svg {
  width: 9.5pt;
  height: 9.5pt;
  flex-shrink: 0;
  color: #b9b9b9;
}

/* ---- Section headers ---- */
.resume h2 {
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-size: 10.2pt;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: ${INK};
  border-bottom: 1pt solid #bdbdbd;
  padding-bottom: 3.5pt;
  margin: 0 0 5.5pt;
}

.resume-right h2 {
  color: #fff;
  border-bottom-color: #fff;
}

/* ---- Experience entries ---- */
.resume-entry {
  margin-bottom: 4.5pt;
  break-inside: avoid;
}

.resume-entry-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8pt;
}

.resume-role {
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-weight: 400;
  font-size: 9.5pt;
  color: ${INK};
}

.resume-dates {
  font-size: 7.6pt;
  color: ${INK};
  white-space: nowrap;
}

.resume-company {
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-weight: 400;
  font-size: 8.9pt;
  color: ${ACCENT};
  margin-top: 1pt;
}

.resume-location {
  font-size: 7.6pt;
  color: ${INK};
  white-space: nowrap;
}

.resume-description {
  font-size: 7.6pt;
  font-style: italic;
  color: #676767;
  margin: 2pt 0 0;
  line-height: 1.3;
}

/* ---- Bullet lists ---- */
.resume ul {
  margin: 1.5pt 0 0;
  padding-left: 10pt;
  list-style: disc;
}

.resume li {
  font-size: 7.6pt;
  line-height: 1.22; /* target pitch is 1.26; slightly tighter to fit Letter's shorter page */
  margin-bottom: 0;
  color: ${INK};
  break-inside: avoid;
}

.resume li::marker {
  color: ${INK};
  font-size: 6.5pt;
}

.resume-right li {
  color: #e0e0e0;
}

.resume-right li::marker {
  color: #e0e0e0;
}

/* ---- Education (sidebar) ---- */
.resume-edu {
  margin-bottom: 11pt;
  break-inside: avoid;
}

.resume-degree {
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-weight: 500;
  font-size: 9.5pt;
  color: #fff;
  margin: 0 0 3pt;
}

.resume-institution {
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-weight: 400;
  font-size: 8.25pt;
  color: #fff;
  margin: 0 0 2pt;
}

.resume-edu-dates {
  font-size: 7.6pt;
  color: #fff;
  margin: 0 0 1pt;
}

.resume-gpa {
  font-size: 7pt;
  color: #fff;
  text-align: right;
  margin: 4pt 0 0;
}

.resume-gpa-bar {
  display: inline-block;
  width: 0.75pt;
  height: 7.5pt;
  background: #fff;
  vertical-align: -1.5pt;
  margin: 0 1pt;
}

.resume-gpa strong {
  font-weight: 700;
  color: #fff;
}

/* ---- Skills (sidebar) ---- */
.resume-skill-group {
  margin-bottom: 8pt;
  break-inside: avoid;
}

.resume-skill-category {
  font-family: var(--font-rubik), 'Rubik', var(--font-inter), sans-serif;
  font-weight: 400;
  font-size: 9.5pt;
  color: #fff;
  margin: 0 0 3pt;
}

.resume-skill-list {
  font-size: 7.6pt;
  color: #fff;
  line-height: 1.45;
  margin: 0;
}

/* ---- Print overrides ---- */
@media print {
  .resume {
    margin: 0;
  }
  .resume-right {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
`;

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionCard } from "./components/SectionCard";
import { StatusPill } from "./components/StatusPill";
import {
  implementations,
  libraryCategories,
  matchesImplementationQuery,
  matchesProblemQuery,
  notes,
  problems,
  references,
  statusSummary
} from "./data/content";

const filters = ["All", "passing", "failing", "draft"] as const;

export default function App() {
  const [activeStatus, setActiveStatus] = useState<(typeof filters)[number]>("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [libraryQuery, setLibraryQuery] = useState("");
  const [problemQuery, setProblemQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState(notes[0]);

  const filteredImplementations = implementations.filter((item) => {
    const statusMatch = activeStatus === "All" || item.status === activeStatus;
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const queryMatch = libraryQuery.trim() === "" || matchesImplementationQuery(item, libraryQuery);
    return statusMatch && categoryMatch && queryMatch;
  });

  const filteredProblems = problems.filter((problem) => {
    return problemQuery.trim() === "" || matchesProblemQuery(problem, problemQuery);
  });

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <a href="#overview">Overview</a>
        <a href="#library">Library</a>
        <a href="#vault">Vault</a>
        <a href="#journal">Journal</a>
        <a href="#deploy">Deploy</a>
      </nav>

      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Competitive Programming OS</p>
          <h1>One place for your implementations, proofs, ideas, and battle scars.</h1>
          <p className="hero__body">
            A polished personal hub inspired by verification-first CP libraries, but expanded into a
            real knowledge system: tested templates, scattered insights, notes, references, and memorable
            problems all living together.
          </p>
          <div className="hero__cta-row">
            <a className="button button--primary" href="#library">
              Explore library
            </a>
            <a className="button button--ghost" href="#vault">
              Open notes vault
            </a>
          </div>
        </div>

        <div className="hero__panel">
          <div className="metric-grid">
            <article>
              <span>Verified</span>
              <strong>{statusSummary.passing}</strong>
            </article>
            <article>
              <span>Broken</span>
              <strong>{statusSummary.failing}</strong>
            </article>
            <article>
              <span>Drafting</span>
              <strong>{statusSummary.draft}</strong>
            </article>
            <article>
              <span>Notes</span>
              <strong>{notes.length}</strong>
            </article>
          </div>
          <div className="hero__callout">
            <p>What makes this useful</p>
            <ul>
              <li>Verification status attached to implementations</li>
              <li>Markdown, LaTeX, or PDF notes in one vault</li>
              <li>Problem writeups with reusable patterns</li>
            </ul>
          </div>
        </div>
      </header>

      <main className="page-grid" id="overview">
        <SectionCard
          eyebrow="Overview"
          title="Command center"
          subtitle="A quick pulse-check on the state of your CP ecosystem."
        >
          <div className="overview-grid">
            <article>
              <h3>Implementation health</h3>
              <p>Surface what is safe to reuse during a contest and what still needs repair.</p>
            </article>
            <article>
              <h3>Knowledge capture</h3>
              <p>Keep fleeting ideas, editorials, and technique notes from drifting into random folders.</p>
            </article>
            <article>
              <h3>Learning archive</h3>
              <p>Store cool problems and the exact pattern or invariant each one taught you.</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Implementations"
          title="Verification-aware library"
          subtitle="Inspired by `verification-helper`, but designed for daily browsing."
          action={
            <div className="library-controls" id="library">
              <label className="search-input">
                <span>Search</span>
                <input
                  type="search"
                  value={libraryQuery}
                  onChange={(event) => setLibraryQuery(event.target.value)}
                  placeholder="segment tree, flow, source path..."
                />
              </label>
              <div className="filter-row">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={filter === activeStatus ? "chip chip--active" : "chip"}
                    onClick={() => setActiveStatus(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="filter-row">
                {libraryCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={category === activeCategory ? "chip chip--active" : "chip"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          }
        >
          <div className="implementation-list">
            {filteredImplementations.map((item) => (
              <article key={item.name} className="implementation-card">
                <div className="implementation-card__header">
                  <div>
                    <p className="implementation-card__category">{item.category}</p>
                    <h3>{item.name}</h3>
                  </div>
                  <StatusPill status={item.status} />
                </div>
                <p>{item.summary}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="implementation-card__meta">
                  <div>
                    <h4>Tests</h4>
                    <ul>
                      {item.tests.map((test) => (
                        <li key={test}>{test}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Used in</h4>
                    <ul>
                      {item.linkedProblems.map((problem) => (
                        <li key={problem}>{problem}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {item.note ? <p className="implementation-card__note">{item.note}</p> : null}
                <code>{item.source}</code>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Knowledge Vault"
          title="Notes, PDFs, and scattered ideas"
          subtitle="Use markdown for quick notes, LaTeX for formal writeups, or attach PDFs for longer references."
        >
          <div className="vault-grid" id="vault">
            <aside className="note-list">
              {notes.map((note) => (
                <button
                  key={note.title}
                  type="button"
                  className={selectedNote.title === note.title ? "note-chip note-chip--active" : "note-chip"}
                  onClick={() => setSelectedNote(note)}
                >
                  <span>{note.title}</span>
                  <small>
                    {note.topic} · {note.format}
                  </small>
                </button>
              ))}
            </aside>

            <article className="note-viewer">
              <div className="note-viewer__header">
                <div>
                  <p className="eyebrow">{selectedNote.topic}</p>
                  <h3>{selectedNote.title}</h3>
                </div>
                <div className="note-meta">
                  <span>{selectedNote.format}</span>
                  <span>Updated {selectedNote.updated}</span>
                </div>
              </div>
              <p className="note-viewer__summary">{selectedNote.summary}</p>
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedNote.content}</ReactMarkdown>
              </div>
              {selectedNote.attachment ? (
                <a className="button button--ghost" href={selectedNote.attachment}>
                  Open attached PDF
                </a>
              ) : null}
            </article>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Problem Journal"
          title="Cool problems worth remembering"
          subtitle="Keep the problem, the pattern, and the real lesson together."
        >
          <div className="section-toolbar" id="journal">
            <label className="search-input">
              <span>Search</span>
              <input
                type="search"
                value={problemQuery}
                onChange={(event) => setProblemQuery(event.target.value)}
                placeholder="HLD, centroid, DP optimization..."
              />
            </label>
          </div>
          <div className="problem-grid">
            {filteredProblems.map((problem) => (
              <article key={problem.title} className="problem-card">
                <p className="problem-card__platform">
                  {problem.platform} · {problem.difficulty}
                </p>
                <h3>{problem.title}</h3>
                <p className="problem-card__pattern">{problem.pattern}</p>
                <p>{problem.takeaway}</p>
                {problem.implementationLinks?.length ? (
                  <p className="problem-card__links">
                    Related implementation: {problem.implementationLinks.join(", ")}
                  </p>
                ) : null}
                <a href={problem.link} target="_blank" rel="noreferrer">
                  Open problem
                </a>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Reference Shelf"
          title="External anchors"
          subtitle="A few high-value links that keep the system connected to the broader CP ecosystem."
        >
          <div className="reference-grid">
            {references.map((reference) => (
              <a key={reference.label} className="reference-card" href={reference.href} target="_blank" rel="noreferrer">
                <h3>{reference.label}</h3>
                <p>{reference.description}</p>
              </a>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Deploy"
          title="How this goes live on GitHub"
          subtitle="The repo is already wired for GitHub Pages through Actions."
        >
          <div className="deploy-grid" id="deploy">
            <article className="overview-grid__single">
              <h3>What you do on GitHub</h3>
              <ol>
                <li>Create an empty GitHub repository.</li>
                <li>Add it as `origin` from your machine and push the `main` branch.</li>
                <li>Open repository settings and make sure Pages uses GitHub Actions.</li>
                <li>Every push to `main` will rebuild and deploy this site automatically.</li>
              </ol>
            </article>
            <article className="overview-grid__single">
              <h3>What is already implemented here</h3>
              <ol>
                <li>Static Vite build configured for GitHub Pages-safe asset paths.</li>
                <li>Deployment workflow in `.github/workflows/deploy.yml`.</li>
                <li>Content structure that keeps notes and references repo-native.</li>
                <li>Room to add verification ingestion without rewriting the UI.</li>
              </ol>
            </article>
          </div>
        </SectionCard>
      </main>
    </div>
  );
}

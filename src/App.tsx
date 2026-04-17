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
const views = ["Library", "Notes", "Problems", "Deploy"] as const;

type View = (typeof views)[number];

export default function App() {
  const [activeView, setActiveView] = useState<View>("Library");
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
      <header className="app-header">
        <div>
          <p className="eyebrow">Competitive Programming Workspace</p>
          <h1>CP Knowledge Hub</h1>
          <p className="app-header__body">
            A quieter personal system for library code, notes, solved problems, and deployment.
          </p>
        </div>
        <div className="summary-strip">
          <article>
            <span>Passing</span>
            <strong>{statusSummary.passing}</strong>
          </article>
          <article>
            <span>Failing</span>
            <strong>{statusSummary.failing}</strong>
          </article>
          <article>
            <span>Drafts</span>
            <strong>{statusSummary.draft}</strong>
          </article>
          <article>
            <span>Notes</span>
            <strong>{notes.length}</strong>
          </article>
        </div>
      </header>

      <nav className="view-switcher" aria-label="Workspace sections">
        {views.map((view) => (
          <button
            key={view}
            type="button"
            className={view === activeView ? "view-switcher__tab view-switcher__tab--active" : "view-switcher__tab"}
            onClick={() => setActiveView(view)}
          >
            {view}
          </button>
        ))}
      </nav>

      <main className="workspace">
        {activeView === "Library" ? (
          <SectionCard
            eyebrow="Library"
            title="Implementations"
            subtitle="Focus on what is reusable, what is broken, and what still needs proof."
            action={
              <div className="section-actions">
                <label className="search-input">
                  <span>Search</span>
                  <input
                    type="search"
                    value={libraryQuery}
                    onChange={(event) => setLibraryQuery(event.target.value)}
                    placeholder="segment tree, flow, source path..."
                  />
                </label>
              </div>
            }
          >
            <div className="filter-stack">
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

            <div className="library-layout">
              <aside className="side-summary">
                <h3>How to use this view</h3>
                <p>Keep only trustworthy snippets in the passing pool. Broken and draft items stay visible so nothing gets forgotten.</p>
                <div className="side-summary__stats">
                  <div>
                    <span>Shown</span>
                    <strong>{filteredImplementations.length}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>{implementations.length}</strong>
                  </div>
                </div>
              </aside>

              <div className="implementation-list">
                {filteredImplementations.map((item) => (
                  <article key={item.slug} className="implementation-card">
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
            </div>
          </SectionCard>
        ) : null}

        {activeView === "Notes" ? (
          <SectionCard
            eyebrow="Notes"
            title="Knowledge Vault"
            subtitle="Markdown for quick capture, LaTeX for formal ideas, PDFs for longer references."
          >
            <div className="vault-layout">
              <aside className="note-list">
                {notes.map((note) => (
                  <button
                    key={note.slug}
                    type="button"
                    className={selectedNote.slug === note.slug ? "note-chip note-chip--active" : "note-chip"}
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
                  <a className="text-link" href={selectedNote.attachment}>
                    Open attached PDF
                  </a>
                ) : null}
              </article>

              <aside className="reference-panel">
                <h3>References</h3>
                <div className="reference-list">
                  {references.map((reference) => (
                    <a key={reference.label} className="reference-list__item" href={reference.href} target="_blank" rel="noreferrer">
                      <strong>{reference.label}</strong>
                      <span>{reference.description}</span>
                    </a>
                  ))}
                </div>
              </aside>
            </div>
          </SectionCard>
        ) : null}

        {activeView === "Problems" ? (
          <SectionCard
            eyebrow="Problems"
            title="Problem Journal"
            subtitle="Keep only the pattern, insight, and linked implementation that you’ll want later."
            action={
              <div className="section-actions">
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
            }
          >
            <div className="problem-list">
              {filteredProblems.map((problem) => (
                <article key={problem.slug} className="problem-row">
                  <div className="problem-row__main">
                    <p className="problem-card__platform">
                      {problem.platform} · {problem.difficulty}
                    </p>
                    <h3>{problem.title}</h3>
                    <p className="problem-card__pattern">{problem.pattern}</p>
                    <p>{problem.takeaway}</p>
                  </div>
                  <div className="problem-row__side">
                    {problem.implementationLinks?.length ? (
                      <p className="problem-card__links">{problem.implementationLinks.join(", ")}</p>
                    ) : (
                      <p className="problem-card__links">No linked implementation yet</p>
                    )}
                    <a className="text-link" href={problem.link} target="_blank" rel="noreferrer">
                      Open problem
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>
        ) : null}

        {activeView === "Deploy" ? (
          <SectionCard
            eyebrow="Deploy"
            title="GitHub workflow"
            subtitle="The repo is already configured for GitHub Pages via Actions."
          >
            <div className="deploy-layout">
              <article className="plain-card">
                <h3>One-time setup</h3>
                <ol>
                  <li>Create an empty GitHub repository.</li>
                  <li>Push your local `main` branch to that repo.</li>
                  <li>Open `Settings` to `Pages` and choose `GitHub Actions`.</li>
                  <li>Every later push to `main` will rebuild and deploy automatically.</li>
                </ol>
              </article>
              <article className="plain-card">
                <h3>Useful commands</h3>
                <pre className="code-block">
                  <code>{`git add .
git commit -m "Update CP knowledge hub"
git push`}</code>
                </pre>
              </article>
              <article className="plain-card">
                <h3>About the GitHub warning</h3>
                <p>
                  The Node 20 warning is from GitHub-hosted actions deprecating their runtime. Your deployment still
                  works. We can update the workflow later when GitHub or the action maintainers publish the preferred
                  Node 24 path.
                </p>
              </article>
            </div>
          </SectionCard>
        ) : null}
      </main>
    </div>
  );
}

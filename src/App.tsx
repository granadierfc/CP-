import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

const libraryFilters = ["All", "passing", "failing", "draft"] as const;
const views = ["Library", "Notes", "Problems"] as const;

type View = (typeof views)[number];

function EmptyState({
  title,
  body,
  hint
}: {
  title: string;
  body: string;
  hint: string;
}) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{body}</p>
      <code>{hint}</code>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<View>("Library");
  const [activeStatus, setActiveStatus] = useState<(typeof libraryFilters)[number]>("All");
  const [activeSection, setActiveSection] = useState("All");
  const [libraryQuery, setLibraryQuery] = useState("");
  const [problemQuery, setProblemQuery] = useState("");
  const [selectedImplementationSlug, setSelectedImplementationSlug] = useState<string | null>(
    implementations[0]?.slug ?? null
  );
  const [selectedNoteSlug, setSelectedNoteSlug] = useState<string | null>(notes[0]?.slug ?? null);
  const [selectedProblemSlug, setSelectedProblemSlug] = useState<string | null>(problems[0]?.slug ?? null);

  const filteredImplementations = implementations.filter((item) => {
    const statusMatch = activeStatus === "All" || item.status === activeStatus;
    const sectionMatch = activeSection === "All" || item.section === activeSection;
    const queryMatch = libraryQuery.trim() === "" || matchesImplementationQuery(item, libraryQuery);
    return statusMatch && sectionMatch && queryMatch;
  });

  const filteredProblems = problems.filter((problem) => {
    return problemQuery.trim() === "" || matchesProblemQuery(problem, problemQuery);
  });

  const selectedImplementation =
    filteredImplementations.find((item) => item.slug === selectedImplementationSlug) ??
    filteredImplementations[0] ??
    null;
  const selectedNote = notes.find((note) => note.slug === selectedNoteSlug) ?? notes[0] ?? null;
  const selectedProblem =
    filteredProblems.find((problem) => problem.slug === selectedProblemSlug) ??
    filteredProblems[0] ??
    null;

  useEffect(() => {
    setSelectedImplementationSlug(filteredImplementations[0]?.slug ?? null);
  }, [activeStatus, activeSection, libraryQuery]);

  useEffect(() => {
    setSelectedProblemSlug(filteredProblems[0]?.slug ?? null);
  }, [problemQuery]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <p className="eyebrow">Competitive Programming</p>
          <h1>Knowledge Hub</h1>
          <p className="sidebar__intro">
            A quiet place for code you trust, notes you want to revisit, and problems worth remembering.
          </p>
        </div>

        <nav className="sidebar__nav" aria-label="Primary">
          {views.map((view) => (
            <button
              key={view}
              type="button"
              className={view === activeView ? "sidebar__nav-item sidebar__nav-item--active" : "sidebar__nav-item"}
              onClick={() => setActiveView(view)}
            >
              <span>{view}</span>
              <small>
                {view === "Library" ? implementations.length : view === "Notes" ? notes.length : problems.length}
              </small>
            </button>
          ))}
        </nav>

        <section className="sidebar__panel">
          <h2>Overview</h2>
          <dl className="sidebar__stats">
            <div>
              <dt>Passing</dt>
              <dd>{statusSummary.passing}</dd>
            </div>
            <div>
              <dt>Failing</dt>
              <dd>{statusSummary.failing}</dd>
            </div>
            <div>
              <dt>Drafts</dt>
              <dd>{statusSummary.draft}</dd>
            </div>
          </dl>
        </section>

        <section className="sidebar__panel">
          <h2>References</h2>
          <div className="sidebar__links">
            {references.map((reference) => (
              <a key={reference.label} href={reference.href} target="_blank" rel="noreferrer">
                <strong>{reference.label}</strong>
                <span>{reference.description}</span>
              </a>
            ))}
          </div>
        </section>
      </aside>

      <main className="main-pane">
        {activeView === "Library" ? (
          <section className="workspace-panel">
            <header className="workspace-panel__header">
              <div>
                <p className="eyebrow">Library</p>
                <h2>Implementations</h2>
                <p className="workspace-panel__subtitle">
                  Keep this view spare: name, status, path, and the one note that matters.
                </p>
              </div>
              <label className="search-input">
                <span>Search</span>
                <input
                  type="search"
                  value={libraryQuery}
                  onChange={(event) => setLibraryQuery(event.target.value)}
                  placeholder="search by name or path"
                />
              </label>
            </header>

            <div className="filter-bar">
              {libraryFilters.map((filter) => (
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

            <div className="filter-bar">
              {libraryCategories.map((section) => (
                <button
                  key={section}
                  type="button"
                  className={section === activeSection ? "chip chip--active" : "chip"}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>

            {filteredImplementations.length === 0 ? (
              <EmptyState
                title="No implementations yet"
                body="Add your first implementation entry when you are ready. This space is intentionally calm until real content arrives."
                hint="src/content/library.ts"
              />
            ) : (
              <div className="two-pane">
                <div className="list-pane">
                  {filteredImplementations.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      className={
                        item.slug === selectedImplementation?.slug ? "list-item list-item--active" : "list-item"
                      }
                      onClick={() => setSelectedImplementationSlug(item.slug)}
                    >
                      <div className="list-item__top">
                        <strong>{item.name}</strong>
                        <StatusPill status={item.status} />
                      </div>
                      <span>{item.section}</span>
                    </button>
                  ))}
                </div>

                <article className="detail-pane">
                  <p className="detail-pane__label">{selectedImplementation?.section}</p>
                  <h3>{selectedImplementation?.name}</h3>
                  <p>{selectedImplementation?.summary}</p>
                  <dl className="detail-list">
                    <div>
                      <dt>Source</dt>
                      <dd>
                        <code>{selectedImplementation?.source}</code>
                      </dd>
                    </div>
                    {selectedImplementation?.verification?.length ? (
                      <div>
                        <dt>Verification</dt>
                        <dd>{selectedImplementation.verification.join(", ")}</dd>
                      </div>
                    ) : null}
                    {selectedImplementation?.note ? (
                      <div>
                        <dt>Note</dt>
                        <dd>{selectedImplementation.note}</dd>
                      </div>
                    ) : null}
                  </dl>
                </article>
              </div>
            )}
          </section>
        ) : null}

        {activeView === "Notes" ? (
          <section className="workspace-panel">
            <header className="workspace-panel__header">
              <div>
                <p className="eyebrow">Notes</p>
                <h2>Notebook</h2>
                <p className="workspace-panel__subtitle">
                  Inspired by simple academic sites: just a list of notes and a page to read.
                </p>
              </div>
            </header>

            {notes.length === 0 ? (
              <EmptyState
                title="No notes yet"
                body="Place markdown or PDF-backed note entries here as you build the archive."
                hint="src/content/notes/index.ts"
              />
            ) : (
              <div className="two-pane">
                <div className="list-pane">
                  {notes.map((note) => (
                    <button
                      key={note.slug}
                      type="button"
                      className={note.slug === selectedNote?.slug ? "list-item list-item--active" : "list-item"}
                      onClick={() => setSelectedNoteSlug(note.slug)}
                    >
                      <strong>{note.title}</strong>
                      <span>
                        {note.topic} · {note.updated}
                      </span>
                    </button>
                  ))}
                </div>

                <article className="detail-pane detail-pane--prose">
                  <p className="detail-pane__label">{selectedNote?.topic}</p>
                  <h3>{selectedNote?.title}</h3>
                  <p>{selectedNote?.summary}</p>
                  <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedNote?.content ?? ""}</ReactMarkdown>
                  </div>
                  {selectedNote?.attachment ? (
                    <a className="text-link" href={selectedNote.attachment}>
                      Open attachment
                    </a>
                  ) : null}
                </article>
              </div>
            )}
          </section>
        ) : null}

        {activeView === "Problems" ? (
          <section className="workspace-panel">
            <header className="workspace-panel__header">
              <div>
                <p className="eyebrow">Problems</p>
                <h2>Journal</h2>
                <p className="workspace-panel__subtitle">
                  Store only the source, the lesson, and maybe a writeup link. Nothing more unless it earns the space.
                </p>
              </div>
              <label className="search-input">
                <span>Search</span>
                <input
                  type="search"
                  value={problemQuery}
                  onChange={(event) => setProblemQuery(event.target.value)}
                  placeholder="search by title or lesson"
                />
              </label>
            </header>

            {filteredProblems.length === 0 ? (
              <EmptyState
                title="No problems yet"
                body="Add only the problems you genuinely want to remember, not every solved problem."
                hint="src/content/problems.ts"
              />
            ) : (
              <div className="two-pane">
                <div className="list-pane">
                  {filteredProblems.map((problem) => (
                    <button
                      key={problem.slug}
                      type="button"
                      className={problem.slug === selectedProblem?.slug ? "list-item list-item--active" : "list-item"}
                      onClick={() => setSelectedProblemSlug(problem.slug)}
                    >
                      <strong>{problem.title}</strong>
                      <span>{problem.source}</span>
                    </button>
                  ))}
                </div>

                <article className="detail-pane">
                  <p className="detail-pane__label">{selectedProblem?.source}</p>
                  <h3>{selectedProblem?.title}</h3>
                  <dl className="detail-list">
                    <div>
                      <dt>Lesson</dt>
                      <dd>{selectedProblem?.lesson}</dd>
                    </div>
                    {selectedProblem?.writeup ? (
                      <div>
                        <dt>Writeup</dt>
                        <dd>{selectedProblem.writeup}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {selectedProblem?.link ? (
                    <a className="text-link" href={selectedProblem.link} target="_blank" rel="noreferrer">
                      Open original problem
                    </a>
                  ) : null}
                </article>
              </div>
            )}
          </section>
        ) : null}
      </main>
    </div>
  );
}

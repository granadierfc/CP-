import { implementations } from "../content/library";
import { notes } from "../content/notes";
import { problems } from "../content/problems";
import { references } from "../content/references";

export { implementations, notes, problems, references };

export const libraryCategories = ["All", ...new Set(implementations.map((item) => item.category))];

export const statusSummary = {
  passing: implementations.filter((item) => item.status === "passing").length,
  failing: implementations.filter((item) => item.status === "failing").length,
  draft: implementations.filter((item) => item.status === "draft").length
};

export function matchesImplementationQuery(
  implementation: (typeof implementations)[number],
  query: string
) {
  const haystack = [
    implementation.name,
    implementation.category,
    implementation.summary,
    implementation.source,
    implementation.note ?? "",
    ...implementation.tags,
    ...implementation.tests,
    ...implementation.linkedProblems
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function matchesProblemQuery(problem: (typeof problems)[number], query: string) {
  const haystack = [problem.title, problem.platform, problem.pattern, problem.takeaway]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

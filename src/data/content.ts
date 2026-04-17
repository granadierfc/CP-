import { implementations } from "../content/library";
import { notes } from "../content/notes";
import { problems } from "../content/problems";
import { references } from "../content/references";

export { implementations, notes, problems, references };

export const libraryCategories = ["All", ...new Set(implementations.map((item) => item.section))];

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
    implementation.section,
    implementation.summary,
    implementation.source,
    implementation.note ?? "",
    ...(implementation.verification ?? [])
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function matchesProblemQuery(problem: (typeof problems)[number], query: string) {
  const haystack = [problem.title, problem.source, problem.lesson, problem.writeup ?? ""].join(" ").toLowerCase();

  return haystack.includes(query.toLowerCase());
}

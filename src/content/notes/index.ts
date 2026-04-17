import smallToLargeNote from "./small-to-large.md?raw";
import slopeTrickNote from "./slope-trick.md?raw";
import type { Note } from "../types";

export const notes: Note[] = [
  {
    slug: "small-to-large",
    title: "Small-to-Large Merging",
    format: "markdown",
    updated: "2026-04-15",
    topic: "DSU on tree",
    summary: "When to use it, what can go wrong, and how to reason about the complexity proof.",
    content: smallToLargeNote
  },
  {
    slug: "slope-trick",
    title: "Slope Trick Cheatsheet",
    format: "latex",
    updated: "2026-04-11",
    topic: "Convex DP",
    summary: "A compact summary of add-abs, prefix-min, and breakpoint interpretations.",
    content: slopeTrickNote
  },
  {
    slug: "min-cost-flow-pdf",
    title: "Min-Cost Flow Notes PDF",
    format: "pdf",
    updated: "2026-04-07",
    topic: "Graphs",
    summary: "A longer writeup with primal-dual intuition and modeling examples.",
    content: `Attach a PDF under \`public/references/\` when you have a fuller note or a scanned handwritten derivation.

Suggested path: \`public/references/min-cost-flow.pdf\``,
    attachment: "./references/min-cost-flow.pdf"
  }
];

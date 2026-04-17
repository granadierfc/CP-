import type { ProblemEntry } from "./types";

export const problems: ProblemEntry[] = [
  {
    slug: "vertex-add-path-sum",
    title: "Yosupo - Vertex Add Path Sum",
    platform: "Library Checker",
    difficulty: "Hard",
    pattern: "HLD + Fenwick / Segment Tree",
    takeaway:
      "The interesting part is designing a reusable path-query interface so the problem becomes mostly plumbing.",
    link: "https://judge.yosupo.jp/problem/vertex_add_path_sum",
    implementationLinks: ["segment-tree-beats"]
  },
  {
    slug: "abc-372-f",
    title: "AtCoder ABC 372 F",
    platform: "AtCoder",
    difficulty: "Hard",
    pattern: "DP optimization",
    takeaway:
      "The transition only looked quadratic until the geometry view made the monotonicity obvious.",
    link: "https://atcoder.jp/"
  },
  {
    slug: "xenia-and-tree",
    title: "Codeforces - Xenia and Tree",
    platform: "Codeforces",
    difficulty: "Medium",
    pattern: "Centroid decomposition",
    takeaway:
      "Good reminder that maintenance complexity matters just as much as asymptotics for personal libraries.",
    link: "https://codeforces.com/",
    implementationLinks: ["centroid-decomposition"]
  }
];

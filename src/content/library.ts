import type { Implementation } from "./types";

export const implementations: Implementation[] = [
  {
    slug: "segment-tree-beats",
    name: "Segment Tree Beats",
    category: "Data Structures",
    status: "passing",
    summary: "Range chmin/chmax/add with aggressive pruning and verified invariants.",
    tags: ["segtree", "beats", "range queries"],
    tests: [
      "Library Checker: Range Chmin Chmax Add Range Sum",
      "Stress: random affine updates vs brute force"
    ],
    source: "src/lib/data-structures/segment-tree-beats.hpp",
    linkedProblems: ["ABC 256 Ex", "Yosupo range_chmin_chmax_add_range_sum"],
    note: "Strong contest candidate. Keep the invariant explanation close to the code."
  },
  {
    slug: "dinic-maxflow",
    name: "Dinic Maxflow",
    category: "Graphs",
    status: "passing",
    summary: "Template with edge restoration notes and common reductions.",
    tags: ["flow", "graphs", "dinic"],
    tests: ["Library Checker: Maximum Flow", "Handmade bipartite stress suite"],
    source: "src/lib/graphs/dinic.hpp",
    linkedProblems: ["CSES Download Speed", "Yosupo maximum_flow"],
    note: "A good place to attach modeling notes for lower bounds and bipartite reductions."
  },
  {
    slug: "polynomial-ntt",
    name: "Polynomial NTT",
    category: "Math",
    status: "draft",
    summary: "Iterative NTT scaffold with TODOs for arbitrary modulus convolution.",
    tags: ["ntt", "fft", "polynomials"],
    tests: ["Pending: convolution_mod_1000000007"],
    source: "src/lib/math/ntt.hpp",
    linkedProblems: ["Yosupo convolution_mod"],
    note: "Finish this only after the mod-handling story is clean."
  },
  {
    slug: "centroid-decomposition",
    name: "Centroid Decomposition",
    category: "Trees",
    status: "failing",
    summary: "Core decomposition works, but path aggregation test is currently broken.",
    tags: ["trees", "divide and conquer"],
    tests: ["Stress: colored path count vs O(n^2) brute force"],
    source: "src/lib/trees/centroid-decomposition.hpp",
    linkedProblems: ["CF Xenia and Tree"],
    note: "Exactly the sort of implementation that benefits from surfacing a broken state loudly."
  }
];

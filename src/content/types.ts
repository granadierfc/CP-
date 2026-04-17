export type VerificationStatus = "passing" | "failing" | "draft";

export type Implementation = {
  slug: string;
  name: string;
  category: string;
  status: VerificationStatus;
  summary: string;
  tags: string[];
  tests: string[];
  source: string;
  linkedProblems: string[];
  note?: string;
};

export type Note = {
  slug: string;
  title: string;
  format: "markdown" | "latex" | "pdf";
  updated: string;
  topic: string;
  summary: string;
  content: string;
  attachment?: string;
};

export type ProblemEntry = {
  slug: string;
  title: string;
  platform: string;
  difficulty: string;
  pattern: string;
  takeaway: string;
  link: string;
  implementationLinks?: string[];
};

export type Reference = {
  label: string;
  description: string;
  href: string;
};

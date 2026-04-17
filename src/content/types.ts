export type VerificationStatus = "passing" | "failing" | "draft";

export type Implementation = {
  slug: string;
  name: string;
  section: string;
  status: VerificationStatus;
  summary: string;
  source: string;
  verification?: string[];
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
  source: string;
  lesson: string;
  writeup?: string;
  link?: string;
};

export type Reference = {
  label: string;
  description: string;
  href: string;
};

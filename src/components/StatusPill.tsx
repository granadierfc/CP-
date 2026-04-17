import type { VerificationStatus } from "../content/types";

export function StatusPill({ status }: { status: VerificationStatus }) {
  return <span className={`status-pill status-pill--${status}`}>{status}</span>;
}

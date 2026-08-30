import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container page-container--reading">
      <div className="error-panel">
        <p className="eyebrow">404</p>
        <h1>That page is not in the study plan.</h1>
        <p>The link may be outdated, or the subject/topic code may be incorrect.</p>
        <Link className="button button--primary" href="/">Return to dashboard</Link>
      </div>
    </div>
  );
}

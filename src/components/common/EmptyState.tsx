import Link from "next/link";
import { BookOpenText } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <section className="empty-state" aria-live="polite">
      <BookOpenText aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? (
        <Link className="button button--primary" href={action.href}>
          {action.label}
        </Link>
      ) : null}
    </section>
  );
}

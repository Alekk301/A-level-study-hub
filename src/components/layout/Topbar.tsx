"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getSubject, getTopic } from "@/src/data/subjects";
import { paths } from "@/src/utils/paths";

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return [{ label: "Dashboard", href: "/" }];
  if (parts[0] === "notes") return [{ label: "Revision Notes", href: paths.notes }];
  if (parts[0] === "papers") return [{ label: "Past Papers", href: paths.papers }];
  if (parts[0] === "bookmarks") return [{ label: "Bookmarks", href: paths.bookmarks }];

  if (parts[0] === "subject") {
    const subject = getSubject(parts[1]);
    if (!subject) return [{ label: "Subject", href: pathname }];
    const crumbs = [
      { label: subject.name, href: paths.subject(subject.code) },
    ];
    if (parts[2] === "notes") {
      crumbs.push({ label: "Notes", href: paths.subjectNotes(subject.code) });
      if (parts[3]) {
        const lookup = getTopic(subject.code, decodeURIComponent(parts[3]));
        if (lookup) crumbs.push({ label: `${lookup.topic.id} ${lookup.topic.title}`, href: pathname });
      }
    }
    if (parts[2] === "papers") {
      crumbs.push({ label: "Papers", href: paths.subjectPapers(subject.code) });
    }
    return crumbs;
  }
  return [{ label: "CAIE Study Hub", href: "/" }];
}

export function Topbar({ onSearch }: { onSearch: () => void }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="topbar">
      <div className="topbar__left">
        <SidebarTrigger className="topbar__menu" aria-label="Open navigation" />
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.href}-${crumb.label}`}>
              {index ? <span aria-hidden="true">/</span> : null}
              <Link href={crumb.href} aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}>
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
      <button className="search-trigger" type="button" onClick={onSearch}>
        <Search aria-hidden="true" />
        <span>Search notes</span>
        <kbd>/</kbd>
      </button>
    </header>
  );
}

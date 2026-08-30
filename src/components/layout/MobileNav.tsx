"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, BookOpenText, FileText, Home } from "lucide-react";
import { paths } from "@/src/utils/paths";

const items = [
  { href: paths.home, label: "Home", icon: Home },
  { href: paths.notes, label: "Notes", icon: BookOpenText },
  { href: paths.papers, label: "Papers", icon: FileText },
  { href: paths.bookmarks, label: "Saved", icon: Bookmark },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="mobile-nav" aria-label="Primary mobile navigation">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link href={item.href} key={item.href} aria-current={active ? "page" : undefined}>
            <item.icon aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

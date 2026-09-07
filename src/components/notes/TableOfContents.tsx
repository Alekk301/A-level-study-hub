"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

function TocLinks({ items, activeId }: { items: TocItem[]; activeId: string }) {
  return (
    <ol>
      {items.map((item, index) => (
        <li key={item.id}>
          <a href={`#${item.id}`} aria-current={activeId === item.id ? "location" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function TableOfContents({
  items,
  variant,
}: {
  items: TocItem[];
  variant: "desktop" | "mobile";
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [items]);

  if (variant === "desktop") {
    return (
      <aside className="table-of-contents" aria-label="On this page">
        <p><List aria-hidden="true" /> On this page</p>
        <TocLinks items={items} activeId={activeId} />
      </aside>
    );
  }

  return (
      <details className="mobile-toc">
        <summary><List aria-hidden="true" /> On this page <span>{items.length} sections</span></summary>
        <TocLinks items={items} activeId={activeId} />
      </details>
  );
}

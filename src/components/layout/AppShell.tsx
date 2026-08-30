"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GlobalSearch } from "@/src/components/search/GlobalSearch";
import { MobileNav } from "@/src/components/layout/MobileNav";
import { SidebarNav } from "@/src/components/layout/SidebarNav";
import { Topbar } from "@/src/components/layout/Topbar";

export function AppShell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if ((event.key === "/" && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SidebarProvider defaultOpen>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SidebarNav />
      <SidebarInset className="app-inset">
        <Topbar onSearch={() => setSearchOpen(true)} />
        <main id="main-content" tabIndex={-1} className="main-content">
          {children}
        </main>
        <MobileNav />
      </SidebarInset>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </SidebarProvider>
  );
}

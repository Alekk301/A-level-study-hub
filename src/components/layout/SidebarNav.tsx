"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  BookOpenText,
  FileText,
  Home,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SubjectIcon } from "@/src/components/common/SubjectIcon";
import { subjects } from "@/src/data/subjects";
import { useStudy } from "@/src/hooks/use-study";
import { paths } from "@/src/utils/paths";

const primaryNav = [
  { href: paths.home, label: "Home", icon: Home },
  { href: paths.notes, label: "Revision Notes", icon: BookOpenText },
  { href: paths.papers, label: "Past Papers", icon: FileText },
  { href: paths.bookmarks, label: "Saved", icon: Bookmark },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { theme, setTheme } = useStudy();

  const closeMobile = () => setOpenMobile(false);
  const isPrimaryActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <Sidebar collapsible="icon" className="study-sidebar">
      <SidebarHeader className="study-sidebar__header">
        <Link href="/" className="brand-lockup" onClick={closeMobile}>
          <span className="brand-lockup__mark">CH</span>
          <span className="brand-lockup__text">
            <strong>CAIE Hub</strong>
            <small>A-Level revision</small>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isPrimaryActive(item.href)}
                    tooltip={item.label}
                    size="lg"
                  >
                    <Link href={item.href} onClick={closeMobile}>
                      <item.icon aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Subjects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {subjects.map((subject) => (
                <SidebarMenuItem key={subject.code}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(`/subject/${subject.code}`)}
                    tooltip={`${subject.code} ${subject.name}`}
                    size="lg"
                  >
                    <Link href={paths.subject(subject.code)} onClick={closeMobile}>
                      <span
                        className="subject-nav-icon"
                        style={{ color: subject.accent }}
                      >
                        <SubjectIcon code={subject.code} />
                      </span>
                      <span className="subject-nav-label">
                        <strong>{subject.code}</strong>
                        <small>{subject.name}</small>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="study-sidebar__footer">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Toggle colour theme"
              size="lg"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
              <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Link className="privacy-link" href="/privacy" onClick={closeMobile}>
          <ShieldCheck aria-hidden="true" />
          <span>Privacy</span>
        </Link>
        <p className="local-note">Progress stays on this device.</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

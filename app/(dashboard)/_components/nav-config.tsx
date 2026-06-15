import type { ComponentType } from "react";
import {
  FileText,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  CircleQuestionMark,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import { ChatNavbar } from "@/app/(dashboard)/_components/navbar/chat-navbar";
import { DocumentNavbar } from "@/app/(dashboard)/_components/navbar/document-navbar";

/**
 * Single source of truth for the dashboard navigation.
 *
 * Each section drives two things at once: the sidebar item (label + icon +
 * route) and the section-specific controls shown on the right of the top
 * navbar (`Actions`). Add a section here and both the sidebar and navbar pick
 * it up — no other file needs editing.
 */
export interface NavSection {
  /** Stable id for the section. */
  key: string;
  /** Sidebar label. */
  label: string;
  /** Route the sidebar item links to (also the active-match prefix). */
  href: string;
  /** Sidebar icon. */
  icon: LucideIcon;
  /** Heading shown on the left of the navbar for this section. */
  title: string;
  /** Section-specific controls rendered on the right of the navbar. */
  Actions?: ComponentType;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    key: "documents",
    label: "Documents",
    href: "/documents",
    icon: FileText,
    title: "Documents",
    Actions: DocumentNavbar,
  },
  {
    key: "chats",
    label: "Chats",
    href: "/chats",
    icon: MessagesSquare,
    title: "Chats",
    Actions: ChatNavbar,
  },
];

export const NAV_FOOTER: NavSection[] = [
  {
    key: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
    title: "Settings",
  },
  {
    key: "help",
    label: "Help",
    href: "/help",
    icon: CircleQuestionMark,
    title: "Help",
  },
];

export const LOGOUT_ITEM = {
  label: "Logout",
  icon: LogOut,
} as const;

export function getActiveSection(pathname: string): NavSection {
  return (
    [...NAV_SECTIONS, ...NAV_FOOTER]
      .sort((a, b) => b.href.length - a.href.length)
      .find((s) => pathname === s.href || pathname.startsWith(`${s.href}/`)) ??
    NAV_SECTIONS[0] 
  );
}

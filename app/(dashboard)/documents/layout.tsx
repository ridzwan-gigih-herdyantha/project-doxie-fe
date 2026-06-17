/**
 * The documents section no longer wraps its pages in a second SidebarProvider.
 * The document chat panel lives only in the detail route (`[id]/page.tsx`) as a
 * self-contained panel, so it can't collide with the dashboard sidebar's cookie
 * or keyboard shortcut.
 */
export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

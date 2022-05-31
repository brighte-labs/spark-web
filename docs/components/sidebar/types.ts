type SidebarLink = { name: string; href: string };
type SidebarGroup = { name: string; children: SidebarItem[] };

export type SidebarItem = SidebarLink | SidebarGroup;

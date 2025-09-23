'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  FolderKanban,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth } from '@/store/authStore';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'user'],
  },
  {
    title: 'Tasks',
    url: '/tasks',
    icon: CheckSquare,
    roles: ['admin', 'user'],
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: FolderKanban,
    roles: ['admin', 'user'],
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: Users,
    roles: ['admin', 'user'],
  },

  {
    title: 'Team',
    url: '/team',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
    roles: ['admin'],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  // Add state for collapse
  const [isCollapsed] = useState(false);
  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };
  const getNavCls = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
      : 'hover:bg-sidebar-accent/50';
  };

  // Filter navigation items based on user role
  const filteredItems = navigationItems.filter((item) =>
    item.roles.includes(user?.role || 'user')
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Updated Logo Section */}
        <div className="p-2">
          <div className="flex items-center gap-3">
            <div className="min-w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <div className="size-4 bg-white rounded-sm" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold gradient-text">Task-Dash</h1>
            )}
          </div>
        </div>

        {/* Updated Navigation Items */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && 'Main Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin-only Section */}
        {user?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/settings" className={getNavCls('/settings')}>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleLogout} className="w-full mb-3">
            <LogOut className="size-4" />
            <span>Sign out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  );
}

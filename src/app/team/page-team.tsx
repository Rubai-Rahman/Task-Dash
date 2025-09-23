'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Calendar, Shield } from 'lucide-react';
import { formatDate } from '@/lib/utils/date';
import { useUserStore } from '@/lib/data/user-store';

export default function TeamPageContent() {
  const { users, isLoading, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getRoleColor = (role: 'admin' | 'user') => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout
        title="Team"
        description="Meet your team members and their roles."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 bg-muted animate-pulse rounded-full mb-4" />
                <div className="h-5 bg-muted animate-pulse rounded w-32 mx-auto mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-48 mx-auto" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-6 bg-muted animate-pulse rounded w-16 mx-auto" />
                <div className="h-4 bg-muted animate-pulse rounded w-24 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Team"
      description="Meet your team members and their roles."
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-medium">
            {users.length} Team Members
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="h-16 w-16 mx-auto mb-4">
                <AvatarImage src={user.avatar || '/placeholder.svg'} />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>{user.email}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-center">
              <Badge variant="secondary" className={getRoleColor(user.role)}>
                <div className="flex items-center space-x-1">
                  {user.role === 'admin' && <Shield className="h-3 w-3" />}
                  <span className="capitalize">{user.role}</span>
                </div>
              </Badge>
              <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  Joined {formatDate(user.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}

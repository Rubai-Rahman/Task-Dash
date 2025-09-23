'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  User,
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  BarChart,
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/store/authStore';
import { toast } from 'sonner';

const formatJoinDate = (date: string | Date | undefined) => {
  if (!date) return 'Unknown';

  const joinDate = new Date(date);
  if (isNaN(joinDate.getTime())) return 'Invalid date';

  return format(joinDate, 'MMMM yyyy');
};

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    avatar: user?.avatar || '',
  });

  // Mock data for dashboard stats
  const adminStats = {
    totalUsers: 156,
    totalTasks: 487,
    completedTasks: 324,
    pendingTasks: 163,
    activeUsers: 89,
  };

  const userStats = {
    assignedTasks: 12,
    completedTasks: 8,
    pendingTasks: 4,
    upcomingDeadlines: 3,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateProfile(formData);
      toast.success('Profile updated');
    } catch (error) {
      toast.error(`Failed to update profile: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Unable to load profile information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-6">
          <Avatar className="h-32 w-32 ring-4 ring-white/30">
            <AvatarImage src={user.avatar || '/placeholder.svg'} />
            <AvatarFallback className="text-4xl">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <Badge className="bg-white/20 hover:bg-white/30">
                <Shield className="h-3 w-3 mr-1" />
                <span className="capitalize">{user.role}</span>
              </Badge>
              <span className="text-sm opacity-80">
                <Calendar className="h-3 w-3 inline mr-1" />
                Joined {formatJoinDate(user.joinedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      {user.role === 'admin' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Total Users
                  </p>
                  <h3 className="text-2xl font-bold text-green-700">
                    {adminStats.totalUsers}
                  </h3>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Total Tasks
                  </p>
                  <h3 className="text-2xl font-bold text-blue-700">
                    {adminStats.totalTasks}
                  </h3>
                </div>
                <BarChart className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    Active Users
                  </p>
                  <h3 className="text-2xl font-bold text-purple-700">
                    {adminStats.activeUsers}
                  </h3>
                </div>
                <User className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Assigned Tasks
                  </p>
                  <h3 className="text-2xl font-bold text-blue-700">
                    {userStats.assignedTasks}
                  </h3>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Completed
                  </p>
                  <h3 className="text-2xl font-bold text-green-700">
                    {userStats.completedTasks}
                  </h3>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <h3 className="text-2xl font-bold text-yellow-700">
                    {userStats.pendingTasks}
                  </h3>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Profile Section */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

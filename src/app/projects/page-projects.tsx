'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus, CheckCircle, Clock, Pause } from 'lucide-react';
import { format } from 'date-fns';
import { useDataStore } from '@/lib/data/data-store';

export default function ProjectsPageContent() {
  const { projects, isLoading, fetchDashboardData } = useDataStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  // need to remove useEffect
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'on-hold':
        return <Pause className="h-4 w-4 text-orange-600" />;
      default:
        return <FolderOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on-hold':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout
        title="Projects"
        description="Manage and track your project portfolio."
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 bg-muted animate-pulse rounded w-32" />
          <div className="h-10 bg-muted animate-pulse rounded w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-5 bg-muted animate-pulse rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-6 bg-muted animate-pulse rounded w-20" />
                  <div className="h-4 bg-muted animate-pulse rounded w-32" />
                  <div className="h-4 bg-muted animate-pulse rounded w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Projects"
      description="Manage and track your project portfolio."
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">All Projects</h2>
          <Badge variant="secondary">{projects.length} projects</Badge>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FolderOpen className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </div>
                <Badge
                  variant="secondary"
                  className={getStatusColor(project.status)}
                >
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(project.status)}
                    <span className="capitalize">
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tasks</span>
                  <span className="font-medium">{project.taskCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span>
                    {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first project.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}

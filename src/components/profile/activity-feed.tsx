'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock, Edit, Plus, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityItem {
  id: string;
  type:
    | 'task_created'
    | 'task_completed'
    | 'task_updated'
    | 'task_deleted'
    | 'user_joined';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  avatar?: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'task_completed',
    title: 'Completed task',
    description: 'Finished implementing user authentication',
    timestamp: '2024-01-20T14:30:00Z',
    user: 'You',
  },
  {
    id: '2',
    type: 'task_created',
    title: 'Created new task',
    description: "Added 'Write API documentation' to the backlog",
    timestamp: '2024-01-20T10:15:00Z',
    user: 'You',
  },
  {
    id: '3',
    type: 'task_updated',
    title: 'Updated task',
    description: "Changed priority of 'Database optimization' to low",
    timestamp: '2024-01-19T16:45:00Z',
    user: 'You',
  },
  {
    id: '4',
    type: 'user_joined',
    title: 'Team update',
    description: 'Alex Chen joined the team',
    timestamp: '2024-01-19T09:20:00Z',
    user: 'System',
  },
  {
    id: '5',
    type: 'task_deleted',
    title: 'Deleted task',
    description: "Removed outdated task 'Legacy system migration'",
    timestamp: '2024-01-18T13:10:00Z',
    user: 'You',
  },
];

export function ActivityFeed() {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'task_created':
        return <Plus className="h-4 w-4 text-blue-600" />;
      case 'task_updated':
        return <Edit className="h-4 w-4 text-orange-600" />;
      case 'task_deleted':
        return <Trash2 className="h-4 w-4 text-red-600" />;
      case 'user_joined':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'task_completed':
        return 'bg-green-100 text-green-800';
      case 'task_created':
        return 'bg-blue-100 text-blue-800';
      case 'task_updated':
        return 'bg-orange-100 text-orange-800';
      case 'task_deleted':
        return 'bg-red-100 text-red-800';
      case 'user_joined':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <Badge
                    variant="secondary"
                    className={getActivityColor(activity.type)}
                  >
                    {activity.type.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {activity.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                  <div className="flex items-center space-x-1">
                    <Avatar className="h-4 w-4">
                      <AvatarImage
                        src={activity.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback className="text-xs">
                        {activity.user === 'You' ? 'Y' : activity.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{activity.user}</span>
                  </div>
                  <span>
                    {format(new Date(activity.timestamp), 'MMM dd, HH:mm')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

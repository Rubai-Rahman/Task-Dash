'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreHorizontal, Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Task } from '@/lib/data-store';
import { useDataStore } from '@/lib/data-store';

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  isLoading: boolean;
}

export function TaskTable({ tasks, onEditTask, isLoading }: TaskTableProps) {
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const { deleteTask } = useDataStore();

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'todo':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setDeleteTaskId(null);
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-6 bg-muted animate-pulse rounded w-20" />
                </TableCell>
                <TableCell>
                  <div className="h-6 bg-muted animate-pulse rounded w-16" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-20" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded w-24" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No tasks found</h3>
        <p className="text-muted-foreground mb-4">
          No tasks match your current filters. Try adjusting your search
          criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-md">
                      {task.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(task.status)}
                  >
                    {task.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`/placeholder-40x40.png?height=32&width=32&text=${task.assignedTo
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}`}
                      />
                      <AvatarFallback className="text-xs">
                        {task.assignedTo
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignedTo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {task.dueDate ? (
                    <div className="flex items-center space-x-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      No due date
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditTask(task)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteTaskId(task.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!deleteTaskId}
        onOpenChange={() => setDeleteTaskId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTaskId && handleDeleteTask(deleteTaskId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

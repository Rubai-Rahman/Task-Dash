'use client';

import { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { TaskFilters } from '@/components/tasks/task-filters';
import { TaskTable } from '@/components/tasks/task-table';
import { TaskForm } from '@/components/tasks/task-form';
import { useDataStore, type Task } from '@/lib/data/data-store';

export default function TasksPageContent() {
  const { tasks, isLoading, fetchDashboardData } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesAssignee =
        assigneeFilter === 'all' || task.assignedTo === assigneeFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      );
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Task];
      let bValue: any = b[sortBy as keyof Task];

      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
      } else if (
        sortBy === 'createdAt' ||
        sortBy === 'updatedAt' ||
        sortBy === 'dueDate'
      ) {
        aValue = new Date(aValue || 0).getTime();
        bValue = new Date(bValue || 0).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    tasks,
    searchQuery,
    statusFilter,
    priorityFilter,
    assigneeFilter,
    sortBy,
    sortOrder,
  ]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setAssigneeFilter('all');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <DashboardLayout
      title="Tasks"
      description="Manage and track all your project tasks in one place."
    >
      <div className="space-y-6">
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          assigneeFilter={assigneeFilter}
          onAssigneeFilterChange={setAssigneeFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onClearFilters={handleClearFilters}
          onCreateTask={handleCreateTask}
          filteredCount={filteredAndSortedTasks.length}
          totalCount={tasks.length}
        />

        <TaskTable
          tasks={filteredAndSortedTasks}
          onEditTask={handleEditTask}
          isLoading={isLoading}
        />
      </div>

      <TaskForm
        task={editingTask}
        open={isFormOpen}
        onOpenChange={handleFormClose}
      />
    </DashboardLayout>
  );
}

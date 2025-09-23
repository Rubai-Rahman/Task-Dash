import { create } from 'zustand';
import { Task, TaskFormData } from '@/types/task';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: TaskFormData) => Promise<void>;
  updateTask: (taskId: string, task: TaskFormData) => Promise<void>;
  // ...other actions
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,
  addTask: async (task) => {
    // Implementation
  },
  updateTask: async (taskId, task) => {
    // Implementation
  },
  // ...other implementations
}));

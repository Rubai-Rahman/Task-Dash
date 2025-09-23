export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  createdBy?: string;
}

export interface TaskFormData
  extends Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> {
  id?: string;
}

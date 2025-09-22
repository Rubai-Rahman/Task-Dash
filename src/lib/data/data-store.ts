import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
  taskCount: number;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalProjects: number;
  activeProjects: number;
  teamMembers: number;
}

interface DataState {
  tasks: Task[];
  projects: Project[];
  stats: DashboardStats;
  isLoading: boolean;
  fetchDashboardData: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

// Mock data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create a modern landing page for the product launch',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    dueDate: '2024-01-25T00:00:00Z',
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Jane Smith',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints and usage examples',
    status: 'todo',
    priority: 'medium',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-01-18T11:15:00Z',
    updatedAt: '2024-01-18T11:15:00Z',
    dueDate: '2024-02-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Sarah Wilson',
    createdAt: '2024-01-12T08:30:00Z',
    updatedAt: '2024-01-17T13:20:00Z',
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize database queries for better performance',
    status: 'todo',
    priority: 'low',
    assignedTo: 'Tom Brown',
    createdAt: '2024-01-20T15:45:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
  },
  {
    id: '6',
    title: 'Mobile app testing',
    description: 'Comprehensive testing of mobile application features',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Lisa Davis',
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-19T10:15:00Z',
    dueDate: '2024-01-20T00:00:00Z',
  },
  {
    id: '7',
    title: 'Update user interface',
    description: 'Refresh the UI components with new design system',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Alex Chen',
    createdAt: '2024-01-16T09:45:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
    dueDate: '2024-01-30T00:00:00Z',
  },
  {
    id: '8',
    title: 'Security audit',
    description: 'Conduct comprehensive security review of the application',
    status: 'todo',
    priority: 'high',
    assignedTo: 'Emma Rodriguez',
    createdAt: '2024-01-19T11:00:00Z',
    updatedAt: '2024-01-19T11:00:00Z',
    dueDate: '2024-02-05T00:00:00Z',
  },
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    taskCount: 12,
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile app for iOS and Android',
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    taskCount: 8,
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Third-party API integrations',
    status: 'completed',
    createdAt: '2023-12-15T00:00:00Z',
    taskCount: 5,
  },
];

export const useDataStore = create<DataState>((set, get) => ({
  tasks: [],
  projects: [],
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
    teamMembers: 12,
  },
  isLoading: false,
  fetchDashboardData: async () => {
    set({ isLoading: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const completedTasks = mockTasks.filter(
      (t) => t.status === 'completed'
    ).length;
    const inProgressTasks = mockTasks.filter(
      (t) => t.status === 'in-progress'
    ).length;
    const activeProjects = mockProjects.filter(
      (p) => p.status === 'active'
    ).length;

    set({
      tasks: mockTasks,
      projects: mockProjects,
      stats: {
        totalTasks: mockTasks.length,
        completedTasks,
        inProgressTasks,
        totalProjects: mockProjects.length,
        activeProjects,
        teamMembers: 12,
      },
      isLoading: false,
    });
  },
  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],
      stats: {
        ...state.stats,
        totalTasks: state.stats.totalTasks + 1,
        ...(newTask.status === 'completed' && {
          completedTasks: state.stats.completedTasks + 1,
        }),
        ...(newTask.status === 'in-progress' && {
          inProgressTasks: state.stats.inProgressTasks + 1,
        }),
      },
    }));
  },
  updateTask: (id, updates) => {
    set((state) => {
      const oldTask = state.tasks.find((t) => t.id === id);
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );

      // Update stats if status changed
      const newStats = { ...state.stats };
      if (oldTask && updates.status && oldTask.status !== updates.status) {
        // Decrease old status count
        if (oldTask.status === 'completed') newStats.completedTasks--;
        if (oldTask.status === 'in-progress') newStats.inProgressTasks--;

        // Increase new status count
        if (updates.status === 'completed') newStats.completedTasks++;
        if (updates.status === 'in-progress') newStats.inProgressTasks++;
      }

      return {
        tasks: updatedTasks,
        stats: newStats,
      };
    });
  },
  deleteTask: (id) => {
    set((state) => {
      const taskToDelete = state.tasks.find((t) => t.id === id);
      const filteredTasks = state.tasks.filter((task) => task.id !== id);

      const newStats = {
        ...state.stats,
        totalTasks: state.stats.totalTasks - 1,
      };

      if (taskToDelete) {
        if (taskToDelete.status === 'completed') newStats.completedTasks--;
        if (taskToDelete.status === 'in-progress') newStats.inProgressTasks--;
      }

      return {
        tasks: filteredTasks,
        stats: newStats,
      };
    });
  },
}));

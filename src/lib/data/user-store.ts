import { User } from '@/store/authStore';
import { create } from 'zustand';

interface UserManagementState {
  users: User[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@gmail.com',
    name: 'Admin User',
    role: 'admin',
    avatar: '/admin-avatar.png',
    position: 'Product Manager',
    joinedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@gmail.com',
    name: 'John Doe',
    role: 'user',
    avatar: '/diverse-user-avatars.png',
    position: 'Frontend Developer',
    joinedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    email: 'jane.smith@gmail.com',
    name: 'Jane Smith',
    role: 'user',
    avatar: '/diverse-user-avatars.png',
    position: 'Backend Developer',
    joinedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '4',
    email: 'mike.johnson@gmail.com',
    name: 'Mike Johnson',
    role: 'user',
    avatar: '/diverse-user-avatars.png',
    position: 'Backend Developer',
    joinedAt: '2024-01-12T00:00:00Z',
  },
  {
    id: '5',
    email: 'sarah.wilson@gmail.com',
    name: 'Sarah Wilson',
    role: 'admin',
    avatar: '/diverse-user-avatars.png',
    position: 'Backend Developer',
    joinedAt: '2024-01-08T00:00:00Z',
  },
  {
    id: '6',
    email: 'tom.brown@gmail.com',
    name: 'Tom Brown',
    role: 'user',
    avatar: '/diverse-user-avatars.png',
    position: 'Backend Developer',
    joinedAt: '2024-01-18T00:00:00Z',
  },
  {
    id: '7',
    email: 'lisa.davis@gmail.com',
    name: 'Lisa Davis',
    role: 'user',
    avatar: '/diverse-user-avatars.png',
    position: 'Backend Developer',
    joinedAt: '2024-01-14T00:00:00Z',
  },
  {
    id: '8',
    email: 'alex.chen@gmail.com',
    name: 'Alex Chen',
    role: 'user',
    avatar: '/diverse-user-avatars.png',
    position: 'Backend Developer',
    joinedAt: '2024-01-16T00:00:00Z',
  },
];

export const useUserStore = create<UserManagementState>((set, get) => ({
  users: [],
  isLoading: false,
  fetchUsers: async () => {
    set({ isLoading: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    set({
      users: mockUsers,
      isLoading: false,
    });
  },
  addUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString(),
    };
    set((state) => ({ users: [...state.users, newUser] }));
  },
  updateUser: (id, updates) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
    }));
  },
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
}));

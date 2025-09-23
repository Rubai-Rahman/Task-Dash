import { User } from "@/store/authStore";
import { Task } from "../data/data-store";

export const canEditTask = (task: Task, user: User) => {
  if (user.role === 'admin') return true;
  return task.assignedTo === user.id;
};

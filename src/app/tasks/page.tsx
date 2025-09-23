import type { Metadata } from 'next';
import TasksPageContent from './page-task';

export const metadata: Metadata = {
  title: 'Tasks - Admin - Task-Dash',
  description: 'View store analytics and performance metrics.',
};

const TaskPage = () => {
  return <TasksPageContent />;
};

export default TaskPage;

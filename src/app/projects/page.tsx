import type { Metadata } from 'next';
import ProjectsPageContent from './page-projects';

export const metadata: Metadata = {
  title: 'Projects - Admin - Task Dash',
  description: 'View projects and performance metrics.',
};

const ProjectsPage = () => {
  return <ProjectsPageContent />;
};

export default ProjectsPage;

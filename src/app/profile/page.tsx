import type { Metadata } from 'next';
import ProfilePageContent from './page-profile';

export const metadata: Metadata = {
  title: 'ProfilePage- Task Dash',
  description: 'View projects and performance metrics.',
};

const ProjectsPage = () => {
  return <ProfilePageContent />;
};

export default ProjectsPage;

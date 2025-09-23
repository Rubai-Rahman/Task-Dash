import type { Metadata } from 'next';
import TeamPageContent from './page-team';

export const metadata: Metadata = {
  title: 'Team - Admin - Task Dash',
  description: 'View team members and performance metrics.',
};

const TeamPage = () => {
  return <TeamPageContent />;
};

export default TeamPage;

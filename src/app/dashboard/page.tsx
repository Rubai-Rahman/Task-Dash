import type { Metadata } from 'next';
import DashboardPageContent from './page-dashboard';

export const metadata: Metadata = {
  title: 'Dashboard - Admin - Chrono Click',
  description: 'View store dashboard and performance metrics.',
};

const DashboardPage = () => {
  return <DashboardPageContent />;
};

export default DashboardPage;

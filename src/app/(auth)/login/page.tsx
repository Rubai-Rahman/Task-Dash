import { Metadata } from 'next';
import LoginPage from './page-login';

export const metadata: Metadata = {
  title: 'Task-Dash - Login',
};

export default async function Page() {
  return <LoginPage />;
}

'use client';

import LoginForm from '@/components/auth/login/loginform';
import { LoginFormData } from '@/lib/validations/validation';
import { useAuth } from '@/store/authStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const success = await login(data.email, data.password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('error', error);
    return <div>{error}</div>;
  }

  return <LoginForm onSubmit={handleLogin} loading={isLoading} />;
}

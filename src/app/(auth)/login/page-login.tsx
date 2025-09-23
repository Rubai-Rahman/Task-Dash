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
        // The Provider component will handle the redirect
        // No need to manually redirect here
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return <LoginForm onSubmit={handleLogin} loading={isLoading} error={error} />;
}

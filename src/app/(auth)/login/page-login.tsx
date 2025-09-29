'use client';

import LoginForm from '@/components/auth/login/loginform';
import { LoginFormData } from '@/lib/validations/validation';
import { useAuth } from '@/store/authStore';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast.success('Welcome to Task-Dash');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.log('err', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return <LoginForm onSubmit={handleLogin} loading={isLoading} error={error} />;
}

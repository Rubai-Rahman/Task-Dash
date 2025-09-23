'use client';

import LoginForm from '@/components/auth/login/loginform';
import { LoginFormData } from '@/lib/validations/validation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const handleLogin = (data: LoginFormData) => {
    console.log('loginData', data);
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} />;
}

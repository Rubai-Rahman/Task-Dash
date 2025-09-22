'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/store/authStore';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call server API to set HttpOnly cookie
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const { user } = await res.json();
        // Update client store to reflect logged-in state for UI
        await login(user.email, 'demo123');
        toast.success('Successfully logged in to Task-Dash.');
        const next = new URLSearchParams(window.location.search).get('next');
        router.push(next || '/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setEmail('admin@taskflow.com');
      setPassword('demo123');
    } else {
      setEmail('user@taskflow.com');
      setPassword('demo123');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Visual Info */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="max-w-md">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
              <span className="text-white font-bold text-3xl">TM</span>
            </div>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Welcome to
              <br />
              <span className="text-primary-foreground/90">Task-Dash</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              The ultimate task management platform designed for modern teams.
              Streamline your workflow, boost productivity, and achieve your
              goals.
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-white/70">
                <div className="w-2 h-2 bg-white/60 rounded-full mr-3" />
                <span>Advanced Analytics & Reporting</span>
              </div>
              <div className="flex items-center text-white/70">
                <div className="w-2 h-2 bg-white/60 rounded-full mr-3" />
                <span>Real-time Collaboration</span>
              </div>
              <div className="flex items-center text-white/70">
                <div className="w-2 h-2 bg-white/60 rounded-full mr-3" />
                <span>Smart Task Prioritization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white font-bold text-2xl">TM</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground mt-2">
                Sign in to your Task-Dash account
              </p>
            </div>
          </div>

          <Card className="card-gradient shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center">
                Sign In
              </CardTitle>
              <CardDescription className="text-center text-base">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert className="border-destructive/50 text-destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-12 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 btn-gradient font-semibold text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Demo Credentials Buttons */}
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-medium">
                      Demo Accounts
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    onClick={() => fillDemoCredentials('admin')}
                  >
                    <span className="font-medium">Admin Demo</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    onClick={() => fillDemoCredentials('user')}
                  >
                    <span className="font-medium">User Demo</span>
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Click above to auto-fill demo credentials
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Task-Dash Dashboard Demo - Built with Next.js & Tailwind
          </p>
        </div>
      </div>
    </div>
  );
}

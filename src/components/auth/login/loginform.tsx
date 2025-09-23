'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/lib/validations/validation';

const LoginForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (data: LoginFormData) => void;
  loading: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSubmit = (formData: LoginFormData) => {
    onSubmit(formData);
  };

  const fillDemoCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setEmail('admin@gmail.com');
      setPassword('StrongUser#1');
    } else {
      setEmail('user@gmail.com');
      setPassword('StrongUser#1');
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

            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-5"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter your password"
                              type={showPassword ? 'text' : 'password'}
                              {...field}
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                field.onChange(e);
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 btn-gradient font-semibold text-base"
                  >
                    Sign In
                  </Button>
                </form>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => fillDemoCredentials('admin')}
                  >
                    Admin Demo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => fillDemoCredentials('user')}
                  >
                    User Demo
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

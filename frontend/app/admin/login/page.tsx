'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Container } from '@/components/common';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ApiClient } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@puzzolana.com');
  const [password, setPassword] = useState('Puzzolana@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await ApiClient.post<{ token: string; user: { userId: string; email: string; name: string; role: 'admin' | 'editor' } }>('/admin/login', {
        email,
        password,
      });

      if (res.success && res.data) {
        login(res.data.token, res.data.user);
        router.push('/admin');
      } else {
        setErrorMessage(res.message || 'Authentication failed');
      }
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || 'Unable to authenticate. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-industrial-grid bg-[size:30px_30px] opacity-20 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="sm" className="relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-yellow rounded-sm flex items-center justify-center font-black text-industrial-950 text-2xl mx-auto mb-3 shadow-gold-glow">
            PZ
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
            PUZZOLANA ENTERPRISE PORTAL
          </h1>
          <p className="text-xs text-industrial-400 mt-1 flex items-center justify-center gap-1.5 font-medium">
            <Shield className="w-3.5 h-3.5 text-brand-yellow" /> Role-Based Access Control • Admin / Operations
          </p>
        </div>

        <Card className="p-8 bg-industrial-900 border-industrial-800 shadow-2xl">
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-950/50 border border-red-800/80 rounded-sm flex items-start gap-3 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Corporate Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@puzzolana.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="relative">
              <Input
                label="Master Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-industrial-400 hover:text-white transition"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full text-sm py-3 uppercase tracking-wider mt-4"
              isLoading={isLoading}
            >
              Sign In to Command Center
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-industrial-800/80 text-center text-xs text-industrial-500">
            <p>Protected Corporate System. All access attempts are cryptographically audited.</p>
          </div>
        </Card>
      </Container>
    </div>
  );
}

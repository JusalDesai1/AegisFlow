'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@aegis.gov');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-aegis-darker via-aegis-dark to-aegis-card p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-aegis-accent">AegisFlow</h1>
          <p className="text-aegis-text-secondary">Emergency Operations Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded border border-aegis-critical bg-aegis-critical/10 p-3 text-sm text-aegis-critical">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-aegis-border bg-aegis-card px-4 py-2 text-aegis-text-primary focus:border-aegis-accent focus:outline-none"
              placeholder="commander@aegis.gov"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-aegis-border bg-aegis-card px-4 py-2 text-aegis-text-primary focus:border-aegis-accent focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-aegis-accent hover:bg-aegis-accent-light disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Enter Command Center'}
          </Button>
        </form>

        <div className="mt-6 border-t border-aegis-border pt-6 text-center text-sm text-aegis-text-tertiary">
          Demo credentials: admin@aegis.gov / password
        </div>
      </Card>
    </div>
  );
}

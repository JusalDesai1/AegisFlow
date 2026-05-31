'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aegis-accent mb-2">AegisFlow</h1>
        <p className="text-aegis-text-secondary">Emergency Operations Command Center</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-aegis-critical/10 border border-aegis-critical text-aegis-critical rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-aegis-card border border-aegis-border rounded-lg focus:outline-none focus:border-aegis-accent transition-colors"
            placeholder="commander@aegis.gov"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-aegis-card border border-aegis-border rounded-lg focus:outline-none focus:border-aegis-accent transition-colors"
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

      <div className="mt-6 pt-6 border-t border-aegis-border">
        <p className="text-aegis-text-tertiary text-sm text-center">
          Demo credentials: admin@aegis.gov / password
        </p>
      </div>
    </Card>
  );
}

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { Role } from '../types/auth';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('ADMIN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'staff@ysjfarm.com', role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ysj-cream px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-ysj-green/20">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-ysj-dark-green rounded-full flex items-center justify-center mb-4">
             <span className="text-ysj-gold text-3xl font-bold">YSJ</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-ysj-dark-green">
            YSJ Farm Staff Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure Internal Management System
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-ysj-green focus:border-ysj-green focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="sr-only">Role (Demo purposes)</label>
              <select
                id="role"
                name="role"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-ysj-green focus:border-ysj-green focus:z-10 sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="ADMIN">Main Admin</option>
                <option value="MD">Managing Director (MD)</option>
                <option value="DEPUTY_MD">Deputy MD</option>
                <option value="MANAGER">Manager</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-ysj-dark-green hover:bg-ysj-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ysj-green transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

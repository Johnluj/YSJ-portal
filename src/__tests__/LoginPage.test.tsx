import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { AuthProvider } from '../hooks/useAuth';

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    expect(screen.getByText(/YSJ Farm Staff Portal/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeDefined();
  });
});

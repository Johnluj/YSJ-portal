import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardHome from '../pages/DashboardHome';

// Mock recharts because it doesn't play well with jsdom
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  AreaChart: ({ children }: any) => <div>{children}</div>,
  Area: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: () => <div />,
  Cell: () => <div />,
}));

describe('DashboardHome', () => {
  it('renders farm overview header', () => {
    render(<DashboardHome />);
    expect(screen.getByText(/Farm Overview/i)).toBeDefined();
    expect(screen.getByText(/Today's Eggs/i)).toBeDefined();
    expect(screen.getByText(/8,240/i)).toBeDefined();
  });
});

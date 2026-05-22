export type Role = 'ADMIN' | 'MD' | 'DEPUTY_MD' | 'MANAGER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

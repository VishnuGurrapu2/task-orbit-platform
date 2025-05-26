
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  organizationId: string;
  avatar?: string;
}

export interface Organization {
  id: string;
  name: string;
  theme?: string;
  memberCount?: number;
}

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  organizations: Organization[];
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: string, orgName: string) => Promise<void>;
  logout: () => void;
  switchOrganization: (orgId: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for development
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  organizationId: '1',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
};

const mockOrganizations: Organization[] = [
  { id: '1', name: 'Acme Corp', memberCount: 15 },
  { id: '2', name: 'TechStart Inc', memberCount: 8 },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [organizations] = useState<Organization[]>(mockOrganizations);
  const [currentOrgId, setCurrentOrgId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  const organization = organizations.find(org => org.id === currentOrgId) || null;

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd validate the token with the backend
      // For now, we'll set the mock user if token exists
      setUser(mockUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(email, password);
      const { token } = response;

      // Store token
      localStorage.setItem('authToken', token);

      // Set user (in real app, you'd decode token or fetch user data)
      setUser(mockUser);

      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.error || 'An error occurred during login',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role: string, orgName: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(email, password, role, orgName);
      const { token } = response;

      // Store token
      localStorage.setItem('authToken', token);

      // Set user (in real app, you'd decode token or fetch user data)
      setUser(mockUser);

      toast({
        title: 'Registration successful',
        description: 'Welcome to TaskOrbit!',
      });
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.error || 'An error occurred during registration',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setCurrentOrgId('');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const switchOrganization = (orgId: string) => {
    setCurrentOrgId(orgId);
    // In real app, you'd update user's context and refetch data
  };

  return (
    <AuthContext.Provider value={{
      user,
      organization,
      organizations,
      login,
      register,
      logout,
      switchOrganization,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

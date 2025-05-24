
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [user, setUser] = useState<User | null>(mockUser);
  const [organizations] = useState<Organization[]>(mockOrganizations);
  const [currentOrgId, setCurrentOrgId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  const organization = organizations.find(org => org.id === currentOrgId) || null;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock login - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setCurrentOrgId('');
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

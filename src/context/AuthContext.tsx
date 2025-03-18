import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Permission, ActivityLog } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  logActivity: (action: string, details: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultPermissions: Permission[] = ['view_users', 'view_products', 'view_courses', 'view_exams'];
const adminPermissions: Permission[] = [
  'manage_users',
  'view_users',
  'manage_products',
  'view_products',
  'manage_courses',
  'view_courses',
  'manage_exams',
  'view_exams',
  'manage_settings'
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [isAuthenticated, currentUser]);

  const login = (email: string, password: string) => {
    // Simulate user authentication
    const user: User = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'user',
      joinDate: new Date().toISOString(),
      permissions: email.includes('admin') ? adminPermissions : defaultPermissions,
      lastActive: new Date().toISOString()
    };

    setCurrentUser(user);
    setIsAuthenticated(true);
    logActivity('login', 'User logged in');
    navigate('/dashboard');
  };

  const logout = () => {
    logActivity('logout', 'User logged out');
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const hasPermission = (permission: Permission): boolean => {
    return currentUser?.permissions.includes(permission) || false;
  };

  const logActivity = (action: string, details: string) => {
    if (!currentUser) return;

    const log: ActivityLog = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      action,
      details,
      timestamp: new Date().toISOString()
    };

    // Get existing logs
    const existingLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    
    // Add new log
    localStorage.setItem('activityLogs', JSON.stringify([log, ...existingLogs]));
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      login, 
      logout,
      hasPermission,
      logActivity
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
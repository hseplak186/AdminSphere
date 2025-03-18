import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardStats } from '../types';

interface StatsContextType {
  stats: DashboardStats;
  updateStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    activeCourses: 0,
    upcomingExams: 0
  });

  const updateStats = () => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Get courses from localStorage
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const activeCourses = courses.filter(course => course.progress < 100).length;
    
    // Get exams from localStorage
    const exams = JSON.parse(localStorage.getItem('exams') || '[]');
    const upcomingExams = exams.filter(exam => exam.status === 'upcoming').length;

    setStats({
      totalUsers: users.length,
      totalProducts: products.length,
      activeCourses,
      upcomingExams
    });
  };

  // Update stats when component mounts
  useEffect(() => {
    updateStats();
  }, []);

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
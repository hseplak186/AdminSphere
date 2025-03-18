export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  permissions: Permission[];
  lastActive?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  students: number;
  duration: string;
  progress: number;
}

export interface Exam {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  activeCourses: number;
  upcomingExams: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export type Permission = 
  | 'manage_users'
  | 'view_users'
  | 'manage_products'
  | 'view_products'
  | 'manage_courses'
  | 'view_courses'
  | 'manage_exams'
  | 'view_exams'
  | 'manage_settings';

export interface ChartData {
  name: string;
  value: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}
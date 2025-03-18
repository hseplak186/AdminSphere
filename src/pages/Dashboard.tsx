import React, { useEffect, useState } from 'react';
import { Users, ShoppingCart, GraduationCap, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';
import UserRegistration from '../components/UserRegistration';
import UserList from '../components/UserList';
import PageTransition from '../components/PageTransition';
import DashboardCharts from '../components/DashboardCharts';
import ActivityLogViewer from '../components/ActivityLogViewer';
import { useStats } from '../context/StatsContext';
import { ChartData, TimeSeriesData } from '../types';

function Dashboard() {
  const { stats } = useStats();
  const [userGrowth, setUserGrowth] = useState<TimeSeriesData[]>([]);
  const [roleDistribution, setRoleDistribution] = useState<ChartData[]>([]);

  useEffect(() => {
    // Simulate user growth data
    const today = new Date();
    const growth: TimeSeriesData[] = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (6 - i));
      return {
        date: date.toISOString(),
        value: Math.floor(Math.random() * 50) + 100
      };
    });
    setUserGrowth(growth);

    // Simulate role distribution data
    setRoleDistribution([
      { name: 'Admin', value: 5 },
      { name: 'Editor', value: 15 },
      { name: 'Instructor', value: 30 },
      { name: 'Student', value: 50 }
    ]);
  }, []);

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers, 
      icon: Users, 
      trend: 12, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Total Products', 
      value: stats.totalProducts, 
      icon: ShoppingCart, 
      trend: 8, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Active Courses', 
      value: stats.activeCourses, 
      icon: GraduationCap, 
      trend: 15, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Upcoming Exams', 
      value: stats.upcomingExams, 
      icon: FileText, 
      trend: -5, 
      color: 'bg-orange-500' 
    },
  ];

  return (
    <PageTransition>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <DashboardCharts
        userGrowth={userGrowth}
        roleDistribution={roleDistribution}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserRegistration />
        <ActivityLogViewer />
      </div>

      <div className="mt-6">
        <UserList />
      </div>
    </PageTransition>
  );
}

export default Dashboard;
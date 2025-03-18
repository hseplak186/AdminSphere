import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut,
  GraduationCap,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';

const Sidebar = () => {
  const { logout, hasPermission } = useAuth();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', permission: 'view_users' as const },
    { icon: Users, label: 'Users', path: '/users', permission: 'view_users' as const },
    { icon: ShoppingCart, label: 'Products', path: '/products', permission: 'view_products' as const },
    { icon: GraduationCap, label: 'Courses', path: '/courses', permission: 'view_courses' as const },
    { icon: FileText, label: 'Exams', path: '/exams', permission: 'view_exams' as const },
    { icon: Settings, label: 'Settings', path: '/settings', permission: 'manage_settings' as const },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8" />
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        <NotificationCenter />
      </div>
      <nav>
        {menuItems.map((item) => (
          hasPermission(item.permission) && (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-lg w-full mb-1 transition-all duration-200 ${
                  isActive ? 'bg-gray-800 text-white' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          )
        ))}
        <button 
          onClick={logout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-gray-800 px-4 py-3 rounded-lg w-full mt-4 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
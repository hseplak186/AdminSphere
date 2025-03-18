import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { StatsProvider } from './context/StatsContext';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Courses from './pages/Courses';
import Exams from './pages/Exams';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <AuthProvider>
        <StatsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex min-h-screen bg-gray-100">
                    <Sidebar />
                    <main className="flex-1 p-8">
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/courses" element={<Courses />} />
                          <Route path="/exams" element={<Exams />} />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </AnimatePresence>
                    </main>
                    <ChatBot />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </StatsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
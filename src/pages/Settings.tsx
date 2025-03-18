import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, User, Globe, Palette, Mail } from 'lucide-react';
import PageTransition from '../components/PageTransition';

function Settings() {
  const settingSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Update your personal information and profile picture'
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Manage your password and security preferences'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure how you receive notifications'
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Set your preferred language and regional settings'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of your dashboard'
    },
    {
      icon: Mail,
      title: 'Email Preferences',
      description: 'Manage your email notifications and subscriptions'
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-100">
                  <section.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default Settings;
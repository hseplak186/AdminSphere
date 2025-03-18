import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ActivityLog } from '../types';

const ActivityLogViewer: React.FC = () => {
  const [logs, setLogs] = React.useState<ActivityLog[]>(() => {
    return JSON.parse(localStorage.getItem('activityLogs') || '[]');
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
      <div className="space-y-4">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <p className="font-medium">{log.action}</p>
              <p className="text-sm text-gray-600">{log.details}</p>
              <p className="text-xs text-gray-500 mt-1">
                {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}
              </p>
            </div>
          </motion.div>
        ))}
        {logs.length === 0 && (
          <p className="text-gray-500 text-center py-4">No activity logs yet</p>
        )}
      </div>
    </div>
  );
};

export default ActivityLogViewer;
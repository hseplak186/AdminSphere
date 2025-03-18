import React, { useState } from 'react';
import { useStats } from '../context/StatsContext';

interface RegistrationData {
  name: string;
  email: string;
  role: string;
}

const UserRegistration = () => {
  const { updateStats } = useStats();
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    role: 'student'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser = {
      ...formData,
      id: crypto.randomUUID(),
      joinDate: new Date().toISOString()
    };

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Add new user
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    // Update dashboard stats
    updateStats();

    // Reset form
    setFormData({ name: '', email: '', role: 'student' });
    
    alert('User registered successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Register New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Register User
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
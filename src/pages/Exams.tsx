import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, FileText, Trash2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useStats } from '../context/StatsContext';
import { Exam } from '../types';
import Modal from '../components/Modal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

function Exams() {
  const { updateStats } = useStats();
  const [exams, setExams] = useState<Exam[]>(() => {
    return JSON.parse(localStorage.getItem('exams') || '[]');
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    duration: '',
    participants: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExam = {
      id: crypto.randomUUID(),
      title: formData.title,
      date: formData.date,
      duration: formData.duration,
      participants: parseInt(formData.participants),
      status: 'upcoming' as const
    };

    const updatedExams = [...exams, newExam];
    setExams(updatedExams);
    localStorage.setItem('exams', JSON.stringify(updatedExams));
    updateStats();
    
    setFormData({ title: '', date: '', duration: '', participants: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setExamToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (examToDelete) {
      const updatedExams = exams.filter(exam => exam.id !== examToDelete);
      setExams(updatedExams);
      localStorage.setItem('exams', JSON.stringify(updatedExams));
      updateStats();
      setExamToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Exam Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Create Exam
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Exam"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Exam Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <select
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select duration</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Participants</label>
              <input
                type="number"
                required
                min="1"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Create Exam
              </button>
            </div>
          </form>
        </Modal>

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemType="Exam"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm p-6 relative group"
            >
              <button
                onClick={() => handleDelete(exam.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{exam.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(exam.status)}`}>
                  {exam.status}
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(exam.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {exam.duration}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {exam.participants} participants
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default Exams;
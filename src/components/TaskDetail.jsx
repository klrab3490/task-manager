// src/TaskDetail.js
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const TaskDetail = ({ task, closeDetail }) => {
  const handleEdit = () => {
    // Handle task editing logic
    const db = getFirestore();
    const taskRef = doc(db, 'tasks', task.id);
    updateDoc(taskRef, {
      title: task.title,
      // Add more fields to update
    });
  };

  const handleShare = () => {
    // Handle task sharing logic (e.g., share with another user via email)
    alert('Sharing Task: ' + task.title);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4 text-black"
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">Priority: {task.priority}</p>
        <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>

        <div className="mt-4 flex space-x-4">
          <button 
            onClick={handleEdit} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Task
          </button>
          <button 
            onClick={handleShare} 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Share Task
          </button>
          <button 
            onClick={closeDetail} 
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};
TaskDetail.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
  closeDetail: PropTypes.func.isRequired,
};

export default TaskDetail;

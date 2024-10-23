import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db, uid } from '../config/firebaseConfig';

const AddTask = ({ closeForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get today's date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dueDate);

    // Check if the selected due date is before today
    if (selectedDate < today) {
      alert("Due date cannot be in the past. Please select a valid date.");
      return;
    }

    try {
      const taskCollection = collection(db, `user/${uid}/tasks`);
      await addDoc(taskCollection, {
        title,
        description,
        priority,
        dueDate,
        completed: false,
      });

      // Clear form fields
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
      closeForm();
    } catch (error) {
      alert("Error adding task: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4">
      <div className="bg-gray-500 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]} // Set minimum date to tomorrow
            required
          />

          <div className="flex space-x-4 mt-4">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
            <button 
              type="button" 
              onClick={closeForm} 
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

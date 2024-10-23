// src/Dashboard.js
import { signOut } from 'firebase/auth';
import AddTask from '../components/AddTask';
import { useNavigate } from 'react-router-dom';
import TaskDetail from '../components/TaskDetail';
import React, { useState, useEffect } from 'react';
import { auth, db, uid } from "../config/firebaseConfig";
import { collection, query, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const navigate = useNavigate();
  
  const Logout = async() => {
    await signOut(auth);
    navigate('/');
  }

  useEffect(() => {
    const q = query(collection(db, `user/${uid}/tasks`));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksArray);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

        <div className="flex justify-end mb-4 gap-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setShowAddTask(true)}
          >
            Add Task
          </button>
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => Logout()}
          >
            LogOut
          </button>
        </div>

        {showAddTask && <AddTask closeForm={() => setShowAddTask(false)} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => setSelectedTask(task)}
              className="p-4 bg-gray-500 shadow-md rounded-md cursor-pointer hover:bg-gray-700"
            >
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p>{task.priority}</p>
            </div>
          ))}
        </div>

        {selectedTask && <TaskDetail task={selectedTask} closeDetail={() => setSelectedTask(null)} />}
      </div>
    </div>
  );
};

export default Dashboard;

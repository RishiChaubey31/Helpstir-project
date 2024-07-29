import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import SearchTasks from './components/SearchTasks';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description) => {
    const newTask = {
      id: tasks.length + 1,
      description,
      completed: false,
      updatedAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription, updatedAt: new Date() } : task
    );
    setTasks(updatedTasks);
  };

  const markTaskAsDone = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date() } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <AddTask addTask={addTask} />
      <SearchTasks setSearchTerm={setSearchTerm} />
      <TaskList tasks={filteredTasks} updateTask={updateTask} markTaskAsDone={markTaskAsDone} />
    </div>
  );
};

export default TaskManager;

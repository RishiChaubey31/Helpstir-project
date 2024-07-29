import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import SearchTasks from './components/SearchTasks';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    // { id: 1, description: 'Sample Task 1', completed: false, updatedAt: new Date() },
    // { id: 2, description: 'Sample Task 2', completed: false, updatedAt: new Date() },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div>
      <AddTask addTask={addTask} />
      <SearchTasks setSearchTerm={setSearchTerm} />
      <TaskList tasks={filteredTasks} updateTask={updateTask} markTaskAsDone={markTaskAsDone} />
    </div>
  );
};

export default TaskManager;

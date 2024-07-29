import React, { useState } from 'react';

const TaskList = ({ tasks, updateTask, markTaskAsDone }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  const handleUpdate = (id) => {
    updateTask(id, newDescription);
    setEditingTaskId(null);
    setNewDescription('');
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div onClick={() => setExpandedTaskId(task.id === expandedTaskId ? null : task.id)}>
            {task.description} - {task.completed ? 'Completed' : 'Pending'}
          </div>
          {expandedTaskId === task.id && (
            <div>
              <p>Description: {task.description}</p>
              <p>Last updated: {task.updatedAt.toString()}</p>
              <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
              {editingTaskId === task.id && (
                <div>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="New description"
                  />
                  <button onClick={() => handleUpdate(task.id)}>Update</button>
                </div>
              )}
              <button onClick={() => markTaskAsDone(task.id)}>
                {task.completed ? 'Undo' : 'Mark as Done'}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

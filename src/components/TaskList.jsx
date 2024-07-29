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
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <div onClick={() => setExpandedTaskId(task.id === expandedTaskId ? null : task.id)}>
            {task.description} - {task.completed ? 'Completed' : 'Pending'}
          </div>
          {expandedTaskId === task.id && (
            <div className="task-details">
              <p>Description: {task.description}</p>
              <p>Last updated: {task.updatedAt.toString()}</p>
              <div className="task-actions">
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
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

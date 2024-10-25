import React, { useState } from 'react';
import "./todo.css"

const statuses = ['Todo', 'In-Progress', 'Review', 'Done', 'Closed'];

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        status: 'Todo',
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask(''); 
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editTaskText } : task
      )
    );
    setEditTaskId(null); 
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('taskId', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map((task) =>
      task.id === parseInt(taskId) ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          className="task"
        >
          {editTaskId === task.id ? (
            <div>
              <input
                type="text"
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          ) : (
            <div>
              <span>{task.text}</span>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="todo-app">
      <h1>Todo List with Drag and Drop</h1>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="statuses-container">
        {statuses.map((status) => (
          <div
            key={status}
            className="status-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3>{status}</h3>
            <div className="tasks-container">{renderTasks(status)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;

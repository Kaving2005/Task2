import React, { useState, useEffect, useRef } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [search, setSearch] = useState(''); // ✅ new state for search filter
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      isEditing: false,
    };

    setTasks(prev => [newTask, ...prev]);
    setInput('');
    inputRef.current?.focus();
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isEditing: true, editText: task.text } : task
      )
    );
  };

  const handleEditChange = (id, newText) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, editText: newText } : task
      )
    );
  };

  const saveEdit = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              text: task.editText.trim() || task.text,
              isEditing: false,
              editText: '',
            }
          : task
      )
    );
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.target.blur(); // Trigger onBlur to save
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // ✅ Filter tasks based on search text
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>

      {/* ✅ Search Filter Input */}
      <div className="todo-search-group">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ✅ Add Task Input */}
      <div className="todo-input-group">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* ✅ Task List */}
      <ul className="todo-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <li
              key={task.id}
              className={`todo-item ${task.completed ? 'completed' : ''}`}
            >
              {task.isEditing ? (
                <input
                  type="text"
                  value={task.editText}
                  onChange={e => handleEditChange(task.id, e.target.value)}
                  onBlur={() => saveEdit(task.id)}
                  onKeyDown={e => handleEditKeyDown(e, task.id)}
                  autoFocus
                  className="edit-input"
                />
              ) : (
                <span onClick={() => toggleTask(task.id)}>{task.text}</span>
              )}

              <div className="btn-group">
                {!task.isEditing && (
                  <button
                    className="edit-btn"
                    onClick={() => startEditing(task.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="remove-btn"
                  onClick={() => removeTask(task.id)}
                >
                  ×
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-tasks">No matching tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountDetails from './Modal';
import './Main.css';

const Main = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('low');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Tracks task being edited

  // Add task function
  const addTask = () => {
    if (title && description && deadline && priority) {
      axios
        .post('http://localhost:3001/todos/tasks', { title, description, deadline, priority })
        .then((result) => {
          setTasks([...tasks, result.data]);
          setTitle('');
          setDescription('');
          setDeadline('');
          setPriority('low');
        })
        .catch((err) => console.log(err));
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTask(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setDeadline(task.deadline);
    setPriority(task.priority);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('low');
  };

  const updateTask = (id) => {
    axios
      .put(`http://localhost:3001/todos/tasks/${id}`, {
        title,
        description,
        deadline,
        priority
      })
      .then((res) => {
        const updatedTasks = tasks.map((task) =>
          task._id === id ? { ...task, ...res.data } : task
        );
        setTasks(updatedTasks);
        cancelEditing(); // Reset edit mode
      })
      .catch((err) => console.log(err));
  };




  // Delete task function
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id)); // Remove task from state
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/todos/todo')
      .then((res) => {
        setTasks(res.data.todos);
        setFilteredTodos(res.data.todos);
      })
      .catch((err) => console.log(err));
  }, [tasks]);

  function drag(e) {
    e.dataTransfer.setData('text', e.target.id);
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  }

  // Filter tasks by search query
  useEffect(() => {
    setFilteredTodos(
      tasks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, tasks]);

  return (
    <div className="task-management-system">
      <nav className="home-navbar">
        <div className="home-profile modal">
          <AccountDetails />
        </div>
        <div className="home-center">
          <h1>Task Management System</h1>
        </div>
        <div>
          <button
            className="home-full-rounded"
            onClick={async () => {
              await axios.post('http://localhost:3001/auth/logout');
              document.cookie = '';
              navigate('/');
            }}
          >
            <span>Logout</span>
            <div className="home-border home-full-rounded"></div>
          </button>
        </div>
      </nav>
      <div className="board">
        <div className="column pending" onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
          <h2>Pending</h2>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-box"
          />
          <div className="tasks">
            {filteredTodos.map((t) => (
              <div key={t._id} id={t._id} className={`task task-${t.priority}`} draggable={true} onDragStart={drag}>
                {editingTask === t._id ? (
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <button onClick={() => updateTask(t._id)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                  <div className="task-card">
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <p><strong>Deadline:</strong> {new Date(t.deadline).toLocaleDateString()}</p>
                    <p>
                      <strong>Priority:</strong>
                      <span className={`priority priority-${t.priority}`}>{t.priority}</span>
                    </p>
                    <div className="task-actions">
                      <button className="button" onClick={() => startEditing(t)}>Edit</button>
                      <button className="button button-danger" onClick={() => deleteTask(t._id)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="task-form">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
              />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button onClick={addTask}>Add Task</button>
            </div>

          </div>
        </div>

        <div className="column progress" onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
          <h2>Progress</h2>
        </div>
        <div className="column completed" onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
          <h2>Completed</h2>
        </div>
      </div>
    </div>
  );
};

export default Main;

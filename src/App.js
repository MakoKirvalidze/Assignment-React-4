import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    const taskToComplete = tasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const deleteTask = (index) => {
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  };

  const moveBackToTasks = (index) => {
    const taskToMove = completedTasks[index];
    setTasks([...tasks, taskToMove]);
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="შეიყვანეთ ახალი დავალება"
        />
        <button onClick={addTask}>დამატება</button>
      </div>
      <div className="lists-container">
        <div className="list">
          <h2>შესასრულებელი დავალებები</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => completeTask(index)}>დასრულება</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="list">
          <h2>შესრულებული დავალებები</h2>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => deleteTask(index)}>წაშლა</button>
                <button onClick={() => moveBackToTasks(index)}>დაბრუნება</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

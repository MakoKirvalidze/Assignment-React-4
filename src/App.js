import React, { useState, memo } from 'react';
import './App.css';

const TaskItem = memo(({ task, onComplete, onDelete, onMoveBack, isCompleted }) => {
  console.log(`Rendering TaskItem: ${task}`);
  return (
    <li>
      {task}
      {isCompleted ? (
        <>
          <button onClick={onDelete}>წაშლა</button>
          <button onClick={onMoveBack}>დაბრუნება</button>
        </>
      ) : (
        <button onClick={onComplete}>დასრულება</button>
      )}
    </li>
  );
});

const TaskList = memo(({ title, tasks, onTaskAction, isCompleted }) => {
  console.log(`Rendering TaskList: ${title}`);
  return (
    <div className="list">
      <h2>{title}</h2>
      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onComplete={() => onTaskAction(index, 'complete')}
            onDelete={() => onTaskAction(index, 'delete')}
            onMoveBack={() => onTaskAction(index, 'moveBack')}
            isCompleted={isCompleted}
          />
        ))}
      </ul>
    </div>
  );
});

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

  const handleTaskAction = (index, action) => {
    switch (action) {
      case 'complete':
        const taskToComplete = tasks[index];
        setCompletedTasks([...completedTasks, taskToComplete]);
        setTasks(tasks.filter((_, i) => i !== index));
        break;
      case 'delete':
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        break;
      case 'moveBack':
        const taskToMove = completedTasks[index];
        setTasks([...tasks, taskToMove]);
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        break;
    }
  };

  console.log('Rendering App');
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
        <TaskList
          title="შესასრულებელი დავალებები"
          tasks={tasks}
          onTaskAction={handleTaskAction}
          isCompleted={false}
        />
        <TaskList
          title="შესრულებული დავალებები"
          tasks={completedTasks}
          onTaskAction={handleTaskAction}
          isCompleted={true}
        />
      </div>
    </div>
  );
}

export default App;
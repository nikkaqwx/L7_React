import { useState } from 'react';
import TodoTable from './components/TodoTable';
import TodoPopup from './components/TodoPopup';
import './App.css';

const initialTasks = [
  { id: 1, description: 'Выполнить ЛР7', status: 'Активная задача', deadline: '18.02.2025' },
  { id: 2, description: 'Сдать курсач по БД', status: 'Задача выполнена', deadline: '27.02.2026' },
  { id: 3, description: 'Найти работу', status: 'Задача выполнена', deadline: '27.02.2026' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [showPopup, setShowPopup] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { 
      id: Date.now(), 
      ...task 
    }]);
    setShowPopup(false);
  };

  return (
    <div className="App">
      <div className="header-tabs">
        <div className="tabs-left">
          <div
            className={`tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все задачи
          </div>

          <div
            className={`tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Активные задачи
          </div>
        </div>

        <div className="tabs-right">
          <div
            className={`tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Выполненные задачи
          </div>
        </div>
      </div>

      <TodoTable
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
      />

      <button 
        className="add-task-btn" 
        onClick={() => setShowPopup(true)}
      >
        Добавить задачу
      </button>

      {showPopup && (
        <TodoPopup
          onAdd={addTask}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default App;
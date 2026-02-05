import { useState, useRef } from 'react';
import StatusDropdown from './StatusDropdown';
import './TodoPopup.css';

function TodoPopup({ onAdd, onClose }) {
  const [data, setData] = useState({
    description: '',
    status: 'Активная задача',
    deadline: ''
  });
  
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusButtonRef = useRef(null);

  const submit = () => {
    if (!data.description.trim()) {
      alert('Пожалуйста, заполните описание задачи');
      return;
    }
    
    if (!data.deadline) {
      alert('Пожалуйста, выберите дедлайн');
      return;
    }

    onAdd({
      ...data,
      deadline: data.deadline.split('-').reverse().join('.')
    });

    onClose();
  };

  const getStatusColor = () => {
    switch(data.status) {
      case 'Активная задача': return '#FFBABACC';
      case 'Задача выполнена': return '#D0FFBA';
      case 'Задача отменена': return '#FFFEBACC';
      default: return '#FFBABACC';
    }
  };

  const handleStatusClick = () => {
    setShowStatusDropdown(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'popup-overlay') {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      submit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        
        {}
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
        >
          ×
        </button>
        
        {showStatusDropdown && statusButtonRef.current && (
          <StatusDropdown
            value={data.status}
            onChange={(status) => {
              setData({ ...data, status });
              setShowStatusDropdown(false);
            }}
            onClose={() => setShowStatusDropdown(false)}
            position={{
              top: statusButtonRef.current.getBoundingClientRect().bottom + 5,
              left: statusButtonRef.current.getBoundingClientRect().left
            }}
          />
        )}

        <div className="popup-header">
          <h2>Добавить новую задачу</h2>
        </div>

        <div className="popup-content">
          {}
          <div className="form-label">Описание</div>
          <div className="form-label">Статус</div>
          <div className="form-label">Дедлайн</div>

          {}
          <div className="form-field">
            <input
              className="form-input"
              placeholder="введите описание"
              value={data.description}
              onChange={e => setData({ ...data, description: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-field">
            <div className="status-button-container">
              <button
                ref={statusButtonRef}
                className="status-button"
                style={{ backgroundColor: getStatusColor() }}
                onClick={handleStatusClick}
                type="button"
              >
                <span className="status-text">{data.status}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
            </div>
          </div>

          <div className="form-field">
            <div className="date-input-container">
              <input
                type="date"
                className="form-input"
                value={data.deadline}
                onChange={e => setData({ ...data, deadline: e.target.value })}
                required
              />
              {!data.deadline && (
                <div className="date-placeholder">
                  Укажите дедлайн
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <button className="submit-btn" onClick={submit}>
            Добавить задачу
          </button>
        </div>

      </div>
    </div>
  );
}

export default TodoPopup;
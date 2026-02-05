import { useState, useRef } from 'react';
import StatusDropdown from './StatusDropdown';

function TodoRow({ task, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(null);
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const statusRef = useRef(null);

  const isPastDeadline = (date) => {
    const [d, m, y] = date.split('.');
    const deadline = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0,0,0,0);
    return deadline < today;
  };

  const startEdit = (field, val) => {
    if (field === 'status') {
      const rect = statusRef.current?.getBoundingClientRect();
      if (rect) {
        setDropdownPosition({
          top: rect.bottom + 5,
          left: rect.left
        });
      }
      setShowDropdown(true);
    } else {
      setEditing(field);
      setValue(field === 'deadline'
        ? val.split('.').reverse().join('-')
        : val);
    }
  };

  const save = () => {
    if (editing === 'deadline' && !value.trim()) return;
    if (editing === 'description' && !value.trim()) return;
    
    const result = editing === 'deadline'
      ? value.split('-').reverse().join('.')
      : value;
    onUpdate(task.id, editing, result);
    setEditing(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      save();
    } else if (e.key === 'Escape') {
      setEditing(null);
    }
  };

  const statusClass = task.status === 'Активная задача' ? 'status-active' :
                     task.status === 'Задача выполнена' ? 'status-completed' : 
                     'status-cancelled';

  return (
    <>
      {showDropdown && (
        <StatusDropdown
          value={task.status}
          onChange={(s) => {
            onUpdate(task.id, 'status', s);
            setShowDropdown(false);
          }}
          onClose={() => setShowDropdown(false)}
          position={dropdownPosition}
        />
      )}

      <tr>
        <td>
          {editing === 'description'
            ? <input 
                className="edit-input" 
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={save}
                onKeyDown={handleKeyDown}
                autoFocus 
              />
            : <div 
                className="editable-cell"
                onClick={() => startEdit('description', task.description)}
              >
                {task.description}
              </div>
          }
        </td>

        <td ref={statusRef}>
          <div 
            className="editable-cell" 
            onClick={() => startEdit('status')}
            style={{ padding: '5px' }}
          >
            <span className={`status-badge ${statusClass}`}>
              {task.status}
            </span>
          </div>
        </td>

        <td>
          {editing === 'deadline'
            ? <input 
                type="date" 
                className="date-input"
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={save}
                onKeyDown={handleKeyDown}
                autoFocus 
              />
            : <div
                className={`editable-cell ${
                  isPastDeadline(task.deadline) ? 'past-deadline' : ''
                }`}
                onClick={() => startEdit('deadline', task.deadline)}
              >
                {task.deadline}
              </div>
          }
        </td>

        <td>
          <button 
            className="delete-btn" 
            onClick={() => onDelete(task.id)}
            title="Удалить задачу"
          >
            🗑
          </button>
        </td>
      </tr>
    </>
  );
}

export default TodoRow;
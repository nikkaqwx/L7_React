import { useRef, useEffect } from 'react';
import './StatusDropdown.css';

const options = [
  { value: 'Активная задача', color: '#FFBABACC' },
  { value: 'Задача выполнена', color: '#D0FFBA' },
  { value: 'Задача отменена', color: '#FFFEBACC' }
];

function StatusDropdown({ value, onChange, onClose, position }) {
  const ref = useRef();

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && onClose();
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [onClose]);

  const getPositionStyle = () => {
    if (!position) return {};
    return {
      position: 'fixed',
      top: `${position.top}px`,
      left: `${position.left}px`,
      zIndex: 1001
    };
  };

  const currentOption = options.find(opt => opt.value === value);

  return (
    <>
      <div className="status-dropdown-overlay" onClick={onClose} />
      <div 
        className="dropdown-container" 
        ref={ref}
        style={getPositionStyle()}
      >
        {options.map(option => (
          <div
            key={option.value}
            className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
            style={{ backgroundColor: option.color }}
            onClick={() => { 
              onChange(option.value); 
              onClose(); 
            }}
          >
            {option.value}
            {option.value === value && <span className="checkmark">✓</span>}
          </div>
        ))}
      </div>
    </>
  );
}

export default StatusDropdown;
import TodoRow from './TodoRow';
import './TodoTable.css';

function TodoTable({ tasks, setTasks, filter }) {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.status === 'Активная задача';
    if (filter === 'completed') {
      return task.status === 'Задача выполнена' || task.status === 'Задача отменена';
    }
    return true;
  });

  const deleteTask = (id) => {
    if (window.confirm('Удалить задачу?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const updateTask = (id, field, value) => {
    if (!value.trim()) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  if (filteredTasks.length === 0) {
    return <div className="empty-table">Нет задач для отображения</div>;
  }

  return (
    <div className="table-container">
      <div className="todo-table">
        <table>
          <thead>
            <tr>
              <th>Описание</th>
              <th>Статус</th>
              <th>Дедлайн</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <TodoRow
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoTable;

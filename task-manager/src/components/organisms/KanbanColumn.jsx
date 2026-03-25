import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../redux/slices/taskSlice';
import TaskCard from '../molecules/TaskCard';

const KanbanColumn = ({ title, status, tasks, onEdit, onDelete, dotClass }) => {
  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.currentTarget.classList.remove('drag-over');
    const taskId = e.dataTransfer.getData("taskId");
    dispatch(updateTask({ id: taskId, updates: { status } }));
  };

  return (
    <div className="kanban-col">
      <div className="kanban-header">
        <div className={`kanban-dot ${dotClass}`}></div>
        <h2 className="kanban-title">{title} <span>({tasks.length})</span></h2>
      </div>
      
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="kanban-dropzone"
      >
        <div className="kanban-card-list">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const onDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div 
      draggable 
      onDragStart={onDragStart}
      className="task-card"
    >
      <h4 className="task-title">{task.title}</h4>
      <p className="task-desc">{task.description}</p>
      
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="task-btn task-btn-edit">EDIT</button>
        <button onClick={() => onDelete(task.id)} className="task-btn task-btn-del">DELETE</button>
      </div>
    </div>
  );
};

export default TaskCard;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/slices/taskSlice';
import { logoutUser } from '../redux/slices/authSlice';
import KanbanColumn from '../components/organisms/KanbanColumn';
import TaskForm from '../components/organisms/TaskForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: tasks } = useSelector((state) => state.tasks);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user) dispatch(fetchTasks(user.uid));
  }, [dispatch, user]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="dashboard-layout">
      {/* HEADER */}
      <header className="container dashboard-header">
        <h1 className="dashboard-title text-gradient">My Tasks</h1>
        <button onClick={() => dispatch(logoutUser())} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          Sign Out
        </button>
      </header>

      {/* QUICK ADD BAR */}
      <div className="container">
        <div className="action-bar">
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            className="action-input"
            onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
            readOnly
          />
          <button 
            onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
            className="btn btn-primary action-btn"
          >
            Create Task
          </button>
        </div>
      </div>

      {/* KANBAN GRID */}
      <div className="container kanban-grid">
        <KanbanColumn 
          title="To Do" 
          status="Todo" 
          dotClass="dot-todo" 
          tasks={tasks.filter(t => t.status === 'Todo')} 
          onEdit={handleEdit} 
          onDelete={(id) => dispatch(deleteTask(id))} 
        />
        <KanbanColumn 
          title="In Progress" 
          status="In Progress" 
          dotClass="dot-progress" 
          tasks={tasks.filter(t => t.status === 'In Progress')} 
          onEdit={handleEdit} 
          onDelete={(id) => dispatch(deleteTask(id))} 
        />
        <KanbanColumn 
          title="Done" 
          status="Done" 
          dotClass="dot-done" 
          tasks={tasks.filter(t => t.status === 'Done')} 
          onEdit={handleEdit} 
          onDelete={(id) => dispatch(deleteTask(id))} 
        />
      </div>

      {/* MODAL FORM */}
      {isFormOpen && (
        <TaskForm existingTask={editingTask} closeForm={() => setIsFormOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
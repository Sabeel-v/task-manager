import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/slices/taskSlice';
import { logoutUser } from '../redux/slices/authSlice';
import { displayToast } from '../redux/slices/uiSlice';
import DashboardLayout from '../components/templates/DashboardLayout';
import KanbanColumn from '../components/organisms/KanbanColumn';
import TaskForm from '../components/organisms/TaskForm';
import Button from '../components/atoms/Button';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: tasks } = useSelector((state) => state.tasks);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) dispatch(fetchTasks(user.uid));
  }, [dispatch, user]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      dispatch(displayToast('Task deleted successfully', 'success'));
    } catch (err) {
      dispatch(displayToast('Failed to delete task', 'error'));
    }
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout 
      headerTitle="My Tasks" 
      onSignOut={() => dispatch(logoutUser())}
    >
      {/* QUICK ADD / SEARCH BAR */}
      <div className="container">
        <div className="action-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="action-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
            className="action-btn"
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* KANBAN GRID */}
      <div className="container kanban-grid">
        <KanbanColumn 
          title="To Do" 
          status="Todo" 
          dotClass="dot-todo" 
          tasks={filteredTasks.filter(t => t.status === 'Todo')} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
        <KanbanColumn 
          title="In Progress" 
          status="In Progress" 
          dotClass="dot-progress" 
          tasks={filteredTasks.filter(t => t.status === 'In Progress')} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
        <KanbanColumn 
          title="Done" 
          status="Done" 
          dotClass="dot-done" 
          tasks={filteredTasks.filter(t => t.status === 'Done')} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>

      {/* MODAL FORM */}
      {isFormOpen && (
        <TaskForm 
          existingTask={editingTask} 
          closeForm={() => setIsFormOpen(false)} 
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../../redux/slices/taskSlice';

const TaskForm = ({ existingTask, closeForm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo'
  });

  // If editing, populate the form
  useEffect(() => {
    if (existingTask) {
      setFormData({
        title: existingTask.title,
        description: existingTask.description,
        status: existingTask.status
      });
    }
  }, [existingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No user found in Redux state!");
      return;
    }

    const taskData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
    };

    try {
      if (existingTask) {
        await dispatch(updateTask({ id: existingTask.id, updates: taskData })).unwrap();
      } else {
        await dispatch(addTask({ ...taskData, userId: user.uid })).unwrap();
      }
      closeForm();
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) closeForm(); }}>
      <div className="modal-content">
        <h3 className="modal-header">{existingTask ? 'Edit Task' : 'Create Task'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Task Title</label>
            <input
              type="text"
              placeholder="E.g., Design homepage"
              className="input-field"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              autoFocus
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              placeholder="Add more details about this task..."
              className="input-field form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Status</label>
            <div style={{ position: 'relative' }}>
              <select
                className="input-field form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={closeForm} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {existingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
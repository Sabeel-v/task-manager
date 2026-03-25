import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../../redux/slices/taskSlice';
import { displayToast } from '../../redux/slices/uiSlice';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

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
      dispatch(displayToast('You must be logged in to create a task', 'error'));
      return;
    }

    if (!formData.title.trim()) {
      dispatch(displayToast('Task title is required', 'warning'));
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
        dispatch(displayToast('Task updated successfully!', 'success'));
      } else {
        await dispatch(addTask({ ...taskData, userId: user.uid })).unwrap();
        dispatch(displayToast('Task created successfully!', 'success'));
      }
      closeForm();
    } catch (err) {
      dispatch(displayToast('Failed to save task', 'error'));
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) closeForm(); }}>
      <div className="modal-content">
        <h3 className="modal-header">{existingTask ? 'Edit Task' : 'Create Task'}</h3>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Task Title"
            type="text"
            placeholder="E.g., Design homepage"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            autoFocus
          />
          
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
            <Button type="button" variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {existingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
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
  console.log("1. Submit clicked");

  if (!user) {
    console.error("No user found in Redux state!");
    return;
  }

  const taskData = {
    title: formData.title,
    description: formData.description,
    status: formData.status,
    userId: user.uid,
  };

  console.log("2. Sending data:", taskData);

  try {
    const result = await dispatch(addTask(taskData)).unwrap();
    console.log("3. Success! Firebase ID:", result.id);
    closeForm();
  } catch (err) {
    console.error("4. Failed to add task:", err);
  }
};
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg bg-white shadow">
      <h3 className="text-xl font-bold">{existingTask ? 'Edit Task' : 'Create Task'}</h3>
      
      <input
        type="text"
        placeholder="Task Title"
        className="p-2 border rounded"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      
      <textarea
        placeholder="Description"
        className="p-2 border rounded"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      
      <select
        className="p-2 border rounded"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={closeForm} className="px-4 py-2 text-gray-500">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {existingTask ? 'Update' : 'Save Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
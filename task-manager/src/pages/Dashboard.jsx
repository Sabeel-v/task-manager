import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/slices/taskSlice';
import TaskForm from '../components/organisms/TaskForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: tasks, status } = useSelector((state) => state.tasks);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + New Task
        </button>
      </header>

      {isFormOpen && (
        <div className="mb-8">
          <TaskForm existingTask={editingTask} closeForm={handleClose} />
        </div>
      )}

      {status === 'loading' ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 border rounded shadow-sm bg-white">
              <div className="flex justify-between">
                <h4 className="font-semibold text-lg">{task.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  task.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{task.description}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(task)} className="text-blue-500 text-sm">Edit</button>
                <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
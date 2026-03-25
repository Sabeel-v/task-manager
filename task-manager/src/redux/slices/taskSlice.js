import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import { 
  collection, addDoc, getDocs, query, where, 
  updateDoc, deleteDoc, doc, serverTimestamp 
} from 'firebase/firestore';


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId) => {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id, 
      ...data,
      // Convert Firebase Timestamp to a plain number or string
      createdAt: data.createdAt?.toMillis() || Date.now() 
    };
  });
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  const docRef = await addDoc(collection(db, 'tasks'), {
    ...taskData,
    createdAt: serverTimestamp(),
  });
  
  return { 
    id: docRef.id, 
    ...taskData, 
    createdAt: Date.now() // Use local time for the immediate Redux update
  };
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }) => {
  const taskRef = doc(db, 'tasks', id);
  await updateDoc(taskRef, updates);
  return { id, updates };
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await deleteDoc(doc(db, 'tasks', id));
  return id;
});



const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload.updates };
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
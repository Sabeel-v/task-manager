import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';



export const signupUser = createAsyncThunk('auth/signup', async ({ email, password }, thunkAPI) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return { uid: response.user.uid, email: response.user.email };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return { uid: response.user.uid, email: response.user.email };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});



const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: true, error: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
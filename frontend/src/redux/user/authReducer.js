import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, register } from '../api/authApi';
import { getUserLogged } from '../api/userApi';

export const userRegister = createAsyncThunk("user/auth/register", async ( info ) => {
  const data = await register(info);
  return data;
})

export const userLogin = createAsyncThunk("user/auth/login", async ({ email, password }) => {
  const data = await login(email, password);
  return data;
})

export const fetchUser = createAsyncThunk("user/auth/me", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.token;

  const data = await getUserLogged(token);
  return data;
})


const initialState = {
  data: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.data = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        //state.token = action.payload.access_token;        
        //localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        //localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.token = null;
        state.data = null;
        state.isAuthenticated = false;
        //localStorage.removeItem('token');
      });
  }
});


export const { logout } = userSlice.actions;

export default userSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../api/authApi";
import { getUserLogged } from "../api/userApi";
import { createAddress, deleteAddress, editAddress } from "../api/addressApi";

export const userRegister = createAsyncThunk(
  "user/auth/register",
  async (info) => {
    const data = await register(info);
    return data;
  }
);

export const userLogin = createAsyncThunk(
  "user/auth/login",
  async ({ email, password }) => {
    const data = await login(email, password);
    return data;
  }
);

export const fetchUser = createAsyncThunk(
  "user/auth/me",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await getUserLogged(token);
    return data;
  }
);

export const createUserAddress = createAsyncThunk(
  "user/address/create",
  async ({ id, dataAddress }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await createAddress(token, id, dataAddress);
    return data;
  }
);

export const editUserAddress = createAsyncThunk(
  "user/address/edit",
  async ({ id, dataAddress }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await editAddress(token, id, dataAddress);
    return data;
  }
);

export const deleteUserAddress = createAsyncThunk(
  "user/address/delete",
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    await deleteAddress(token, id);
    return id;
  }
);

const initialState = {
  data: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.data = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
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
      })
      .addCase(createUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data.direcciones.push(action.payload);
      })
      .addCase(editUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.direcciones.findIndex(
          (c) => c.id === action.payload.id
        );

        if (index !== -1) {
          state.data.direcciones[index] = action.payload;
        }
      })
      .addCase(deleteUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data.direcciones = state.data.direcciones.filter(
          (direccion) => direccion.id !== action.payload
        );
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

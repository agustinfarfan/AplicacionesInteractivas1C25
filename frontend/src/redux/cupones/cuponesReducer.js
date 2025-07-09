import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCupones, createCupon, updateCupon, deleteCupon } from "../api/cuponesApi";

// GET
export const loadCupones = createAsyncThunk("coupon/load", async (_, thunkAPI) => {
  const token = thunkAPI.getState().user.token;
  return await fetchAllCupones(token);
});

// POST
export const addCupon = createAsyncThunk("coupon/add", async (data, thunkAPI) => {
  const token = thunkAPI.getState().user.token;
  return await createCupon(data, token);
});

// PUT
export const editCupon = createAsyncThunk("coupon/edit", async (data, thunkAPI) => {
  const token = thunkAPI.getState().user.token;
  return await updateCupon(data, token);
});

// DELETE
export const removeCupon = createAsyncThunk("coupon/delete", async (id, thunkAPI) => {
  const token = thunkAPI.getState().user.token;
  await deleteCupon(id, token);
  return id;
});

const cuponesSlice = createSlice({
  name: "coupon",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCupones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCupones.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCupones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCupon.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editCupon.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeCupon.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export default cuponesSlice.reducer;

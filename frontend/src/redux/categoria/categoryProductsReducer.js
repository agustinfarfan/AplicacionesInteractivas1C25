// redux/categoryProducts/categoryProductsReducer.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByCategory } from '../api/categoryProductApi';


export const getProductsByCategory = createAsyncThunk(
  'categoryProducts/getProductsByCategory',
  async (categoryId) => {
    const data = await fetchProductsByCategory(categoryId);
    return data;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const categoryProductsSlice = createSlice({
  name: 'categoryProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoryProductsSlice.reducer;

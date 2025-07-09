import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../api/categoryApi';


export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const data = await getAllCategories();
    return data;
  }
);

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (id) => {
    const data = await getCategoryById(id);
    return data;
  }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (categoryData) => {
    const data = await createCategory(categoryData);
    return data;
  }
);

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async ({ id, categoryData }) => {
    const data = await updateCategory(id, categoryData);
    return data;
  }
);

export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (id) => {
    await deleteCategory(id);
    return id;
  }
);

const initialState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.content;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET ONE
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
      })

      // CREATE
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // UPDATE
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      // DELETE
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;

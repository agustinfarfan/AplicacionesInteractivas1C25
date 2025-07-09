import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCategories, deleteCategories, updateCategory, createCategory } from '../api/categoriesApi'

export const getCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const data = await fetchCategories()
  const raw = data.content ?? data;
    return raw.map(c => ({
      id:           c.id,
      nombre:       c.name,
      descripcion:  c.description
    }));
})

export const removeCategory = createAsyncThunk("category/delete", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.token;

  await deleteCategories(id, token);
  return id;
});

export const editCategory = createAsyncThunk(
  "category/edit",
  async ({nombre,descripcion,id}, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;
    const data = await updateCategory(token, nombre, descripcion, id);
    return data;
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  async ({nombre,descripcion}, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;
    const data = await createCategory(token, nombre, descripcion);
    return data;
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      // GET
      .addCase(getCategories.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // DELETE
      .addCase(removeCategory.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(c => c.id !== action.payload)
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // EDIT
      .addCase(editCategory.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            nombre: action.payload.name,
            descripcion: action.payload.description
          };
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // CREATE
      .addCase(addCategory.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false
        state.items.push({
          id: action.payload.id,
          nombre: action.payload.name,
          descripcion: action.payload.description
        });
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      
      
  }
})

export default categoriesSlice.reducer
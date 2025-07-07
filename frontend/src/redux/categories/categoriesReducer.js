import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCategories, createCategory, updateCategory } from '../api/categoriesApi'

export const getCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const data = await fetchCategories()
  const raw = data.content ?? data;
    return raw.map(c => ({
      id:           c.id,
      nombre:       c.name,
      descripcion:  c.description
    }));
})

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async ({ nombre, descripcion }, { rejectWithValue }) => {
    try {
      const data = await createCategory({ nombre, descripcion });
      return { id: data.id, nombre: data.name, descripcion: data.description };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ id, nombre, descripcion }, { rejectWithValue }) => {
    try {
      const data = await updateCategory({ id, nombre, descripcion });
      return { id: data.id, nombre: data.name, descripcion: data.description };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
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
      // ADD
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload || "Error al agregar la categoría";
      })
      .addCase(addCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      // EDIT
      .addCase(editCategory.fulfilled, (state, action) => {
        const idx = state.items.findIndex(cat => cat.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  }
})

export default categoriesSlice.reducer
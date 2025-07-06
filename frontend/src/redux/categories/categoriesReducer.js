import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCategories } from '../api/categoriesApi'

export const getCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const data = await fetchCategories()
  const raw = data.content ?? data;
    return raw.map(c => ({
      id:           c.id,
      nombre:       c.name,
      descripcion:  c.description
    }));
})

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
  }
})

export default categoriesSlice.reducer
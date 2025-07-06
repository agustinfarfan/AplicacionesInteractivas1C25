import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProducto, deleteProducto, fetchProductos } from "../api/productosApi";

// GET todos los productos
export const loadProducts = createAsyncThunk("products/load", async () => {
  return await fetchProductos();
});

// DELETE un producto
export const removeProduct = createAsyncThunk("products/delete", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.token;

  await deleteProducto(id, token);
  return id;
});

// POST crear producto
export const addProduct = createAsyncThunk(
  "products/create",
  async (productData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    return await createProducto(productData, token);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((prod) => prod.id !== action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.success = true;
      });
  },
});


export const { clearProductStatus } = productSlice.actions;
export default productSlice.reducer;

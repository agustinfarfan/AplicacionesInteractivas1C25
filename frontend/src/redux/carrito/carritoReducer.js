import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { addProduct, getUserCart, removeProduct } from '../api/carritoApi'



export const fetchCarrito = createAsyncThunk("carrito/getCart", async ({ id }) => {
  const data = await getUserCart(id);
  return data;
})

export const addProductoToCart = createAsyncThunk("carrito/addProductoToCart", async ({ id, productoId, cantidad }) => {
  const data = await addProduct(id, productoId, cantidad);
  return data;
})

export const removeProductoFromCart = createAsyncThunk("carrito/removeProductoFromCart", async ({ id, productoId, cantidad }) => {
  const data = await removeProduct(id, productoId, cantidad);
  return data;
})


const initialState = {
  carrito: {},
  loading: false,
  error: null,
  empty: true
}

function handleCarritoFulfilled(state, action) {
  state.loading = false;
  state.carrito = action.payload;
  state.empty = !state.carrito.carritoDetalle || state.carrito.carritoDetalle.length === 0;
}

function handleCarritoPending(state) {
  state.loading = true;
  state.error = null;
}

function handleCarritoRejected(state, action) {
  state.loading = false;
  state.error = action.error.message;
}

export const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
  },
  extraReducers: builer => {
    builer
      .addCase(fetchCarrito.pending, handleCarritoPending)
      .addCase(fetchCarrito.fulfilled, handleCarritoFulfilled)
      .addCase(fetchCarrito.rejected, handleCarritoRejected)
      .addCase(addProductoToCart.pending, handleCarritoPending)
      .addCase(addProductoToCart.fulfilled, handleCarritoFulfilled)
      .addCase(addProductoToCart.rejected, handleCarritoRejected)
      .addCase(removeProductoFromCart.pending, handleCarritoPending)
      .addCase(removeProductoFromCart.fulfilled, handleCarritoFulfilled)
      .addCase(removeProductoFromCart.rejected, handleCarritoRejected)
  }
})

export default carritoSlice.reducer
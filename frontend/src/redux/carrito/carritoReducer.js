import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { addCoupon, addProduct, finalize, getUserCart, removeProduct } from '../api/carritoApi'



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

export const addCouponToCart = createAsyncThunk("carrito/addCouponToCart", async ({ id, nombre }) => {
  const data = await addCoupon(id, nombre);
  return data;
})

export const finalizeCart = createAsyncThunk("carrito/finalizeCart", async ({ id, info }) => {
  const data = await finalize(id, info);
  return data;
})


const initialState = {
  carrito: {},
  loading: false,
  error: null,
  isEmpty: true,
  quantity: 0
}

function handleCarritoFulfilled(state, action) {
  state.loading = false;
  state.carrito = action.payload;
  if (state.carrito.carritoDetalle.length === 0) {
    state.isEmpty = true;
  } else {
    state.quantity = state.carrito.carritoDetalle.reduce((prev, current) => prev + current.cantidad, 0)
    state.isEmpty = false;
  }
}

function handleCarritoPending(state) {
  state.loading = true;
  state.error = null;
}

function handleCarritoRejected(state, action) {
  state.loading = false;
  state.error = action.error.message;
}

function handleCarritoClear(state, action) {
  state.loading
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
      .addCase(addCouponToCart.pending, handleCarritoPending)
      .addCase(addCouponToCart.fulfilled, handleCarritoFulfilled)
      .addCase(addCouponToCart.rejected, handleCarritoRejected)
      .addCase(finalizeCart.pending, handleCarritoPending)
      .addCase(finalizeCart.fulfilled, (state, action) => {
        state = initialState;
      })
      .addCase(finalizeCart.rejected, handleCarritoRejected)
  }
})

export default carritoSlice.reducer
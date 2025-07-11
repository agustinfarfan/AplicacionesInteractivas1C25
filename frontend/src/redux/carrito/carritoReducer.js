import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addCoupon, addProduct, finalize, getUserCart, removeProduct } from '../api/carritoApi'

export const fetchCarrito = createAsyncThunk(
  "carrito/getCart",
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await getUserCart(token, id);
    return data;
  }
);

export const addProductoToCart = createAsyncThunk(
  "carrito/addProductoToCart",
  async ({ id, productoId, cantidad }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await addProduct(token, id, productoId, cantidad);
    return data;
  }
);

export const removeProductoFromCart = createAsyncThunk(
  "carrito/removeProductoFromCart",
  async ({ id, productoId, cantidad }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await removeProduct(token, id, productoId, cantidad);
    return data;
  }
);

export const addCouponToCart = createAsyncThunk(
  "carrito/addCouponToCart",
  async ({ id, nombre }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await addCoupon(token, id, nombre);
    return data;
  }
);

export const finalizeCart = createAsyncThunk(
  "carrito/finalizeCart",
  async ({ id, info }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    const data = await finalize(token, id, info);
    return data;
  }
);


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
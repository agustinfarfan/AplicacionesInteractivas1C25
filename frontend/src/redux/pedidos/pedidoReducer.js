import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPedido, deletePedido, getAllPedidos, getPedidoById, getPedidosByUserId, updatePedido } from '../api/pedidoApi';


// Thunks
export const fetchAllPedidos = createAsyncThunk(
  'pedido/fetchAll',
  async (token) => await getAllPedidos(token)
);

export const fetchPedidosByUser = createAsyncThunk(
  'pedido/fetchByUser',
  async ({token, userId}) => await getPedidosByUserId(token, userId)
);

export const fetchPedido = createAsyncThunk(
  'pedido/fetchById',
  async ({token, id}) => {

   return await getPedidoById(token, id);
  }
);

export const createNewPedido = createAsyncThunk(
  'pedido/create',
  async (pedido) => await createPedido(pedido)
);

export const updateExistingPedido = createAsyncThunk(
  'pedido/update',
  async (pedido) => await updatePedido(pedido)
);

export const removePedido = createAsyncThunk(
  'pedido/delete',
  async (id) => await deletePedido(id)
);

const initialState = {
  pedidos: [],
  pedidoSeleccionado: null,
  loading: false,
  error: null,
};

const pedidoSlice = createSlice({
  name: 'pedido',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllPedidos.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(fetchAllPedidos.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidos = action.payload;
        })
        .addCase(fetchAllPedidos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })

        .addCase(fetchPedidosByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPedidosByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidos = action.payload;
      })
      .addCase(fetchPedidosByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPedido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPedido.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidoSeleccionado = action.payload;
      })
      .addCase(fetchPedido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createNewPedido.fulfilled, (state, action) => {
        state.pedidos.push(action.payload);
      })
      .addCase(updateExistingPedido.fulfilled, (state, action) => {
        const index = state.pedidos.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.pedidos[index] = action.payload;
      })
      .addCase(removePedido.fulfilled, (state, action) => {
        state.pedidos = state.pedidos.filter(p => p.id !== action.meta.arg);
      });
  },
});

export default pedidoSlice.reducer;


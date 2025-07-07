import { configureStore } from '@reduxjs/toolkit'
import carritoReducer from './carrito/carritoReducer'
import authReducer from './user/authReducer' 
import categoryReducer from './categoria/categoryReducer' 
import categoryProductsReducer from './categoria/categoryProductsReducer' 
import pedidoReducer from './pedidos/pedidoReducer';

export const store = configureStore({
  reducer: {
    carrito: carritoReducer,
    user: authReducer,
    category: categoryReducer,
    categoryProducts: categoryProductsReducer,
    pedido: pedidoReducer
  },
})
import { configureStore } from '@reduxjs/toolkit'
import carritoReducer from './carrito/carritoReducer'
import authReducer from './user/authReducer' 
import categoryReducer from './categories/categoriesReducer' 
import pedidoReducer from './pedidos/pedidoReducer';
import productosReducer from './productos/productosReducer' 
import categoryProductsReducer from './categories/categoriesProductReducer'
import cuponesReducer from './cupones/cuponesReducer' 

export const store = configureStore({
  reducer: {
    carrito: carritoReducer,
    user: authReducer,
    productos: productosReducer,
    category: categoryReducer,
    categoryProducts: categoryProductsReducer,
    pedido: pedidoReducer,
    cupones: cuponesReducer
  },
})
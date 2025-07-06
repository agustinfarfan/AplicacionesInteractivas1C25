import { configureStore } from '@reduxjs/toolkit'
import carritoReducer from './carrito/carritoReducer'
import authReducer from './user/authReducer' 
import productosReducer from './productos/productosReducer' 

export const store = configureStore({
  reducer: {
    carrito: carritoReducer,
    user: authReducer,
    productos: productosReducer
  },
})
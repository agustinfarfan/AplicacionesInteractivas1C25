import { configureStore } from '@reduxjs/toolkit'
import carritoReducer from './carrito/carritoReducer'
import authReducer from './user/authReducer' 
import productosReducer from './productos/productosReducer'
import categoriesReducer from './categories/categoriesReducer' 

export const store = configureStore({
  reducer: {
    carrito: carritoReducer,
    user: authReducer,
    categories: categoriesReducer,
    productos: productosReducer
  },
})
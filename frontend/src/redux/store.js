import { configureStore } from '@reduxjs/toolkit'
import carritoReducer from './carrito/carritoReducer'


export const store = configureStore({
  reducer: {
    carrito: carritoReducer
  },
})
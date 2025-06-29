import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { useDispatch } from 'react-redux'
import { fetchCarrito } from '../redux/carrito/carritoReducer'

const WebLayout = () => {

  const { user, loadingUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCarrito({ id: user.user_id }));
    }
  }, [dispatch, user])

  return (
    <>
      <Outlet />
    </>
  )
}

export default WebLayout
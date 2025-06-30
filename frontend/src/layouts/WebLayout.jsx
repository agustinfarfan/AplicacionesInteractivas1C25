import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarrito } from '../redux/carrito/carritoReducer'
import { fetchUser } from '../redux/user/authReducer'

const WebLayout = () => {

  const { user, loadingUser } = useAuth();
  const dispatch = useDispatch();
  const { data: userData, isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])
  

  useEffect(() => {
    if (user) {
      dispatch(fetchCarrito({ id: userData.user_id }));
    }
  }, [dispatch, isAuthenticated])

  return (
    <>
      <Outlet />
    </>
  )
}

export default WebLayout
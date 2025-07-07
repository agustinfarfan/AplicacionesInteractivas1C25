import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarrito } from '../redux/carrito/carritoReducer'
import { fetchUser } from '../redux/user/authReducer'

const WebLayout = () => {

  const dispatch = useDispatch();
  const { data: userData, isAuthenticated, token } = useSelector((state) => state.user);


  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch, token])
  

  useEffect(() => {
    if (isAuthenticated && userData) {
      dispatch(fetchCarrito({ id: userData.user_id }));
    }
  }, [dispatch, isAuthenticated, userData])

  return (
    <>
      <Outlet />
    </>
  )
}

export default WebLayout
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarrito } from '../redux/carrito/carritoReducer'
import { fetchUser } from '../redux/user/authReducer'

const WebLayout = () => {

  const dispatch = useDispatch();
  const { data: userData, isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])
  

  useEffect(() => {
    if (isAuthenticated) {
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
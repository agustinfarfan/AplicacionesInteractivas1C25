import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const TiendaLayout = () => {
  return (
    <>
    <Header/>
      <div className='h-vh min-h-screen py-20 bg-gray-50'>
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default TiendaLayout
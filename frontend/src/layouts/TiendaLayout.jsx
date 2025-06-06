import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const TiendaLayout = () => {
  return (
    <>
    <Header/>
    <div className='h-vh py-20'>
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default TiendaLayout

import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading"
import { useSelector } from 'react-redux';

const AdminLayout = () => {

  const { data: userData, isAuthenticated, loading, token } = useSelector((state) => state.user);

  if (loading || (token && !userData)) {
    return <Loading />;
  }

  if (isAuthenticated && userData?.role === "VENDOR") {
    return (
      <>
        <Header />
        <div className='h-vh min-h-screen py-20 bg-gradient-to-br from-slate-50 to-blue-50'>
          <Outlet />
        </div>
        <Footer />
      </>
    );
  }

  return <Navigate to="/auth/login" replace />;
}

export default AdminLayout
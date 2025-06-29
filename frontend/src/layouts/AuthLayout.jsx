// layouts/AuthLayout.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div className='h-vh min-h-screen py-20 bg-gradient-to-br from-slate-50 to-blue-50'>

        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;

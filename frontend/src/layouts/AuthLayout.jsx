// layouts/AuthLayout.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div className="h-screen pt-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;

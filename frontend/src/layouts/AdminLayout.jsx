
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading"

const AdminLayout = () => {

    const { user, loadingUser } = useAuth();

    console.log(user);
    

    return loadingUser ? (
        <>
            <Loading></Loading>
        </>
    ) : user && user.role == "VENDOR" ? (
        <>
            <Header />
            <div className="h-vh min-h-screen py-20 bg-gray-50">
                <Outlet />
            </div>
            <Footer />
        </>
    ) : <Navigate to="/auth/login" replace />;
}

export default AdminLayout
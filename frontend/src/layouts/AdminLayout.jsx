
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading"

const AdminLayout = () => {

    const { user, loading } = useAuth();

    return loading ? (
        <>
            <Loading></Loading>
        </>
    ) : user ? (
        <>
            <Header />
            <div className="h-screen pt-20">
                <Outlet />
            </div>
            <Footer />
        </>
    ) : <Navigate to="/auth/login" replace />;
}

export default AdminLayout
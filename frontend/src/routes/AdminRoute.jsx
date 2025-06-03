import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginAdmin from "../pages/admin/LoginAdmin";
import CategoriesAdmin from "../pages/admin/CategoriesAdmin";

const useAdminRoute = () => {
  return (
    <Route path="admin" element={<AuthLayout />}>
      {/* Cuando entras a /admin te redirige a admin/login */}
      <Route index element={<Navigate to="login" replace />} />  
      
      {/* Cuando entras a admin/login te muestra lo que este en LoginAdmin.jsx */}
      <Route path="login" element={<LoginAdmin />} />

      {/*Cuando entras a admin/categories te muestra lo que este en CategoriesAdmin.jsx*/}
      <Route path="categories" element={<CategoriesAdmin />} />
    </Route>
  )
}

export default useAdminRoute



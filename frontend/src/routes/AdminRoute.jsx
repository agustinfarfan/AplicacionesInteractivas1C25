import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginAdmin from "../pages/admin/LoginAdmin";

const useAdminRoute = () => {
  return (
    <Route path="admin" element={<AuthLayout />}>
      <Route index element={<Navigate to="login" replace />} />  
      <Route path="login" element={<LoginAdmin />} />
    </Route>
  )
}

export default useAdminRoute



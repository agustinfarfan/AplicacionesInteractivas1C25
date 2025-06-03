import { Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginAdmin from "../pages/admin/LoginAdmin";
import RegisterAdmin from "../pages/admin/RegisterAdmin";

const useAdminRoute = () => {
  return (
    <Route path="admin" element={<AuthLayout />}>
      <Route index element={<Navigate to="login" replace />} />  
      <Route path="login" element={<LoginAdmin />} />
      <Route path="register" element={<RegisterAdmin />} /> 
    </Route>
  );
};

export default useAdminRoute;
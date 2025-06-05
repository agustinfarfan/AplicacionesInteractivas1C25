import { Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register";

const useAuthRoute = () => {
  return (
    <Route path="auth" element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  );
};

export default useAuthRoute;
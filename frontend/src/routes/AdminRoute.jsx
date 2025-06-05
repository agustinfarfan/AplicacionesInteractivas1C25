import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import CategoriesAdmin from "../pages/admin/CategoriesAdmin";
import ProductList from "../components/ProductList";
import ProductsAdmin from "../pages/admin/ProductsAdmin";

const useAdminRoute = () => {
  return (
    <Route path="admin" element={<AuthLayout />}>
      
      {/*Cuando entras a admin/categories te muestra lo que este en CategoriesAdmin.jsx*/}
      <Route path="categories" element={<CategoriesAdmin />} />

      {/*Cuando entras a admin/products te muestra lo que este en ProductsAdmin.jsx*/}
      <Route path="products" element={<ProductsAdmin/>} />

    </Route>
  )
}

export default useAdminRoute;
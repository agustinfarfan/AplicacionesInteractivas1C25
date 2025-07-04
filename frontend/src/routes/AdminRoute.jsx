import { Routes, Route, Navigate } from "react-router-dom";
import CategoriesAdmin from "../pages/admin/CategoriesAdmin";
import ProductsAdmin from "../pages/admin/ProductsAdmin";
import AdminLayout from "../layouts/AdminLayout";
import PedidosAdmin from "../pages/admin/PedidosAdmin";
import Pedido from './../pages/tienda/Pedido';
import PedidoAdmin from "../pages/admin/PedidoAdmin";
import CuponesAdmin from "../pages/admin/CuponesAdmin";
import ProductoNuevo from "../pages/admin/ProductoNuevo";


const useAdminRoute = () => {
  return (
    <Route path="admin" element={<AdminLayout />}>

      {/*Cuando entras a admin/categories te muestra lo que este en CategoriesAdmin.jsx*/}
      <Route path="categories" element={<CategoriesAdmin />} />

      {/*Cuando entras a admin/products te muestra lo que este en ProductsAdmin.jsx*/}
      <Route path="products" element={<ProductsAdmin />} />

      <Route path="products/nuevo" element={<ProductoNuevo />} />

      <Route path="pedidos">
        <Route index element={<PedidosAdmin />} />
        <Route path=":id" element={<PedidoAdmin />} />
      </Route>

      <Route path="cupones" element={<CuponesAdmin/>}/>

    </Route>
  )
}

export default useAdminRoute;
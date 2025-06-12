import { Routes, Route, Navigate } from "react-router-dom";
import Home from './../pages/tienda/Home';
import Carrito from "../pages/tienda/Carrito";
import TiendaLayout from "../layouts/TiendaLayout";
import Checkout from "../pages/tienda/Checkout";
import NotFound from "../pages/tienda/NotFound";
import Contact from "../pages/tienda/Contact";
import About from "../pages/tienda/About";
import Success from "../pages/tienda/Success";
import Address from "../pages/tienda/Address";
import Failure from './../pages/tienda/Failure';
import Pedidos from "../pages/tienda/Pedidos";
import Pedido from "../pages/tienda/Pedido";
import PrivateRoute from "./PrivateRoute";
import CategoryProducts from "../pages/tienda/CategoryProducts"
import ProductDetail from "../pages/tienda/ProductDetail"
import AllProducts from "../pages/tienda/AllProducts";


const useTiendaRoute = () => {
  return (
    <Route element={<TiendaLayout />}>
      <Route path="/" element={<Home />} />

      <Route path="address" element={<Address />} />

      <Route path="carrito">
        <Route index element={<Carrito />} />
        
        <Route path="checkout">
          <Route index element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="failure" element={<Failure />} />
        </Route>     
      </Route>

      <Route path="contacto" element={<Contact />} />
      <Route path="about" element={<About />} />

      <Route path="pedidos">
        <Route index element={<PrivateRoute> <Pedidos /> </PrivateRoute>} />
        <Route path=":id" element={<PrivateRoute> <Pedido /> </PrivateRoute> } />

      </Route>

      <Route path="/productos" element={<AllProducts/>}/>
      <Route path="/categoria/:categoryId" element={<CategoryProducts />} />
      <Route path="/producto/:productId" element={<ProductDetail />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
}

export default useTiendaRoute

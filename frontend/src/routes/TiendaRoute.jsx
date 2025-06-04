import { Routes, Route, Navigate } from "react-router-dom";
import Home from './../pages/tienda/Home';
import Carrito from "../pages/tienda/Carrito";
import TiendaLayout from "../layouts/TiendaLayout";
import Checkout from "../pages/tienda/Checkout";
import NotFound from "../pages/tienda/notFound";

const useTiendaRoute = () => {
  return (
    <Route element={<TiendaLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="carrito" element={<Carrito/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="*" element={<NotFound />} />

    </Route>
  )
}

export default useTiendaRoute

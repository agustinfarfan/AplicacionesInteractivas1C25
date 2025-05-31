import { Routes, Route, Navigate } from "react-router-dom";
import Home from './../pages/tienda/Home';
import Carrito from "../pages/tienda/Carrito";
import TiendaLayout from "../layouts/TiendaLayout";


const useTiendaRoute = () => {
  return (
    <Route element={<TiendaLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="carrito" element={<Carrito/>}/>
    </Route>
  )
}

export default useTiendaRoute

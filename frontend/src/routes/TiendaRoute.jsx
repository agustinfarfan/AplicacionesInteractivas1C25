import { Routes, Route, Navigate } from "react-router-dom";
import Home from './../pages/tienda/Home';


const useTiendaRoute = () => {
  return (
    <Route path="/" element={<Home />}>

    </Route>
   
  )
}

export default useTiendaRoute

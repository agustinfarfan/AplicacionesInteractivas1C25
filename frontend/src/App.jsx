import { Routes, Route, Navigate } from "react-router-dom";
import tiendaRoute from './routes/TiendaRoute';
import useAdminRoute from "./routes/AdminRoute";


function App() {
  const adminRoute = useAdminRoute();
  

  return (
    <Routes>
      {tiendaRoute}
      {adminRoute}
    </Routes>
  );
}

export default App;

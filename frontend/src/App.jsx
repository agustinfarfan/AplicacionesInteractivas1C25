import { Routes, Route, Navigate } from "react-router-dom";
import useAdminRoute from "./routes/AdminRoute";
import useTiendaRoute from "./routes/TiendaRoute";


function App() {
  const adminRoute = useAdminRoute();
  const tiendaRoute = useTiendaRoute();

  return (
    <Routes>
      {tiendaRoute}
      {adminRoute}
    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import useAdminRoute from "./routes/AdminRoute";
import useTiendaRoute from "./routes/TiendaRoute";
import useAuthRoute from "./routes/AuthRoute";


function App() {
  const adminRoute = useAdminRoute();
  const tiendaRoute = useTiendaRoute();
  const authRoute = useAuthRoute();

  return (
    <Routes>
      {tiendaRoute}
      {authRoute}
      {adminRoute}
      
    </Routes>
  );
}

export default App;

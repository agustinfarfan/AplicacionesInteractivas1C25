import { Routes, Route, BrowserRouter } from "react-router-dom";
import useAdminRoute from "./routes/AdminRoute";
import useTiendaRoute from "./routes/TiendaRoute";
import useAuthRoute from "./routes/AuthRoute";
import WebLayout from "./layouts/WebLayout";


function App() {
  const adminRoute = useAdminRoute();
  const tiendaRoute = useTiendaRoute();
  const authRoute = useAuthRoute();

  return (
      <BrowserRouter>
        <Routes >
          <Route element={<WebLayout />}>
            {tiendaRoute}
            {authRoute}
            {adminRoute}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import useAdminRoute from "./routes/AdminRoute";
import useTiendaRoute from "./routes/TiendaRoute";
import useAuthRoute from "./routes/AuthRoute";
import { AuthProvider } from "./context/AuthContext";
import WebLayout from "./layouts/WebLayout";


function App() {
  const adminRoute = useAdminRoute();
  const tiendaRoute = useTiendaRoute();
  const authRoute = useAuthRoute();


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes >
          <Route element={<WebLayout />}>
            {tiendaRoute}
            {authRoute}
            {adminRoute}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;

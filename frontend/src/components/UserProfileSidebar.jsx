// src/components/UserProfileSidebar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineClipboardList,
  HiOutlineLocationMarker,
  HiOutlineCog,
  HiOutlineOfficeBuilding
} from "react-icons/hi";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/authReducer";

const UserProfileSidebar = ({ onClose }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isAuthenticated, loading } = useSelector((state) => state.user);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleLogout = (e) => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/");
    }
  }

  return loading && !data ? (
    <Loading/>
  ) : (
    <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 p-4 flex flex-col justify-start rounded-l-xl">
      {/* Botón de cerrar (X) */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Avatar y Nombre (puedes adaptar para leer correo/nombre del token) */}
      <div className="flex flex-col items-center text-center mt-4 mb-6">
        <HiOutlineOfficeBuilding className="w-20 h-20 text-gray-400" />
        <p className="text-sm text-gray-500 mt-2">Hola</p>
        <p className="text-lg font-semibold">{data?.razonSocial}</p>

        <select
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={selectedAddressId || ""}
          onChange={(e) => setSelectedAddressId(Number(e.target.value))}
        >
          {data?.direcciones.length === 0 ? (
            <option value="">No hay direcciones asociadas</option>
          ) : (
            data?.direcciones.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {`${addr.alias}: ${addr.calle} ${addr.altura}, ${addr.localidad}`}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Menú de navegación de usuario */}
      <div className="flex flex-col space-y-3 text-sm text-gray-700">
        <Link
          to="/pedidos"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100"
        >
          <HiOutlineClipboardList className="text-lg" />
          Mis Pedidos
        </Link>
        
        <Link
          to="/address"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100"
        >
          <HiOutlineLocationMarker className="text-lg" />
          Direcciones
        </Link>
        
      </div>
      
      {
        data?.role == "VENDOR" && (
            <details className="group mt-6">
              <summary className="flex items-center justify-between cursor-pointer px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                <span className="flex items-center gap-2">
                  <HiOutlineCog className="text-lg" />
                  Configuracion
                </span>

              </summary>
              <div className="mt-2 ml-6 flex flex-col text-sm">
                <Link className="text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 p-2" to="/admin/categories">Categorías</Link>
                <Link className="text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 p-2" to="/admin/products">Productos</Link>
                <Link className="text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 p-2" to="/admin/pedidos">Pedidos</Link>
                <Link className="text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 p-2" to="/admin/cupones">Cupones</Link>

              </div>
            </details>
        )
      }
      
      {/* Menú desplegable de Configuración (para todos los logueados) */}
      

      {/* Botón “Cerrar sesión” al final */}
      <button
        onClick={handleLogout}
        className="mt-auto text-left px-4 py-2 text-red-600 hover:text-red-800"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default UserProfileSidebar;

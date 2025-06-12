// src/components/UserProfileSidebar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isVendor, getRolesFromToken, getUsernameFromToken } from "../utils/auth";
import {
  HiOutlineClipboardList,
  HiOutlineLocationMarker,
  HiOutlineCog,
  HiOutlineOfficeBuilding
} from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { Loader } from "lucide-react";
import Loading from "./Loading";

const UserProfileSidebar = ({ onClose, onLogout }) => {
  
  const {user, loadingUser} = useAuth();


  const [companyName, setCompanyName] = useState("Usuario");
   // lista de direcciones del usuario (inicial siempre array)
  const [addresses, setAddresses] = useState([]);
  // id de la dirección seleccionada
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = token
    ? { Authorization: `Bearer ${token}` }
    : {};


  // ← Nuevo: al montar, pedimos /user/me
   useEffect(() => {
     fetch("http://localhost:4002/user/me", {
       headers: { "Content-Type": "application/json", ...authHeader },
     })
       .then((res) => {
         if (!res.ok) throw new Error("No autorizado");
         return res.json();
       })
       .then((data) => {
        // 1) razón social
        setCompanyName(data.razonSocial || "Usuario");

        // 2) direcciones: data.direcciones debe llegar como array desde tu UserDTO
        const list = Array.isArray(data.direcciones) ? data.direcciones : [];
        setAddresses(list);

        // 3) selecciono la primera si existe
        if (list.length > 0) {
          setSelectedAddressId(list[0].id);
        }
      })
       .catch(console.error);
   }, [token]);

  return loadingUser ? (
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
        <p className="text-lg font-semibold">{companyName}</p>

        <select
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={selectedAddressId || ""}
          onChange={(e) => setSelectedAddressId(Number(e.target.value))}
        >
          {addresses.length === 0 ? (
            <option value="">No hay direcciones asociadas</option>
          ) : (
            addresses.map((addr) => (
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
        user.role == "VENDOR" && (
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
        onClick={() => {
          onLogout(); // Esto borrará el token y hará navigate("/")
        }}
        className="mt-auto text-left px-4 py-2 text-red-600 hover:text-red-800"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default UserProfileSidebar;

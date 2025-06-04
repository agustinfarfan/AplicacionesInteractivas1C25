import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineCog
} from "react-icons/hi";

const UserProfileSidebar = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 p-4 flex flex-col justify-start rounded-l-xl">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl font-bold">×</button>
      </div>

      <div className="flex flex-col items-center text-center mt-4 mb-6">
        <div className="relative">
          <img
            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
            src="https://tailwindflex.com/images/avatar/avatar-1.jpg"
            alt="avatar"
          />
          <button
            className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow text-xs"
            title="Editar"
          >
            ✎
          </button>
        </div>
        <p className="text-lg font-semibold">Jenny Wilson</p>
        <select className="mt-2 w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <option>[Laboratorio central] - Av. Corrientes 1234, CABA</option>
            <option>[Sector endonocrino] - Ruta 8 Km 45, Pilar, Buenos Aires</option>
            <option>[Neonatologia] - España 456, Córdoba Capital</option>
        </select>
      </div>

      <div className="flex flex-col space-y-3 text-sm text-gray-700">
        
        <Link to="/orders" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100">
          <HiOutlineClipboardList className="text-lg" /> Historial de Pedidos
        </Link>
        <Link to="/account" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100">
          <HiOutlineUser className="text-lg" /> Detalles de cuenta
        </Link>
        <Link to="/address" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100">
          <HiOutlineLocationMarker className="text-lg" /> Address
        </Link>
        
        <button className="text-left px-4 py-2 text-red-600 hover:text-red-800">Cerrar sesión</button>
      </div>
        <details className="group mt-6">
            <summary className="flex items-center justify-between cursor-pointer px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
            <span className="flex items-center gap-2">
                <HiOutlineCog className="text-lg" />
                Configuracion
            </span>
            
            </summary>
            <div className="mt-2 ml-6 flex flex-col gap-1 text-sm">
                <Link to="/admin/categories">Categorías</Link>
                <Link to="/admin/products">Productos</Link>
                <Link to="/admin/clients">Clientes</Link>
            </div>
        </details>

    </div>
  );
};

export default UserProfileSidebar;

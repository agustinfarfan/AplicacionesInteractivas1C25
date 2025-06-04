// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, isVendor, getRolesFromToken } from "../utils/auth";
import { HiOutlineShoppingCart } from "react-icons/hi"; // ícono del carrito
import UserProfileSidebar from "./UserProfileSidebar";

const Header = () => {
  const navigate = useNavigate();

  // Estado para saber si hay sesión activa (token)
  const [loggedIn, setLoggedIn] = useState(false);

  // Estado para controlar si se muestra el sidebar de perfil
  const [showProfile, setShowProfile] = useState(false);

  // Cada vez que cambie localStorage (login/logout), queremos reflejarlo
  useEffect(() => {
    // Al montar, chequeamos si hay token
    setLoggedIn(isLoggedIn());

    // También nos suscribimos a cambios de localStorage (si el usuario cierra sesión en otra pestaña)
    const handleStorageChange = () => {
      setLoggedIn(isLoggedIn());
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Función para cerrar sesión (borrar token y volver al landing)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo o Nombre de la App */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          SanaSana
        </Link>

        {/* Menú de navegación */}
        <nav className="flex items-center space-x-4">
          {/* ← Si NO está logueado, muestro botones “Iniciar Sesión” y “Registrarse” */}
          {!loggedIn ? (
            <>
              <button
                onClick={() => navigate("/admin/login")}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
              >
                Registrarse
              </button>
            </>
          ) : (
            /* ← Si ESTÁ logueado, muestro carrito + avatar */
            <>
              {/* Ícono de carrito, que redirige a /carrito */}
              <Link to="/carrito" className="relative text-gray-700 hover:text-gray-900">
                <HiOutlineShoppingCart className="w-6 h-6" />
                {/* Si quieres, aquí podrías poner un “badge” con la cantidad de items */}
              </Link>

              {/* Avatar que abre el sidebar */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {/* Puedes usar una imagen real de usuario si la tienes */}
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://tailwindflex.com/images/avatar/avatar-1.jpg"
                    alt="Perfil"
                  />
                </button>
                {showProfile && <UserProfileSidebar onClose={() => setShowProfile(false)} onLogout={handleLogout} />}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

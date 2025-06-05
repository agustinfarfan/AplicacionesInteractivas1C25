// src/pages/admin/LoginAdmin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const navigate = useNavigate();

  // Estados para los dos campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:4002/api/v1/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Por ejemplo 401, 403, etc.
        const text = await response.text();
        throw new Error(`Error al autenticar: ${text}`);
      }

      const data = await response.json();
      // data.access_token es el JWT
      localStorage.setItem("token", data.access_token);

      // Redirige al panel de categorías
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMsg("Credenciales inválidas o error de servidor.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login Admin</h2>
        {errorMsg && <p className="text-red-600 text-sm mb-2">{errorMsg}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="admin@ejemplo.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="********"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;

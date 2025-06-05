import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductsAdmin = () => {
  // Listado estático de productos (ejemplo MVP)
  const productos = [
    { id: 1, nombre: "Guantes de Látex", descripcion: "Caja de 100 unidades", precio: 1500 },
    { id: 2, nombre: "Reactivo Hematológico", descripcion: "Botella de 500ml", precio: 3200 },
    { id: 3, nombre: "Centrífuga de Laboratorio", descripcion: "Velocidad ajustable", precio: 75000 },
    { id: 4, nombre: "Microscopio Óptico", descripcion: "Con luz LED", precio: 54000 },
    { id: 5, nombre: "Kit Serológico", descripcion: "Pruebas rápidas para laboratorio", precio: 12000 },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductos = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Administración de Productos</h1>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProductos.length > 0 ? (
              filteredProductos.map((prod, idx) => (
                <tr key={prod.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-6 py-4 text-sm text-gray-700">{prod.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{prod.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{prod.descripcion}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${prod.precio}</td>
                  <td className="px-6 py-4 text-sm font-medium flex gap-2">
                    <button
                      onClick={() => alert(`Editar producto ${prod.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => alert(`Eliminar producto ${prod.id}`)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Enlace para agregar nuevo producto */}
      <div className="mt-6">
        <Link
          to="/admin/productos/nuevo"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Agregar producto
        </Link>
      </div>
    </div>
  );
};

export default ProductsAdmin;

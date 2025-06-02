import React, { useState } from "react";
import { Link } from "react-router-dom";

const CategoriasAdmin = () => {
  // Listado estático de categorías (ejemplo MVP)
  const categorias = [
    { id: 1, nombre: "Medio interno", descripcion: "Reactivos químicos para laboratorio" },
    { id: 2, nombre: "Hematología", descripcion: "Equipos de medición y análisis" },
    { id: 3, nombre: "Química clínica", descripcion: "Guantes, jeringas, tubos, etc." },
    { id: 4, nombre: "Microbiología", descripcion: "Reactivos para cultivos y pruebas de aislamiento" },
    { id: 5, nombre: "Serología", descripcion: "Kits y reactivos para pruebas serológicas" },
  ];

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar categorías cuyo nombre contenga (case-insensitive) el texto de búsqueda
  const filteredCategorias = categorias.filter(cat =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Administración de Categorías</h1>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Tabla de categorías */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Encabezado */}
          <thead className="bg-gray-100">
            <tr>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Descripción
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acción
              </th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategorias.length > 0 ? (
              filteredCategorias.map((cat, idx) => (
                <tr key={cat.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>

                    {/* Columna ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cat.id}
                  </td>
                  {/* Columna Nombre */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cat.nombre}
                  </td>

                  {/* Columna Descripción */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cat.descripcion}
                  </td>

                  {/* Columna Acción */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    {/* Botón Editar */}
                    <button
                      onClick={() => alert(`Editar categoría ${cat.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>

                    {/* Botón Eliminar */}
                    <button
                      onClick={() => alert(`Eliminar categoría ${cat.id}`)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  No se encontraron categorías.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Enlace para agregar categoría nueva */}
      <div className="mt-6">
        <Link
          to="/admin/categorias/nueva"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Agregar categoría
        </Link>
      </div>
    </div>
  );
};

export default CategoriasAdmin;

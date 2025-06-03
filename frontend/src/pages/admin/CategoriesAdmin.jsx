import React, { useState } from "react";

const CategoriasAdmin = () => {
  // 1. Estado de categorías (lista mutable)
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Medio interno", descripcion: "Reactivos químicos para laboratorio" },
    { id: 2, nombre: "Hematología", descripcion: "Equipos de medición y análisis" },
    { id: 3, nombre: "Química clínica", descripcion: "Guantes, jeringas, tubos, etc." },
    { id: 4, nombre: "Microbiología", descripcion: "Reactivos para cultivos y pruebas de aislamiento" },
    { id: 5, nombre: "Serología", descripcion: "Kits y reactivos para pruebas serológicas" },
  ]);

  // 2. Estado de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // 3. Estados para modal (crear/editar)
  const [showModal, setShowModal] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");

  // 4. Estado para confirmación de eliminación
  const [deleteCat, setDeleteCat] = useState(null);

  // 5. Abrir modal en “Agregar”
  const openAddModal = () => {
    setActiveCat(null);
    setFormName("");
    setFormDesc("");
    setShowModal(true);
  };

  // 6. Abrir modal en “Editar”
  const openEditModal = (cat) => {
    setActiveCat(cat);
    setFormName(cat.nombre);
    setFormDesc(cat.descripcion);
    setShowModal(true);
  };

  // 7. Guardar ya sea “Agregar” o “Editar”
  const handleSave = () => {
    if (formName.trim() === "") {
      alert("El nombre no puede estar vacío");
      return;
    }

    if (activeCat) {
      // MODO “EDITAR”
      setCategorias((prev) =>
        prev.map((c) =>
          c.id === activeCat.id
            ? { ...c, nombre: formName, descripcion: formDesc }
            : c
        )
      );
    } else {
      // MODO “CREAR”
      const newId =
        categorias.length > 0
          ? Math.max(...categorias.map((c) => c.id)) + 1
          : 1;
      const nuevaCat = { id: newId, nombre: formName, descripcion: formDesc };
      setCategorias((prev) => [...prev, nuevaCat]);
    }

    // Cerrar modal y resetear formulario
    setFormName("");
    setFormDesc("");
    setActiveCat(null);
    setShowModal(false);
  };

  // 8. Filtrar categorías para la tabla
  const filteredCategorias = categorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 9. Confirmar eliminación
  const confirmDelete = () => {
    setCategorias((prev) => prev.filter((c) => c.id !== deleteCat.id));
    setDeleteCat(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ———————— Título ———————— */}
      <h1 className="text-2xl font-semibold mb-6">Administración de Categorías</h1>

      {/* ———————— Barra de búsqueda ———————— */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ———————— Tabla de categorías ———————— */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Encabezado */}
          <thead className="bg-gray-100">
            <tr>
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
                  {/* Nombre */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cat.nombre}
                  </td>
                  {/* Descripción */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cat.descripcion}
                  </td>
                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteCat(cat)}
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

      {/* ———————— Botón “Agregar categoría” ———————— */}
      <div className="mt-6">
        <button
          onClick={openAddModal}
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Agregar categoría
        </button>
      </div>

      {/* ———————————————— MODAL CREAR / EDITAR ———————————————— */}
      {showModal && (
        <>
          {/* Backdrop semitransparente */}
          <div
            onClick={() => {
              setFormName("");
              setFormDesc("");
              setActiveCat(null);
              setShowModal(false);
            }}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Caja del modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              {/* Título dinámico */}
              <h2 className="text-xl font-semibold mb-4">
                {activeCat ? "Editar categoría" : "Crear nueva categoría"}
              </h2>

              {/* Input Nombre */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ingrese el nombre"
                />
              </div>

              {/* Input Descripción */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ingrese la descripción"
                  rows={3}
                />
              </div>

              {/* Botones “Cancelar” y “Guardar” */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setFormName("");
                    setFormDesc("");
                    setActiveCat(null);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ———————————————— MODAL CONFIRMACIÓN ELIMINAR ———————————————— */}
      {deleteCat && (
        <>
          {/* Backdrop semitransparente */}
          <div
            onClick={() => setDeleteCat(null)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Caja del modal de confirmación */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              {/* Mensaje con nombre en negrita */}
              <p className="text-base text-gray-800 mb-4">
                ¿Seguro que desea eliminar la categoría{" "}
                <span className="font-semibold">{deleteCat.nombre}</span>?
              </p>

              <div className="flex justify-end gap-2">
                {/* Cancelar */}
                <button
                  onClick={() => setDeleteCat(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                {/* Confirmar eliminar */}
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriasAdmin;

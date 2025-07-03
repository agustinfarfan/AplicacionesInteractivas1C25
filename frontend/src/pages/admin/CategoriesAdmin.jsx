import React, { useState, useEffect } from "react";

const CategoriasAdmin = () => {
  // —————————— Estados ——————————
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // (modales, edición, eliminación, etc. siguen igual)
  const [showModal, setShowModal] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [deleteCat, setDeleteCat] = useState(null);

  // —————————— Cargar categorías al montar ——————————
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const resp = await fetch("http://localhost:4002/categories");
        if (!resp.ok) throw new Error("Error al listar categorías");

        const data = await resp.json();          // por ejemplo: { content: [ {id, name, description}, … ], … }
        const rawArray = data.content || data;   // si viene con paginación, usamos data.content; sino data es array

        // Mapear cada objeto a la forma { id, nombre, descripcion }
        const mapped = rawArray.map((c) => ({
          id: c.id,


          nombre: c.name,
          descripcion: c.description,
        }));

        setCategorias(mapped);
        
      } catch (error) {
        console.error("No se pudieron cargar categorías:", error);
      }
    };

    loadCategorias();
  }, []);

  // —————————— Manejo de creación/edición (igual que antes) ——————————
  const openAddModal = () => {
    setActiveCat(null);
    setFormName("");
    setFormDesc("");
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    setActiveCat(cat);
    setFormName(cat.nombre);
    setFormDesc(cat.descripcion);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (formName.trim() === "") {
      alert("El nombre no puede estar vacío");
      return;
    }

    const token = localStorage.getItem("token");
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};


    try {
      let resp;
      if (activeCat) {
        
        resp = await fetch(`http://localhost:4002/categories/${activeCat.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeader },
          body: JSON.stringify({
            nombre: formName,
            descripcion: formDesc,
          }),
        });
      } else {
        
        resp = await fetch("http://localhost:4002/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeader },
          body: JSON.stringify({
            nombre: formName,
            descripcion: formDesc
          }),
        });
      }

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Error al guardar: ${text}`);
      }

      // Despues de crear o editar, recargo la lista
      await loadCategoriasBackend();

      setFormName("");
      setFormDesc("");
      setActiveCat(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error en guardar categoría:", error);
      alert("Hubo un error al guardar. Revisa la consola.");
    }
  };

  // Función auxiliar para recargar el array de categories tras crear/editar/eliminar
  const loadCategoriasBackend = async () => {
    try {
      const resp = await fetch("http://localhost:4002/categories");
      if (!resp.ok) throw new Error("Error al listar categorías");
      const data = await resp.json();
      const rawArray = data.content || data;
      const mapped = rawArray.map((c) => ({
        id: c.id,
        nombre: c.name,
        descripcion: c.description,
      }));
      setCategorias(mapped);
    } catch (error) {
      console.error("No se pudieron recargar categorías:", error);
    }
  };

  const confirmDelete = async () => {

    const token = localStorage.getItem("token");
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const resp = await fetch(`http://localhost:4002/categories/${deleteCat.id}`, {
        method: "DELETE",
        headers:{...authHeader}
      });
      if (resp.status === 204) {
        // Después de borrar, recargamos lista
        await loadCategoriasBackend();
      } else {
        const text = await resp.text();
        throw new Error(`Error al eliminar: ${text}`);
      }
    } catch (error) {
      console.error("Error en eliminar categoría:", error);
      alert("Hubo un error al eliminar. Revisa la consola.");
    } finally {
      setDeleteCat(null);
    }
  };

  /*
  const categoriasMock = [{
    id: 1,
    nombre: "Microbiologia",
    descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, dignissimos."
  }]  
  */

  // —————————— Filtrado local (ya no hay excepción porque `categorias` siempre es array) ——————————
  const filteredCategorias = categorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Administración de Categorías</h1>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Esto es la tabla*/}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Encabezado */}
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Id
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

          {/* Cuerpo*/}
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategorias.length > 0 ? (
              filteredCategorias.map((cat, idx) => (
                <tr key={cat.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cat.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cat.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cat.descripcion}
                  </td>
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

      {/* Botón “Agregar categoría” */}
      <div className="mt-6">
        <button
          onClick={openAddModal}
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Agregar categoría
        </button>
      </div>

      {/* Modal “Crear / Editar” (igual que antes) */}
      {showModal && (
        <>
          <div
            onClick={() => {
              setFormName("");
              setFormDesc("");
              setActiveCat(null);
              setShowModal(false);
            }}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                {activeCat ? "Editar categoría" : "Crear nueva categoría"}
              </h2>
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

      {/* Modal “Confirmar Eliminar” (igual que antes) */}
      {deleteCat && (
        <>
          <div
            onClick={() => setDeleteCat(null)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <p className="text-base text-gray-800 mb-4">
                ¿Seguro que desea eliminar la categoría{" "}
                <span className="font-semibold">{deleteCat.nombre}</span>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteCat(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
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

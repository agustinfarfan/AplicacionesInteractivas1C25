import React, { useEffect, useState } from "react";
import { BACKEND_CONFIG } from "../../services/backendApi";

const ProductsAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: "",
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const [productsRes, categoriasRes] = await Promise.all([
          fetch(`${BACKEND_CONFIG.BASE_URL}/products`, {
            headers: BACKEND_CONFIG.headers,
          }),
          fetch(`${BACKEND_CONFIG.BASE_URL}/categories`, {
            headers: BACKEND_CONFIG.headers,
          }),
        ]);

        if (!productsRes.ok || !categoriasRes.ok) {
          throw new Error("Error al cargar datos");
        }

        const [productsData, categoriasData] = await Promise.all([
          productsRes.json(),
          categoriasRes.json(),
        ]);

        setProductos(productsData);
        setCategorias(categoriasData);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos o categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que querés eliminar este producto?");
    if (!confirm) return;

    try {
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: BACKEND_CONFIG.headers,
      });

      if (!response.ok) throw new Error("Error al eliminar el producto");

      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el producto");
    }
  };

  const handleEdit = (producto) => {
    setEditId(producto.id);
    setEditForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoriaId: producto.categoria?.id || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoriaId: "",
    });
  };

  const handleEditSave = async (id) => {
    try {
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          ...BACKEND_CONFIG.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error("Error al actualizar el producto");

      const updated = await response.json();

      setProductos((prev) =>
        prev.map((prod) => (prod.id === id ? updated : prod))
      );

      setEditId(null);
    } catch (err) {
      alert("Error al actualizar el producto");
      console.error(err);
    }
  };

  const filteredProductos = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Administración de Productos</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando productos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProductos.length > 0 ? (
                filteredProductos.map((prod) => (
                  <tr key={prod.id}>
                    <td className="px-4 py-3 text-sm text-gray-700">{prod.id}</td>

                    {editId === prod.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            name="nombre"
                            value={editForm.nombre}
                            onChange={handleEditChange}
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            name="descripcion"
                            value={editForm.descripcion}
                            onChange={handleEditChange}
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            name="precio"
                            value={editForm.precio}
                            onChange={handleEditChange}
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            name="stock"
                            value={editForm.stock}
                            onChange={handleEditChange}
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            name="categoriaId"
                            value={editForm.categoriaId}
                            onChange={handleEditChange}
                            className="w-full border px-2 py-1 rounded"
                          >
                            <option value="">Seleccione</option>
                            {categorias.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => handleEditSave(prod.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-700">{prod.nombre}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{prod.descripcion}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">${prod.precio}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{prod.stock}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{prod.categoria?.nombre || "-"}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(prod)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Eliminar
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-3 text-center text-sm text-gray-500">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <p className="text-indigo-600 hover:underline">
          + Agregar producto (redirecciona)
        </p>
      </div>
    </div>
  );
};

export default ProductsAdmin;

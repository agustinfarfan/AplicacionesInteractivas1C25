import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_CONFIG } from "../../services/backendApi";

const ProductsAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteProd, setDeleteProd] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/productos`, {
          method: "GET",
          headers: BACKEND_CONFIG.headers,
        });

        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const confirmDelete = async () => {

    const token = localStorage.getItem("token");
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const resp = await fetch(`http://localhost:4002/productos/${deleteProd.id}`, {
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
      console.error("Error en eliminar producto:", error);
      alert("Hubo un error al eliminar. Revisa la consola.");
    } finally {
      setDeleteProd(null);
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
                        onClick={() => navigate(`/admin/products/${prod.id}`)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setDeleteProd(prod)}
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
      )}

      <div className="mt-6">
        <Link to="/admin/products/nuevo" className="text-indigo-600 hover:underline">
          + Agregar producto
        </Link>
      </div>

      {/* Pop-up para eliminar*/}
      {deleteProd && (
        <>
          <div
            onClick={() => setDeleteProd(null)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <p className="text-base text-gray-800 mb-4">
                ¿Seguro que desea eliminar el producto {" "}
                <span className="font-semibold">{deleteProd.nombre}</span>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteProd(null)}
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

export default ProductsAdmin;

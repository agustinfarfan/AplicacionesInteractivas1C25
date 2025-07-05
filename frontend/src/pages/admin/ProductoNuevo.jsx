import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearProductStatus } from "../../redux/productos/productosReducer";
import { getMappedCategories } from "../../services/backendApi";

const ProductoNuevo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, error: reduxError } = useSelector((state) => state.products);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getMappedCategories()
      .then(setCategorias)
      .catch(() => setError("No se pudieron cargar las categorías"));

    // Limpiar estado al montar/desmontar
    return () => {
      dispatch(clearProductStatus());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !stock || !categoriaId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError(""); // Limpiar error local

    dispatch(
      addProduct({
        nombre,
        description: descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        categoriaId: parseInt(categoriaId),
      })
    )
      .unwrap()
      .then(() => {
        // Podés dejarlo un momento en pantalla o redirigir inmediatamente
        setTimeout(() => navigate("/admin/products"), 1500);
      })
      .catch(() => setError("Error al crear el producto"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Crear nuevo producto</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {reduxError && <p className="text-red-600 mb-4">{reduxError}</p>}
      {success && <p className="text-green-600 mb-4">Producto creado correctamente 🎉</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Crear producto
        </button>
      </form>
    </div>
  );
};

export default ProductoNuevo;


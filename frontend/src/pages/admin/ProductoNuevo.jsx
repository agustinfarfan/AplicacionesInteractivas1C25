import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/productos/productosReducer";
import { getCategories } from "../../redux/categories/categoriesReducer";
import { uploadImage } from "../../redux/api/imageApi";
import { FileUp } from "lucide-react";

const ProductoNuevo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);
  const categorias = useSelector((state) => state.category.items);
  const categoriasLoading = useSelector((state) => state.category.loading);
  const categoriasError = useSelector((state) => state.category.error);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (categorias.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categorias.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !stock || !categoriaId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    let url = null;
    if (imagen) {
      url = await uploadImage(imagen, token).catch(() => {
        setError("Error al subir la imagen");
      });
    }

    dispatch(
      addProduct({
        nombre,
        description: descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        categoriaId: parseInt(categoriaId),
        nombreImagen: url
      })
    )
      .unwrap()
      .then(() => navigate("/admin/products"))
      .catch(() => setError("Error al crear el producto"));
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImagen(event.target.files[0]);
      setImagenUrl(url);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Crear nuevo producto</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {categoriasError && <p className="text-red-600 mb-4">{categoriasError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="flex flex-col items-center">
          <label htmlFor="file" className="mt-4 flex w-full gap-2 flex-col text-sm leading-6 items-center text-gray-600">
            {imagenUrl == null ? (
              <div className="flex items-center w-full h-72 rounded-md border-dashed border border-gray-300">
                <FileUp className="mx-auto size-12 stroke-gray-300" aria-hidden="true" />
              </div>
            ) : (
              <img className="max-h-80 w-fit rounded-md" src={imagenUrl} alt="" />
            )}
            <span className="hover:text-black">Subir imagen del producto</span>
            <input
              id="file"
              name="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
              type="file"
              className="sr-only"
            />
          </label>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG hasta 10MB</p>
        </div>

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
          className="w-full p-2 border border-gray-300 rounded text-gray-500"
        >
          <option value="">Seleccionar categoría</option>
          {categoriasLoading ? (
            <option disabled>Cargando...</option>
          ) : (
            categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))
          )}
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

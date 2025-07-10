import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts, removeProduct, editProduct } from "../../redux/productos/productosReducer";
import { getCategories } from "../../redux/categories/categoriesReducer";
import { uploadImage } from "../../redux/api/imageApi";
import { FileUp } from "lucide-react";

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.items || []);
  const productosLoading = useSelector((state) => state.productos.loading);
  const productosError = useSelector((state) => state.productos.error);

  const categorias = useSelector((state) => state.category?.items || []);

  const token = useSelector((state) => state.user.token);

  const [searchTerm, setSearchTerm] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    description: "",
    precio: "",
    stock: "",
    categoriaId: "",
    nombreImagen: ""
  });
  const [imagenUrl, setImagenUrl] = useState(null);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    if (productos.length === 0) dispatch(loadProducts());
    if (categorias.length === 0) dispatch(getCategories());
  }, [dispatch, productos.length, categorias.length]);

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de que querés eliminar este producto?")) return;
    dispatch(removeProduct(id));
  };

  const handleEditClick = (prod) => {
    setEditandoId(prod.id);
    setImagen(null);
    setImagenUrl(null);
    setFormData({
      nombre: prod.nombre,
      description: prod.description,
      precio: prod.precio,
      stock: prod.stock,
      categoriaId: prod.category?.id || "",
      nombreImagen: prod.nombreImagen || ""
    });

    if (prod.nombreImagen) {
      setImagenUrl(`http://localhost:4002/images/${prod.nombreImagen}`);
    } else {
      setImagenUrl(null);
    }
  };

  const handleUpdate = async (id) => {
    try {
      let url = formData.nombreImagen;

      if (imagen) {
        url = await uploadImage(imagen, token).catch(() => {
          alert("Error al subir la imagen");
        });
      }

      await dispatch(
        editProduct({
          id,
          nombre: formData.nombre,
          description: formData.description,
          precio: parseFloat(formData.precio),
          stock: parseInt(formData.stock),
          categoriaId: parseInt(formData.categoriaId),
          nombreImagen: url
        })
      ).unwrap();

      setEditandoId(null);
      dispatch(loadProducts());
    } catch (err) {
      alert("Error al actualizar el producto");
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImagenUrl(url);
      setImagen(event.target.files[0]);
    }
  };

  const filteredProductos = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
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

      {productosLoading ? (
        <p className="text-gray-500">Cargando productos...</p>
      ) : productosError ? (
        <p className="text-red-500">{productosError}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProductos.length > 0 ? (
                filteredProductos.map((prod) => (
                  <tr key={prod.id}>
                    <td className="px-6 py-4 text-sm text-gray-700">{prod.id}</td>
                    {editandoId === prod.id ? (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <label htmlFor="file" className="flex flex-col items-center text-gray-600 gap-2">
                            {imagenUrl == null ? (
                              <div className="flex items-center size-32 rounded-md border-dashed border border-gray-300">
                                <FileUp className="mx-auto size-12 stroke-gray-300" aria-hidden="true" />
                              </div>
                            ) : (
                              <img className="size-32 max-h-20 w-fit rounded-md" src={imagenUrl} alt="" />
                            )}
                            <span className="hover:text-black">Subir imagen del producto</span>
                            <input id="file" name="file" accept="image/jpeg,image/png" onChange={handleImageChange} type="file" className="sr-only" />
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <input className="border p-1 w-full rounded-sm" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                        </td>
                        <td className="px-6 py-4">
                          <input className="border p-1 w-full rounded-sm" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </td>
                        <td className="px-6 py-4">
                          <input type="number" className="border p-1 w-full rounded-sm" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })} />
                        </td>
                        <td className="px-6 py-4">
                          <input type="number" className="border p-1 w-full rounded-sm" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            className="border p-1 w-full rounded-sm"
                            value={formData.categoriaId}
                            onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                          >
                            <option value="">Seleccionar</option>
                            {categorias.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleUpdate(prod.id)} className="bg-green-600 text-white px-2 py-1 rounded mr-2">
                            Guardar
                          </button>
                          <button onClick={() => setEditandoId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3">
                          <img className="size-32 max-h-20 max-w-20 w-full object-cover rounded-md" src={`http://localhost:4002/images/${prod.nombreImagen}`} alt="imagen" />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{prod.nombre}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{prod.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">${prod.precio}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{prod.stock}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{prod.category?.name || "Sin categoría"}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <button onClick={() => handleEditClick(prod)} className="bg-blue-600 text-white px-2 py-1 rounded mr-2">
                            Editar
                          </button>
                          <button onClick={() => handleDelete(prod.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                            Eliminar
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
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
    </div>
  );
};

export default ProductsAdmin;

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductList from '../../components/ProductList';
import { getProductsByCategory } from '../../redux/categoria/categoryProductsReducer';


const CategoryProducts = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName || 'Categoría';

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.categoryProducts);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  const filteredProducts = products.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(getProductsByCategory(categoryId))}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-500">
              Pronto agregaremos más productos a esta categoría.
            </p>
          </div>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

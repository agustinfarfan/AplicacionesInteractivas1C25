import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchProducts } from '../../services/backendApi'; 
import ProductList from '../../components/ProductList'; 

const CategoryProducts = () => {
    const { categoryId } = useParams();
    const location = useLocation();
    const categoryName = location.state?.categoryName || 'Categoría';
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const allProducts = await fetchProducts();
                // Filtrar productos por categoría
                const categoryProducts = allProducts.filter(product => 
                    product.categoryId === parseInt(categoryId) || 
                    product.category_id === parseInt(categoryId) ||
                    product.categoria_id === parseInt(categoryId)
                );
                setProducts(categoryProducts);
            } catch (err) {
                console.error('Error al cargar productos:', err);
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            loadProducts();
        }
    }, [categoryId]);

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
                        onClick={() => window.location.reload()}
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {categoryName}
                    </h1>
                    <p className="text-gray-600">
                        {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No hay productos en esta categoría
                        </h3>
                        <p className="text-gray-500">
                            Pronto agregaremos más productos a esta categoría.
                        </p>
                    </div>
                ) : (
                    <ProductList products={products} />
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;
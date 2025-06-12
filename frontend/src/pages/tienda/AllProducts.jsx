import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchCategories, fetchProducts, fetchProductsByCategory } from '../../services/backendApi';
import ProductList from '../../components/ProductList';

const AllProducts = () => {
    
    const navigate = useNavigate();
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);


    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const allProducts = await fetchProducts();
                setProducts(allProducts);
            } catch (err) {
                console.error('Error al cargar productos:', err);
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        const loadCategories = async () => {
            try {
                setLoadingCategories(true);
                const categoriesData = await fetchCategories();
                console.log(categoriesData.content);

                setCategories(categoriesData.content);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        loadProducts();
        loadCategories();

    }, []);

    const filteredProducts = products.filter((cat) =>
        cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Productos
                    </h1>
                    <p className="text-gray-600">
                        {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Categorías</h2>
                    <div className="flex overflow-x-auto gap-4 pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className="min-w-[180px] bg-white border border-indigo-200 rounded-lg shadow hover:bg-indigo-50 transition flex-shrink-0 px-6 py-4 text-left"
                                onClick={() => {
                                    navigate(`/categoria/${cat.id}`)
                                }}
                            >
                                <div className="font-bold text-indigo-700">{cat.name}</div>
                                {cat.description && (
                                    <div className="text-gray-500 text-sm mt-1">{cat.description}</div>
                                )}
                            </button>
                        ))}
                    </div>
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
                    <ProductList products={filteredProducts} />
                )}
            </div>
        </div>
    );
};

export default AllProducts;
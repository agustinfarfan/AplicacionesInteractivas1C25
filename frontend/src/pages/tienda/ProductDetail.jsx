import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { addProductoToCart } from '../../services/carritoService';
import { useAuth } from '../../context/AuthContext';
import { isLoggedIn } from '../../utils/auth';

const ProductDetail = () => {
    const { productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth(); // Asumiendo que tienes el usuario en el contexto
    
    const [product, setProduct] = useState(location.state?.product || null);
    const [cantidad, setCantidad] = useState(1);
    const [loading, setLoading] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const [message, setMessage] = useState('');

    // Si no tenemos el producto en el state, podrías hacer fetch aquí
    useEffect(() => {
        if (!product && productId) {
            fetchProductById(productId).then(setProduct);
        }
    }, [product, productId]);

    const handleAddToCart = async () => {
        // Verificar si el usuario está logueado
        if (!isLoggedIn()) {
            setMessage('Debes iniciar sesión para agregar productos al carrito');
            setTimeout(() => {
                navigate('/auth/login');
            }, 2000);
            return;
        }

        // Verificar si tenemos el userId
        const userId = user?.id || localStorage.getItem('userId');
        if (!userId) {
            setMessage('Error: No se encontró información del usuario');
            return;
        }

        try {
            setAddingToCart(true);
            await addProductoToCart({
                userId: userId,
                productoId: product.id,
                cantidad: cantidad
            });
            
            setMessage('Producto agregado al carrito exitosamente!');
            
            // Opcional: limpiar el mensaje después de unos segundos
            setTimeout(() => {
                setMessage('');
            }, 3000);
            
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            setMessage('Error al agregar el producto al carrito');
            
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } finally {
            setAddingToCart(false);
        }
    };

    const incrementCantidad = () => {
        setCantidad(prev => prev + 1);
    };

    const decrementCantidad = () => {
        setCantidad(prev => prev > 1 ? prev - 1 : 1);
    };

    if (!product) {
        return (
            <div className="min-h-screen pt-16 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Producto no encontrado</p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <button
                                onClick={() => navigate('/')}
                                className="text-gray-700 hover:text-indigo-600"
                            >
                                Inicio
                            </button>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="ml-1 text-gray-700 hover:text-indigo-600 md:ml-2"
                                >
                                    Productos
                                </button>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-500 md:ml-2">
                                    {product.name || product.nombre}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Mensaje de estado */}
                {message && (
                    <div className={`mb-6 p-4 rounded-md ${message.includes('Error') || message.includes('Debes') 
                        ? 'bg-red-50 text-red-800 border border-red-200' 
                        : 'bg-green-50 text-green-800 border border-green-200'
                    }`}>
                        {message}
                    </div>
                )}

                {/* Contenido principal */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Imagen del producto */}
                        <div className="md:w-1/2">
                            <img
                                className="w-full h-96 md:h-full object-cover"
                                src={product.image || product.imagen || '/placeholder-product.jpg'}
                                alt={product.name || product.nombre}
                                onError={(e) => {
                                    e.target.src = '/placeholder-product.jpg';
                                }}
                            />
                        </div>

                        {/* Información del producto */}
                        <div className="md:w-1/2 p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name || product.nombre}
                            </h1>
                            
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-indigo-600">
                                    ${product.price || product.precio}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Descripción
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description || product.descripcion || 'No hay descripción disponible.'}
                                </p>
                            </div>

                            {/* Stock info */}
                            {(product.stock || product.stock === 0) && (
                                <div className="mb-6">
                                    <span className={`text-sm font-medium ${
                                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
                                    </span>
                                </div>
                            )}

                            {/* Selector de cantidad */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cantidad
                                </label>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={decrementCantidad}
                                        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-50"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span className="text-xl font-semibold w-8 text-center">
                                        {cantidad}
                                    </span>
                                    <button
                                        onClick={incrementCantidad}
                                        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-50"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Botón agregar al carrito */}
                            <button
                                onClick={handleAddToCart}
                                disabled={addingToCart || (product.stock === 0)}
                                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                                    addingToCart || (product.stock === 0)
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                {addingToCart ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Agregando...
                                    </div>
                                ) : product.stock === 0 ? (
                                    'Sin stock'
                                ) : (
                                    'Agregar al carrito'
                                )}
                            </button>

                            {/* Botón secundario */}
                            <button
                                onClick={() => navigate('/carrito')}
                                className="w-full mt-3 py-3 px-6 rounded-lg font-semibold text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors"
                            >
                                Ver carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
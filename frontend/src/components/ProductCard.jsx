import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/producto/${product.id}`, { 
            state: { product } 
        });
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleProductClick}
        >
            <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                    className="w-full h-48 object-cover"
                    src={product.image || product.imagen || '/placeholder-product.jpg'}
                    alt={product.name || product.nombre}
                    onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                    }}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name || product.nombre}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {product.description || product.descripcion}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">
                        ${product.price || product.precio}
                    </span>
                    <button 
                        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que se dispare el click del card
                            handleProductClick();
                        }}
                    >
                        Ver producto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

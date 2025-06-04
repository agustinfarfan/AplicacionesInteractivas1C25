import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList';

const CategoriaPage = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/publicacion/categoria/${id}`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error('Error cargando productos:', err));
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos de esta categoría</h1>
      <ProductList productos={productos} />
    </div>
  );
};

export default CategoriaPage;
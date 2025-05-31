
import useFetch from '../../hooks/useFetch'
import { fetchProducts } from '../../services/backendApi';

const Carrito = () => {

  const { data, loading, error } = useFetch(() => fetchProducts());

  console.log('Carrito data:', data);
  console.log(loading);
  console.log(error);
  

  return (
    <>
      <p>Carrito</p>
      <p>{JSON.stringify(data)}</p>

    </>
  )
}

export default Carrito
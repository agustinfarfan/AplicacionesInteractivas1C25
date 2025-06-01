import Button from '../../components/buttons/Button';
import useFetch from '../../hooks/useFetch'
import { fetchProducts } from '../../services/backendApi';
import { fetchCart } from '../../services/carritoService';

const Carrito = () => {

  const { data, loading, error } = useFetch(() => fetchCart({ id: 3 }));

  console.log(data);
  

  const productoMock = [
    {
      id: 1,
      name: 'Producto de ejemplo',
      description: 'Descripción del producto de ejemplo',
      price: 100.00
    },
    {
      id: 2,
      name: 'Auriculares Bluetooth',
      description: 'Auriculares inalámbricos con cancelación de ruido.',
      price: 250.00
    },
    {
      id: 3,
      name: 'Teclado Mecánico',
      description: 'Teclado mecánico retroiluminado RGB.',
      price: 180.00
    },
    {
      id: 4,
      name: 'Mouse Gamer',
      description: 'Mouse óptico de alta precisión para gaming.',
      price: 90.00
    },
    {
      id: 5,
      name: 'Monitor 24"',
      description: 'Monitor LED Full HD de 24 pulgadas.',
      price: 320.00
    }
  ];

  return (
    <>
      <div className='max-w-7xl mx-4 md:mx-auto mt-10'>
        <h1 className='text-3xl font-bold mb-5'>Carrito</h1>
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='md:w-2/3 w-full shadow-md rounded-md border-gray-100 border-2 p-4'>
            {false && <p>Cargando...</p>}
            {false && <p>Error al cargar los productos</p>}
            {productoMock && productoMock.map(product => (
              <div key={product.id} className='border border-gray-200  mb-4 rounded-md flex h-32 flex-row items-center justify-between'>
                <div className='flex flex-row items-center p-4'>
                  <image src='https://via.placeholder.com/150?text=Hello' alt={product.name} className='w-24 h-24 w-min-24 border border-gray-300 object-cover mr-4 rounded-md' />
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold'>{product.name}</h2>
                    <p>{product.description}</p>
                    <p className='text-lg font-bold'>${product.price}</p>
                  </div>
                </div>
                <div className='flex flex-col items-end justify-between h-full'>
                  <button className='pt-1 text-gray-300 hover:text-gray-500 rounded-full w-8 h-8 flex items-center justify-center font-bold'>X</button>
                  <div className='flex flex-row items-end justify-between h-full w-40 gap-2 p-2'>
                    <button className='bg-indigo-600 text-white rounded-full w-full font-bold pb-1'>+</button>
                    <input className='w-16 text-center border border-gray-300 rounded-md' defaultValue={1} min={1} />
                    <button className='bg-indigo-600 text-white rounded-full w-full font-bold pb-1'>-</button>
                  </div>
                </div>

              </div>
            ))}
          </div>
          <div className='md:w-1/3 w-full h-80 shadow-md border-gray-100 p-4 border-2 rounded-md justify-between flex flex-col'>
            <h2 className='text-2xl font-bold mb-5'>Resumen del pedido</h2>
            <div className='flex flex-col gap-2 justify-between h-full pb-10'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row justify-between'>
                  <p className='text-lg font-medium'>Subtotal: </p>
                  <p className='text-lg font-medium'>$0.00</p>
                </div>
                <div className='flex flex-row justify-between'>
                  <p className='text-lg font-medium'>Envío: </p>
                  <p className='text-lg font-medium'>$0.00</p>
                </div>
                <div className='flex flex-row justify-between'>
                  <p className='text-lg font-medium'>Impuestos: </p>
                  <p className='text-lg font-medium'>$0.00</p>
                </div>
              </div>
              <div className='flex flex-row justify-between border-t-2 border-zinc-200 pt-3'>
                <p className='text-lg font-medium '>Total: </p>
                <p className='text-lg font-medium'>$0.00</p>
              </div>
            </div>
            <div className=''>
              <Button nombre={"Proceder al Checkout"}/>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Carrito
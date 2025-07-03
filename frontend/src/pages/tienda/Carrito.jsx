import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import Loading from '../../components/Loading';
import Resumen from '../../components/Resumen';
import NoResourceMessage from '../../components/NoResourceMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addCouponToCart, addProductoToCart, removeProductoFromCart } from '../../redux/carrito/carritoReducer';
import { useState } from 'react';

const Carrito = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { carrito, loading, error, isEmpty } = useSelector((state) => state.carrito);
  const { data: userData } = useSelector((state) => state.user);

  const [coupon, setCoupon] = useState("");


  const handleAgregarProducto = (productoId) => {
    dispatch(addProductoToCart({
      id: userData.user_id,
      productoId: productoId,
      cantidad: 1
    }))
  }

  const handleDecrementarProducto = (productoId) => {
    dispatch(removeProductoFromCart({
      id: userData.user_id,
      productoId: productoId,
      cantidad: 1
    }))
  }

  const handleEliminarProducto = (productoId, cantidadActual) => {
    dispatch(removeProductoFromCart({
      id: userData.user_id,
      productoId: productoId,
      cantidad: cantidadActual
    }))
  }

  const handleAgregarCupon = () => {
    dispatch(addCouponToCart({
      id: userData.user_id,
      nombre: coupon
    }))
  }

  const handleIngresarCheckout = (e) => {

    // Aca se valida si es posible ingresar al checkout

    navigate("checkout");
  }

  return loading ? (
    <>
      <div className='flex h-screen w-full justify-center items-center'>
        <Loading />
      </div>
    </>
  ) : error ? (
    <>
      <div className='flex h-full w-full justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold mb-5'>Error al cargar los productos</h1>
        <p>{JSON.stringify(error)}</p>
      </div>
    </>
  ) : isEmpty ? (
    <NoResourceMessage texto={"No hay productos en el carrito"} />
  ) : (
    <>
      <div className='max-w-7xl mx-4 md:mx-auto mt-10'>
        <h1 className='text-3xl font-bold mb-5'>Carrito</h1>
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='flex flex-col gap-3 md:w-2/3 w-full'>
            <div className='w-full h-full rounded-lg shadow-lg bg-white border-gray-100 border-2 p-4 overflow-y-auto max-h-[500px] no-scrollbar'>

              {
                carrito.carritoDetalle.map(product => (
                  <div key={product.producto_id} className='border rounded-lg shadow-lg bg-white border-gray-200 mb-4 flex h-32 flex-row items-center justify-between'>
                    <div className='flex flex-row items-center p-4 h-full'>
                      <img onClick={() => navigate(`/producto/${product.producto_id}`)} src='https://via.placeholder.com/150?text=Hello' alt={product.nombre_producto} className='w-24 h-24 w-min-24 border border-gray-300 object-cover mr-4 rounded-md' />
                      <div className='flex flex-col gap-2 h-full'>
                        <h2 className='md:text-xl font-semibold'>{product.nombre_producto}</h2>
                        <p className='hidden md:block'>{product.descripcion}</p>
                        <p className='md:text-lg font-bold'>${product.precio_unitario}</p>
                      </div>
                    </div>
                    <div className='flex flex-col items-end justify-between h-full'>
                      <button onClick={() => handleEliminarProducto(product.producto_id, product.cantidad)} className='pt-1 text-gray-300 hover:text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold'>X</button>
                      <div className='flex flex-row items-end justify-between h-full p-2'>
                        <button
                          onClick={() => handleAgregarProducto(product.producto_id)}
                          className="flex items-center justify-center size-5 md:size-7 rounded-full border border-gray-300 hover:bg-gray-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <span className="md:text-xl font-semibold w-8 text-center">
                          {product.cantidad}
                        </span>
                        <button
                          onClick={() => handleDecrementarProducto(product.producto_id)}
                          className="flex items-center justify-center size-5 md:size-7 rounded-full border border-gray-300 hover:bg-gray-50"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>

                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
            <div className='rounded-lg shadow-lg bg-white border-gray-100 border-2 p-4'>
              <div className="flex flex-col ">
                <label className="block text-gray-800 font-bold mb-2" htmlFor="name">
                  Cupón de descuento
                </label>
                <div className='flex flex-row gap-2 w-1/2'>
                  <input disabled={carrito.descuento > 0} value={coupon} onChange={(e) => setCoupon(e.target.value)} className="appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cupon" type="text" placeholder="Cupón" />

                  <button onClick={handleAgregarCupon} disabled={coupon === "" || carrito.descuento > 0} className="w-full disabled:bg-indigo-300 bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Agregar
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className='md:w-1/3 w-full min-h-[24rem] max-h-[26rem] rounded-lg shadow-lg bg-white border-gray-100 p-4 border-2 justify-between flex flex-col'>
            <Resumen data={carrito} />
            <div className='mt-5'>
              <Button onClick={handleIngresarCheckout} nombre={"Proceder al Checkout"} />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Carrito
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchPedidoById } from '../../services/pedidosService';
import Loading from '../../components/Loading';
import EstadoPedido from '../../components/EstadoPedido';

const Pedido = () => {
  const { id } = useParams();
  const { user, loadingUser } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingUser && user) {
      fetchPedidoById({ id })
        .then((data) => {
          console.log(data);

          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [user, loadingUser, id]);

  if (loading) {
    return (
      <div className='flex h-screen w-full justify-center items-center'>
        <Loading />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='flex h-full w-full justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold mb-5'>Error al cargar el pedido</h1>
        <p>{JSON.stringify(error)}</p>
        <Link to="/pedidos" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Volver a pedidos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
        <h1 className="text-3xl font-bold">Detalle del Pedido #{data.orderId}</h1>
        <EstadoPedido estado={data.estado} />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <p className="text-gray-700"><span className="font-semibold">Fecha:</span> {new Date(data.createdAt).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-gray-700"><span className="font-semibold">Cliente:</span> {data.nombre} {data.apellido}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {data.email}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Envío</h2>
        <p className="text-gray-700"><span className="font-semibold">Método:</span> {data.metodoDeEnvio}</p>
        <p className="text-gray-700"><span className="font-semibold">Dirección:</span> {data.direccion}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Productos</h2>
        <table className="min-w-full divide-y divide-gray-300 mb-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Cantidad</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {data.detalleOrder.map((prod) => (
              <tr key={prod.producto_id}>
                <td className="px-4 py-2">{prod.nombre_producto}</td>
                <td className="px-4 py-2">{prod.descripcion}</td>
                <td className="px-4 py-2 text-center">{prod.cantidad}</td>
                <td className="px-4 py-2 text-right">${prod.subtotal.toLocaleString('es-AR')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.cupon && (
          <div className="mt-4 p-4 bg-indigo-50 rounded border border-indigo-200">
            <h3 className="font-semibold text-indigo-700 mb-1">
              Cupón aplicado: <span className="font-bold">{data.cupon.nombre}</span>
            </h3>
            <p className="text-sm text-gray-700">
              Tipo: {data.cupon.tipoDescuento === "PORCENTUAL" ? "Porcentual" : "Fijo"}<br />
              Descuento: {data.cupon.tipoDescuento === "PORCENTUAL"
                ? `${data.cupon.descuento}%`
                : `$${Number(data.cupon.descuento).toFixed(2)}`}
            </p>

            <p className="mt-2 text-md font-medium text-indigo-900">
              Valor descontado: $
              {(() => {
                const subtotal = data.detalleOrder.reduce((acc, prod) => acc + prod.subtotal, 0);
                if (data.cupon.tipoDescuento === "PORCENTUAL") {
                  return (subtotal * (data.cupon.descuento / 100)).toFixed(2);
                } else {
                  return Number(data.cupon.descuento).toFixed(2);
                }
              })()}
            </p>
          </div>
        )}

      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-neutral-300 pt-4">
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Pagado con tarjeta terminada en:</span> {data.ultimosCuatroDigitos}
          </p>
        </div>
        <div>
          <span className="text-xl font-bold text-indigo-700 px-3">Total: ${data.total.toLocaleString('es-AR')}</span>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link to="/pedidos" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Volver a pedidos</Link>
        {/* <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancelar</button> */}
      </div>
    </div>
  );
};

export default Pedido;
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import EstadoPedido from '../../components/EstadoPedido';
import { fetchPedido } from '../../redux/pedidos/pedidoReducer';
import { useDispatch, useSelector } from 'react-redux';

const PedidoAdmin = () => {
    const { id } = useParams();
    console.log(id);
    

    const [data, setData] = useState(null);

    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.user);
    const { pedidoSeleccionado, loading, error } = useSelector((state) => state.pedido);

    useEffect(() => {
        dispatch(fetchPedido({token: token, id: id}));
  }, []);

    if (loading) {
        return (
            <div className='flex h-screen w-full justify-center items-center'>
                <Loading />
            </div>
        );
    }

    if (error && !pedidoSeleccionado) {
        return (
            <div className='flex h-full w-full justify-center items-center flex-col'>
                <h1 className='text-3xl font-bold mb-5'>Error al cargar el pedido</h1>
                <p>{JSON.stringify(error)}</p>
                <Link to="/pedidos" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Volver a pedidos</Link>
            </div>
        );
    }

    return pedidoSeleccionado && (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
            <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
                <h1 className="text-3xl font-bold">Detalle del Pedido #{pedidoSeleccionado.orderId}</h1>
                <EstadoPedido estado={pedidoSeleccionado.estado} />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div>
                    <p className="text-gray-700"><span className="font-semibold">Fecha:</span> {new Date(pedidoSeleccionado.createdAt).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-gray-700"><span className="font-semibold">Cliente:</span> {pedidoSeleccionado.nombre} {pedidoSeleccionado.apellido}</p>
                    <p className="text-gray-700"><span className="font-semibold">Email:</span> {pedidoSeleccionado.email}</p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Envío</h2>
                <p className="text-gray-700"><span className="font-semibold">Método:</span> {pedidoSeleccionado.metodoDeEnvio}</p>
                <p className="text-gray-700"><span className="font-semibold">Dirección:</span> {pedidoSeleccionado.direccion}</p>
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
                        {pedidoSeleccionado.detalleOrder.map((prod) => (
                            <tr key={prod.producto_id}>
                                <td className="px-4 py-2">{prod.nombre_producto}</td>
                                <td className="px-4 py-2">{prod.descripcion}</td>
                                <td className="px-4 py-2 text-center">{prod.cantidad}</td>
                                <td className="px-4 py-2 text-right">${prod.subtotal.toLocaleString('es-AR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-neutral-300 pt-4">
                <div>
                    <p className="text-gray-700">
                        <span className="font-semibold">Pagado con tarjeta terminada en:</span> {pedidoSeleccionado.ultimosCuatroDigitos}
                    </p>
                </div>
                <div>
                    <span className="text-xl font-bold text-indigo-700 px-3">Total: ${pedidoSeleccionado.total.toLocaleString('es-AR')}</span>
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <Link to="/admin/pedidos" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Volver a pedidos</Link>
                {/* <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancelar</button> */}
            </div>
        </div>
    );
};

export default PedidoAdmin;
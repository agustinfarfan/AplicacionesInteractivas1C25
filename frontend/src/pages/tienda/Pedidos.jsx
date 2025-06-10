import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { fetchPedidosByUserId } from '../../services/pedidosService';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import EstadoPedido from '../../components/EstadoPedido';
import NoResourceMessage from '../../components/NoResourceMessage';

const Pedidos = () => {

  const { user, loadingUser } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingUser && user) {
      fetchPedidosByUserId({ id: user.user_id })
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

  }, [user, loadingUser])

  // const productos = [
  //     { id: 1, nombre: "Guantes de Látex", descripcion: "Caja de 100 unidades", precio: 1500 },
  //     { id: 2, nombre: "Reactivo Hematológico", descripcion: "Botella de 500ml", precio: 3200 },
  //     { id: 3, nombre: "Centrífuga de Laboratorio", descripcion: "Velocidad ajustable", precio: 75000 },
  //     { id: 4, nombre: "Microscopio Óptico", descripcion: "Con luz LED", precio: 54000 },
  //     { id: 5, nombre: "Kit Serológico", descripcion: "Pruebas rápidas para laboratorio", precio: 12000 },
  // ];

  // const [searchTerm, setSearchTerm] = useState("");

  // const filteredProductos = data.filter(pedido =>
  //     pedido.detalleOrder.filter(producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()))
  // );


  return (
    <div className='max-w-7xl mx-4 md:mx-auto mt-10'>
      <h1 className=' font-bold text-4xl mb-10'>Mis Pedidos</h1>
      {
        loading ? (
          <>
            <div className='flex h-screen w-full justify-center items-center'>
              <Loading />
            </div>
          </>
        ) : error ? (
          <>
            <div className='flex h-full w-full justify-center items-center flex-col'>
              <h1 className='text-3xl font-bold mb-5'>Error al cargar los pedidos</h1>
              <p>{JSON.stringify(error)}</p>
            </div>
          </>
        ) : data && data.length === 0 ? (
          <NoResourceMessage texto={"No tienes pedidos"} />
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orden ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Productos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  [...data]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
                    .map((pedido, idx) => (
                      <tr key={pedido.orderId} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                        <td className="px-6 py-4 text-sm text-gray-700">{pedido.orderId}</td>
                        <td className="px-6 py-4 text-sm">
                          <EstadoPedido estado={pedido.estado} />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(pedido.createdAt).toLocaleString('es-AR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700">
                          {
                            pedido.detalleOrder.map((producto, idx) => (
                              <p>{producto.nombre_producto}</p>
                            ))
                          }
                        </td>


                        <td className="px-6 py-4 text-sm text-gray-700">${pedido.total}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => navigate(`/pedidos/${pedido.orderId}`)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                      No se encontraron productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      }


    </div>
  )
}

export default Pedidos
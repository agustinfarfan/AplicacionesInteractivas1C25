import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchAllPedidos, fetchPedidosByUserId } from '../../services/pedidosService';
import Loading from '../../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import EstadoPedido from '../../components/EstadoPedido';
import NoResourceMessage from '../../components/NoResourceMessage';

function groupOrders(data, mode) {
  const map = {};
  const now = new Date();
  data.forEach(pedido => {
    const date = new Date(pedido.createdAt);
    let key;
    if (mode === "hora") {
      if (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      ) {
        key = date.getHours().toString().padStart(2, '0') + ":00";
        map[key] = (map[key] || 0) + 1;
      }
    } else if (mode === "dia") {
      key = date.toLocaleDateString('es-AR');
      map[key] = (map[key] || 0) + 1;
    } else if (mode === "mes") {
      key = date.toLocaleString('es-AR', { month: '2-digit', year: 'numeric' });
      map[key] = (map[key] || 0) + 1;
    }
  });
  // Ordenar por clave (fecha/hora/mes)
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => ({ name, count }));
}


function PedidosAdmin() {
  const { user, loadingUser } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [groupBy, setGroupBy] = useState("hora");
  const chartData = useMemo(() => data ? groupOrders(data, groupBy) : [], [data, groupBy]);

  useEffect(() => {
    if (!loadingUser && user) {
      fetchAllPedidos()
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


  return (
    <div className='max-w-7xl mx-4 md:mx-auto mt-10'>
      <h1 className=' font-bold text-4xl mb-10'>Pedidos</h1>

      <div className="mb-8">
        <label className="mr-2 font-medium">Ver gráfico por:</label>
        <select
          value={groupBy}
          onChange={e => setGroupBy(e.target.value)}
          className="appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 hover:bg-gray- leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="hora">Hora</option>
          <option value="dia">Día</option>
          <option value="mes">Mes</option>
        </select>
        <div className="w-full h-84 mt-5 p-5 bg-white rounded shadow flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#6366f1" name="Pedidos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


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
          <div className="overflow-x-auto overflow-y-auto h-fit max-h-screen bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orden ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comprador</th>

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
                            pedido.nombre + ' ' + pedido.apellido
                          }
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
                          <Link
                            to={`${pedido.orderId}`}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Ver
                          </Link>
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

export default PedidosAdmin
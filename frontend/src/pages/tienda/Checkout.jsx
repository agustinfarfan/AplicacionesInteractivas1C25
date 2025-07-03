import { useEffect, useState } from 'react'
import Button from '../../components/buttons/Button'
import { Navigate, useNavigate } from 'react-router-dom'
import Resumen from '../../components/Resumen';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarrito, finalizeCart } from '../../redux/carrito/carritoReducer';

const Checkout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { carrito, loading, error, isEmpty } = useSelector((state) => state.carrito);
  const { data: userData } = useSelector((state) => state.user);

  const [resumenActivo, setResumenActivo] = useState(true);

  const [addresses, setAddresses] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [envioActivo, setEnvio] = useState("Envio");
  const [tarjeta, setTarjeta] = useState('');
  const [expirationDate, setexpirationDate] = useState('');
  const [CVV, setCVV] = useState('')
  const [pasoActivo, setPaso] = useState(1);

  useEffect(() => {
    if (!loading && userData) {
      setAddresses(userData.direcciones);
      setNombre(userData.first_name);
      setApellido(userData.last_name);
      setEmail(userData.email);
    }

  }, [userData])
  

  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    setexpirationDate(value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16); // Solo 16 dígitos
    value = value.replace(/(.{4})/g, '$1 ').trim(); // Agrupa en bloques de 4
    setTarjeta(value);
  }

  // Funciones de validación por paso
  const validarPaso1 = () => {
    if (!nombre.trim() || !apellido.trim() || !email.trim()) {
      alert("Por favor complete nombre, apellido y email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Ingrese un email válido.");
      return false;
    }
    return true;
  };

  const validarPaso2 = () => {
    if (!envioActivo) {
      alert("Seleccione un método de envío.");
      return false;
    }
    if (!direccion) {
      alert("Seleccione una dirección");
      return false;
    }

    return true;
  };

  const handleCheckoutFormulario = async (e) => {
    e.preventDefault();


    if (pasoActivo === 1 && !validarPaso1()) return;
    if (pasoActivo === 2 && !validarPaso2()) return;

    // Paso 3: Validar datos de pago
    if (pasoActivo === 3) {
      if (!tarjeta.trim() || !expirationDate.trim() || !CVV.trim()) {
        alert("Por favor complete todos los datos de la tarjeta.");
        return;
      }
      // Validación básica de tarjeta y CVV
      if (!/^\d{16}$/.test(tarjeta.replace(/\s/g, ""))) {
        alert("Ingrese un número de tarjeta válido (16 dígitos).");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
        alert("Ingrese una fecha de expiración válida (MM/YY).");
        return;
      }
      if (!/^\d{3,4}$/.test(CVV)) {
        alert("Ingrese un CVV válido (3 o 4 dígitos).");
        return;
      }

      const informacion = {
        nombre: nombre,
        apellido: apellido,
        metodoDeEnvio: envioActivo,
        direccion: direccion,
        ultimosCuatroDigitos: tarjeta.replace(/\s/g, '').slice(-4),
        email: email
      }

      try {
        await dispatch(finalizeCart({ id: userData.user_id, info: informacion })).unwrap();
        dispatch(fetchCarrito({ id: userData.user_id }));
        navigate("success");
      } catch (err) {
        console.error("Payment failed:", err);
        navigate("failure");
      }
    }
  }

  const pasos = [
    {
      titulo: "Inforamción Personal"
    },
    {
      titulo: "Metodo de Envío"
    },
    {
      titulo: "Metodo de Pago"
    },
  ];

  const metodosDeEnvio = [
    {
      nombre: "Envio a Domicilo",
      descripcion: "Entrega estándar a domicilio en 3 a 5 días hábiles en todo el país."
    },
    {
      nombre: "Express",
      descripcion: "Entrega rápida en 24 a 48 horas en zonas habilitadas. Ideal para pedidos urgentes."
    }
  ]

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
    <Navigate to={"/carrito"} />
  ) : (
    <>
      <div className='max-w-7xl mx-4 md:mx-auto mt-10'>
        <h1 className='text-3xl font-bold mb-5'>Checkout</h1>

        <div className='flex flex-col-reverse md:flex-row gap-3'>
                <div className='md:w-2/3 w-full rounded-lg shadow-lg bg-white border-gray-100 border-2 p-4'>

            {/* Pasos */}
            <div className="mb-10">
              <nav aria-label="Progress">
                <ol role="list" className="space-y-4 flex md:space-x-8 md:space-y-0">
                  {
                    pasos.map((paso, index) => (
                      <li key={index} className="flex-1">
                        <div
                          className={
                            "group cursor-pointer flex flex-col py-2 pl-4 md:pb-0 md:pl-0 md:pt-4 " +
                            (pasoActivo === index + 1
                              ? "border-indigo-600 border-t-4"
                              : "border-gray-200 hover:border-gray-300 border-t-4")
                          }
                          aria-current={pasoActivo === index + 1 ? "step" : undefined}
                          onClick={() => setPaso(index + 1)}
                        >
                          <span
                            className={
                              "text-sm font-medium " +
                              (pasoActivo === index + 1
                                ? "text-indigo-600"
                                : "text-gray-500 group-hover:text-gray-700")
                            }
                          >
                            Step {index + 1}
                          </span>
                          <span className={
                            "text-sm font-medium " +
                            (pasoActivo === index + 1
                              ? "text-black"
                              : "text-gray-500 group-hover:text-gray-700")
                          }
                          >{paso.titulo}</span>
                        </div>
                      </li>
                    ))
                  }
                </ol>
              </nav>
            </div>

            <p className="mt-4 text-gray-600">Por favor, rellene el formulario para poder completar su compra.</p>
            <form onSubmit={handleCheckoutFormulario} className="mt-6">

              {pasoActivo === 1 && (
                <>
                  <div className='flex flex-row gap-3 mb-6'>
                    <div className="flex-1/2">
                      <label className="block text-gray-800 font-bold mb-2" htmlFor="name">
                        Nombre
                      </label>
                      <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John" />
                    </div>
                    <div className=" flex-1/2">
                      <label className="block text-gray-800 font-bold mb-2" htmlFor="name">
                        Apellido
                      </label>
                      <input value={apellido} onChange={(e) => setApellido(e.target.value)} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-800 font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="johndoe@example.com" />
                  </div>

                  <div className='flex w-full justify-end mt-12'>
                    <div className='w-1/3'>
                      <Button nombre={"Siguiente"} onClick={(e) => {
                        e.preventDefault();
                        if (validarPaso1()) setPaso(2);
                      }} />
                    </div>
                  </div>
                </>
              )}

              {pasoActivo === 2 && (
                <>

                  <div className="mb-6">
                    <label className="block text-gray-800 font-bold mb-2" htmlFor="direccion">
                      Dirección
                    </label>
                    <select
                      id="direccion"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Seleccione una dirección</option>

                      {addresses.length === 0 ? (
                        <option value="">No hay direcciones asociadas</option>
                      ) : (
                        addresses.map((addr) => (
                          <option key={addr.id} value={addr.id}>
                            {`${addr.alias}: ${addr.calle} ${addr.altura}, ${addr.localidad}`}
                          </option>
                        ))
                      )}

                    </select>
                  </div>

                  <div className='flex flex-row gap-5'>
                    {metodosDeEnvio.map((metodo) => (
                      <div
                        key={metodo.nombre}
                        className={
                          'flex-1 rounded-md shadow-md h-60 border-2 p-4 cursor-pointer transition ' +
                          (envioActivo === metodo.nombre
                            ? ' border-indigo-400 bg-indigo-50'
                            : 'border-gray-100 hover:border-indigo-300')
                        }
                        onClick={() => setEnvio(metodo.nombre)}
                      >
                        <h3 className="text-lg font-bold mb-2">{metodo.nombre}</h3>
                        <p className="text-gray-600">{metodo.descripcion}</p>
                      </div>
                    ))}
                  </div>

                  <div className='flex w-full justify-end mt-12'>
                    <div className='w-1/3'>
                      <Button nombre={"Siguiente"} onClick={(e) => {
                        e.preventDefault();
                        if (validarPaso2()) setPaso(3);
                      }} />

                    </div>
                  </div>
                </>
              )}

              {pasoActivo === 3 && (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-800 font-bold mb-2" htmlFor="card_number">
                      Número de tarjeta
                    </label>
                    <input value={tarjeta} onChange={handleCardNumberChange} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="card_number" type="text" placeholder="**** **** **** 1234" />
                  </div>

                  <div className='flex flex-row gap-3 mb-6'>
                    <div className="flex-1/2">
                      <label className="block text-gray-800 font-bold mb-2" htmlFor="expiration_date">
                        Dia de expiración
                      </label>
                      <input value={expirationDate} onChange={handleExpirationChange} maxLength={5} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expiration_date" type="text" placeholder="MM / YY" />
                    </div>
                    <div className="flex-1/2">
                      <label className="block text-gray-800 font-bold mb-2" htmlFor="cvv">
                        CVV
                      </label>
                      <input value={CVV} onChange={(e) => setCVV(e.target.value)} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cvv" type="text" placeholder="***" />
                    </div>
                  </div>

                  <div className='flex w-full justify-end mt-12'>
                    <div className='w-1/3'>
                      <button type='submit' className="w-full bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Finalizar Compra
                      </button>
                    </div>
                  </div>
                </>
              )}

            </form>
          </div>

                <div className={`md:w-1/3 w-full min-h-[22rem] max-h-[23rem] rounded-lg shadow-lg bg-white border-gray-100 p-4 border-2 justify-between ${resumenActivo ? "flex flex-col" : "flex flex-row"
            }`}>
            <Resumen data={carrito} activo={resumenActivo} />
            <button className='block md:hidden border' onClick={() => setResumenActivo(!resumenActivo)}>
              cerrar
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Checkout
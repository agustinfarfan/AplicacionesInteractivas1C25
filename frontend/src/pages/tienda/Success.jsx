import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <>
      <div className='flex max-w-3xl h-screen mx-4 md:mx-auto'>
        <div className='w-full h-4/5 p-2 shadow-md rounded-md bg-white border-gray-100 border-2 gap-10 flex flex-col items-center justify-top'>
          
          <div className='w-full bg-emerald-400 rounded-md py-10 flex flex-col justify-center items-center '>
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white">
              Pago Aprobado!
            </h1>
            <p className="text-xl font-medium text-white">
              Gracias por tu compra!
            </p>
          </div>

          <div className='flex flex-col items-center gap-5'>
            <div className="p-6 rounded-lg bg-indigo-50">
              <p className="text-lg font-medium text-indigo-700">
                Tu orden será listada dentro de poco! Te llegará un Mail con tu detalle de orden.
              </p>
            </div>

            <div className='w-full justify-end items-end flex flex-row text-xl gap-5 p-6'>
              <div className='h-full flex-1 flex flex-col items-center justify-between gap-2'>
                <p className="text-sm text-gray-600">
                  ¿Tenés dudas, consultas o sugerencias? Completá el siguiente formulario y nos pondremos en contacto lo antes posible.
                </p>
                <Link to={"/contacto"}
                  className="w-full h-10 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Contactanos
                </Link>
              </div>
              <div className='h-full flex-1 flex flex-col items-center justify-between gap-2'>
                <p className="text-sm text-gray-600">
                  ¿Querés seguir explorando nuestros productos? Volvé a la página principal y descubrí todas las novedades y ofertas que tenemos para vos.
                </p>
                <Link to={"/"}
                  className="w-full h-10 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" strokelinejoin="round" strokeWidth="2" d="M3 12h18m-9-9l9 9-9 9" />
                  </svg>
                  <p>Volver a Home</p>
                </Link>
              </div>
              <div className='h-full flex-1 flex flex-col items-center justify-between gap-2'>
                <p className="text-sm text-gray-600">
                  Podés ver el estado y el detalle de tu compra en la sección "Mis pedidos". Te avisaremos por mail cuando tu pedido esté listo para ser entregado.
                </p>
                <Link to={"/pedidos"}
                  className="w-full h-10 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <p>Ver tus pedidos</p>
                </Link>
              </div>
            </div>

          </div>
        </div>
    </div>
      
    </>
  )
}

export default Success
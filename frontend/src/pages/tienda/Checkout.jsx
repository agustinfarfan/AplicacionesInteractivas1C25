import React, { useState } from 'react'
import Button from '../../components/buttons/Button'
import { Link } from 'react-router-dom'
import Resumen from '../../components/Resumen';

const Checkout = () => {

  const [pasoActivo, setPaso] = useState(1);

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

  return (
    <>
      <div className='max-w-7xl mx-4 md:mx-auto mt-10'>
        <h1 className='text-3xl font-bold mb-5'>Checkout</h1>

        <div className='flex flex-col md:flex-row gap-3'>
          <div className='md:w-2/3 w-full shadow-md rounded-md border-gray-100 border-2 p-4'>

            {/* Pasos */}
            <div className="mb-10">
              <nav aria-label="Progress">
                <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
                  {
                    pasos.map((paso, index) => (
                      <li key={index} className="md:flex-1">
                        <div
                          className={
                            "group cursor-pointer flex flex-col py-2 pl-4 md:pb-0 md:pl-0 md:pt-4 " +
                            (pasoActivo === index + 1
                              ? "border-l-4 border-indigo-600 md:border-l-0 md:border-t-4"
                              : "border-l-4 border-gray-200 hover:border-gray-300 md:border-l-0 md:border-t-4")
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
            <form className="mt-6">
              <div className='flex flex-row gap-3 mb-6'>
                <div className="flex-1/2">
                  <label className="block text-gray-800 font-bold mb-2" for="name">
                    Nombre
                  </label>
                  <input className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John" />
                </div>
                <div className=" flex-1/2">
                  <label className="block text-gray-800 font-bold mb-2" for="name">
                    Apellido
                  </label>
                  <input className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Doe" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2" for="email">
                  Email
                </label>
                <input className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="johndoe@example.com" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2" for="card_number">
                  Card Number
                </label>
                <input className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="card_number" type="text" placeholder="**** **** **** 1234" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2" for="expiration_date">
                  Expiration Date
                </label>
                <input className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expiration_date" type="text" placeholder="MM / YY" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2" for="cvv">
                  CVV
                </label>
                <input className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cvv" type="text" placeholder="***" />
              </div>
              <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Submit
              </button>
            </form>
          </div>
          <div className='md:w-1/3 w-full h-80 shadow-md border-gray-100 p-4 border-2 rounded-md justify-between flex flex-col'>
            <Resumen/>
          </div>
        </div>
      </div>

    </>
  )
}

export default Checkout
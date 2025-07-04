import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <div className="h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-md w-full space-y-8 text-center">
              <div className="mb-8">
                  <h2 className="mt-6 text-6xl font-extrabold text-gray-900 ">404</h2>
                  <p className="mt-2 text-3xl font-bold text-gray-900 ">Pagina no encontrada</p>
                  <p className="mt-2 text-sm text-gray-600 ">Lo siento, no pudimos encontrar la pagina que estabas buscando</p>
              </div>
              <div className="mt-8">
                  <Link to={"/"}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" strokelinejoin="round" strokewidth="2" d="M3 12h18m-9-9l9 9-9 9" />
                      </svg>
                      Volver a Home
                  </Link>
              </div>
          </div>
          <div className="mt-16 w-full max-w-2xl">
              <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300 "></div>
                  </div>
                  <div className="relative flex justify-center">
                      <span className="px-2 bg-gray-100  text-sm text-gray-500 ">
                        Si piensas que esto es un error, por favor contacta nuestro soporte
                      </span>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default NotFound
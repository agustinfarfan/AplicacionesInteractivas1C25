import React from 'react'
import { Link } from 'react-router-dom'
import cryingFrog from '../assets/frog-face-worried-by-Vexels.svg';

function NoResourceMessage({texto}) {
  return (
      <div className='flex flex-col h-full w-full justify-center items-center mt-20'>
              <h1 className='text-4xl font-bold text-neutral-600'>{texto}</h1>
          <img className="size-60" src={cryingFrog} alt="Logo" />
          <Link to={"/"}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18m-9-9l9 9-9 9" />
              </svg>
              Volver a Home
          </Link>
      </div>
  )
}

export default NoResourceMessage
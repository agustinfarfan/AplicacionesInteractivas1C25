import { useState } from 'react'
import { Link } from 'react-router-dom';
import Home from './../pages/tienda/Home';
import Button from './buttons/Button';
import ButtonLink from './buttons/ButtonLink';
import ButtonIcon from './buttons/ButtonIcon';
import carritoIcono from './../assets/carritoIcono.png';

const Header = () => {

  const [current, setCurrent] = useState('Home');

  const tabs = [
    { name: 'Home', href: '/'},
    { name: 'Categorias', href: '#'},
    { name: 'Sobre nosotros', href: '#'},
    { name: 'Contactactanos', href: '#'}
  ]

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img className="h-8 w-8" src="https://tailwindflex.com/images/logo.svg" alt="Logo" />
                <span className="ml-2 text-xl font-bold text-gray-800">SanaSana</span>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {
                  tabs.map((tab) => (
                    <Link 
                    to={tab.href} 
                    onClick={() => setCurrent(tab.name)} 
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${current === tab.name
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                    key={tab.name}
                    >                    
                      {tab.name}                  
                    </Link>
                  ))
                }
              </div>
            </div>
            <div className=" items-center">
              <div className="hidden md:flex md:flex-row md:items-center md:justify-center gap-4 h-full">
                <ButtonIcon href={"carrito"} imgSrc={carritoIcono}/>
                <ButtonLink href={"/admin/login"} nombre={"Iniciar Sesión"} />
                <ButtonLink href={"/admin/login"} nombre={"Registarse"} />
              </div>
              <div className="flex items-center h-full md:hidden">
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
          {
              tabs.map((tab) => (
                <Link
                  to={tab.href}
                  onClick={() => setCurrent(tab.name)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${current === tab.name
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  key={tab.name}
                >
                  {tab.name}
                </Link>
              ))
            }

          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <Button nombre={"Sign Up"}/>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Home from './../pages/tienda/Home';
import Contact from './../pages/tienda/Contact';
import Button from './buttons/Button';
import ButtonLink from './buttons/ButtonLink';
import ButtonIcon from './buttons/ButtonIcon';
import carritoIcono from './../assets/carritoIcono.png';
import UserProfileSidebar from './UserProfileSidebar';
import LogoSanaSana from '../assets/SanaSanaTransparenteLogo.png'
import { isLoggedIn } from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import { fetchCategories } from '../services/backendApi'; 

const Header = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  const [current, setCurrent] = useState('Home');
  const [loggedIn, setIsLoggedIn] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const tabs = [
    { name: 'Home', href: '/'},
    { name: 'Categorias', href: '#', hasDropdown: true },
    { name: 'Sobre nosotros', href: '/about'},
    { name: 'Contactactanos', href:'contacto'}
  ]

  // Cargar categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cada vez que cambie localStorage (login/logout), queremos reflejarlo
  useEffect(() => {
    
    console.log(isLoggedIn());
    
    // Al montar, chequeamos si hay token
    setIsLoggedIn(isLoggedIn());

    // También nos suscribimos a cambios de localStorage (si el usuario cierra sesión en otra pestaña)
    const handleStorageChange = () => {
      setIsLoggedIn(isLoggedIn());
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

   // Función para cerrar sesión (borrar token y volver al landing)
   const handleLogout = () => {
    logout(); 
    setIsLoggedIn(false);
    navigate("/");
  };

  // Manejar click en categoría
  const handleCategoryClick = (categoryId, categoryName) => {
    setShowCategoriesDropdown(false);
    navigate(`/categoria/${categoryId}`, { state: { categoryName } });
  };

  // Manejar click en tabs
  const handleTabClick = (tab) => {
    if (tab.name === 'Categorias') {
      setShowCategoriesDropdown(!showCategoriesDropdown);
    } else {
      setCurrent(tab.name);
      setShowCategoriesDropdown(false);
    }
  };
  
  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img className="h-8 w-8" src={LogoSanaSana} alt="Logo" />
                <span className="ml-2 text-xl font-bold text-gray-800">SanaSana</span>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {tabs.map((tab) => (
                  <div key={tab.name} className="relative" ref={tab.name === 'Categorias' ? dropdownRef : null}>
                    {tab.hasDropdown ? (
                      <button 
                        onClick={() => handleTabClick(tab)}
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          current === tab.name
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                      >                    
                        {tab.name}
                        <svg 
                          className={`ml-1 h-4 w-4 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link 
                        to={tab.href} 
                        onClick={() => handleTabClick(tab)} 
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          current === tab.name
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                      >                    
                        {tab.name}                  
                      </Link>
                    )}
                    
                    {/* Dropdown de categorías */}
                    {tab.name === 'Categorias' && showCategoriesDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <div className="py-1 max-h-64 overflow-y-auto">
                          {loadingCategories ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              Cargando categorías...
                            </div>
                          ) : categories.length > 0 ? (
                            categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id, category.name)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                              >
                                {category.name}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No hay categorías disponibles
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className=" items-center">
              <div className="hidden md:flex md:flex-row md:items-center md:justify-center gap-4 h-full">
                <ButtonIcon href={"/carrito"} imgSrc={carritoIcono}/>
                { loggedIn ? (
                  <div className="relative">
                    <button onClick={() => setShowProfile(true)} className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <img className="h-8 w-8 rounded-full" src="https://tailwindflex.com/images/avatar/avatar-1.jpg" alt="Perfil"/>
                    </button>
                    {showProfile && <UserProfileSidebar onLogout={handleLogout} onClose={() => setShowProfile(false)} />}
                  </div>
                ):(
                  <>
                    <ButtonLink href={"/auth/login"} nombre={"Iniciar Sesión"} />
                      <ButtonLink href={"/auth/register"} nombre={"Registarse"} />
                  </>
                )}
                
              </div>
              <div className="flex items-center h-full md:hidden">
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
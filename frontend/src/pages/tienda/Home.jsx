import React, { useState, useEffect } from "react";
import { ChevronRight, Award, Shield, Truck, Users, Star, ArrowRight, Microscope, TestTube, Beaker } from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Bienvenido a SanaSana",
      subtitle: "Insumos de laboratorio clínico de alta calidad",
      description: "Equipamiento profesional para diagnósticos precisos y confiables",
      gradient: "from-blue-600 via-purple-600 to-indigo-700"
    },
    {
      title: "Calidad Garantizada",
      subtitle: "Productos certificados internacionalmente",
      description: "Cumplimos con los más altos estándares de calidad médica",
      gradient: "from-emerald-600 via-teal-600 to-cyan-700"
    },
    {
      title: "Entrega Rápida",
      subtitle: "Recibí tus productos en tiempo récord",
      description: "Logística especializada para equipamiento médico",
      gradient: "from-orange-600 via-red-600 to-pink-700"
    }
  ];

  const categories = [
    { 
      nombre: "Microbiología", 
      path: "microbiologia", 
      desc: "Cultivos, reactivos y medios de crecimiento especializados",
      icon: <Microscope className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      items: "250+ productos"
    },
    { 
      nombre: "Hematología", 
      path: "hematologia", 
      desc: "Tubos, anticoagulantes y equipos de análisis sanguíneo",
      icon: <TestTube className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      items: "180+ productos"
    },
    { 
      nombre: "Química Clínica", 
      path: "quimica-clinica", 
      desc: "Reactivos, enzimas y materiales de análisis químico avanzado",
      icon: <Beaker className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      items: "320+ productos"
    }
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Calidad Certificada",
      desc: "Productos con certificación internacional"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Garantía Total",
      desc: "Respaldo completo en todos nuestros productos"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Envío Rápido",
      desc: "Entrega en 24-48hs en CABA y GBA"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Soporte Técnico",
      desc: "Asesoramiento especializado incluido"
    }
  ];

  const stats = [
    { number: "500+", label: "Productos" },
    { number: "1200+", label: "Clientes" },
    { number: "15+", label: "Años" },
    { number: "98%", label: "Satisfacción" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Hero Section con Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className={`bg-gradient-to-r ${heroSlides[currentSlide].gradient} text-white transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="relative px-6 py-20 lg:py-32">
            <div className="max-w-7xl mx-auto text-center">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-white leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl lg:text-2xl mb-4 opacity-90 font-light">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <p className="text-lg mb-8 opacity-75 max-w-2xl mx-auto">
                  {heroSlides[currentSlide].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/tienda/products"
                    className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    Ver catálogo completo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/contacto"
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    Consultá con un experto
                  </a>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Categorías destacadas */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Categorías destacadas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubrí nuestra amplia gama de productos especializados para cada área del laboratorio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <div 
                key={cat.nombre} 
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon}
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{cat.nombre}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {cat.items}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{cat.desc}</p>
                  
                  <a
                    href={`/tienda/category/${cat.path}`}
                    className="group/link inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-4 transition-all duration-300"
                  >
                    Ver productos
                    <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos recomendados */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Productos recomendados</h2>
            <p className="text-xl text-gray-600">Los más elegidos por profesionales de la salud</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 1, nombre: "Medio Agar MacConkey", precio: "$3200", rating: 4.8, reviews: 24 },
              { id: 2, nombre: "Reactivo Hemoglobina", precio: "$5400", rating: 4.9, reviews: 18 },
              { id: 3, nombre: "Kit Serología VDRL", precio: "$8900", rating: 4.7, reviews: 31 },
            ].map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{prod.nombre}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{prod.precio}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Agregar al carrito
                  </button>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{prod.rating}</span>
                    </div>
                    <span>({prod.reviews} reseñas)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿Sos profesional del laboratorio?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Registrate y accedé a precios especiales, descuentos exclusivos y asesoramiento personalizado para tu laboratorio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/registro"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Crear cuenta profesional
              </a>
              <a
                href="/tienda/products"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Explorar catálogo
              </a>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full translate-y-48 -translate-x-48"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;



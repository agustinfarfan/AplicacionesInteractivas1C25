import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Banner principal */}
      <div className="bg-indigo-600 text-white rounded-xl p-8 shadow-md text-center">
        <h1 className="text-4xl font-bold mb-2">Bienvenido a SanaSana</h1>
        <p className="text-lg">Insumos de laboratorio clínico, de confianza y al mejor precio</p>
        <div className="mt-6">
          <Link
            to="/tienda/products"
            className="bg-white text-indigo-600 px-6 py-2 rounded font-semibold hover:bg-indigo-100 transition"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>

      {/* Categorías destacadas */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Categorías destacadas</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { nombre: "Microbiología", path: "microbiologia", desc: "Cultivos, reactivos y medios de crecimiento." },
            { nombre: "Hematología", path: "hematologia", desc: "Tubos, anticoagulantes y equipos relacionados." },
            { nombre: "Química Clínica", path: "quimica-clinica", desc: "Reactivos, enzimas y materiales de análisis químico." }
          ].map((cat) => (
            <div key={cat.nombre} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{cat.nombre}</h3>
              <p className="text-gray-600">{cat.desc}</p>
              <Link
                to={`/tienda/category/${cat.path}`}
                className="text-indigo-600 mt-4 inline-block font-medium"
              >
                Ver productos →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Productos recomendados */}
      <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Productos recomendados</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { id: 1, nombre: "Medio Agar MacConkey", precio: "$3200" },
          { id: 2, nombre: "Reactivo Hemoglobina", precio: "$5400" },
          { id: 3, nombre: "Kit Serología VDRL", precio: "$8900" },
        ].map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))}
        </div>
      </div>

      {/* Llamado a la acción final */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">¿Sos profesional del laboratorio?</h2>
        <p className="text-gray-700 mb-4">Registrate y accedé a beneficios exclusivos en tus compras.</p>
        <Link
          to="/registro"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default Home;



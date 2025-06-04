import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Sobre Nosotros</h1>

        <p className="text-gray-700 mb-4">
          En <strong>SanaSana</strong> nos dedicamos a la venta de <strong>insumos de laboratorio clínico</strong>, ofreciendo productos de alta calidad y confiabilidad para profesionales y centros de salud en toda la región.
        </p>

        <p className="text-gray-700 mb-4">
          Nuestro compromiso es proveer materiales que garanticen precisión, seguridad y eficacia en cada análisis clínico. Trabajamos con marcas reconocidas a nivel nacional e internacional, y nos aseguramos de mantener altos estándares de almacenamiento y distribución.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2 mt-6">Nuestra Misión</h2>
        <p className="text-gray-700 mb-4">
          Contribuir a una salud diagnóstica más eficiente mediante el suministro rápido, confiable y personalizado de insumos de laboratorio, atendiendo las necesidades de hospitales, clínicas, laboratorios privados y distribuidores.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2 mt-6">Lo que ofrecemos</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Tubos de recolección de sangre y orina</li>
          <li>Reactivos para química clínica e inmunología</li>
          <li>Guantes, jeringas, y descartables</li>
          <li>Equipos y accesorios de laboratorio</li>
          <li>Atención personalizada y envíos a todo el país</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2 mt-6">¿Por qué elegirnos?</h2>
        <p className="text-gray-700 mb-4">
          Contamos con años de experiencia en el rubro, un equipo capacitado y una fuerte vocación de servicio. Nuestra tienda online permite realizar pedidos de forma ágil, con soporte técnico y asesoramiento personalizado cuando lo necesites.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">📍 Ubicación</h2>
          <p className="text-gray-600">Estamos en Buenos Aires, Argentina. Realizamos envíos a todo el país.</p>
        </div>
      </div>
    </div>
  );
};

export default About;


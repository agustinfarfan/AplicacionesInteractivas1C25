import React from "react";
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  Building,
  CheckCircle2,
  MapPin,
  Handshake
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-700 flex items-center gap-2">
          <Building className="w-8 h-8 text-indigo-700" /> Sobre Nosotros
        </h1>

        <p className="text-gray-700 mb-4">
          En <strong>SanaSana</strong> nos especializamos en la distribución de <strong>insumos para laboratorio clínico</strong>, brindando productos de alta calidad y confiabilidad para profesionales de la salud en toda la región.
        </p>

        <p className="text-gray-700 mb-4">
          Nuestra prioridad es garantizar precisión, seguridad y eficacia en cada análisis clínico. Trabajamos con marcas reconocidas a nivel nacional e internacional, y aplicamos estrictos estándares en almacenamiento y logística para asegurar una entrega óptima.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2 mt-6 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" /> Nuestra Misión
        </h2>
        <p className="text-gray-700 mb-4">
          Contribuir a una salud diagnóstica más eficiente mediante el suministro ágil, confiable y personalizado de insumos de laboratorio, atendiendo las necesidades de hospitales, clínicas, laboratorios y distribuidores en todo el país.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2 mt-6 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-indigo-600" /> Qué Ofrecemos
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-indigo-600 w-5 h-5 mt-1" />
            Tubos para recolección de sangre y orina
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-indigo-600 w-5 h-5 mt-1" />
            Reactivos para química clínica, hematología e inmunología
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-indigo-600 w-5 h-5 mt-1" />
            Guantes, jeringas, y otros descartables
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-indigo-600 w-5 h-5 mt-1" />
            Equipos, instrumentos y accesorios de laboratorio
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-indigo-600 w-5 h-5 mt-1" />
            Atención personalizada y envíos a todo el país
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2 mt-6 flex items-center gap-2">
          <Handshake className="w-6 h-6 text-indigo-600" /> ¿Por Qué Elegirnos?
        </h2>
        <p className="text-gray-700 mb-4">
          Contamos con una amplia trayectoria en el sector, un equipo altamente capacitado y una fuerte vocación de servicio. Nuestra tienda online permite realizar pedidos de forma rápida y sencilla, con soporte técnico y asesoramiento profesional siempre disponibles.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" /> Ubicación
          </h2>
          <p className="text-gray-600">Estamos en Buenos Aires, Argentina. Realizamos envíos a todo el país.</p>
        </div>
      </div>
    </div>
  );
};

export default About;


import React from 'react';

const estadoColors = {
    CREADO: "bg-blue-200 text-blue-800",
    EN_PREPARACION: "bg-yellow-200 text-yellow-800",
    ENTREGADO: "bg-green-200 text-green-800",
    CANCELADO: "bg-red-200 text-red-800"
};

const estadoLabels = {
    CREADO: "Pendiente",
    EN_PREPARACION: "En preparación",
    ENTREGADO: "Entregado",
    CANCELADO: "Cancelado"
};

const EstadoPedido = ({ estado }) => (
    <span className={`px-4 py-2 rounded font-bold text-sm ${estadoColors[estado] || "bg-gray-200 text-gray-700"}`}>
        {estadoLabels[estado] || "Desconocido"}
    </span>
);

export default EstadoPedido;
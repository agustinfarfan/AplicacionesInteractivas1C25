import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, nombre, precio }) => {
  return (
    <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{nombre}</h3>
      <p className="text-gray-700 mb-2">{precio}</p>
      <Link to={`/tienda/products/${id}`} className="text-indigo-600 font-medium">
        Ver detalle →
      </Link>
    </div>
  );
};

export default ProductCard;

import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";

const Products = () => {
  const { products, loading } = useProducts();

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;
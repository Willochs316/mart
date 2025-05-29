"use client";
import { useProducts } from "@/app/context/product-context";
import { ProductCard } from "@/app/components/product-card";

export const ProductGrid = () => {
  const { filteredProducts, loading, error } = useProducts();

  if (loading) return <div className="flex-1 text-center">Loading...</div>;
  if (error) return <div className="flex-1 text-red-500">{error}</div>;

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

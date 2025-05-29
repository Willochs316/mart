"use client";
import React, { useState } from "react";
import { useProducts } from "@/app/context/product-context";

const ProductList: React.FC = () => {
  const { products, loading } = useProducts();
  const [sortOption, setSortOption] = useState<string>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    return 0;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <select onChange={(e) => setSortOption(e.target.value)} className="mb-4 cursor-pointer">
        <option value="default">Sort by</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-gray-500">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

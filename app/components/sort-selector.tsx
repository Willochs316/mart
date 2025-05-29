"use client";
import { useProducts } from "@/app/context/product-context";

export const SortSelect = () => {
  const { sortBy, setSortBy } = useProducts();

  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="title-asc">Title: A-Z</option>
      <option value="title-desc">Title: Z-A</option>
    </select>
  );
};

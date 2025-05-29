"use client";
import { useProducts } from "@/app/context/product-context";

export const FilterSidebar = () => {
  const { categories, selectedCategories, toggleCategory } = useProducts();

  return (
    <div className="w-64 space-y-4">
      <h3 className="text-lg font-semibold">Categories</h3>
      {categories.map((category) => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => toggleCategory(category)}
            className="h-4 w-4 text-blue-600 cursor-pointer"
          />
          <span className="capitalize">{category}</span>
        </label>
      ))}
    </div>
  );
};

import { SortSelect } from "./components/sort-selector";
import { FilterSidebar } from "./components/filter-panel";
import { ProductGrid } from "./components/product-grid";

export default function Home() {
  return (
    <main className="max-w-full w-full">
      <header className="bg-white shadow">
        <div className="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Mart</h1>
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Products</h1>
          <SortSelect />
        </div>

        <div className="flex gap-8">
          <FilterSidebar />
          <ProductGrid />
        </div>
      </div>
    </main>
  );
}

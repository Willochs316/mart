import Image from "next/image";
import { Product } from "@/app/types";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadowd"
    >
      <div className="relative h-48 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold">${product.price}</span>
        <span className="text-sm text-gray-600">
          ★ {product.rating.rate} ({product.rating.count})
        </span>
      </div>
      <p className="text-gray-600 text-sm line-clamp-2">
        {product.description}
      </p>
      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
        {product.category}
      </span>
    </div>
  );
};

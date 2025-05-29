"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InnerImageZoom from "react-inner-image-zoom";
import { Product } from "@/app/types";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.image);
      });
    }
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {};

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex-1">
          <InnerImageZoom
            src={selectedImage}
            zoomSrc={selectedImage}
            zoomScale={1}
            zoomType="hover"
            className="w-full object-contain"
          />

          <div className="mt-4 flex gap-2">
            {[product.image].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 border cursor-pointer object-contain ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-xl font-bold mb-2">${product.price}</p>
          <p className="text-sm text-gray-500">
            Rating: {product.rating.rate} ★ ({product.rating.count})
          </p>
          <span className="inline-block mt-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {product.category}
          </span>

          {/* Quantity & Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 text-xl font-bold"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 text-xl font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

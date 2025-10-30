import React from "react";
import { Product } from "@/app/types";
import { Star } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product._id}`} key={product._id}>
      <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-lg">
        <div className="relative">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <div className="flex items-center mt-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  product.rating && i < product.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating?.toFixed(1)})
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
            <p className="text-sm text-gray-500 line-through">
              ₹{(product.price * 1.1).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

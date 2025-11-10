import React from "react";
import { Product } from "@/app/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onCompare: (product: Product) => void;
  isSelected: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onCompare, isSelected }) => {
  const description = product.description || "";
  const shortDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-lg">
      <Link href={`/products/${product._id}`} className="block">
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
          <p className="h-12 mt-2 overflow-hidden text-sm text-gray-600">
            {shortDescription}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <div className="flex items-center justify-between">
          <Link href={`/products/${product._id}`} className="inline-block px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
            View Details
          </Link>
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`compare-${product._id}`}
              checked={isSelected}
              onChange={() => onCompare(product)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={`compare-${product._id}`} className="ml-2 text-sm text-gray-700">
              Compare
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { Product } from '@/app/types';

interface ProductComparisonProps {
  product1: Product;
  product2: Product;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ product1, product2 }) => {
  return (
    <div className="p-8 mt-12 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900">
        Compare Dental Materials
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product 1 */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800">{product1.name}</h3>
          <p className="mt-2 text-gray-600">{product1.description}</p>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Advantages:</h4>
            <ul className="mt-2 space-y-1 text-gray-600 list-disc list-inside">
              {product1.advantages?.map((adv, index) => <li key={index}>{adv}</li>)}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Disadvantages:</h4>
            <ul className="mt-2 space-y-1 text-gray-600 list-disc list-inside">
              {product1.disadvantages?.map((dis, index) => <li key={index}>{dis}</li>)}
            </ul>
          </div>
        </div>

        {/* Product 2 */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800">{product2.name}</h3>
          <p className="mt-2 text-gray-600">{product2.description}</p>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Advantages:</h4>
            <ul className="mt-2 space-y-1 text-gray-600 list-disc list-inside">
              {product2.advantages?.map((adv, index) => <li key={index}>{adv}</li>)}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Disadvantages:</h4>
            <ul className="mt-2 space-y-1 text-gray-600 list-disc list-inside">
              {product2.disadvantages?.map((dis, index) => <li key={index}>{dis}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;

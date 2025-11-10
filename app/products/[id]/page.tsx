import { Metadata } from 'next';
import React from "react";
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  // In a real app, you'd fetch this data from your API
  // For now, we'll create a placeholder.
  // const product = await fetch(`https://.../products/${id}`).then(res => res.json());

  return {
    title: `Product Details: ${id}`, // Replace with product.name
    description: `Learn more about the uses, advantages, and disadvantages of ${id}.`, // Replace with product.description
    keywords: ['dental products', 'dental materials', id],
  };
}

const Page = ({ params }: { params: { id: string } }) => {
  return <ProductDetailClient id={params.id} />;
};

export default Page;

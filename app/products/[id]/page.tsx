import { Metadata } from 'next';
import React from "react";
import ProductDetailClient from './ProductDetailClient';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  // In a real app, you'd fetch this data from your API
  // For now, we'll create a placeholder.
  // const product = await fetch(`https://.../products/${id}`).then(res => res.json());

  return {
    title: `Product Details: ${id}`, // Replace with product.name
    description: `Learn more about the uses, advantages, and disadvantages of ${id}.`, // Replace with product.description
    keywords: ['dental products', 'dental materials', id],
  };
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
};

export default Page;

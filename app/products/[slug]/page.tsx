"use client";
import React from "react";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

const products = [
  {
    name: "Tooth Paste",
    img: "/Tooth Paste.png",
    shortDescription:
      "Fluoride-rich toothpaste for stronger, whiter teeth and fresh breath.",
    description:
      "Our premium fluoride toothpaste is scientifically formulated to strengthen enamel, prevent cavities, and remove stubborn stains. Infused with mint extract, it leaves your mouth feeling clean and fresh all day. Perfect for daily use by the entire family and recommended by leading dentists.",
    price: 149,
    rating: 4.8,
    category: "Oral Hygiene",
    features: [
      "Enamel protection and cavity prevention",
      "Fresh mint flavor for long-lasting freshness",
      "Removes stains and whitens teeth naturally",
      "Dentist-recommended fluoride formula",
    ],
    inStock: true,
  },
  {
    name: "Tooth Brush",
    img: "/Tooth Brush.png",
    shortDescription:
      "Soft-bristle toothbrush for deep cleaning and gum protection.",
    description:
      "Ergonomically designed toothbrush with ultra-soft bristles that reach deep between teeth and along the gum line. Provides gentle yet effective plaque removal without irritating gums. The flexible handle ensures comfortable grip and better control during brushing.",
    price: 99,
    rating: 4.6,
    category: "Oral Hygiene",
    features: [
      "Soft bristles for sensitive gums",
      "Anti-slip ergonomic handle",
      "Curved neck design for better reach",
      "BPA-free and dentist-approved",
    ],
    inStock: true,
  },
  {
    name: "Gum Paints",
    img: "/Gum Paints.png",
    shortDescription:
      "Herbal gum paint to strengthen and soothe your gums naturally.",
    description:
      "A specialized blend of medicinal herbs like clove oil, menthol, and alum designed to reduce inflammation, bleeding, and gum sensitivity. Regular use improves gum firmness and overall oral hygiene. Trusted by dentists for post-scaling treatment and daily gum care.",
    price: 249,
    rating: 4.7,
    category: "Dental Treatment",
    features: [
      "Reduces bleeding and inflammation",
      "Promotes healthy gum tissue",
      "Safe for daily use",
      "Herbal and alcohol-free formula",
    ],
    inStock: true,
  },
  {
    name: "Mouth Wash",
    img: "/Mouth Wash.png",
    shortDescription:
      "Alcohol-free mouthwash for fresh breath and 24-hour protection.",
    description:
      "This gentle yet powerful mouthwash eliminates 99.9% of oral bacteria, fights plaque, and keeps your breath fresh for hours. Formulated with natural mint and antibacterial agents, it offers a refreshing experience without the burning sensation of alcohol-based rinses.",
    price: 199,
    rating: 4.5,
    category: "Oral Hygiene",
    features: [
      "Kills 99.9% of germs",
      "Alcohol-free and gentle",
      "Prevents bad breath and gingivitis",
      "Fresh mint flavor",
    ],
    inStock: true,
  },
  {
    name: "Flossers",
    img: "/Flossers.png",
    shortDescription:
      "Pre-threaded dental floss picks for easy interdental cleaning.",
    description:
      "Our mint-flavored flossers make daily flossing quick and comfortable. Designed with a curved handle and shred-resistant floss, they effortlessly remove plaque and debris from tight spaces your toothbrush can't reach. Portable and perfect for on-the-go oral care.",
    price: 129,
    rating: 4.4,
    category: "Oral Accessories",
    features: [
      "Shred-resistant floss",
      "Ergonomic grip for better control",
      "Mint flavored for freshness",
      "Ideal for travel and everyday use",
    ],
    inStock: true,
  },
  {
    name: "Tooth Whitening",
    img: "/Tooth Whitening.png",
    shortDescription:
      "Advanced whitening gel for visibly whiter teeth in just 7 days.",
    description:
      "A dentist-grade whitening formula that removes surface stains and restores natural brightness. Enriched with active oxygen and mint essence, it whitens without damaging enamel. Get a confident, radiant smile with daily use — safe and enamel-friendly.",
    price: 499,
    rating: 4.9,
    category: "Cosmetic Dental",
    features: [
      "Whitens up to 3 shades lighter",
      "Safe on enamel and gums",
      "No sensitivity formula",
      "Results in 7 days",
    ],
    inStock: true,
  },
  {
    name: "Lip & Oral Care",
    img: "/Lip & Oral care.png",
    shortDescription:
      "Dual lip balm and oral gel combo for all-around mouth hydration.",
    description:
      "Designed for those with dry lips or oral irritation, this soothing combo nourishes and protects. Enriched with aloe vera, vitamin E, and chamomile, it repairs cracked lips while keeping your oral tissue moisturized and refreshed all day.",
    price: 179,
    rating: 4.6,
    category: "Personal Care",
    features: [
      "Hydrates lips and oral lining",
      "Aloe and chamomile enriched",
      "Non-greasy and fast-absorbing",
      "Dermatologically tested",
    ],
    inStock: true,
  },
  {
    name: "Ayurvedic Dental",
    img: "/Ayurvedic Dental.png",
    shortDescription:
      "100% herbal toothpaste with neem, clove, and babool extracts.",
    description:
      "Experience the wisdom of Ayurveda with this herbal dental paste. Packed with neem for antibacterial protection, clove for pain relief, and babool for stronger gums. Free from parabens, fluoride, and artificial colors — it’s a natural way to complete oral wellness.",
    price: 299,
    rating: 4.7,
    category: "Ayurvedic",
    features: [
      "Made with 9 Ayurvedic herbs",
      "No parabens or chemicals",
      "Natural fresh aroma",
      "Strengthens gums and teeth",
    ],
    inStock: true,
  },
  {
    name: "Denture & Retainer",
    img: "/Denture & Retainer.png",
    shortDescription:
      "Cleaning tablets and protective case for denture and retainer hygiene.",
    description:
      "Keep your dentures and retainers spotless with our effervescent cleaning tablets. Designed to eliminate 99% of odor-causing bacteria and stains in minutes. Comes with a durable, anti-leak storage case for easy daily use at home or while traveling.",
    price: 349,
    rating: 4.5,
    category: "Dental Accessories",
    features: [
      "Effervescent cleaning formula",
      "Removes plaque and odor",
      "Includes durable case",
      "Safe for all dental appliances",
    ],
    inStock: true,
  },
  {
    name: "Tongue Cleaner",
    img: "/Tongue Cleaner.png",
    shortDescription:
      "Stainless steel cleaner for fresh breath and better oral hygiene.",
    description:
      "An ergonomically curved stainless-steel tongue cleaner designed to remove bacteria and odor-causing buildup. Daily use enhances oral freshness and improves overall taste sensation. Rust-proof and long-lasting, it’s an essential part of your hygiene kit.",
    price: 99,
    rating: 4.8,
    category: "Oral Hygiene",
    features: [
      "100% stainless steel",
      "Ergonomic design",
      "Easy to clean and reuse",
      "Improves breath instantly",
    ],
    inStock: true,
  },
  {
    name: "Interdental Brushes",
    img: "/Interdental Brushes.png",
    shortDescription:
      "Slim interdental brushes for cleaning tight spaces between teeth.",
    description:
      "Specially designed micro-bristle brushes that effectively clean areas your regular toothbrush misses. Gentle on gums yet tough on plaque, they are ideal for people with braces, bridges, or gaps between teeth. Comes in multiple sizes for convenience.",
    price: 149,
    rating: 4.7,
    category: "Oral Accessories",
    features: [
      "Flexible wire for easy access",
      "Soft nylon bristles",
      "Reusable and travel-friendly",
      "Ideal for braces and bridges",
    ],
    inStock: true,
  },
  {
    name: "Travel Kits",
    img: "/Travel Kits.png",
    shortDescription: "Complete oral care kit for your travel convenience.",
    description:
      "Compact and hygienic travel kit that includes a mini toothpaste, foldable toothbrush, and refreshing mouthwash. Designed for busy professionals, students, and travelers who want oral freshness anytime, anywhere. TSA-approved for easy packing.",
    price: 399,
    rating: 4.6,
    category: "Travel Essentials",
    features: [
      "Includes toothpaste, brush, and mouthwash",
      "Compact and portable design",
      "Leak-proof packaging",
      "Ideal for travel and office use",
    ],
    inStock: true,
  },
];

const ProductPage = ({ params }: { params: any }) => {
  const product = products.find(
    (p) =>
      p.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") ===
      params.slug
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src={product.img}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#2C73D2] mb-4">
            {product.name}
          </h1>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <FaStar key={i} />
              ))}
              {product.rating % 1 !== 0 && <FaStar />}
              {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                <FaRegStar key={i} />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating} stars</span>
          </div>
          
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Features
            </h2>
            <ul className="list-disc list-inside">
              {product.features.map((feature, i) => (
                <li key={i} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        
        
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

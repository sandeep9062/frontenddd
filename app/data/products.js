// Sample product data for all categories
const products = [
  {
    id: 1,
    name: "Kids Toothpaste – Bubblegum Blast",
    description: "Fluoride-free, bubblegum flavor, safe for kids.",
    price: "₹199",
    image: require("../assets/Tooth Paste.png"),
    category: "Toothpaste",
    buyLinks: [
      { name: "Amazon", url: "https://www.amazon.in/dp/B0CXYZ123" },
      { name: "Flipkart", url: "https://www.flipkart.com/item/p/itm123456" },
      { name: "Nykaa", url: "https://www.nykaa.com/item/p/123456" }
    ],
    reviews: [
      { user: "Amit", rating: 5, comment: "My kids love the taste!" },
      { user: "Priya", rating: 4, comment: "Gentle and safe, recommended by our dentist." }
    ]
  },
  {
    id: 2,
    name: "Herbal Mouthwash",
    description: "Alcohol-free, herbal formula for gum care.",
    price: "₹120",
    image: require("../assets/Mouth Wash.png"),
    category: "MouthWash",
    buyLinks: [
      { name: "Amazon", url: "https://www.amazon.in/dp/B0CXYZ456" },
      { name: "Flipkart", url: "https://www.flipkart.com/item/p/itm654321" }
    ],
    reviews: [
      { user: "Rohit", rating: 5, comment: "Very refreshing and gentle." }
    ]
  },
  {
    id: 3,
    name: "Kids Toothbrush",
    description: "Soft bristles, safe for ages 3+.",
    price: "₹60",
    image: require("../assets/Children’s Dentistry.png"),
    category: "ToothBrushes",
    buyLinks: [
      { name: "Amazon", url: "https://www.amazon.in/dp/B0CXYZ789" }
    ],
    reviews: [
      { user: "Neha", rating: 4, comment: "Good quality, soft bristles." }
    ]
  },
  {
    id: 4,
    name: "Charcoal Powder",
    description: "Natural whitening, herbal ingredients.",
    price: "₹250",
    image: require("../assets/Ayurvedic Dental.png"),
    category: "Toothpaste",
    buyLinks: [
      { name: "Amazon", url: "https://www.amazon.in/dp/B0CXYZ101" }
    ],
    reviews: [
      { user: "Suresh", rating: 5, comment: "Whitening effect is visible!" }
    ]
  }
];

export default products;

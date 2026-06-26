export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  stock: number;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "p-001",
    slug: "relaxed-wool-blazer",
    name: "Relaxed Wool Blazer",
    category: "Outerwear",
    gender: "Women",
    price: 148,
    oldPrice: 188,
    rating: 4.8,
    reviews: 126,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Camel", "Ivory"],
    stock: 18,
    description:
      "A softly tailored wool-blend blazer with a relaxed shoulder, smooth lining, and polished drape for workdays or evenings.",
    image: "/products/product-1.jpg",
  },
  {
    id: "p-002",
    slug: "ribbed-knit-polo",
    name: "Ribbed Knit Polo",
    category: "Knitwear",
    gender: "Men",
    price: 72,
    oldPrice: 96,
    rating: 4.6,
    reviews: 84,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Sage", "Cream"],
    stock: 24,
    description:
      "A refined rib-knit polo with a compact collar, soft handfeel, and enough structure to layer cleanly under jackets.",
    image: "/products/product-2.jpg",
  },
  {
    id: "p-003",
    slug: "wide-leg-tailored-trouser",
    name: "Wide-Leg Tailored Trouser",
    category: "Bottoms",
    gender: "Women",
    price: 96,
    oldPrice: 128,
    rating: 4.7,
    reviews: 101,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Stone", "Navy"],
    stock: 31,
    description:
      "Fluid wide-leg trousers with a clean waistband, pressed front crease, and versatile full-length silhouette.",
    image: "/products/product-3.jpg",
  },
  {
    id: "p-004",
    slug: "silk-blend-shirt",
    name: "Silk Blend Shirt",
    category: "Shirts",
    gender: "Unisex",
    price: 118,
    oldPrice: 154,
    rating: 4.9,
    reviews: 76,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Ink", "Mist"],
    stock: 15,
    description:
      "A fluid silk-blend button-up with a clean placket, soft sheen, and an easy fit that tucks or layers beautifully.",
    image: "/products/product-4.jpg",
  },
  {
    id: "p-005",
    slug: "minimal-trench-coat",
    name: "Minimal Trench Coat",
    category: "Outerwear",
    gender: "Women",
    price: 180,
    oldPrice: 240,
    rating: 4.8,
    reviews: 143,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sand", "Olive", "Black"],
    stock: 12,
    description:
      "A clean double-breasted trench with a storm flap, removable belt, and crisp cotton-touch finish.",
    image: "/products/product-5.jpg",
  },
  {
    id: "p-006",
    slug: "boxy-cotton-tee",
    name: "Boxy Cotton Tee",
    category: "T-Shirts",
    gender: "Unisex",
    price: 42,
    oldPrice: 58,
    rating: 4.5,
    reviews: 208,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Washed Black", "Clay"],
    stock: 52,
    description:
      "A heavyweight cotton tee with a boxy fit, dropped shoulder, and durable ribbed neckline.",
    image: "/products/product-6.jpg",
  },
  {
    id: "p-007",
    slug: "pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    category: "Skirts",
    gender: "Women",
    price: 88,
    oldPrice: 116,
    rating: 4.6,
    reviews: 69,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Graphite", "Champagne", "Plum"],
    stock: 21,
    description:
      "A softly structured midi skirt with fine pleats, an easy waistband, and graceful movement.",
    image: "/products/product-7.jpg",
  },
  {
    id: "p-008",
    slug: "structured-denim-jacket",
    name: "Structured Denim Jacket",
    category: "Outerwear",
    gender: "Men",
    price: 124,
    oldPrice: 158,
    rating: 4.7,
    reviews: 92,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Indigo", "Ecru", "Black"],
    stock: 19,
    description:
      "A structured denim jacket with a modern cropped length, matte hardware, and premium washed texture.",
    image: "/products/product-8.jpg",
  },
  {
    id: "p-009",
    slug: "cashmere-crew-sweater",
    name: "Cashmere Crew Sweater",
    category: "Knitwear",
    gender: "Unisex",
    price: 156,
    oldPrice: 198,
    rating: 4.9,
    reviews: 117,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oat", "Heather Grey", "Deep Navy"],
    stock: 17,
    description:
      "A pure cashmere crew with ribbed trims, feather-soft warmth, and a timeless regular fit.",
    image: "/products/product-9.jpg",
  },
  {
    id: "p-010",
    slug: "linen-resort-shirt",
    name: "Linen Resort Shirt",
    category: "Shirts",
    gender: "Men",
    price: 82,
    oldPrice: 108,
    rating: 4.4,
    reviews: 58,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sky", "Pistachio"],
    stock: 28,
    description:
      "A breathable linen resort shirt with a camp collar, relaxed body, and vacation-ready drape.",
    image: "/products/product-10.jpg",
  },
  {
    id: "p-011",
    slug: "satin-slip-dress",
    name: "Satin Slip Dress",
    category: "Dresses",
    gender: "Women",
    price: 132,
    oldPrice: 168,
    rating: 4.8,
    reviews: 88,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Wine", "Pearl"],
    stock: 14,
    description:
      "A bias-cut satin slip dress with adjustable straps, liquid shine, and a refined ankle-grazing length.",
    image: "/products/product-11.jpg",
  },
  {
    id: "p-012",
    slug: "tapered-cargo-pant",
    name: "Tapered Cargo Pant",
    category: "Bottoms",
    gender: "Men",
    price: 104,
    oldPrice: 136,
    rating: 4.5,
    reviews: 73,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Olive", "Black", "Taupe"],
    stock: 26,
    description:
      "A premium cargo pant with a tapered leg, roomy utility pockets, and a smooth cotton-nylon finish.",
    image: "/products/product-12.jpg",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

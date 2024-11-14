const navLinks = [
  {
    id: 1,
    name: "shop",
    link: "/shop",
  },
  {
    id: 2,
    name: "categories",
    link: "/categories",
  },
  {
    id: 3,
    name: "about",
    link: "/about",
  },
  {
    id: 4,
    name: "contact",
    link: "/contact",
  },
];

const products = [
  {
    name: "Smart Home Hub",
    description:
      "An all-in-one smart home control hub that connects and manages all your devices from one place. Features voice control, remote app access, and compatibility with all major smart home brands.",
    price: 199.99,
    category: "Electronics",
    specifications: {
      voiceAssistantSupport: ["Alexa", "Google Assistant"],
      connectivity: ["Wi-Fi", "Bluetooth"],
      remoteAppControl: true,
    },
    imageUrl: "/images/products/p1.jpg",
  },
  {
    name: "Ergonomic Office Chair",
    description:
      "Designed for maximum comfort during long working hours, this ergonomic chair offers lumbar support, adjustable height, and a reclining backrest. Ideal for both home and office environments.",
    price: 149.99,
    category: "Furniture",
    specifications: {
      adjustableArmrests: true,
      lumbarSupport: true,
      backrest: "Breathable mesh",
      recliningAngle: "130°",
    },
    imageUrl: "/images/products/p2.jpg",
  },
  {
    name: "Portable Blender Bottle",
    description:
      "Perfect for on-the-go, this portable blender bottle is compact, easy to clean, and USB rechargeable. Ideal for smoothies, protein shakes, and more.",
    price: 29.99,
    category: "Kitchenware",
    specifications: {
      capacity: "300ml",
      rechargeable: "USB",
      material: "BPA-free plastic",
    },
    imageUrl: "/images/products/p3.jpg",
  },
  {
    name: "Wireless Noise-Canceling Headphones",
    description:
      "High-quality wireless headphones with active noise cancellation for immersive sound. Features long battery life and a comfortable, over-ear design.",
    price: 299.99,
    category: "Audio",
    specifications: {
      batteryLife: "30 hours",
      connectivity: ["Bluetooth 5.0"],
      noiseCancellation: true,
      waterResistance: "IPX4",
    },
    imageUrl: "/images/products/p4.jpg",
  },
];

export { navLinks, products };

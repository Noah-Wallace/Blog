const posts = [
  {
    id: 0,
    title: "Space Architecture: Designing Homes Among the Stars",
    excerpt:
      "Exploring the innovative solutions being developed for future space habitats and how we'll live in space.",
    date: "2025-07-16",
    author: "Noah Wallace",
    imageUrl: "/assets/space-bg.jpg",
    tags: ["space", "architecture", "technology", "innovation"],
    category: "Space Technology",
  },
  {
    id: 1,
    title: "The Future of Space Travel",
    excerpt:
      "A look at upcoming technologies that will revolutionize how we explore the cosmos.",
    date: "2025-07-15",
    author: "Noah Wallace",
    imageUrl: "/assets/satellites.jpg",
    tags: ["space", "travel", "technology", "future"],
    category: "Space Technology",
  },
  {
    id: 2,
    title: "Space Microservices: Building Reliable Systems",
    excerpt:
      "How modern software architecture is helping us build more reliable space systems.",
    date: "2025-07-14",
    author: "Noah Wallace",
    imageUrl: "/assets/microservices.jpg",
    tags: ["software", "microservices", "space", "technology"],
    category: "Web Development",
  },
];

// For CommonJS (Node.js)
if (typeof module !== "undefined" && module.exports) {
  module.exports = posts;
}

// For ES Modules
export default posts;

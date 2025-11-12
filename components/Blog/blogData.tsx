import { Blog } from "@/types/blog";

const BlogData = [
  {
    _id: 1,
    title: "Blog Post 1",
    description:
      "Learn about the latest trends in SaaS development and how to implement them in your business.",
    pdfPath: "/pdfs/sample1.pdf",
    author: {
      name: "John Doe",
      image: "/images/author/author-01.png",
      role: "Senior Developer",
    },
    tags: ["business", "saas"],
    publishedAt: "2024-05-16",
    readTime: "5 min read",
    thumbnail: "/images/blog/blog-01.jpg",
    excerpt:
      "This comprehensive guide covers everything you need to know about modern SaaS development...",
  },
  {
    _id: 2,
    title: "Blog Post 2",
    pdfPath: "/pdfs/sample2.pdf",
    author: {
      name: "Jane Smith",
      image: "/images/author/author-02.png",
    },
    tags: ["technology", "ai"],
    publishedAt: "2024-05-15",
  },
  {
    _id: 3,
    title: "Blog Post 3",
    pdfPath: "/pdfs/sample3.pdf",
    author: {
      name: "Mike Johnson",
      image: "/images/author/author-03.png",
    },
    tags: ["startup", "guide"],
    publishedAt: "2024-05-14",
  },
];

export default BlogData;

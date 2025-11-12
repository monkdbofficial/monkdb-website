import { Blog } from "@/types/blog";

const BlogData: Blog[] = [
  {
    _id: 1,
    title: "Getting Started with MONKDB - Part 1",
    slug: "mongodb-tutorial-part-1",
    description:
      "Learn the fundamentals of MONKDB and how to leverage our NoSQL database platform.",
    youtubeUrl: "https://www.youtube.com/watch?v=heITkFnI1Ho",
    contentType: "youtube",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-01.png",
      role: "Technical Writer",
    },
    tags: ["mongodb", "tutorial", "database"],
    publishedAt: "2024-01-15",
    readTime: "15 min watch",
    excerpt:
      "Comprehensive introduction to MongoDB covering basic concepts and getting started...",
  },
  {
    _id: 2,
    title: "Advanced MONKDB Features",
    slug: "mongodb-advanced-tutorial",
    description:
      "Deep dive into advanced MONKDB capabilities including aggregation and indexing optimization.",
    youtubeUrl: "https://www.youtube.com/watch?v=TE36eSoICbQ",
    contentType: "youtube",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-02.png",
      role: "Senior Developer",
    },
    tags: ["mongodb", "advanced", "tutorial"],
    publishedAt: "2024-01-20",
    readTime: "20 min watch",
    excerpt:
      "Master advanced MongoDB features with this comprehensive tutorial...",
  },
  {
    _id: 3,
    title: "MONKDB Performance Optimization Guide",
    slug: "mongodb-performance-optimization",
    description:
      "Learn how to optimize your MONKDB queries and improve database performance.",
    youtubeUrl: "https://www.youtube.com/watch?v=J3csB1Si46E",
    contentType: "youtube",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-03.png",
      role: "Database Expert",
    },
    tags: ["mongodb", "performance", "optimization"],
    publishedAt: "2024-01-25",
    readTime: "18 min watch",
    excerpt:
      "Discover best practices for optimizing MongoDB performance...",
  },
  {
    _id: 4,
    title: "MONKDB Schema Design Best Practices",
    slug: "mongodb-schema-design-guide",
    description:
      "Complete guide to designing effective schemas for your MONKDB applications.",
    googleDriveUrl: "https://drive.google.com/file/d/11TDckq93mIGpNpP1PA9YayMl8HhRz99z/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-01.png",
      role: "Technical Writer",
    },
    tags: ["mongodb", "schema", "design"],
    publishedAt: "2024-02-01",
    readTime: "30 min read",
    excerpt:
      "Learn the best practices for MongoDB schema design...",
  },
  {
    _id: 5,
    title: "MONKDB Security Best Practices",
    slug: "mongodb-security-best-practices",
    description:
      "Essential security practices to keep your MONKDB database secure and compliant.",
    googleDriveUrl: "https://drive.google.com/file/d/18r7az1yIuksOs4CQxvlUqIZq7p01Scon/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "Security Team",
      image: "/images/author/author-02.png",
      role: "Security Expert",
    },
    tags: ["mongodb", "security", "best-practices"],
    publishedAt: "2024-02-05",
    readTime: "25 min read",
    excerpt:
      "Comprehensive guide to securing your MongoDB deployments...",
  },
  {
    _id: 6,
    title: "MONKDB Aggregation Framework",
    slug: "mongodb-aggregation-framework",
    description:
      "Master the MONKDB aggregation framework for complex data operations.",
    googleDriveUrl: "https://drive.google.com/file/d/15PV86o-5d8__pcyjFkKyqUyI_C47KMZZ/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-03.png",
      role: "Database Architect",
    },
    tags: ["mongodb", "aggregation", "queries"],
    publishedAt: "2024-02-10",
    readTime: "35 min read",
    excerpt:
      "Deep dive into MongoDB's powerful aggregation pipeline...",
  },
  {
    _id: 7,
    title: "MONKDB Replication & High Availability",
    slug: "mongodb-replication-guide",
    description:
      "Learn about MONKDB replication and how to set up replica sets for high availability.",
    googleDriveUrl: "https://drive.google.com/file/d/1ivoz2S7azgSoCNazYuglVKwsMyLOPPHg/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "DevOps Team",
      image: "/images/author/author-01.png",
      role: "DevOps Engineer",
    },
    tags: ["mongodb", "replication", "high-availability"],
    publishedAt: "2024-02-15",
    readTime: "28 min read",
    excerpt:
      "Understand MongoDB replication for high availability...",
  },
  {
    _id: 8,
    title: "MONKDB Sharding for Enterprise Scale",
    slug: "mongodb-sharding-explained",
    description:
      "Complete guide to MONKDB sharding for horizontal scaling in enterprise environments.",
    googleDriveUrl: "https://drive.google.com/file/d/1WMYRolsJN6q_KMotUeHhBXjhJBe1MO54/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-02.png",
      role: "Database Architect",
    },
    tags: ["mongodb", "sharding", "scaling"],
    publishedAt: "2024-02-20",
    readTime: "32 min read",
    excerpt:
      "Scale your MongoDB database horizontally with sharding...",
  },
  {
    _id: 9,
    title: "MONKDB Backup and Disaster Recovery",
    slug: "mongodb-backup-recovery",
    description:
      "Essential strategies for backing up and recovering your MONKDB data.",
    googleDriveUrl: "https://drive.google.com/file/d/1EReALi4OsepmU7exvQh7PiSjoXiaOXac/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "DevOps Team",
      image: "/images/author/author-03.png",
      role: "DevOps Engineer",
    },
    tags: ["mongodb", "backup", "disaster-recovery"],
    publishedAt: "2024-02-25",
    readTime: "22 min read",
    excerpt:
      "Protect your data with proper backup and recovery strategies...",
  },
  {
    _id: 10,
    title: "MONKDB Indexing Strategies",
    slug: "mongodb-indexes-deep-dive",
    description:
      "Comprehensive guide to MONKDB indexing for optimal query performance.",
    googleDriveUrl: "https://drive.google.com/file/d/1mJh-RbgWtk-21Ev78o8KLgigFYVbrEcf/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-01.png",
      role: "Performance Engineer",
    },
    tags: ["mongodb", "indexes", "performance"],
    publishedAt: "2024-03-01",
    readTime: "27 min read",
    excerpt:
      "Master MongoDB indexing for faster queries and better performance...",
  },
  {
    _id: 11,
    title: "MONKDB Cloud Deployment Guide",
    slug: "mongodb-atlas-cloud-guide",
    description:
      "Deploy and manage MONKDB in the cloud with our comprehensive guide.",
    googleDriveUrl: "https://drive.google.com/file/d/1BIkTB6pUYjJ8DkJHyOVrQJUd_CzPfZr0/view?usp=sharing",
    contentType: "pdf",
    author: {
      name: "MONKDB Team",
      image: "/images/author/author-02.png",
      role: "Cloud Specialist",
    },
    tags: ["mongodb", "atlas", "cloud"],
    publishedAt: "2024-03-05",
    readTime: "24 min read",
    excerpt:
      "Deploy and manage MongoDB in the cloud with Atlas...",
  },
];

export default BlogData;

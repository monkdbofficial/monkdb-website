import mongoose from 'mongoose';
import Blog from '../models/Blog';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/monkdb';

const blogData = [
  {
    title: "Getting Started with MONKDB - Part 1",
    slug: "mongodb-tutorial-part-1",
    description: "Learn the fundamentals of MONKDB and how to leverage our NoSQL database platform.",
    excerpt: "Comprehensive introduction to MongoDB covering basic concepts and getting started...",
    content: "<p>Learn the fundamentals of MONKDB and how to leverage our NoSQL database platform.</p>",
    youtubeUrl: "https://www.youtube.com/watch?v=heITkFnI1Ho",
    contentType: "youtube" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "tutorial", "database"],
    category: "Tutorial",
    readTime: "15 min watch",
    published: true,
    featured: false,
  },
  {
    title: "Advanced MONKDB Features",
    slug: "mongodb-advanced-tutorial",
    description: "Deep dive into advanced MONKDB capabilities including aggregation and indexing optimization.",
    excerpt: "Master advanced MongoDB features with this comprehensive tutorial...",
    content: "<p>Deep dive into advanced MONKDB capabilities including aggregation and indexing optimization.</p>",
    youtubeUrl: "https://www.youtube.com/watch?v=TE36eSoICbQ",
    contentType: "youtube" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "advanced", "tutorial"],
    category: "Tutorial",
    readTime: "20 min watch",
    published: true,
    featured: false,
  },
  {
    title: "MONKDB Performance Optimization Guide",
    slug: "mongodb-performance-optimization",
    description: "Learn how to optimize your MONKDB queries and improve database performance.",
    excerpt: "Discover best practices for optimizing MongoDB performance...",
    content: "<p>Learn how to optimize your MONKDB queries and improve database performance.</p>",
    youtubeUrl: "https://www.youtube.com/watch?v=J3csB1Si46E",
    contentType: "youtube" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "performance", "optimization"],
    category: "Guide",
    readTime: "18 min watch",
    published: true,
    featured: true,
  },
  {
    title: "MONKDB Schema Design Best Practices",
    slug: "mongodb-schema-design-guide",
    description: "Complete guide to designing effective schemas for your MONKDB applications.",
    excerpt: "Learn the best practices for MongoDB schema design...",
    content: "<p>Complete guide to designing effective schemas for your MONKDB applications.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/11TDckq93mIGpNpP1PA9YayMl8HhRz99z/view?usp=sharing",
    contentType: "pdf" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "schema", "design"],
    category: "Best Practices",
    readTime: "30 min read",
    published: true,
    featured: true,
  },
  {
    title: "MONKDB Security Best Practices",
    slug: "mongodb-security-best-practices",
    description: "Essential security practices to keep your MONKDB database secure and compliant.",
    excerpt: "Comprehensive guide to securing your MongoDB deployments...",
    content: "<p>Essential security practices to keep your MONKDB database secure and compliant.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/18r7az1yIuksOs4CQxvlUqIZq7p01Scon/view?usp=sharing",
    contentType: "pdf" as const,
    author: "Security Team",
    tags: ["mongodb", "security", "best-practices"],
    category: "Best Practices",
    readTime: "25 min read",
    published: true,
    featured: false,
  },
  {
    title: "MONKDB Aggregation Framework",
    slug: "mongodb-aggregation-framework",
    description: "Master the MONKDB aggregation framework for complex data operations.",
    excerpt: "Deep dive into MongoDB's powerful aggregation pipeline...",
    content: "<p>Master the MONKDB aggregation framework for complex data operations.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/15PV86o-5d8__pcyjFkKyqUyI_C47KMZZ/view?usp=sharing",
    contentType: "pdf" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "aggregation", "queries"],
    category: "Guide",
    readTime: "35 min read",
    published: true,
    featured: true,
  },
  {
    title: "MONKDB Replication & High Availability",
    slug: "mongodb-replication-guide",
    description: "Learn about MONKDB replication and how to set up replica sets for high availability.",
    excerpt: "Understand MongoDB replication for high availability...",
    content: "<p>Learn about MONKDB replication and how to set up replica sets for high availability.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/1ivoz2S7azgSoCNazYuglVKwsMyLOPPHg/view?usp=sharing",
    contentType: "pdf" as const,
    author: "DevOps Team",
    tags: ["mongodb", "replication", "high-availability"],
    category: "Guide",
    readTime: "28 min read",
    published: true,
    featured: false,
  },
  {
    title: "MONKDB Sharding for Enterprise Scale",
    slug: "mongodb-sharding-explained",
    description: "Complete guide to MONKDB sharding for horizontal scaling in enterprise environments.",
    excerpt: "Scale your MongoDB database horizontally with sharding...",
    content: "<p>Complete guide to MONKDB sharding for horizontal scaling in enterprise environments.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/1WMYRolsJN6q_KMotUeHhBXjhJBe1MO54/view?usp=sharing",
    contentType: "pdf" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "sharding", "scaling"],
    category: "Guide",
    readTime: "32 min read",
    published: true,
    featured: false,
  },
  {
    title: "MONKDB Backup and Disaster Recovery",
    slug: "mongodb-backup-recovery",
    description: "Essential strategies for backing up and recovering your MONKDB data.",
    excerpt: "Protect your data with proper backup and recovery strategies...",
    content: "<p>Essential strategies for backing up and recovering your MONKDB data.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/1EReALi4OsepmU7exvQh7PiSjoXiaOXac/view?usp=sharing",
    contentType: "pdf" as const,
    author: "DevOps Team",
    tags: ["mongodb", "backup", "disaster-recovery"],
    category: "Guide",
    readTime: "22 min read",
    published: true,
    featured: false,
  },
  {
    title: "MONKDB Indexing Strategies",
    slug: "mongodb-indexes-deep-dive",
    description: "Comprehensive guide to MONKDB indexing for optimal query performance.",
    excerpt: "Master MongoDB indexing for faster queries and better performance...",
    content: "<p>Comprehensive guide to MONKDB indexing for optimal query performance.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/1mJh-RbgWtk-21Ev78o8KLgigFYVbrEcf/view?usp=sharing",
    contentType: "pdf" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "indexes", "performance"],
    category: "Guide",
    readTime: "27 min read",
    published: true,
    featured: false,
  },
  {
    title: "MONKDB Cloud Deployment Guide",
    slug: "mongodb-atlas-cloud-guide",
    description: "Deploy and manage MONKDB in the cloud with our comprehensive guide.",
    excerpt: "Deploy and manage MongoDB in the cloud with Atlas...",
    content: "<p>Deploy and manage MONKDB in the cloud with our comprehensive guide.</p>",
    googleDriveUrl: "https://drive.google.com/file/d/1BIkTB6pUYjJ8DkJHyOVrQJUd_CzPfZr0/view?usp=sharing",
    contentType: "pdf" as const,
    author: "MONKDB Team",
    tags: ["mongodb", "atlas", "cloud"],
    category: "Guide",
    readTime: "24 min read",
    published: true,
    featured: false,
  },
];

async function seedBlogs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blogs (optional - comment out if you want to keep existing ones)
    console.log('Clearing existing blogs...');
    await Blog.deleteMany({});

    // Insert new blogs
    console.log('Inserting blog posts...');
    const insertedBlogs = await Blog.insertMany(blogData);

    console.log(`✅ Successfully inserted ${insertedBlogs.length} blog posts!`);

    // Display inserted blogs
    insertedBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (${blog.contentType})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
}

seedBlogs();

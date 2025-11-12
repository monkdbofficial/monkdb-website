import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "What makes MonkDB unique?",
    ans: "MonkDB is a unified, AI-native database that combines multiple data models (Vector, Time-Series, Geospatial, etc.) into one platform with built-in AI capabilities, simplifying architecture and reducing overhead.",
  },
  {
    id: 2,
    quest: "How does MonkDB reduce costs?",
    ans: "By consolidating multiple databases into a single platform, MonkDB reduces licensing costs, maintenance overhead, and simplifies architecture while enabling faster development.",
  },
  {
    id: 3,
    quest: "What's MonkDB's performance like?",
    ans: "MonkDB delivers 1.5M+ QPS for vector workloads, <2-4 ms latency under high concurrency, and horizontal scalability while maintaining high availability.",
  },
  {
    id: 4,
    quest: "Is MonkDB secure?",
    ans: "Yes, MonkDB features enterprise-grade security with zero-trust architecture, VPN connectivity, IAM controls, data isolation, and comprehensive compliance features.",
  },
  {
    id: 5,
    quest: "What industries use MonkDB?",
    ans: "MonkDB serves Manufacturing, Healthcare, Retail, Banking and more, supporting use cases like predictive maintenance, medical AI, personalized recommendations, and fraud detection.",
  },
];

export default faqData;

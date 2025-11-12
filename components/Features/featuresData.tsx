import { Feature } from "@/types/feature";
import { Database, Layers, Zap, Shield, Code2, Cloud } from "lucide-react";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <Database className="h-6 w-6" />,
    title: "AI-Native by Design",
    description:
      "Built ground-up for AI workloads with native vector processing, embedding models, and hybrid search capabilities integrated at the core.",
    highlights: ["Native vector support", "Real-time inference"],
  },
  {
    id: 2,
    icon: <Layers className="h-6 w-6" />,
    title: "Unified Multi-Modal Engine",
    description:
      "One powerful engine supporting vector, time-series, geospatial, document, blob, and streaming data types — all through a single query layer.",
    highlights: [
      "7+ data modalities",
      "Single query interface",
      "Zero integration overhead",
    ],
  },
  {
    id: 3,
    icon: <Zap className="h-6 w-6" />,
    title: "Enterprise-Grade Performance",
    description:
      "Achieves 1.5M+ QPS with distributed architecture optimized for low-latency analytics and real-time processing at scale.",
    highlights: [
      "Sub-2-4 ms latency",
      "Horizontal scaling",
      "High availability",
    ],
  },
  {
    id: 4,
    icon: <Shield className="h-6 w-6" />,
    title: "Security & Compliance",
    description:
      "Built-in enterprise security with on-premises deployment, VPN-secured control plane, and comprehensive access controls.",
    highlights: [
      "Zero-trust architecture",
      "Data sovereignty",
      "Audit compliance",
    ],
  },
  {
    id: 5,
    icon: <Code2 className="h-6 w-6" />,
    title: "Developer First",
    description:
      "Modern SDKs, intuitive APIs, and comprehensive documentation to help teams build intelligent applications faster.",
    highlights: [
      "Python & TypeScript SDKs",
      "REST & SQL APIs",
      "Rich documentation",
    ],
  },
  {
    id: 6,
    icon: <Cloud className="h-6 w-6" />,
    title: "Flexible Deployment",
    description:
      "Deploy anywhere with our EKS-based control plane — works seamlessly across AWS, Azure, GCP, and on-premises environments.",
    highlights: [
      "Multi-cloud ready",
      "Kubernetes native",
      "Easy orchestration",
    ],
  },
];

export default featuresData;

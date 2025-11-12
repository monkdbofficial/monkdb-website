"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = () => {
  const pathname = usePathname();

  const sidebarData = [
    {
      title: "Getting Started",
      items: [
        { name: "Introduction", path: "/docs" },
        { name: "Platform Overview", path: "/docs/platform-overview" },
        { name: "Why MonkDB", path: "/docs/why-monkdb" },
      ],
    },
    {
      title: "Core Features",
      items: [
        { name: "AI-Native Design", path: "/docs/ai-native" },
        { name: "Unified Data Engine", path: "/docs/unified-engine" },
        { name: "Multi-Modal Support", path: "/docs/multi-modal" },
        { name: "Performance & Scalability", path: "/docs/performance" },
        { name: "Security & Compliance", path: "/docs/security" },
      ],
    },
    {
      title: "Use Cases",
      items: [
        { name: "By Industry", path: "/docs/industry-use-cases" },
        { name: "By Function", path: "/docs/functional-use-cases" },
      ],
    },
    {
      title: "Architecture",
      items: [
        { name: "System Overview", path: "/docs/architecture" },
        { name: "Control Plane", path: "/docs/control-plane" },
        { name: "Data Plane", path: "/docs/data-plane" },
        { name: "Multi-Modal Engine", path: "/docs/engine" },
      ],
    },
    {
      title: "Deployment",
      items: [
        { name: "Getting Started", path: "/docs/deployment" },
        { name: "Cloud Deployment", path: "/docs/cloud" },
        { name: "On-Premise", path: "/docs/on-premise" },
        { name: "Kubernetes", path: "/docs/kubernetes" },
      ],
    },
  ];

  return (
    <>
      {sidebarData.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx} className="block">
                <Link
                  href={item.path}
                  className={`flex w-full rounded-sm px-3 py-2 text-sm transition-colors duration-200 ${
                    pathname === item.path
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default SidebarLink;

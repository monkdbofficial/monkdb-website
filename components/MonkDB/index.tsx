"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const MonkDBComponent = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [clientSideRendered, setClientSideRendered] = useState(false);

  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
    setClientSideRendered(true);

    // Optimized animation using requestAnimationFrame
    let lastTimestamp = 0;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Increased rotation speed by multiplying deltaTime by 0.01 instead of 0.003
      // Using Math.sin to create smoother acceleration/deceleration
      const rotationSpeed = 0.01 * (1 + Math.sin(timestamp * 0.001) * 0.3);
      setRotation(
        (prevRotation) => (prevRotation + deltaTime * rotationSpeed) % 360,
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Orchestrated section activation sequence
    let currentSectionIndex = 0;
    const initiateSectionSequence = () => {
      const allSections = [...sections, ...innerSections];

      const activateNextSection = () => {
        setActiveSection(allSections[currentSectionIndex].id);

        const deactivationTimeout = setTimeout(() => {
          setActiveSection(null);
          currentSectionIndex = (currentSectionIndex + 1) % allSections.length;
          const nextActivationTimeout = setTimeout(activateNextSection, 1500);
          return () => clearTimeout(nextActivationTimeout);
        }, 4000);

        return () => clearTimeout(deactivationTimeout);
      };

      activateNextSection();
    };

    const initialSequenceDelay = setTimeout(initiateSectionSequence, 2000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(initialSequenceDelay);
    };
  }, []);

  const sections = [
    {
      id: "vector",
      name: "Vector",
      color: isDarkMode ? "bg-teal-800/90" : "bg-teal-600/90",
      hoverColor: isDarkMode ? "bg-teal-700" : "bg-teal-500",
      icon: "⋮⋮",
      description: "Advanced high-dimensional vector search capabilities",
      angle: 0,
      orbitRadius: 42,
      orbitTilt: 20,
      glowColor: "teal",
    },
    {
      id: "time-series",
      name: "Time Series",
      color: isDarkMode ? "bg-blue-800/90" : "bg-blue-600/90",
      hoverColor: isDarkMode ? "bg-blue-700" : "bg-blue-500",
      icon: "📈",
      description: "Enterprise-grade temporal data analytics",
      angle: 60,
      orbitRadius: 42,
      orbitTilt: 20,
      glowColor: "blue",
    },
    {
      id: "sql",
      name: "SQL",
      color: isDarkMode ? "bg-indigo-800/90" : "bg-indigo-600/90",
      hoverColor: isDarkMode ? "bg-indigo-700" : "bg-indigo-500",
      icon: "⋮⋮",
      description: "ANSI SQL compliant query interface",
      angle: 120,
      orbitRadius: 42,
      orbitTilt: 20,
      glowColor: "indigo",
    },
    {
      id: "document",
      name: "Document",
      color: isDarkMode ? "bg-purple-800/90" : "bg-purple-600/90",
      hoverColor: isDarkMode ? "bg-purple-700" : "bg-purple-500",
      icon: "⧠",
      description: "Flexible document-oriented storage engine",
      angle: 180,
      orbitRadius: 42,
      orbitTilt: 20,
      glowColor: "purple",
    },
    {
      id: "full-text",
      name: "Full Text",
      color: isDarkMode ? "bg-pink-800/90" : "bg-pink-600/90",
      hoverColor: isDarkMode ? "bg-pink-700" : "bg-pink-500",
      icon: "⌕",
      description: "Enterprise full-text search capabilities",
      angle: 240,
      orbitRadius: 42,
      orbitTilt: 20,
      glowColor: "pink",
    },
    {
      id: "streaming",
      name: "Streaming",
      color: isDarkMode ? "bg-cyan-800/90" : "bg-cyan-600/90",
      hoverColor: isDarkMode ? "bg-cyan-700" : "bg-cyan-500",
      icon: "⟳",
      description: "High-throughput data streaming engine",
      angle: 300,
      orbitRadius: 42,
      orbitTilt: 20,
      glowColor: "cyan",
    },
  ];

  const innerSections = [
    {
      id: "ai",
      name: "AI",
      color: isDarkMode ? "bg-amber-800/90" : "bg-amber-600/90",
      hoverColor: isDarkMode ? "bg-amber-700" : "bg-amber-500",
      icon: "🧠",
      description: "Advanced machine learning integration",
      angle: 0,
      orbitRadius: 24,
      orbitTilt: -20,
      glowColor: "amber",
    },
    {
      id: "analytics",
      name: "Analytics",
      color: isDarkMode ? "bg-emerald-800/90" : "bg-emerald-600/90",
      hoverColor: isDarkMode ? "bg-emerald-700" : "bg-emerald-500",
      icon: "📊",
      description: "Enterprise analytics platform",
      angle: 120,
      orbitRadius: 24,
      orbitTilt: -20,
      glowColor: "emerald",
    },
    {
      id: "cloud",
      name: "Cloud",
      color: isDarkMode ? "bg-sky-800/90" : "bg-sky-600/90",
      hoverColor: isDarkMode ? "bg-sky-700" : "bg-sky-500",
      icon: "☁️",
      description: "Global cloud infrastructure",
      angle: 240,
      orbitRadius: 24,
      orbitTilt: -20,
      glowColor: "sky",
    },
  ];

  const handleSectionHover = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const calculatePosition = (section, rotationOffset = 0) => {
    const angleRad = ((section.angle + rotationOffset) * Math.PI) / 180;
    const tiltRad = (section.orbitTilt * Math.PI) / 180;

    // Calculate proper elliptical orbit positions
    const x = Number((50 + section.orbitRadius * Math.cos(angleRad)).toFixed(4));
    const y = Number(
      (50 + section.orbitRadius * Math.sin(angleRad) * Math.cos(tiltRad)).toFixed(4),
    );

    // Calculate z-depth for proper layering (elements at bottom appear closer)
    const zDepth = Math.sin(angleRad) * Math.sin(tiltRad);
    const scale = Number((0.85 + 0.25 * zDepth).toFixed(4));
    const zIndex = Math.round(50 + zDepth * 30);

    return { x, y, scale, zIndex };
  };

  // Don't render the interactive content until client-side hydration is complete
  if (!clientSideRendered) {
    return <div className="h-full w-full"></div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center">
          <div className="relative aspect-square w-full">
            {/* Enhanced radial gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-white via-blue-50 to-transparent opacity-30 blur-3xl dark:from-gray-900 dark:via-blue-900/30 dark:to-transparent"></div>

            {/* Professional ambient lighting effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/20 via-purple-200/10 to-teal-200/20 opacity-40 blur-3xl dark:from-blue-900/20 dark:via-purple-900/10 dark:to-teal-900/20"></div>

            {/* Enterprise-grade visual effects */}
            <div className="absolute inset-[5%] animate-pulse-slow rounded-full bg-gradient-to-r from-blue-100/10 via-purple-100/10 to-teal-100/10 opacity-30 blur-3xl dark:from-blue-900/10 dark:via-purple-900/10 dark:to-teal-900/10"></div>

            {/* Orbital system with enhanced styling */}
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Primary orbital ring */}
              <div className="absolute inset-[8%] rounded-full border border-gray-200/30 shadow-[0_0_35px_rgba(59,130,246,0.15)] backdrop-blur-sm transition-all duration-500 dark:border-gray-700/30 dark:shadow-[0_0_35px_rgba(59,130,246,0.2)]"></div>

              {/* Secondary orbital ring */}
              <div className="absolute inset-[7.5%] rounded-full border-[0.5px] border-gray-200/20 transition-all duration-500 dark:border-gray-700/20"></div>

              {/* Inner orbital ring */}
              <div className="absolute inset-[28%] rounded-full border border-gray-200/30 shadow-[0_0_35px_rgba(59,130,246,0.15)] backdrop-blur-sm transition-all duration-500 dark:border-gray-700/30 dark:shadow-[0_0_35px_rgba(59,130,246,0.2)]"></div>

              {/* Secondary inner orbital ring */}
              <div className="absolute inset-[27.5%] rounded-full border-[0.5px] border-gray-200/20 transition-all duration-500 dark:border-gray-700/20"></div>
            </div>

            {/* Enterprise logo presentation */}
            <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="group flex h-28 w-28 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_32px_rgba(59,130,246,0.25)] backdrop-blur-md transition-all duration-500 hover:scale-105 dark:bg-gray-800/95 dark:shadow-[0_8px_32px_rgba(59,130,246,0.3)]">
                <div className="flex flex-col items-center justify-center p-2">
                  <div className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:scale-105 dark:from-teal-400 dark:via-blue-500 dark:to-purple-400">
                    MonkDB
                  </div>
                </div>
              </div>
            </div>

            {/* Primary feature sections */}
            {sections.map((section) => {
              const pos = calculatePosition(section, rotation);
              const isActive = activeSection === section.id;

              return (
                <div
                  key={section.id}
                  className="absolute transition-all duration-500"
                  style={{
                    top: `${pos.y}%`,
                    left: `${pos.x}%`,
                    width: "15%",
                    height: "15%",
                    transform: `translate(-50%, -50%) scale(${pos.scale})`,
                    zIndex: isActive ? 100 : pos.zIndex,
                  }}
                >
                  <div
                    className={`group relative flex h-full w-full cursor-pointer items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-500 ${
                      isActive ? section.hoverColor : section.color
                    } text-white hover:scale-110`}
                    style={{
                      boxShadow: isActive
                        ? `0 0 30px ${
                            isDarkMode
                              ? "rgba(56,189,248,0.5)"
                              : "rgba(14,165,233,0.4)"
                          }`
                        : isDarkMode
                          ? "0 10px 30px rgba(0,0,0,0.3)"
                          : "0 10px 30px rgba(0,0,0,0.15)",
                    }}
                    onMouseEnter={() => handleSectionHover(section.id)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <div className="flex flex-col items-center justify-center p-1.5">
                      <div className="mb-0.5 text-lg transition-transform duration-300 group-hover:scale-125">
                        {section.icon}
                      </div>
                      <div className="text-center text-[10px] font-medium uppercase tracking-wider">
                        {section.name.includes(" ") ? (
                          <>
                            <span>{section.name.split(" ")[0]}</span>
                            <br />
                            <span>{section.name.split(" ")[1]}</span>
                          </>
                        ) : (
                          section.name
                        )}
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute left-1/2 top-full mt-2 min-w-[140px] -translate-x-1/2 transform rounded-md bg-white/95 px-3 py-1.5 text-center text-xs font-medium text-gray-800 shadow-2xl backdrop-blur-md transition-all duration-300 dark:bg-gray-800/95 dark:text-gray-200" style={{ zIndex: 150 }}>
                      {section.description}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Secondary feature sections */}
            {innerSections.map((section) => {
              const pos = calculatePosition(section, -rotation * 1.5);
              const isActive = activeSection === section.id;

              return (
                <div
                  key={section.id}
                  className="absolute"
                  style={{
                    top: `${pos.y}%`,
                    left: `${pos.x}%`,
                    width: "11%",
                    height: "11%",
                    transform: `translate(-50%, -50%) scale(${pos.scale})`,
                    zIndex: isActive ? 100 : pos.zIndex,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className={`group relative flex h-full w-full cursor-pointer items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-500 ${
                      isActive ? section.hoverColor : section.color
                    } text-white hover:scale-110`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      boxShadow: isActive
                        ? `0 0 30px ${
                            isDarkMode
                              ? "rgba(56,189,248,0.5)"
                              : "rgba(14,165,233,0.4)"
                          }`
                        : isDarkMode
                          ? "0 10px 30px rgba(0,0,0,0.3)"
                          : "0 10px 30px rgba(0,0,0,0.15)",
                    }}
                    onMouseEnter={() => handleSectionHover(section.id)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <div className="flex flex-col items-center justify-center p-1">
                      <div className="mb-0.5 text-base transition-transform duration-300 group-hover:scale-125">
                        {section.icon}
                      </div>
                      <div className="text-center text-[9px] font-medium uppercase tracking-wider">
                        {section.name}
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute left-1/2 top-full mt-2 min-w-[140px] -translate-x-1/2 transform rounded-md bg-white/95 px-3 py-1.5 text-center text-xs font-medium text-gray-800 shadow-2xl backdrop-blur-md transition-all duration-300 dark:bg-gray-800/95 dark:text-gray-200" style={{ zIndex: 150 }}>
                      {section.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonkDBComponent;

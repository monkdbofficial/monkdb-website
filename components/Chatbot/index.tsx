"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import ContactModal from "./ContactModal";

const DOCUMENTATION_URL = "https://github.com/monkdbofficial/monk-documentation";
const BOT_RESPONSE_DELAY = 600; // milliseconds
const FOCUS_DELAY = 100; // milliseconds

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  options?: QuickReply[];
}

interface QuickReply {
  label: string;
  value: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalType, setContactModalType] = useState<"pricing" | "support" | "general">("general");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your MonkDB assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      options: [
        { label: "Get Pricing", value: "pricing" },
        { label: "Explore Features", value: "features" },
        { label: "Get Started", value: "getting started" },
        { label: "Contact Us", value: "contact support" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), FOCUS_DELAY);
    }
  }, [isOpen]);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatboxRef.current && !chatboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const getBotResponse = useCallback((userMessage: string): { text: string; options?: QuickReply[] } => {
    const message = userMessage.toLowerCase().trim();

    // Return empty response for empty messages
    if (!message) {
      return {
        text: "I'm here to help! What would you like to know?",
        options: [
          { label: "Get Pricing", value: "pricing" },
          { label: "View Features", value: "features" },
          { label: "Get Started", value: "getting started" },
          { label: "Contact Us", value: "contact support" },
        ],
      };
    }

    // Common variations and typos handling helper
    const containsAny = (keywords: string[]) => keywords.some(keyword => message.includes(keyword));

    // Export/Import/Migration queries - with typo tolerance
    if (containsAny(["export", "import", "migrate", "migration", "data transfer", "transfer data", "move data", "etl"])) {
      // Open documentation in new window
      if (typeof window !== "undefined") {
        window.open(DOCUMENTATION_URL, "_blank", "noopener,noreferrer");
      }
      return {
        text: `📤 Data Export & Import\n\nSupported Formats:\n• JSON, CSV, Parquet, Avro\n• Native database formats\n• Streaming for large datasets\n\nFeatures:\n• Bulk import/export APIs\n• Schema migration tools\n• ETL pipeline connectors\n• Real-time sync\n\n📚 Documentation opened in new tab!\n\nFind detailed guides and code examples in our GitHub repository.`,
        options: [
          { label: "Contact Support", value: "contact support" },
          { label: "Get Pricing", value: "pricing" },
          { label: "View Features", value: "features" },
        ],
      };
    }

    // Pricing queries - with common variations and typos
    if (containsAny(["price", "pricing", "priceing", "cost", "costs", "how much", "payment", "pay", "subscription", "plan", "plans", "budget", "afford"])) {
      return {
        text: "Let me help you with pricing information.",
        options: [
          { label: "View Features", value: "features" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    // Features queries - with variations
    if (containsAny(["feature", "features", "what can", "capabilities", "capability", "can you", "can monkdb", "what does", "functionality", "what is"])) {
      return {
        text: "MonkDB: AI-Native Unified Database Platform\n\nOur platform includes 6 integrated database types:\n\n• Vector Database - AI/ML embeddings & similarity search\n• Time-Series Database - Real-time temporal data\n• Geo-Spatial Database - Location-based queries\n• Document Database - Flexible JSON schemas\n• Full-Text Search - Advanced text indexing\n• Streaming SQL - Real-time analytics\n\nAll seamlessly integrated with enterprise-grade performance.",
        options: [
          { label: "Learn More", value: "vector database" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    // Support/Contact queries - with variations
    if (containsAny(["support", "help", "assist", "contact", "reach out", "get in touch", "talk to", "speak to", "speak with", "email", "call", "phone"])) {
      return {
        text: "We're Here to Help\n\nContact Options:\n\nEmail Support\nResponse within 24 hours\nsupport@monkdb.com\n\nDocumentation\nComprehensive guides & tutorials\n\nLive Chat\nBusiness hours: 9 AM - 6 PM EST\n\nPriority Support\nAvailable for Business & Enterprise plans\n4h response (Business) | 24/7 support (Enterprise)",
        options: [
          { label: "Contact Us Now", value: "contact support" },
          { label: "View Documentation", value: "documentation full" },
          { label: "Back to Menu", value: "hello" },
        ],
      };
    }

    // Getting started - with variations
    if (containsAny(["start", "started", "begin", "beginning", "install", "setup", "set up", "onboard", "onboarding", "initialize", "configure", "quick start", "quickstart"])) {
      // Open documentation in new window
      if (typeof window !== "undefined") {
        window.open(DOCUMENTATION_URL, "_blank", "noopener,noreferrer");
      }
      return {
        text: `🚀 Getting Started with MonkDB\n\nQuick Setup (5 minutes):\n\n1. Choose your plan\n2. Create account\n3. Configure database\n4. Connect your app\n5. Deploy\n\n📚 Documentation opened in new tab!\n\nFind complete guides, code examples, and API docs in our GitHub repository.\n\nNeed help getting started?`,
        options: [
          { label: "Get Pricing", value: "pricing" },
          { label: "Contact Us", value: "contact support" },
          { label: "View Features", value: "features" },
        ],
      };
    }

    // Vector database - with AI/ML variations
    if (containsAny(["vector", "vectors", "embedding", "embeddings", "ai", "ml", "machine learning", "artificial intelligence", "rag", "semantic search", "similarity", "neural", "llm", "chatgpt", "openai"])) {
      return {
        text: "Vector Database for AI/ML\n\nPower your AI applications with MonkDB:\n\n• High-dimensional vector storage (up to 2048 dimensions)\n• Semantic similarity search\n• Support for OpenAI, Cohere, HuggingFace embeddings\n• Fast ANN algorithms (HNSW, IVF, PQ)\n\nUse Cases:\n• RAG applications\n• Recommendation engines\n• Semantic search\n• Image/video similarity\n\nBuilt for modern AI workloads with sub-millisecond latency.",
        options: [
          { label: "All Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    // Documentation - with variations
    if (containsAny(["doc", "docs", "documentation", "guide", "guides", "tutorial", "tutorials", "manual", "readme", "documentation full", "how to"])) {
      // Open documentation in new window
      if (typeof window !== "undefined") {
        window.open(DOCUMENTATION_URL, "_blank", "noopener,noreferrer");
      }
      return {
        text: `📚 MonkDB Documentation\n\nWhat's included:\n• Quick start guide (5 min setup)\n• API reference\n• Code examples (10+ languages)\n• Best practices\n• Video tutorials\n• Architecture guides\n\n📚 Documentation opened in new tab!\n\nHow can I help you?`,
        options: [
          { label: "Get Started", value: "getting started" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Contact Us", value: "contact support" },
        ],
      };
    }

    // Comparison queries - with variations
    if (containsAny(["vs", "versus", "compare", "comparison", "difference", "differences", "better", "best", "why choose", "why monkdb", "alternative", "alternatives", "competitor"])) {
      return {
        text: "Why Choose MonkDB?\n\nKey Advantages:\n\n• Unified Platform - 6 databases in one\n• AI-Native - Built for AI/ML workloads\n• Enterprise Performance - Sub-ms latency, 99.99% uptime\n• Scalability - Seamlessly grows with your data\n• Cost-Effective - 70% lower TCO\n• Developer-Friendly - Simple APIs, great docs\n• Production-Ready - Trusted by Fortune 500\n\nOne platform, infinite possibilities.",
        options: [
          { label: "View Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    // Greetings - with variations
    if (containsAny(["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "yo", "sup", "howdy", "hola"])) {
      return {
        text: "Welcome to MonkDB!\n\nI'm here to help you explore our unified database platform.\n\nWhether you're building AI applications, analytics platforms, or modern web apps, I can help you find the right solution.\n\nWhat would you like to know?",
        options: [
          { label: "Get Pricing", value: "pricing" },
          { label: "Explore Features", value: "features" },
          { label: "Get Started", value: "getting started" },
          { label: "Contact Us", value: "contact support" },
        ],
      };
    }

    // Trial/Demo queries - with variations
    if (containsAny(["trial", "demo", "test", "try", "trying", "free", "free tier", "sandbox", "playground", "evaluate", "evaluation", "proof of concept", "poc"])) {
      return {
        text: "Try MonkDB Risk-Free\n\n✅ 14-Day Free Trial - No credit card required\n✅ Full Feature Access\n✅ Free Migration Support\n✅ No Commitment - Cancel anytime\n\nSchedule a personalized demo?",
        options: [
          { label: "Schedule Demo", value: "pricing" },
          { label: "View Features", value: "features" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    // API/Integration queries - with variations
    if (containsAny(["api", "apis", "sdk", "sdks", "integration", "integrate", "integrations", "language", "languages", "library", "libraries", "client", "rest", "graphql", "webhook"])) {
      return {
        text: "Developer-Friendly APIs & SDKs\n\nLanguages:\nPython, JavaScript, Java, Go, Rust, C++, C#, PHP, Ruby, Swift\n\nProtocols:\n• REST API with OpenAPI\n• GraphQL\n• WebSocket (real-time)\n• gRPC (high performance)\n\nFull documentation & examples available!",
        options: [
          { label: "View Docs", value: "documentation full" },
          { label: "Get Started", value: "getting started" },
          { label: "Contact Us", value: "contact support" },
        ],
      };
    }

    // Performance/Speed queries - with variations
    if (containsAny(["performance", "performant", "speed", "fast", "faster", "quick", "latency", "throughput", "scalability", "scalable", "scale", "scaling", "benchmark", "benchmarks", "efficient"])) {
      return {
        text: "Enterprise Performance\n\n⚡ Sub-millisecond latency (P99 < 5ms)\n📈 100K+ writes/sec per node\n🔄 99.99% uptime SLA\n🌍 Global CDN\n♾️ Auto-scaling\n\nBuilt for mission-critical applications.",
        options: [
          { label: "View Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Contact Us", value: "contact support" },
        ],
      };
    }

    // Security queries - with variations
    if (containsAny(["security", "secure", "safe", "safety", "compliance", "compliant", "encryption", "encrypt", "encrypted", "privacy", "private", "gdpr", "hipaa", "soc", "soc2", "ssl", "tls", "authentication", "authorization"])) {
      return {
        text: "Enterprise Security & Compliance\n\nSecurity:\n• AES-256 encryption at rest\n• TLS 1.3 in transit\n• RBAC & MFA\n• Audit logging\n\nCompliance:\n• SOC 2 Type II\n• GDPR, HIPAA ready\n• ISO 27001\n\nYour data security is our priority.",
        options: [
          { label: "Learn More", value: "documentation full" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Contact Us", value: "contact support" },
        ],
      };
    }

    // Database types
    if (containsAny(["timeseries", "time series", "time-series", "temporal", "tsdb"])) {
      return {
        text: "Time-Series Database\n\nOptimized for temporal data:\n\n• High-speed ingestion (millions of points/sec)\n• Efficient time-based queries\n• Data retention policies\n• Downsampling & aggregation\n• Real-time analytics\n\nPerfect for IoT, monitoring, and analytics workloads.",
        options: [
          { label: "All Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    if (containsAny(["geospatial", "geo-spatial", "geo spatial", "location", "maps", "gis", "coordinates", "latitude", "longitude"])) {
      return {
        text: "Geo-Spatial Database\n\nLocation-based data made easy:\n\n• Point, polygon, and geometry support\n• Proximity search\n• Geofencing capabilities\n• Route optimization\n• Map integration ready\n\nIdeal for delivery, real estate, and mapping applications.",
        options: [
          { label: "All Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    if (containsAny(["document", "documents", "json", "nosql", "mongodb", "schema"])) {
      return {
        text: "Document Database\n\nFlexible JSON document storage:\n\n• Schemaless design\n• Nested documents\n• Rich query language\n• ACID transactions\n• Horizontal scaling\n\nBuild modern applications without rigid schemas.",
        options: [
          { label: "All Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    if (containsAny(["search", "full-text", "full text", "fulltext", "elasticsearch", "text search"])) {
      return {
        text: "Full-Text Search\n\nPowerful search capabilities:\n\n• Advanced text indexing\n• Fuzzy matching\n• Autocomplete\n• Faceted search\n• Relevance scoring\n\nDeliver Google-like search experiences.",
        options: [
          { label: "All Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    // Use case queries
    if (containsAny(["use case", "use cases", "usecase", "usecases", "application", "applications", "example", "examples"])) {
      return {
        text: "MonkDB Use Cases\n\nCommon applications:\n\n• AI/ML Applications - RAG, semantic search\n• Real-time Analytics - Dashboards, monitoring\n• IoT Platforms - Sensor data, telemetry\n• E-commerce - Product search, recommendations\n• SaaS Applications - Multi-tenant systems\n• Content Platforms - Search, personalization\n\nOne database for all your needs!",
        options: [
          { label: "View Features", value: "features" },
          { label: "Get Pricing", value: "pricing" },
          { label: "Get Started", value: "getting started" },
        ],
      };
    }

    // Thank you - with variations
    if (containsAny(["thank", "thanks", "thx", "ty", "appreciate", "appreciated", "awesome", "great", "perfect", "excellent", "helpful", "amazing"])) {
      return {
        text: "You're welcome!\n\nI'm here to help with any questions about MonkDB.\n\nFeel free to explore more or reach out anytime.\n\nWhat else would you like to know?",
        options: [
          { label: "Get Pricing", value: "pricing" },
          { label: "View Features", value: "features" },
          { label: "Main Menu", value: "hello" },
        ],
      };
    }

    // Goodbye - with variations
    if (containsAny(["bye", "goodbye", "good bye", "see you", "later", "exit", "close", "quit"])) {
      return {
        text: "Thanks for chatting with us!\n\nFeel free to come back anytime you have questions.\n\nHave a great day! 👋",
        options: [
          { label: "Get Pricing", value: "pricing" },
          { label: "View Features", value: "features" },
          { label: "Contact Us", value: "contact support" },
        ],
      };
    }

    // Intelligent fallback for unknown queries
    return {
      text: "I'd be happy to help! 😊\n\nI didn't quite understand your question, but I can assist you with:\n\n✅ Pricing & Plans\n✅ Features & Capabilities\n✅ Getting Started Guide\n✅ Technical Documentation\n✅ Support & Contact\n\nYou can also type specific keywords like:\n• \"pricing\" - View plans\n• \"features\" - See capabilities\n• \"export\" - Data export info\n• \"support\" - Contact team\n\nOr select an option below:",
      options: [
        { label: "Get Pricing", value: "pricing" },
        { label: "View Features", value: "features" },
        { label: "Get Started", value: "getting started" },
        { label: "Contact Us", value: "contact support" },
      ],
    };
  }, []);

  const handleSendMessage = useCallback((customMessage?: string) => {
    const messageText = customMessage || inputValue;
    if (!messageText.trim()) return;

    // Check for special actions that open modals
    const lowerMessage = messageText.toLowerCase().trim();

    // Open contact modal DIRECTLY for pricing inquiries
    if (lowerMessage.includes("pricing") ||
        lowerMessage.includes("price") ||
        lowerMessage.includes("cost") ||
        lowerMessage.includes("plan") ||
        lowerMessage.includes("view pricing contact")) {

      // Add user message to chat
      const userMessage: Message = {
        id: `${Date.now()}-user`,
        text: messageText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");

      // Open pricing contact modal directly
      setTimeout(() => {
        setContactModalType("pricing");
        setIsContactModalOpen(true);
      }, 200);

      return;
    }

    // Open contact modal for support
    if (lowerMessage.includes("contact support") ||
        lowerMessage.includes("contact sales") ||
        lowerMessage.includes("contact export help") ||
        lowerMessage.includes("contact us")) {
      setContactModalType(lowerMessage.includes("sales") ? "general" : "support");
      setIsContactModalOpen(true);
      return;
    }

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const response = getBotResponse(messageText);
      const botResponse: Message = {
        id: `${Date.now()}-bot`,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        options: response.options,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, BOT_RESPONSE_DELAY);
  }, [inputValue, getBotResponse]);

  const handleQuickReply = useCallback((value: string) => {
    handleSendMessage(value);
  }, [handleSendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleToggleChatbot = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCloseContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const handleContactSubmitSuccess = useCallback((name: string, email: string) => {
    // Add confirmation message to chat
    const confirmationMessage: Message = {
      id: `${Date.now()}-bot-confirmation`,
      text: `✅ Thank you, ${name}!\n\nYour message has been sent successfully. We've received your inquiry at ${email}.\n\nOur team will review your request and get back to you within 24 hours.\n\nIs there anything else I can help you with?`,
      sender: "bot",
      timestamp: new Date(),
      options: [
        { label: "View Features", value: "features" },
        { label: "Get Started", value: "getting started" },
        { label: "Documentation", value: "documentation full" },
        { label: "Main Menu", value: "hello" },
      ],
    };

    setMessages((prev) => [...prev, confirmationMessage]);
  }, []);

  return (
    <div ref={chatboxRef} className="fixed bottom-8 right-8 z-[99]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-900"
          >
            {/* Clean Professional Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <TbMessageChatbotFilled className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  MonkDB Assistant
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">We typically reply instantly</p>
              </div>
              <button
                onClick={handleToggleChatbot}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                aria-label="Close chat"
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-950">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[85%] flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
                      {/* Message Bubble */}
                      <div
                        className={`rounded-lg px-4 py-2.5 ${
                          message.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.text}
                        </p>
                      </div>

                      {/* Quick Reply Buttons */}
                      {message.sender === "bot" && message.options && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.options.map((option, idx) => (
                            <button
                              key={`${message.id}-option-${idx}`}
                              onClick={() => handleQuickReply(option.value)}
                              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <span className="mt-1 text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  maxLength={500}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="rounded-lg bg-primary px-4 py-2.5 text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Floating Button */}
      <button
        onClick={handleToggleChatbot}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <IoClose className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <TbMessageChatbotFilled className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
        )}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            1
          </span>
        )}
      </button>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        type={contactModalType}
        onSubmitSuccess={handleContactSubmitSuccess}
      />
    </div>
  );
};

export default Chatbot;

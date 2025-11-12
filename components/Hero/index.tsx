"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Flame, ArrowRight, Loader2, CheckCircle, XCircle, Mail } from "lucide-react";

// Import MonkDBComponent with client-only rendering
const MonkDBComponent = dynamic(() => import("../MonkDB"), {
  ssr: false,
  loading: () => <div className="relative h-full min-h-[500px] w-full"></div>,
});

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      setSubmitStatus({
        success: true,
        message: "Thank you! We'll contact you soon.",
      });
      setEmail("");
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to send request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            {/* Left Content */}
            <div className="md:w-1/2">
              <h4 className="mb-4.5 flex items-center gap-2 text-lg font-medium text-black dark:text-white">
                <Flame className="h-5 w-5 text-orange-500" />
                MonkDB - Transform Your Data Infrastructure
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                The AI-Native Unified {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  Database
                </span>
              </h1>
              <p className="mb-8">
                MonkDB is an AI-native unified database that supports Vector,
                Time-Series, Geo-Spatial, Blob Store, Document, Full-Text
                Search, and Streaming SQL — all in a single, high-performance
                engine. Built for enterprises to simplify infrastructure, break
                down data silos, and build intelligent applications faster.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <div className="relative flex-1 min-w-[250px]">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your business email"
                        required
                        className="w-full rounded-full border border-stroke py-2.5 pl-12 pr-6 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="request demo button"
                      className={`flex items-center gap-2 rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho ${
                        isSubmitting ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Request Demo
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {submitStatus && (
                  <div
                    className={`mt-4 flex items-center gap-3 rounded-lg p-4 ${
                      submitStatus.success
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {submitStatus.success ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content - MonkDB Component */}
            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative h-full min-h-[500px] w-full">
                <MonkDBComponent />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

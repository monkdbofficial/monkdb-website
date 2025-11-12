"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const Footer = () => {
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
        throw new Error("Failed to subscribe");
      }

      setSubmitStatus({
        success: true,
        message: "Thank you for subscribing!",
      });
      setEmail("");
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer
        className={`relative border-t border-stroke bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FC] to-[#F6F9FC] dark:border-y-[#041521] dark:bg-gradient-to-b dark:from-[#041521] dark:to-[#02080D]`}
      >
        <div className="bg-dots-pattern absolute inset-0 opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-full lg:w-1/4"
              >
                <a href="/" className="relative">
                  <Image
                    width={180} // Increased logo width
                    height={130} // Increased logo height
                    src="/images/logo/logo-light.svg"
                    alt="Logo"
                    className="dark:hidden"
                  />
                  <Image
                    width={180} // Increased logo width
                    height={130} // Increased logo height
                    src="/images/logo/logo-dark.svg"
                    alt="Logo"
                    className="hidden dark:block"
                  />
                </a>

                <p className="mb-6 mt-4 w-[95%] text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:mb-10 md:mt-5 md:text-base">
                  MonkDB is an AI-Native Unified Database designed to transform
                  data management, empowering organizations to harness unified
                  intelligence from diverse data types.
                </p>

                <p className="mb-1.5 text-sectiontitle uppercase tracking-[5px]">
                  Contact
                </p>
                <a
                  href="#"
                  className="text-itemtitle font-medium text-black dark:text-white"
                >
                  support@monkdb.com
                </a>
              </motion.div>

              <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0 lg:w-2/3 xl:w-7/12">
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Quick Links
                  </h4>

                  <ul>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Product
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Pricing
                      </a>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Support
                  </h4>

                  <ul>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Company
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Press Media
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Our Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Newsletter
                  </h4>
                  <p className="mb-4 w-[90%]">
                    Subscribe to receive future updates
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-full border border-stroke px-6 py-3 shadow-solid-11 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label="signup to newsletter"
                        className={`absolute right-0 p-4 transition-opacity ${
                          isSubmitting ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-5 w-5 animate-spin text-[#757693] dark:text-white" />
                        ) : (
                          <Send className="h-5 w-5 text-[#757693] transition-colors hover:text-primary dark:text-white dark:hover:text-primary" />
                        )}
                      </button>
                    </div>
                    {submitStatus && (
                      <div
                        className={`mt-4 rounded-lg p-2 text-sm ${
                          submitStatus.success
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="flex flex-col items-center justify-center gap-5 border-t border-stroke py-7 dark:border-strokedark">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <p>
                &copy; {new Date().getFullYear()} Movibase. All rights reserved
              </p>
            </motion.div>
          </div>
          {/* <!-- Footer Bottom --> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;

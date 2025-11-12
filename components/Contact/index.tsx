"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Contact = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const checkbox = form.querySelector("#default-checkbox");
    const acceptCommunications =
      checkbox instanceof HTMLInputElement ? checkbox.checked : false;

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      acceptCommunications,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      });
      form.reset();
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="mb-22 px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg border border-y-[#D9E5F2] bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FC] to-[#F6F9FC] dark:border-y-[#041521] dark:bg-gradient-to-b dark:from-[#041521] dark:to-[#02080D]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
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
              className="animate_top w-full rounded-lg border border-y-[#D9E5F2] bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FC] to-[#F6F9FC] p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-gradient-to-b dark:from-[#041521] dark:to-[#02080D] md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Get in Touch
              </h2>

              <form onSubmit={handleSubmit} className="space-y-7.5">
                <div className="flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full rounded-full border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-gray-800 dark:focus:border-blue-500"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Work Email"
                    required
                    className="w-full rounded-full border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-gray-800 dark:focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    name="company"
                    type="text"
                    placeholder="Company Name"
                    required
                    className="w-full rounded-full border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-gray-800 dark:focus:border-blue-500"
                  />

                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    required
                    className="w-full rounded-full border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-gray-800 dark:focus:border-blue-500"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    name="message"
                    placeholder="Tell us about your project and requirements"
                    rows={4}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-gray-800 dark:focus:border-blue-500"
                  ></textarea>
                </div>

                {submitStatus && (
                  <div
                    className={`rounded-lg p-4 ${
                      submitStatus.success
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 xl:justify-between">
                  <div className="mb-4 flex md:mb-0">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <span className="group mt-2 flex h-5 min-w-[20px] items-center justify-center rounded border-gray-300 bg-white text-blue-600 peer-checked:bg-primary dark:border-gray-600 dark:bg-gray-700">
                      <svg
                        className="opacity-0 peer-checked:group-[]:opacity-100"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-5"
                    >
                      I agree to receive communications about MonkDB
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Schedule Demo"
                    className={`inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark ${
                      isSubmitting ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Schedule Demo"}
                    {!isSubmitting && (
                      <svg
                        className="fill-white"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                          fill=""
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
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
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Connect With Us
              </h2>

              <div className="mb-7.5">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Headquarters
                </h3>
                <p className="leading-relaxed">
                  Movibase platform private limited
                  <br />
                  Wework Raheja Mindspace
                  <br />
                  Building 9, Floor 13
                  <br />
                  Mindspace IT Park, Madhapur
                  <br />
                  Hyderabad 500081, Telangana
                  <br />
                  India
                </p>
              </div>

              <div className="mb-7.5">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Support
                </h3>
                <p className="leading-relaxed">
                  <a
                    href="mailto:support@monkdb.com"
                    className="hover:text-primary"
                  >
                    support@monkdb.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;

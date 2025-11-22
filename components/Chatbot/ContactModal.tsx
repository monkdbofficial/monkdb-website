"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { HiMail, HiUser, HiPhone, HiOfficeBuilding } from "react-icons/hi";
import { getCountryCallingCode } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import { isValidPhoneNumber } from 'libphonenumber-js';
import CountrySelector from '@/components/PhoneInput/CountrySelector';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "pricing" | "support" | "general";
  onSubmitSuccess?: (name: string, email: string) => void;
}

const ContactModal = ({ isOpen, onClose, type = "general", onSubmitSuccess }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    countryCode: "IN" as any, // Default to India
    phone: "",
    message: "",
    plan: type === "pricing" ? "medium" : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = () => {
    if (!formData.phone) {
      setPhoneError("");
      return true; // Phone is optional
    }

    const countryCallingCode = getCountryCallingCode(formData.countryCode);
    const fullPhoneNumber = `+${countryCallingCode}${formData.phone}`;

    try {
      const valid = isValidPhoneNumber(fullPhoneNumber, formData.countryCode);
      if (!valid) {
        setPhoneError(`Invalid phone number for ${en[formData.countryCode]}`);
        return false;
      }
      setPhoneError("");
      return true;
    } catch (error) {
      setPhoneError("Invalid phone number");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone before submitting
    if (!validatePhone()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const countryCallingCode = getCountryCallingCode(formData.countryCode);
      const fullPhoneNumber = formData.phone ? `+${countryCallingCode} ${formData.phone}` : 'Not provided';

      // Send to existing /api/send endpoint using Resend
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not provided',
          phone: fullPhoneNumber,
          message: `${type === 'pricing' ? '[PRICING INQUIRY]\n\n' : type === 'support' ? '[SUPPORT REQUEST]\n\n' : ''}${formData.message || 'No message provided'}`,
          acceptCommunications: true,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitting(false);
        setSubmitted(true);

        // Notify parent component of successful submission
        if (onSubmitSuccess) {
          onSubmitSuccess(formData.name, formData.email);
        }

        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            countryCode: "IN",
            phone: "",
            message: "",
            plan: "",
          });
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      setIsSubmitting(false);

      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      alert(errorMessage);
    }
  };

  const getTitle = () => {
    if (type === "pricing") return "Get Pricing Information";
    if (type === "support") return "Contact Support";
    return "Get in Touch";
  };

  const getDescription = () => {
    if (type === "pricing") return "Our team will help you choose the perfect plan for your needs.";
    if (type === "support") return "We're here to help! Tell us how we can assist you.";
    return "Let's discuss how MonkDB can help your business grow.";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                <IoClose className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getTitle()}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {getDescription()}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiUser className="h-4 w-4" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiMail className="h-4 w-4" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="john@company.com"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiOfficeBuilding className="h-4 w-4" />
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="Your Company Name"
                      />
                    </div>

                    {/* Phone Number with Country Code */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HiPhone className="h-4 w-4" />
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        {/* Country Code Selector - Professional Searchable */}
                        <CountrySelector
                          value={formData.countryCode}
                          onChange={(country) => setFormData({ ...formData, countryCode: country })}
                          className="w-28"
                        />

                        {/* Phone Number Input */}
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                            setFormData({ ...formData, phone: value });
                            setPhoneError("");
                          }}
                          onBlur={validatePhone}
                          placeholder="Phone number"
                          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      {phoneError && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{phoneError}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
                  >
                    <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                    Returning to chat...
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { motion } from "framer-motion";

  /**
   * A contact form component that sends a POST request to the `/api/submitForm`
   * endpoint when the form is submitted. The form contains input fields for the
   * user's name, email address, and message. The component displays the status of
   * the form submission, and will display an error message if the submission fails.
   *
   * @returns A JSX element representing the contact form.
   */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * Handles a change event on one of the form's input fields.
   * Updates the state of the form data with the new value of the input field.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e The change event.
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Validates an email address using a regex.
   *
   * The regex used is `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i`.
   *
   * @param {string} email The email address to be validated.
   * @returns {boolean} Whether the email address is valid.
   */
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  };

  /**
   * Handles the form submission event.
   *
   * It validates the email address entered using the `validateEmail` function.
   * If the email address is invalid, it sets the `errorMessage` state and
   * sets the `status` state to "error".
   *
   * If the email address is valid, it sends a POST request to the
   * `/api/submitForm` endpoint with the form data as JSON. If the response is
   * successful (200 status code), it sets the `status` state to "success" and
   * resets the form data to its initial state. If the response is not
   * successful, it sets the `errorMessage` state to the error message from the
   * response or a default message if no error message is provided, and sets
   * the `status` state to "error".
   *
   * If the request fails due to a network error, it sets the `errorMessage`
   * state to a default message and sets the `status` state to "error".
   *
   * @param {FormEvent} e The form submission event.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setErrorMessage(
          data.message || "Something went wrong. Please try again later.",
        );
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto p-6 bg-black rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-[#393939] text-gray-100 border border-[#393939] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-[#393939] text-gray-100 border border-[#393939] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.25 }}
          >
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 bg-[#393939] text-gray-100 border border-[#393939] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.25 }}
          >
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
              ) : (
                "Send Message"
              )}
            </button>
          </motion.div>
        </form>

        {status === "success" && (
          <div className="mt-5 flex items-center text-green-400">
            <AiOutlineCheckCircle className="h-6 w-6 mr-2" />
            <span>Your message has been sent successfully!</span>
          </div>
        )}

        {status === "error" && (
          <div className="mt-5 flex items-center text-red-400">
            <AiOutlineCloseCircle className="h-6 w-6 mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;

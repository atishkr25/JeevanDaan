"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FundraiserForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    neededAmount: "",
    coverImage: "",
    razorpayID: "",
    razorpaySecret: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/get-fundraisers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          neededAmount: Number(formData.neededAmount),
          coverImage: formData.coverImage,
          documentName: formData.documents?.name || "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to create fundraiser");
      }

      alert("Fundraiser submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to submit fundraiser:", error);
      alert(error.message || "Failed to submit fundraiser");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Create a Fundraiser</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <input
          type="text"
          name="title"
          placeholder="Fundraiser Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <textarea
          name="description"
          placeholder="Describe why you need funds"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        ></textarea>

        <input
          type="number"
          name="neededAmount"
          placeholder="Amount Needed (₹)"
          value={formData.neededAmount}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <input
          type="url"
          name="coverImage"
          placeholder="Cover Image URL (optional)"
          value={formData.coverImage}
          onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <input
          type="text"
          name="razorpayID"
          placeholder="Razorpay ID"
          value={formData.razorpayID}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <input
          type="password"
          name="razorpaySecret"
          placeholder="Razorpay Secret"
          value={formData.razorpaySecret}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Fundraiser"}
        </button>
      </form>
    </div>
  );
}

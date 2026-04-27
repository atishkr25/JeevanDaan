"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 🔹 Hero Section */}
      <div className="bg-blue-950 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">About Sahayak</h1>
        <p className="mt-2 text-lg text-gray-300">Empowering generosity through crowdfunding</p>
      </div>

      {/* 🔹 Who We Are */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-900">Who We Are</h2>
        <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">
          Sahayak is a community-driven crowdfunding platform dedicated to helping individuals, NGOs, 
          and organizations raise funds for meaningful causes. Our mission is to make fundraising accessible, 
          secure, and impactful.
        </p>
      </div>

      {/* 🔹 How It Works */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-10 mt-8">
            <div className="max-w-sm p-6 bg-gray-200 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Start a Campaign</h3>
              <p className="text-gray-700 mt-2">Create a campaign in minutes and share your story.</p>
            </div>
            <div className="max-w-sm p-6 bg-gray-200 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Receive Donations</h3>
              <p className="text-gray-700 mt-2">Accept donations from people who care about your cause.</p>
            </div>
            <div className="max-w-sm p-6 bg-gray-200 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Make an Impact</h3>
              <p className="text-gray-700 mt-2">Use the funds to create real change in your community.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Our Impact */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-blue-900">Our Impact</h2>
        <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
          With thousands of donors and countless campaigns funded, Sahayak has transformed lives by providing 
          financial assistance to those in need. Join our mission to spread kindness.
        </p>
      </div>

      {/* 🔹 Get Involved */}
      <div className="bg-blue-900 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Get Involved</h2>
        <p className="mt-3 max-w-2xl mx-auto">
run           Whether you&apos;re looking to start a campaign, donate to a cause, or spread the word, you can make 
          a difference today!
        </p>
        <div className="mt-6">
          <button 
            onClick={() => router.push("/signup")}
            className="px-6 py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-lg shadow-lg transition"
          >
            Start Fundraising
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Importing images
import project1 from "@/assets/image1.avif";
import project2 from "@/assets/image2.avif";
import project3 from "@/assets/image3.avif";
import receiver1 from "@/assets/image4.avif";

export default function Projects() {
  const router = useRouter();
  const [fundraisers, setFundraisers] = useState([]);
  const fallbackCoverImages = [project1.src, project2.src, project3.src, receiver1.src];
  const staticFundraisers = [
    {
      title: "John Doe - Urgent Surgery",
      description: "Raising ₹10,000 for a life-saving heart surgery.",
      needed: 10000,
      raised: 3500,
      coverImage: receiver1.src,
    },
    {
      title: "Jane Smith - Cancer Treatment",
      description: "Seeking ₹50,000 for chemotherapy and medical expenses.",
      needed: 50000,
      raised: 18000,
      coverImage: project2.src,
    },
  ];

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await fetch("/api/get-fundraisers");
        const data = await response.json();
        if (data.success) {
          setFundraisers(data.fundraisers || []);
        }
      } catch (error) {
        console.error("Failed to fetch fundraisers:", error);
      }
    };

    fetchFundraisers();
  }, []);

  const getFundStats = (fund) => {
    const needed = Number(fund.amountNeeded || 0);
    const raised = Number(fund.amountRaised || 0);
    const remaining = Math.max(needed - raised, 0);
    const progress = needed > 0 ? Math.min((raised / needed) * 100, 100) : 0;
    return { needed, raised, remaining, progress };
  };

  const getCoverImage = (fund, index) => {
    const coverImage = String(fund.coverImage || "").trim();
    if (coverImage) {
      return coverImage;
    }
    return fallbackCoverImages[index % fallbackCoverImages.length];
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 🔹 Hero Section */}
      <div className="bg-blue-950 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Projects</h1>
        <p className="mt-2 text-lg text-gray-300">Empowering lives through crowdfunding initiatives</p>
      </div>

      {/* 🔹 Our Crowdfunding Projects */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-900">Impactful Campaigns</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={project1} alt="Project 1" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Medical Aid for Children</h3>
              <p className="text-gray-700 mt-2">Providing healthcare support for underprivileged children.</p>
            </div>
          </div>

          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={project2} alt="Project 2" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Disaster Relief Fund</h3>
              <p className="text-gray-700 mt-2">Helping families affected by natural calamities.</p>
            </div>
          </div>

          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={project3} alt="Project 3" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Education for All</h3>
              <p className="text-gray-700 mt-2">Funding schools & scholarships for underprivileged students.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Active Fundraisers */}
      <div className="bg-gray-200 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">Active Fundraisers</h2>
          <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">
            Newly created campaigns will automatically appear here in card view.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {staticFundraisers.map((fund, index) => {
              const needed = Number(fund.needed || 0);
              const raised = Number(fund.raised || 0);
              const remaining = Math.max(needed - raised, 0);
              const progress = needed > 0 ? Math.min((raised / needed) * 100, 100) : 0;

              return (
                <div key={`static-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div
                    className="w-full h-52 bg-cover bg-center"
                    style={{ backgroundImage: `url('${fund.coverImage}')` }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{fund.title}</h3>
                    <p className="text-gray-700 mt-2">{fund.description}</p>
                    <p className="text-sm text-gray-700 mt-3">Needed: ₹{needed.toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Raised: ₹{raised.toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Remaining: ₹{remaining.toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Progress: {progress.toFixed(1)}%</p>

                    <div className="mt-2 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
                    </div>

                    <button
                      onClick={() => router.push(`/payment?fundraiserName=${encodeURIComponent(fund.title)}`)}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              );
            })}

            {fundraisers.map((fund, index) => {
              const stats = getFundStats(fund);

              return (
                <div key={fund._id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div
                    className="w-full h-52 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getCoverImage(fund, index)}')` }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{fund.title}</h3>
                    <p className="text-gray-700 mt-2">{fund.description}</p>
                    <p className="text-sm text-gray-700 mt-3">Needed: ₹{stats.needed.toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Raised: ₹{stats.raised.toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Remaining: ₹{stats.remaining.toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Progress: {stats.progress.toFixed(1)}%</p>

                    <div className="mt-2 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${stats.progress}%` }} />
                    </div>

                    <button
                      onClick={() => router.push(`/payment?fundraiserId=${fund._id}`)}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🔹 Get Involved */}
      <div className="bg-blue-900 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Want to Support a Cause?</h2>
        <p className="mt-3 max-w-2xl mx-auto">
          Start a campaign, donate, or volunteer today and be a part of the change.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
          Start a Campaign
        </button>
      </div>
    </div>
  );
}

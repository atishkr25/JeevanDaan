"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FundraiserCard from "@/components/FundraiserCard";

// Importing images
import project1 from "@/assets/image1.avif";
import project2 from "@/assets/image2.avif";
import project3 from "@/assets/image3.avif";
import receiver1 from "@/assets/image4.avif";

export default function Projects() {
  const router = useRouter();
  const [fundraisers, setFundraisers] = useState([]);
  const staticFundraisers = [
    {
      title: "John Doe - Urgent Surgery",
      description: "Raising ₹10,000 for a life-saving heart surgery.",
      needed: 10000,
      raised: 3500,
      coverImage: receiver1.src,
      category: "Medical",
    },
    {
      title: "Jane Smith - Cancer Treatment",
      description: "Seeking ₹50,000 for chemotherapy and medical expenses.",
      needed: 50000,
      raised: 18000,
      coverImage: project2.src,
      category: "Medical",
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

  const categoryCycle = ["Medical", "Education", "Disaster"];

  return (
    <div className="min-h-screen text-[#1A1A1A]">
      <section className="border-b border-[#E2EBE5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Campaigns</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Fundraisers making a tangible impact
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-600">
            Browse curated stories and donate to the causes that speak to you most.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Featured stories</h2>
            <p className="mt-2 text-sm text-gray-600">Handpicked campaigns that need immediate support.</p>
          </div>
          <button
            onClick={() => router.push("/fundraiser-form")}
            className="cursor-pointer rounded-xl bg-[#1B6B45] px-6 py-2.5 text-sm font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
          >
            Start a campaign
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staticFundraisers.map((fund, index) => (
            <FundraiserCard
              key={`static-${index}`}
              title={fund.title}
              description={fund.description}
              category={fund.category}
              targetAmount={fund.needed}
              raisedAmount={fund.raised}
            />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Active fundraisers</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Newly created campaigns automatically appear here with real-time progress.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fundraisers.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-[#E2EBE5] bg-white p-6 text-center text-sm text-gray-500">
                No active fundraisers yet. Be the first to start a campaign.
              </div>
            ) : (
              fundraisers.map((fund, index) => {
                const stats = getFundStats(fund);
                return (
                  <FundraiserCard
                    key={fund._id || index}
                    _id={fund._id}
                    title={fund.title}
                    description={fund.description}
                    category={categoryCycle[index % categoryCycle.length]}
                    targetAmount={stats.needed}
                    raisedAmount={stats.raised}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

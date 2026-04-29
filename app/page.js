"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FundraiserCard from "@/components/FundraiserCard";

export default function Home() {
  const [fundraisers, setFundraisers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [fundraiserResponse, paymentsResponse] = await Promise.all([
          fetch("/api/get-fundraisers"),
          fetch("/api/get-payments"),
        ]);

        const fundraiserData = await fundraiserResponse.json();
        const paymentData = await paymentsResponse.json();

        if (fundraiserData.success) {
          setFundraisers(fundraiserData.fundraisers || []);
        }
        if (paymentData.success) {
          setPayments(paymentData.payments || []);
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    fetchStats();
  }, []);

  const stats = useMemo(() => {
    const totalRaised = fundraisers.reduce(
      (sum, fund) => sum + Number(fund.amountRaised || 0),
      0
    );
    return {
      totalRaised,
      active: fundraisers.length,
      donors: payments.length,
    };
  }, [fundraisers, payments]);

  const categoryCycle = ["Medical", "Education", "Disaster"];
  const featuredFundraisers = fundraisers.slice(0, 3);

  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="pt-10">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#E2EBE5] bg-white p-10 shadow-sm md:p-14">
          <span className="inline-flex items-center rounded-full bg-[#1B6B45]/10 px-3 py-1 text-xs font-semibold text-[#1B6B45]">
            Trusted by 2,000+ campaigns
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#1A1A1A] md:text-5xl">
            Every cause deserves support
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-gray-700">
            Sahayak helps families, communities, and nonprofits share their stories with trust, transparency,
            and a donor-first experience that feels personal and secure.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/fundraiser-form"
              className="cursor-pointer rounded-xl bg-[#1B6B45] px-6 py-2.5 text-sm font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
            >
              Start a fundraiser
            </Link>
            <Link
              href="/projects"
              className="cursor-pointer rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
            >
              Browse campaigns
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Total raised",
                value: `₹${stats.totalRaised.toLocaleString()}`,
                color: "bg-[#1B6B45]/10 text-[#1B6B45]",
              },
              {
                label: "Active campaigns",
                value: stats.active.toLocaleString(),
                color: "bg-[#22C37A]/10 text-[#22C37A]",
              },
              {
                label: "Donors",
                value: stats.donors.toLocaleString(),
                color: "bg-[#1B9B6E]/10 text-[#1B9B6E]",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#E2EBE5] bg-white p-4"
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${item.color}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 12h12M12 6v12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="mt-3 text-base font-semibold text-[#1A1A1A]">{item.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Stories that need you today</h2>
          </div>
          <Link href="/projects" className="text-sm font-medium text-[#1B6B45]">
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredFundraisers.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-[#E2EBE5] bg-white p-6 text-center text-sm text-gray-500">
              No campaigns yet. Start the first one and inspire donations.
            </div>
          ) : (
            featuredFundraisers.map((fund, index) => (
              <FundraiserCard
                key={fund._id || index}
                _id={fund._id}
                title={fund.title}
                description={fund.description}
                category={categoryCycle[index % categoryCycle.length]}
                targetAmount={fund.amountNeeded}
                raisedAmount={fund.amountRaised}
              />
            ))
          )}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto mt-12 max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">Launch in three clear steps</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create a campaign, share the story, and collect donations through a secure, transparent flow.
          </p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Tell your story",
              desc: "Add goals, cover visuals, and supporting documents for trust.",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 19l4-1 10-10-3-3-10 10-1 4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
            },
            {
              title: "Share with supporters",
              desc: "Invite donors to join your mission with a single link.",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M16 8l-8 4 8 4V8z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ),
            },
            {
              title: "Collect securely",
              desc: "Razorpay handles safe payments with real-time updates.",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 11V9a5 5 0 0110 0v2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ),
            },
          ].map((item, index) => (
            <div key={item.title} className="rounded-2xl border border-[#E2EBE5] bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B6B45]/10 text-[#1B6B45]">
                {item.icon}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#1A1A1A]">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-[#E2EBE5] bg-white"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src="https://www.youtube.com/embed/CiFoHm7HD94?si=IKHkdyemXJd-kgP_"
              title="Fundraiser story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

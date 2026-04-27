"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyFundraisersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  const getFundStats = (fund) => {
    const needed = Number(fund.amountNeeded || 0);
    const raised = Number(fund.amountRaised || 0);
    const remaining = Math.max(needed - raised, 0);
    const progress = needed > 0 ? Math.min((raised / needed) * 100, 100) : 0;

    return { needed, raised, remaining, progress };
  };

  const fetchMyCampaigns = useCallback(async () => {
    try {
      setLoadingCampaigns(true);
      const email = encodeURIComponent(session?.user?.email || "");
      const userId = encodeURIComponent(session?.user?.id || "");
      const response = await fetch(
        `/api/get-fundraisers?mine=1&autoClaimLegacy=1&email=${email}&userId=${userId}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setCampaigns(data.fundraisers || []);
      } else {
        console.error("Error fetching user campaigns:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch user campaigns:", error);
    } finally {
      setLoadingCampaigns(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchMyCampaigns();
    }
  }, [status, router, fetchMyCampaigns]);

  if (status === "loading" || loadingCampaigns) {
    return <div className="p-8 text-white">Loading your fundraisers...</div>;
  }

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="max-w-6xl mx-auto border border-gray-700/50 rounded-xl bg-gray-900/60 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold">My Fundraisers ({campaigns.length})</h1>
          <button
            onClick={() => router.push("/fundraiser-form")}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-semibold"
          >
            Create New Fundraiser
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-gray-300">
            <p>No fundraisers created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {campaigns.map((campaign) => {
              const stats = getFundStats(campaign);
              return (
                <div key={campaign._id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h2 className="text-xl font-semibold text-yellow-400">{campaign.title}</h2>
                  <p className="text-gray-300 mt-2">{campaign.description}</p>

                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${stats.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{stats.progress.toFixed(1)}% funded</p>
                  </div>

                  <div className="mt-4 space-y-1 text-sm">
                    <p>Needed: Rs {stats.needed.toLocaleString()}</p>
                    <p>Raised: Rs {stats.raised.toLocaleString()}</p>
                    <p>Remaining: Rs {stats.remaining.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

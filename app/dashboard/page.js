"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import image1 from "@/assets/image1.avif";
import image2 from "@/assets/image2.avif";
import image3 from "@/assets/image3.avif";
import image4 from "@/assets/image4.avif";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [fundraisers, setFundraisers] = useState([]);
  const [myFundraisers, setMyFundraisers] = useState([]);
  const [payments, setPayments] = useState([]); // ✅ Store payments
  const fallbackCoverImages = [image1.src, image2.src, image3.src, image4.src];

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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch fundraisers from API
  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await fetch("/api/get-fundraisers");
        const data = await response.json();
        if (data.success) {
          setFundraisers(data.fundraisers);
        } else {
          console.error("Error fetching fundraisers:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch fundraisers:", error);
      }
    };

    fetchFundraisers();
  }, []);

  // Fetch logged-in user's own fundraisers
  useEffect(() => {
    const fetchMyFundraisers = async () => {
      try {
        const email = encodeURIComponent(session?.user?.email || "");
        const userId = encodeURIComponent(session?.user?.id || "");
        const response = await fetch(
          `/api/get-fundraisers?mine=1&autoClaimLegacy=1&email=${email}&userId=${userId}`
        );
        const data = await response.json();

        if (data.success) {
          setMyFundraisers(data.fundraisers || []);
        } else {
          console.error("Error fetching my fundraisers:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch my fundraisers:", error);
      }
    };

    if (status === "authenticated") {
      fetchMyFundraisers();
    }
  }, [status, session]);

  // ✅ Fetch payments from API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/get-payments");
        const data = await response.json();
        if (data.success) {
          setPayments(data.payments);
        } else {
          console.error("Error fetching payments:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state while checking session
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Welcome to Dashboard</h1>
      {session?.user && (
        <p className="mt-2 text-sm sm:text-lg text-center break-all">Hello, {session.user.email} 👋</p>
      )}

      <div className="mt-6 w-full max-w-sm sm:max-w-md flex flex-col sm:flex-row gap-3 sm:justify-center">
        <button
          onClick={() => router.push("/fundraiser-form")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Start Fundraising Here
        </button>

        <button
          onClick={() => router.push("/payment")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Donate !
        </button>
      </div>

      {/* <button
        onClick={() => router.push("/profile")}
        className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Go to My Profile
      </button> */}

      {/* My Fundraisers Section */}
      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">My Fundraisers ({myFundraisers.length})</h2>

        {myFundraisers.length === 0 ? (
          <p>You have not created any fundraiser yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {myFundraisers.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-xl border border-green-700/40 overflow-hidden shadow-lg">
                <div
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url('${getCoverImage(project, index)}')` }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-300 mt-1">{project.description}</p>
                {(() => {
                  const stats = getFundStats(project);
                  return (
                    <>
                      <p className="mt-3">Needed: ₹{stats.needed.toLocaleString()}</p>
                      <p>Raised: ₹{stats.raised.toLocaleString()}</p>
                      <p>Remaining: ₹{stats.remaining.toLocaleString()}</p>
                      <p>Progress: {stats.progress.toFixed(1)}%</p>
                      <div className="mt-3 h-2.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${stats.progress}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Active Fundraisers Section */}
      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Active Fundraisers</h2>

        {fundraisers.length === 0 ? (
          <p>No active fundraisers.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fundraisers.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url('${getCoverImage(project, index)}')` }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-300 mt-1">{project.description}</p>
                {(() => {
                  const stats = getFundStats(project);
                  return (
                    <>
                      <p className="mt-3">Needed: ₹{stats.needed.toLocaleString()}</p>
                      <p>Raised: ₹{stats.raised.toLocaleString()}</p>
                      <p>Remaining: ₹{stats.remaining.toLocaleString()}</p>
                      <p>Progress: {stats.progress.toFixed(1)}%</p>
                      <div className="mt-3 h-2.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${stats.progress}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Recent Payments Section */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Recent Payments</h2>

        {payments.length === 0 ? (
          <p>No recent payments.</p>
        ) : (
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{payment.donorName}</h3>
                <p>Email: {payment.donorEmail}</p>
                <p>Amount: ₹{payment.amount}</p>
                <p>Fundraiser: {payment.fundraiser}</p>
                <p>Payment ID: {payment.paymentId}</p>
                <p>Status: <span className="text-green-400">{payment.status}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 w-full sm:w-auto"
      >
        Logout
      </button>
    </div>
  );
}

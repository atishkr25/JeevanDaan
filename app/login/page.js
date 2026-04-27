"use client";

import { useRouter } from "next/navigation";
import { getProviders, signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleEnabled, setGoogleEnabled] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  useEffect(() => {
    async function loadProviders() {
      const providers = await getProviders();
      setGoogleEnabled(Boolean(providers?.google));
    }

    loadProviders();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevent automatic redirects
        identifier,
        password,
      });

      if (res?.error) {
        setError("Login failed. Check your credentials.");
      } else {
        console.log("Login successful! Redirecting...");
        router.push("/dashboard"); // ✅ Redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] px-4 bg-gray-900">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="font-bold text-3xl text-white mb-4">Login</h1>

        {/* Email or Username Input */}
        <input
          type="text"
          placeholder="Enter email or username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

        {/* Google Login Button */}
        {googleEnabled && (
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full mt-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Login with Google
          </button>
        )}

        {/* Forgot Password & Signup Links */}
        <div className="flex justify-between text-sm mt-3 text-gray-400">
          <button onClick={() => router.push("/forgot-password")} className="hover:underline">
            Forgot Password?
          </button>
          <button onClick={() => router.push("/signup")} className="hover:underline">
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}

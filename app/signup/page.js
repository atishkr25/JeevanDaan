"use client"; // Required for Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      const loginResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginResponse?.error) {
        setError("Account created, but login failed. Please login manually.");
        router.push("/login");
        return;
      }

      router.push("/dashboard");
    } catch (signupError) {
      console.error("Signup failed:", signupError);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="font-bold text-3xl text-white mb-4">Create an Account</h1>

        {/* Full Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

        {/* Already have an account? Login Link */}
        <div className="text-sm mt-3 text-gray-400">
          Already have an account?{" "}
          <button onClick={() => router.push("/login")} className="text-blue-400 hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

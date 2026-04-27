"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "Not Selected",
    birthday: "Not Selected",
  });

  const loadProfile = async () => {
    try {
      setIsProfileLoading(true);
      const response = await fetch("/api/user/profile", { cache: "no-store" });
      const data = await response.json();

      if (response.ok && data?.profile) {
        setProfileData({
          name: data.profile.name || "User",
          email: data.profile.email || session?.user?.email || "",
          phone: data.profile.phone || "",
          address: data.profile.address || "",
          gender: data.profile.gender || "Not Selected",
          birthday: data.profile.birthday || "Not Selected",
        });
      } else {
        setProfileData((prev) => ({
          ...prev,
          name: session?.user?.name || "User",
          email: session?.user?.email || "",
        }));
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      setProfileData((prev) => ({
        ...prev,
        name: session?.user?.name || "User",
        email: session?.user?.email || "",
      }));
    } finally {
      setIsProfileLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      loadProfile();
    }
  }, [status, router, session]);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const payload = {
        ...profileData,
        birthday: profileData.birthday || "Not Selected",
      };

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.error || "Failed to save profile");
        return;
      }

      setProfileData((prev) => ({
        ...prev,
        name: data?.user?.name || prev.name,
        email: data?.user?.email || prev.email,
        phone: data?.user?.phone || "",
        address: data?.user?.address || "",
        gender: data?.user?.gender || "Not Selected",
        birthday: data?.user?.birthday || "Not Selected",
      }));
      setIsEditingProfile(false);
      alert("Profile saved successfully");
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isProfileLoading) {
    return <div className="p-8 text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="max-w-5xl mx-auto border border-gray-700/50 rounded-xl bg-gray-900/60 p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <div>
            <div className="w-44 h-44 rounded-xl bg-indigo-200/20 border border-indigo-300/30 flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-indigo-200/30 flex items-center justify-center text-3xl font-semibold text-indigo-100">
                {profileData.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-none mb-3">{profileData.name || "User"}</h1>
            <div className="h-px bg-gray-700" />
          </div>

          <div>
            {!isEditingProfile ? (
              <div className="space-y-8">
                <section>
                  <h2 className="text-gray-300 uppercase tracking-wide mb-4 underline">Contact Information</h2>
                  <div className="space-y-3 text-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className="min-w-28 text-gray-300 font-semibold">Email id:</span>
                      <span className="text-blue-400 break-all">{profileData.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className="min-w-28 text-gray-300 font-semibold">Phone:</span>
                      <span className="text-gray-200">{profileData.phone || "0000000000"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className="min-w-28 text-gray-300 font-semibold">Address:</span>
                      <span className="text-gray-200">{profileData.address || "Not added"}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-gray-300 uppercase tracking-wide mb-4 underline">Basic Information</h2>
                  <div className="space-y-3 text-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className="min-w-28 text-gray-300 font-semibold">Gender:</span>
                      <span className="text-gray-200">{profileData.gender}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className="min-w-28 text-gray-300 font-semibold">Birthday:</span>
                      <span className="text-gray-200">{profileData.birthday}</span>
                    </div>
                  </div>
                </section>

                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="mt-2 px-10 py-2 rounded-full border border-indigo-400 text-indigo-300 hover:bg-indigo-500/10 transition"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-gray-400 cursor-not-allowed"
                />
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileInputChange}
                  placeholder="Phone"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileInputChange}
                  placeholder="Address"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleProfileInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                >
                  <option>Not Selected</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input
                  type="date"
                  name="birthday"
                  value={profileData.birthday === "Not Selected" ? "" : profileData.birthday}
                  onChange={handleProfileInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="px-6 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white disabled:opacity-60"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-6 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Mail, Lock, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const [showMessage, setShowMessage] =
    useState(false);

  const handlePasswordChange =
    () => {
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  const userEmail =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "user"
          ) || "{}"
        )?.email ||
        "No Email Found"
      : "";

  return (
    <div className="space-y-8">
      {/* Header */}

      <div
        className="
        bg-[#050505]
        border border-white/5
        rounded-[28px]
        p-8
      "
      >
        <div className="flex items-center gap-4">
          <div
            className="
            w-14 h-14
            rounded-2xl
            bg-gradient-to-br
            from-blue-500/10
            to-purple-500/10
            border border-blue-500/20
            flex items-center justify-center
          "
          >
            <Settings
              size={28}
              className="text-[#6EA8FF]"
            />
          </div>

          <div>
            <h2
              className="
              text-3xl
              font-bold
              text-white
            "
            >
              Settings
            </h2>

            <p className="text-gray-400 mt-1">
              Manage your account
              settings and security
            </p>
          </div>
        </div>
      </div>

      {/* Account Info */}

      <div
        className="
        bg-[#050505]
        border border-white/5
        rounded-[28px]
        p-8
      "
      >
        <div className="flex items-center gap-3 mb-6">
          <Mail
            size={20}
            className="text-[#6EA8FF]"
          />

          <h3
            className="
            text-2xl
            font-bold
            text-white
          "
          >
            Account Information
          </h3>
        </div>

        <div
          className="
          bg-black
          border border-white/5
          rounded-2xl
          p-5
        "
        >
          <p className="text-gray-500 text-sm">
            Email Address
          </p>

          <h4
            className="
            text-white
            text-lg
            font-medium
            mt-2
          "
          >
            {userEmail}
          </h4>
        </div>
      </div>

      {/* Security */}

      <div
        className="
        bg-[#050505]
        border border-white/5
        rounded-[28px]
        p-8
      "
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock
            size={20}
            className="text-[#6EA8FF]"
          />

          <h3
            className="
            text-2xl
            font-bold
            text-white
          "
          >
            Security
          </h3>
        </div>

        <p className="text-gray-400 mb-5">
          Update your account
          password.
        </p>

        <button
          onClick={
            handlePasswordChange
          }
          className="
          px-6
          py-3
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          text-white
          font-semibold
          hover:scale-[1.02]
          transition-all
        "
        >
          Change Password
        </button>

        {showMessage && (
          <div
            className="
            mt-4
            text-[#8BB8FF]
          "
          >
            Coming Soon...
          </div>
        )}
      </div>

      {/* Logout */}

      <div
        className="
        bg-[#050505]
        rounded-[28px]
        p-8
        "
        >
        <div className="flex items-center gap-3 mb-6">
          <LogOut
            size={20}
            className="text-red-400"
          />

          <h3
            className="
            text-2xl
            font-bold
            text-white
          "
          >
            Logout
          </h3>
        </div>

        <p className="text-gray-400 mb-5">
          Sign out from your account.
        </p>

        <button
          onClick={handleLogout}
          className="
          px-6
          py-3
          rounded-xl
          bg-red-500/10
          border border-red-500/20
          text-red-400
          font-semibold
          hover:bg-red-500/20
          transition-all
        "
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
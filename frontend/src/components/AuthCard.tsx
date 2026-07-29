"use client";
import { useState } from "react";
import { signupUser, loginUser } from "@/services/authService";

export default function AuthCard() {

  const [isSignup, setIsSignup] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // HANDLE SUBMIT
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      if (isSignup) {

        const response = await signupUser({
          full_name: fullName,
          email,
          password,
        });

        setMessage(response.message);

      } else {

        const response = await loginUser({
          email,
          password,
        });

        localStorage.setItem(
          "token",
          response.access_token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );

        setMessage(response.message);

        window.location.href = "/dashboard";

      }

    } catch (error: any) {

      setMessage(
        error?.response?.data?.detail ||
        "Something went wrong..."
      );

    } finally {

      setLoading(false);

    }
  };
  return (

    <div className="w-full max-w-3xl min-h-[500px] rounded-[24px] overflow-hidden border border-purple-500/20 bg-[#0B0B0F]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(139,92,246,0.10)] flex">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-9 bg-[#0B0B0F]">

        <div className="w-full max-w-xs">

          {/* TITLE */}
          <div className="mb-6">

            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent mb-1">

              {isSignup
                ? "Create Account"
                : "Welcome Back"}

            </h1>

            <p className="text-[#C4B5FD] text-xs">

              {isSignup
                ? "Start your AI hiring journey today."
                : "Login to continue to HireMind AI."}

            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >

            {/* FULL NAME */}
            {isSignup && (

              <div>

                <label className="text-xs text-purple-200 block mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="w-full h-10 rounded-lg bg-[#141414] border border-purple-500/20 px-3 text-white text-xs outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(139,92,246,0.18)] transition-all duration-300"
                  required
                />

              </div>
            )}

            {/* EMAIL */}
            <div>

              <label className="text-xs text-purple-200 block mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full h-10 rounded-lg bg-[#141414] border border-purple-500/20 px-3 text-white text-xs outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(139,92,246,0.18)] transition-all duration-300"
                required
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-xs text-purple-200 block mb-1">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full h-10 rounded-lg bg-[#141414] border border-purple-500/20 px-3 text-white text-xs outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(139,92,246,0.18)] transition-all duration-300"
                required
              />

            </div>

            {/* FORGOT PASSWORD */}
            {!isSignup && (

              <div className="text-right">

                <button
                  type="button"
                  className="text-[11px] text-[#A78BFA] hover:text-white transition"
                >
                  Forgot Password?
                </button>

              </div>
            )}

            {/* MESSAGE */}
            {message && (

              <div className="text-[11px] text-center text-green-400">
                {message}
              </div>

            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold hover:scale-[1.01] transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.25)]"
            >

              {loading
                ? "Please wait..."
                : isSignup
                  ? "Create Account"
                  : "Login"}

            </button>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#101014] flex-col items-center justify-center px-8 text-center border-l border-purple-500/10">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent mb-4">

          {isSignup
            ? "Welcome Back!"
            : "Hello, Future!"}

        </h1>

        <p className="text-[#C4B5FD] text-sm leading-relaxed mb-6 max-w-[240px]">

          {isSignup
            ? "Already have an account? Login and continue exploring intelligent AI-powered recruitment."
            : "Create your account and unlock smart resume screening and AI hiring intelligence."}

        </p>

        <button
          onClick={() => {

            setIsSignup(!isSignup);

            setMessage("");

          }}
          className="px-6 py-2.5 rounded-full border border-purple-500/20 text-white text-xs font-semibold hover:bg-purple-500/10 transition-all duration-300"
        >

          {isSignup
            ? "Sign In"
            : "Sign Up"}

        </button>

      </div>
    </div>
  );
}


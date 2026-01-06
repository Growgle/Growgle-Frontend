"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { loginUser } from "@/lib/services/authApi";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!formData.email || !formData.password)
      return "All fields are required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      return "Invalid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    try {
      const res = await loginUser(formData);
      const payload = res?.data?.data;
      if (payload?.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", payload.token);
          if (payload.email) localStorage.setItem("userEmail", payload.email);
          if (payload.name) localStorage.setItem("userName", payload.name);
        }
      }
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const nextPath = params?.get("next") || "/dashboard";
      window.location.href = nextPath;
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex overflow-hidden">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative"
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-100/40 to-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-violet-100/30 to-purple-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-50/50 to-transparent rounded-full" />
        </div>

        <div className="max-w-md w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-10"
          >
            {/* Logo/Brand Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-40" />
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 shadow-lg shadow-indigo-500/20">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              Sign in to continue your learning journey
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5" />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="relative w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5" />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="relative w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="rememberme"
                    checked={formData.rememberme}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-all duration-200" />
                  <svg
                    className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2.5 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  Remember me
                </span>
              </label>
              <motion.a
                whileHover={{ scale: 1.02 }}
                href="/auth/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Forgot password?
              </motion.a>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center py-3 px-4 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isLoading ? (
                <div className="flex items-center justify-center relative">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Signing in...
                </div>
              ) : (
                <span className="flex items-center justify-center relative">
                  Sign in
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <motion.a
                whileHover={{ scale: 1.02 }}
                href="/auth/signup"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                Sign up for free
              </motion.a>
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-6 text-gray-400"
          >
            <div className="flex items-center gap-2 text-xs">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-xs">
              <Zap className="w-4 h-4" />
              <span>Fast</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-xs">
              <Star className="w-4 h-4" />
              <span>Trusted</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Decorative Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20"
        >
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-indigo-500/10 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-32 right-24"
        >
          <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-purple-500/10 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-24"
        >
          <div className="w-12 h-12 bg-white rounded-xl shadow-xl shadow-blue-500/10 flex items-center justify-center">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-40 right-32"
        >
          <div className="w-10 h-10 bg-white rounded-xl shadow-xl shadow-amber-500/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-amber-500" />
          </div>
        </motion.div>

        {/* Main Illustration - Animated Character */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <svg width="420" height="420" viewBox="0 0 420 420" fill="none" className="drop-shadow-2xl">
              {/* Soft Background Glow */}
              <motion.circle
                cx="210"
                cy="210"
                r="180"
                fill="url(#careerBgGlow)"
                opacity="0.12"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Career Steps/Staircase */}
              <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                {/* Step 1 - Bottom */}
                <rect x="100" y="320" width="100" height="20" rx="4" fill="#E0E7FF" />
                <rect x="100" y="320" width="100" height="3" rx="1" fill="#C7D2FE" />

                {/* Step 2 */}
                <rect x="140" y="280" width="100" height="20" rx="4" fill="#C7D2FE" />
                <rect x="140" y="280" width="100" height="3" rx="1" fill="#A5B4FC" />

                {/* Step 3 */}
                <rect x="180" y="240" width="100" height="20" rx="4" fill="#A5B4FC" />
                <rect x="180" y="240" width="100" height="3" rx="1" fill="#818CF8" />

                {/* Step 4 - Top */}
                <rect x="220" y="200" width="100" height="20" rx="4" fill="#818CF8" />
                <rect x="220" y="200" width="100" height="3" rx="1" fill="#6366F1" />

                {/* Goal Flag at top */}
                <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <rect x="305" y="165" width="4" height="40" rx="1" fill="#4338CA" />
                  <path d="M309 165 L345 178 L309 191 Z" fill="url(#flagGradient)" />
                  <text x="325" y="182" textAnchor="middle" fontSize="10" fill="white">🎯</text>
                </motion.g>
              </motion.g>

              {/* Character Climbing */}
              <motion.g
                animate={{ y: [0, -8, 0], x: [0, 2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Shadow */}
                <ellipse cx="235" cy="242" rx="30" ry="8" fill="#1F2937" opacity="0.12" />

                {/* Body - Clean professional shirt */}
                <ellipse cx="235" cy="185" rx="30" ry="38" fill="url(#suitGradient)" />
                <ellipse cx="235" cy="175" rx="26" ry="28" fill="#4F46E5" />

                {/* Collar */}
                <path d="M222 155 L235 168 L248 155" fill="white" />
                <circle cx="235" cy="160" r="3" fill="#6366F1" />

                {/* Arms */}
                <motion.g animate={{ rotate: [-8, 5, -8] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                  <ellipse cx="200" cy="165" rx="9" ry="26" fill="#F5DEB3" transform="rotate(-50 200 165)" />
                  <circle cx="182" cy="148" r="10" fill="#F5DEB3" />
                  {/* Fingers reaching */}
                  <ellipse cx="175" cy="143" rx="3" ry="6" fill="#F5DEB3" transform="rotate(-15 175 143)" />
                  <ellipse cx="182" cy="138" rx="3" ry="6" fill="#F5DEB3" />
                  <ellipse cx="189" cy="142" rx="3" ry="5" fill="#F5DEB3" transform="rotate(15 189 142)" />
                </motion.g>
                <ellipse cx="268" cy="180" rx="9" ry="22" fill="#F5DEB3" transform="rotate(30 268 180)" />
                <circle cx="278" cy="198" r="9" fill="#F5DEB3" />

                {/* Legs */}
                <ellipse cx="222" cy="222" rx="10" ry="22" fill="#374151" transform="rotate(-10 222 222)" />
                <ellipse cx="248" cy="224" rx="10" ry="20" fill="#374151" transform="rotate(15 248 224)" />
                <ellipse cx="215" cy="242" rx="13" ry="7" fill="#1F2937" />
                <ellipse cx="255" cy="243" rx="12" ry="6" fill="#1F2937" />

                {/* Neck */}
                <rect x="228" y="138" width="14" height="14" rx="5" fill="#F5DEB3" />

                {/* Head - Rounder, more polished */}
                <circle cx="235" cy="115" r="30" fill="#F5DEB3" />

                {/* Hair - Modern clean style */}
                <ellipse cx="235" cy="92" rx="32" ry="20" fill="#1E293B" />
                <ellipse cx="212" cy="102" rx="12" ry="13" fill="#1E293B" />
                <ellipse cx="258" cy="102" rx="12" ry="13" fill="#1E293B" />
                <ellipse cx="235" cy="85" rx="24" ry="13" fill="#334155" />
                {/* Side part */}
                <path d="M210 95 Q220 80 235 85" fill="#1E293B" />

                {/* Eyes - Larger, more expressive */}
                <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}>
                  <ellipse cx="223" cy="115" rx="9" ry="11" fill="white" />
                  <ellipse cx="247" cy="115" rx="9" ry="11" fill="white" />
                  <circle cx="225" cy="117" r="6" fill="#1E3A5F" />
                  <circle cx="249" cy="117" r="6" fill="#1E3A5F" />
                  <circle cx="227" cy="114" r="2.5" fill="white" />
                  <circle cx="251" cy="114" r="2.5" fill="white" />
                  <circle cx="223" cy="119" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="247" cy="119" r="1.5" fill="white" opacity="0.5" />
                </motion.g>

                {/* Eyebrows */}
                <path d="M213 105 Q223 100 233 104" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M237 104 Q247 100 257 105" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Nose */}
                <ellipse cx="235" cy="122" rx="3" ry="4" fill="#E8C9A0" />

                {/* Confident smile */}
                <path d="M225 132 Q235 140 245 132" stroke="#C4626A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Blush */}
                <ellipse cx="210" cy="125" rx="8" ry="4" fill="#FCA5A5" opacity="0.35" />
                <ellipse cx="260" cy="125" rx="8" ry="4" fill="#FCA5A5" opacity="0.35" />
              </motion.g>

              {/* Floating Skill Badges */}
              <motion.g animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <rect x="60" y="150" width="50" height="28" rx="6" fill="white" stroke="#6366F1" strokeWidth="2" />
                <text x="85" y="168" textAnchor="middle" fontSize="10" fill="#4338CA" fontWeight="bold">Skills</text>
                <circle cx="70" cy="164" r="6" fill="#10B981" />
                <text x="70" y="167" textAnchor="middle" fontSize="8" fill="white">✓</text>
              </motion.g>

              <motion.g animate={{ y: [0, 10, 0], rotate: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <rect x="320" y="120" width="55" height="28" rx="6" fill="white" stroke="#10B981" strokeWidth="2" />
                <text x="347" y="138" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="bold">Growth</text>
                <motion.path
                  d="M328 128 L333 135 L343 125"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.g>

              {/* Career Icons */}
              <motion.g animate={{ scale: [1, 1.15, 1], y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <circle cx="75" cy="260" r="22" fill="url(#iconBadge1)" />
                <text x="75" y="266" textAnchor="middle" fontSize="16">💼</text>
              </motion.g>

              <motion.g animate={{ scale: [1, 1.1, 1], y: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}>
                <circle cx="355" y="270" r="20" fill="url(#iconBadge2)" />
                <text x="355" y="276" textAnchor="middle" fontSize="14">📈</text>
              </motion.g>

              <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <circle cx="90" cy="340" r="16" fill="url(#iconBadge3)" />
                <text x="90" y="345" textAnchor="middle" fontSize="12">⭐</text>
              </motion.g>

              <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <circle cx="340" cy="340" r="18" fill="url(#iconBadge4)" />
                <text x="340" y="346" textAnchor="middle" fontSize="13">🏆</text>
              </motion.g>

              {/* Progress Bar */}
              <motion.g animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }}>
                <rect x="130" y="370" width="160" height="12" rx="6" fill="#E0E7FF" />
                <motion.rect
                  x="130"
                  y="370"
                  width="120"
                  height="12"
                  rx="6"
                  fill="url(#progressGradient)"
                  animate={{ width: [80, 120, 80] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <text x="210" y="379" textAnchor="middle" fontSize="8" fill="#4338CA" fontWeight="bold">75%</text>
              </motion.g>

              {/* Sparkle Particles */}
              <motion.g animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <circle cx="50" cy="200" r="4" fill="#A5B4FC" />
                <circle cx="370" cy="180" r="3" fill="#C4B5FD" />
                <circle cx="45" cy="300" r="5" fill="#818CF8" />
                <circle cx="375" cy="320" r="4" fill="#6366F1" />
              </motion.g>

              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="careerBgGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#EEF2FF" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4338CA" />
                  <stop offset="100%" stopColor="#3730A3" />
                </linearGradient>
                <linearGradient id="flagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="iconBadge1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="iconBadge2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="iconBadge3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="iconBadge4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-indigo-300" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

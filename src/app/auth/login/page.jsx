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
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" className="drop-shadow-2xl">
              {/* Background Circle */}
              <motion.circle
                cx="200"
                cy="200"
                r="150"
                fill="url(#bgGradientLogin)"
                opacity="0.15"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating Abstract Shapes */}
              <motion.rect
                x="80"
                y="80"
                width="40"
                height="40"
                rx="8"
                fill="#6366F1"
                opacity="0.6"
                animate={{ rotate: [0, 90, 0], y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="320"
                cy="100"
                r="25"
                fill="#8B5CF6"
                opacity="0.5"
                animate={{ scale: [1, 1.2, 1], x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.polygon
                points="60,200 80,240 40,240"
                fill="#A78BFA"
                opacity="0.5"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "60px 220px" }}
              />
              <motion.rect
                x="320"
                y="280"
                width="30"
                height="30"
                rx="6"
                fill="#C4B5FD"
                opacity="0.6"
                animate={{ rotate: [0, -45, 0], y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* Main Character - Floating Person */}
              <motion.g
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Shadow */}
                <motion.ellipse
                  cx="200"
                  cy="340"
                  rx="50"
                  ry="12"
                  fill="#1F2937"
                  opacity="0.15"
                  animate={{ scale: [1, 0.85, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Body */}
                <ellipse cx="200" cy="240" rx="40" ry="50" fill="url(#bodyGradient)" />

                {/* Legs crossed */}
                <ellipse cx="185" cy="295" rx="12" ry="25" fill="#4338CA" transform="rotate(-20 185 295)" />
                <ellipse cx="215" cy="295" rx="12" ry="25" fill="#4338CA" transform="rotate(20 215 295)" />
                <circle cx="175" cy="315" r="10" fill="#3730A3" />
                <circle cx="225" cy="315" r="10" fill="#3730A3" />

                {/* Arms holding tablet */}
                <ellipse cx="155" cy="235" rx="10" ry="25" fill="#FFDAB9" transform="rotate(30 155 235)" />
                <ellipse cx="245" cy="235" rx="10" ry="25" fill="#FFDAB9" transform="rotate(-30 245 235)" />

                {/* Hands */}
                <circle cx="148" cy="260" r="10" fill="#FFDAB9" />
                <circle cx="252" cy="260" r="10" fill="#FFDAB9" />

                {/* Tablet/Device */}
                <rect x="160" y="230" width="80" height="55" rx="6" fill="#1F2937" />
                <rect x="165" y="235" width="70" height="45" rx="4" fill="#312E81" />
                <motion.rect
                  x="172"
                  y="242"
                  width="40"
                  height="4"
                  rx="2"
                  fill="#818CF8"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <rect x="172" y="250" width="55" height="3" rx="1.5" fill="#6366F1" opacity="0.7" />
                <rect x="172" y="257" width="45" height="3" rx="1.5" fill="#6366F1" opacity="0.5" />
                <rect x="172" y="264" width="50" height="3" rx="1.5" fill="#6366F1" opacity="0.6" />

                {/* Neck */}
                <rect x="190" y="175" width="20" height="20" rx="6" fill="#FFDAB9" />

                {/* Head */}
                <circle cx="200" cy="150" r="42" fill="#FFDAB9" />

                {/* Hair - Modern side-swept */}
                <ellipse cx="200" cy="118" rx="44" ry="28" fill="#3730A3" />
                <ellipse cx="175" cy="130" rx="18" ry="20" fill="#3730A3" />
                <ellipse cx="225" cy="130" rx="15" ry="18" fill="#3730A3" />
                <ellipse cx="200" cy="108" rx="35" ry="18" fill="#4338CA" />
                <path d="M160 125 Q175 100 200 105 Q225 100 240 125" fill="#3730A3" />

                {/* Eyes - Focused on screen */}
                <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}>
                  <ellipse cx="185" cy="150" rx="10" ry="12" fill="white" />
                  <ellipse cx="215" cy="150" rx="10" ry="12" fill="white" />
                  <circle cx="187" cy="153" r="6" fill="#1E3A5F" />
                  <circle cx="217" cy="153" r="6" fill="#1E3A5F" />
                  <circle cx="189" cy="150" r="2.5" fill="white" />
                  <circle cx="219" cy="150" r="2.5" fill="white" />
                </motion.g>

                {/* Eyebrows - Concentrated */}
                <path d="M173 138 Q185 135 197 140" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M203 140 Q215 135 227 138" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Subtle smile */}
                <path d="M190 168 Q200 175 210 168" stroke="#B45B5B" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Rosy cheeks */}
                <ellipse cx="168" cy="160" rx="8" ry="5" fill="#FCA5A5" opacity="0.4" />
                <ellipse cx="232" cy="160" rx="8" ry="5" fill="#FCA5A5" opacity="0.4" />
              </motion.g>

              {/* Floating Icons */}
              <motion.g animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <circle cx="90" cy="150" r="18" fill="url(#iconGrad1)" />
                <text x="90" y="156" textAnchor="middle" fontSize="14">🔐</text>
              </motion.g>

              <motion.g animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <circle cx="310" cy="180" r="16" fill="url(#iconGrad2)" />
                <text x="310" y="185" textAnchor="middle" fontSize="12">✉️</text>
              </motion.g>

              <motion.g animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <circle cx="330" cy="250" r="14" fill="url(#iconGrad3)" />
                <text x="330" y="255" textAnchor="middle" fontSize="11">✓</text>
              </motion.g>

              {/* Particles */}
              <motion.g animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity }}>
                <circle cx="70" cy="280" r="4" fill="#A5B4FC" />
                <circle cx="340" cy="140" r="3" fill="#C4B5FD" />
                <circle cx="100" cy="320" r="5" fill="#818CF8" />
                <circle cx="300" cy="330" r="4" fill="#6366F1" />
              </motion.g>

              {/* Gradients */}
              <defs>
                <radialGradient id="bgGradientLogin" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#4338CA" />
                </linearGradient>
                <linearGradient id="iconGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="iconGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="iconGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
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

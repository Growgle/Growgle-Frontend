"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  UserPlus,
  Sparkles,
  Shield,
  Star,
  Phone,
  Zap,
  BookOpen,
  Award,
  Target,
} from "lucide-react";
import { register, createUser } from "@/lib/services/authApi";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    )
      return "All fields are required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      return "Invalid email address.";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";
    if (!formData.agreeToTerms) return "You must agree to the terms.";
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
      await register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || "Signup failed");
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex overflow-hidden">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative"
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-green-100/30 to-emerald-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-50/50 to-transparent rounded-full" />
        </div>

        <div className="max-w-md w-full relative z-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 mb-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur-lg opacity-40" />
                      <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-lg shadow-emerald-500/20">
                        <UserPlus className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                    Create your account
                  </h1>
                  <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                    Join thousands of learners and start your journey today
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5" />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="relative w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5" />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="relative w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5" />
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="relative w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Fields Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Password Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5" />
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create password"
                          className="relative w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-0.5" />
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm password"
                          className="relative w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="sr-only peer"
                        required
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all duration-200 cursor-pointer" onClick={() => handleInputChange({ target: { name: 'agreeToTerms', type: 'checkbox', checked: !formData.agreeToTerms } })} />
                      <svg
                        className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <label
                      htmlFor="agreeToTerms"
                      className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <a href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                        Privacy Policy
                      </a>
                    </label>
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
                    whileHover={{ scale: 1.01, boxShadow: "0 10px 40px -10px rgba(16, 185, 129, 0.4)" }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {isLoading ? (
                      <div className="flex items-center justify-center relative">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Creating account...
                      </div>
                    ) : (
                      <span className="flex items-center justify-center relative">
                        Create Account
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </motion.button>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  Welcome aboard! 🎉
                </h1>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Your account has been created successfully!
                  </p>
                  <p className="text-emerald-700 font-semibold mt-2">
                    {formData.email}
                  </p>
                </div>

                {/* What's Next Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 text-emerald-500 mr-2" />
                    What's next?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm text-gray-600">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-emerald-600 text-xs font-bold">1</span>
                      </div>
                      Check your email for a welcome message
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-emerald-600 text-xs font-bold">2</span>
                      </div>
                      Complete your profile setup
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-emerald-600 text-xs font-bold">3</span>
                      </div>
                      Start exploring personalized content
                    </li>
                  </ul>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/auth/login"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
                >
                  Continue to Login
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side - Decorative Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.15),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20"
        >
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-emerald-500/10 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-32 right-24"
        >
          <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-teal-500/10 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-24"
        >
          <div className="w-12 h-12 bg-white rounded-xl shadow-xl shadow-green-500/10 flex items-center justify-center">
            <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
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
                fill="url(#growthBgGlow)"
                opacity="0.12"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Ground/Soil */}
              <ellipse cx="210" cy="365" rx="150" ry="20" fill="#92400E" opacity="0.3" />
              <ellipse cx="210" cy="360" rx="140" ry="15" fill="#78350F" opacity="0.2" />

              {/* Growing Skill Tree */}
              <motion.g animate={{ scale: [0.98, 1, 0.98] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                {/* Tree Trunk */}
                <rect x="195" y="270" width="30" height="95" rx="8" fill="url(#trunkGradient)" />
                <rect x="200" y="275" width="5" height="85" rx="2" fill="#92400E" opacity="0.3" />

                {/* Tree Crown/Foliage */}
                <motion.g animate={{ scale: [0.95, 1.02, 0.95] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <ellipse cx="210" cy="200" rx="90" ry="85" fill="url(#foliageGradient)" />
                  <ellipse cx="175" cy="185" rx="35" ry="40" fill="#10B981" />
                  <ellipse cx="245" cy="185" rx="35" ry="40" fill="#10B981" />
                  <ellipse cx="210" cy="155" rx="45" ry="45" fill="#059669" />
                  <ellipse cx="160" cy="220" rx="30" ry="35" fill="#059669" />
                  <ellipse cx="260" cy="220" rx="30" ry="35" fill="#059669" />
                </motion.g>

                {/* Skill Icons on Tree (Like fruits/ornaments) */}
                <motion.g animate={{ y: [0, -3, 0], rotate: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <circle cx="165" cy="170" r="16" fill="white" stroke="#10B981" strokeWidth="2" />
                  <text x="165" y="175" textAnchor="middle" fontSize="12">📚</text>
                </motion.g>

                <motion.g animate={{ y: [0, -4, 0], rotate: [3, -3, 3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                  <circle cx="255" cy="165" r="16" fill="white" stroke="#059669" strokeWidth="2" />
                  <text x="255" y="170" textAnchor="middle" fontSize="12">💻</text>
                </motion.g>

                <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
                  <circle cx="210" cy="135" r="18" fill="white" stroke="#047857" strokeWidth="2" />
                  <text x="210" y="141" textAnchor="middle" fontSize="13">🎓</text>
                </motion.g>

                <motion.g animate={{ y: [0, -2, 0], rotate: [-2, 2, -2] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}>
                  <circle cx="145" cy="215" r="14" fill="white" stroke="#10B981" strokeWidth="2" />
                  <text x="145" y="220" textAnchor="middle" fontSize="10">🏆</text>
                </motion.g>

                <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
                  <circle cx="275" cy="210" r="14" fill="white" stroke="#059669" strokeWidth="2" />
                  <text x="275" y="215" textAnchor="middle" fontSize="10">📈</text>
                </motion.g>
              </motion.g>

              {/* Character - Watering the tree */}
              <motion.g
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Shadow */}
                <ellipse cx="90" cy="358" rx="35" ry="8" fill="#1F2937" opacity="0.12" />

                {/* Legs */}
                <ellipse cx="75" cy="335" rx="11" ry="22" fill="#047857" transform="rotate(-5 75 335)" />
                <ellipse cx="105" cy="335" rx="11" ry="22" fill="#047857" transform="rotate(5 105 335)" />
                <ellipse cx="72" cy="355" rx="14" ry="8" fill="#1F2937" />
                <ellipse cx="108" cy="355" rx="14" ry="8" fill="#1F2937" />

                {/* Body */}
                <ellipse cx="90" cy="295" rx="32" ry="40" fill="url(#characterGradient)" />

                {/* Cute Overalls */}
                <path d="M62 280 Q65 270 90 268 Q115 270 118 280 L115 328 Q90 332 65 328 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
                <rect x="80" y="290" width="20" height="16" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
                {/* Straps */}
                <line x1="75" y1="268" x2="75" y2="285" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <line x1="105" y1="268" x2="105" y2="285" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

                {/* Left arm */}
                <ellipse cx="55" cy="290" rx="9" ry="22" fill="#F5DEB3" transform="rotate(-20 55 290)" />
                <circle cx="48" cy="275" r="9" fill="#F5DEB3" />

                {/* Right arm holding watering can */}
                <motion.g animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <ellipse cx="125" cy="290" rx="9" ry="22" fill="#F5DEB3" transform="rotate(25 125 290)" />
                  <circle cx="140" cy="300" r="9" fill="#F5DEB3" />

                  {/* Watering Can - Cuter design */}
                  <ellipse cx="162" cy="300" rx="18" ry="14" fill="#60A5FA" />
                  <rect x="150" y="290" width="8" height="16" rx="3" fill="#3B82F6" />
                  <rect x="172" y="296" width="22" height="5" rx="2" fill="#60A5FA" />
                  <ellipse cx="196" cy="298" rx="6" ry="6" fill="#3B82F6" />
                  {/* Water holes */}
                  <circle cx="192" cy="298" r="1.5" fill="#93C5FD" />
                  <circle cx="196" cy="296" r="1.5" fill="#93C5FD" />
                  <circle cx="198" cy="300" r="1.5" fill="#93C5FD" />

                  {/* Water Droplets */}
                  <motion.g animate={{ y: [0, 25, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}>
                    <ellipse cx="194" cy="312" rx="3" ry="5" fill="#60A5FA" />
                    <ellipse cx="200" cy="318" rx="2" ry="4" fill="#93C5FD" />
                    <ellipse cx="188" cy="316" rx="2" ry="4" fill="#60A5FA" />
                  </motion.g>
                </motion.g>

                {/* Neck */}
                <rect x="82" y="252" width="16" height="12" rx="5" fill="#F5DEB3" />

                {/* Head - Rounder, cuter */}
                <circle cx="90" cy="230" r="30" fill="#F5DEB3" />

                {/* Sun Hat - Cuter */}
                <ellipse cx="90" cy="202" rx="38" ry="10" fill="#FCD34D" />
                <ellipse cx="90" cy="210" rx="25" ry="20" fill="#FBBF24" />
                <ellipse cx="90" cy="198" rx="18" ry="8" fill="#F59E0B" />
                {/* Hat ribbon */}
                <rect x="65" y="210" width="50" height="4" rx="2" fill="#D97706" />

                {/* Face */}
                {/* Eyes - Larger, anime-style */}
                <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}>
                  <ellipse cx="78" cy="230" rx="8" ry="10" fill="white" />
                  <ellipse cx="102" cy="230" rx="8" ry="10" fill="white" />
                  <circle cx="80" cy="232" r="5" fill="#1E3A5F" />
                  <circle cx="104" cy="232" r="5" fill="#1E3A5F" />
                  <circle cx="82" cy="229" r="2" fill="white" />
                  <circle cx="106" cy="229" r="2" fill="white" />
                  <circle cx="78" cy="234" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="102" cy="234" r="1.5" fill="white" opacity="0.5" />
                </motion.g>

                {/* Eyebrows */}
                <path d="M70 222 Q78 218 86 222" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M94 222 Q102 218 110 222" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Nose */}
                <ellipse cx="90" cy="238" rx="3" ry="3" fill="#E8C9A0" />

                {/* Happy smile */}
                <motion.path
                  d="M80 248 Q90 258 100 248"
                  stroke="#C4626A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  animate={{ d: ["M80 248 Q90 258 100 248", "M80 250 Q90 262 100 250", "M80 248 Q90 258 100 248"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Rosy Cheeks */}
                <ellipse cx="65" cy="240" rx="8" ry="5" fill="#FCA5A5" opacity="0.45" />
                <ellipse cx="115" cy="240" rx="8" ry="5" fill="#FCA5A5" opacity="0.45" />
              </motion.g>

              {/* Floating Learning Badges */}
              <motion.g animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <rect x="310" y="100" width="60" height="30" rx="8" fill="white" stroke="#10B981" strokeWidth="2" />
                <text x="340" y="120" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="bold">Start Here</text>
                <circle cx="318" cy="115" r="6" fill="#10B981" />
                <text x="318" y="118" textAnchor="middle" fontSize="7" fill="white">+</text>
              </motion.g>

              <motion.g animate={{ y: [0, 8, 0], rotate: [3, -3, 3] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <rect x="320" y="260" width="55" height="28" rx="6" fill="white" stroke="#F59E0B" strokeWidth="2" />
                <text x="347" y="278" textAnchor="middle" fontSize="9" fill="#D97706" fontWeight="bold">Learn!</text>
                <motion.text
                  x="327"
                  y="278"
                  fontSize="12"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >✨</motion.text>
              </motion.g>

              {/* Growth Arrows */}
              <motion.g animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <path d="M50 180 L50 140 L40 150 M50 140 L60 150" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
              </motion.g>
              <motion.g animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <path d="M370 200 L370 160 L360 170 M370 160 L380 170" stroke="#059669" strokeWidth="3" strokeLinecap="round" fill="none" />
              </motion.g>

              {/* Floating Particles/Seeds */}
              <motion.g animate={{ y: [0, -30, 0], opacity: [0, 1, 0], rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                <ellipse cx="320" cy="320" rx="4" ry="6" fill="#84CC16" />
                <ellipse cx="60" cy="140" rx="3" ry="5" fill="#10B981" />
                <ellipse cx="350" cy="180" rx="4" ry="6" fill="#34D399" />
                <ellipse cx="70" cy="200" rx="3" ry="5" fill="#6EE7B7" />
              </motion.g>

              {/* Sparkle Effects */}
              <motion.g animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <circle cx="40" cy="250" r="4" fill="#A7F3D0" />
                <circle cx="380" cy="140" r="3" fill="#6EE7B7" />
                <circle cx="45" cy="320" r="5" fill="#34D399" />
                <circle cx="375" cy="300" r="4" fill="#10B981" />
              </motion.g>

              {/* Sun in corner */}
              <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                <circle cx="370" cy="60" r="25" fill="#FBBF24" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <motion.line
                    key={i}
                    x1={370 + 30 * Math.cos(angle * Math.PI / 180)}
                    y1={60 + 30 * Math.sin(angle * Math.PI / 180)}
                    x2={370 + 40 * Math.cos(angle * Math.PI / 180)}
                    y2={60 + 40 * Math.sin(angle * Math.PI / 180)}
                    stroke="#FBBF24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </motion.g>

              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="growthBgGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A16207" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
                <linearGradient id="foliageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="characterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-emerald-300" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Floating Quote */}
        <motion.div
          animate={{ y: [0, -8, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-16 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl max-w-xs"
        >
          <p className="text-sm text-gray-700 italic leading-relaxed">
            "The journey of a thousand miles begins with a single step."
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">
            — Lao Tzu
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

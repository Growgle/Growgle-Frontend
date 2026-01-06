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
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" className="drop-shadow-2xl">
              {/* Background Circle */}
              <motion.circle
                cx="200"
                cy="200"
                r="150"
                fill="url(#bgGradientSignup)"
                opacity="0.15"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating Abstract Shapes */}
              <motion.circle
                cx="80"
                cy="100"
                r="20"
                fill="#10B981"
                opacity="0.5"
                animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.rect
                x="310"
                y="90"
                width="35"
                height="35"
                rx="8"
                fill="#14B8A6"
                opacity="0.5"
                animate={{ rotate: [0, 45, 0], y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.polygon
                points="340,260 360,300 320,300"
                fill="#059669"
                opacity="0.4"
                animate={{ rotate: [0, -180, -360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "340px 280px" }}
              />
              <motion.circle
                cx="60"
                cy="280"
                r="15"
                fill="#6EE7B7"
                opacity="0.6"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Character - Celebrating/Jumping */}
              <motion.g
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Shadow - grows when jumping */}
                <motion.ellipse
                  cx="200"
                  cy="350"
                  rx="45"
                  ry="10"
                  fill="#1F2937"
                  opacity="0.12"
                  animate={{ scale: [0.7, 1, 0.7], opacity: [0.12, 0.08, 0.12] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Legs - Spread for jumping pose */}
                <ellipse cx="175" cy="300" rx="14" ry="35" fill="#047857" transform="rotate(-15 175 300)" />
                <ellipse cx="225" cy="300" rx="14" ry="35" fill="#047857" transform="rotate(15 225 300)" />
                {/* Shoes */}
                <ellipse cx="160" cy="332" rx="18" ry="10" fill="#1F2937" transform="rotate(-10 160 332)" />
                <ellipse cx="240" cy="332" rx="18" ry="10" fill="#1F2937" transform="rotate(10 240 332)" />

                {/* Body - Torso */}
                <ellipse cx="200" cy="235" rx="45" ry="55" fill="url(#bodyGradientSignup)" />

                {/* Arms raised in celebration */}
                <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}>
                  <ellipse cx="140" cy="180" rx="12" ry="35" fill="#FFDAB9" transform="rotate(-45 140 180)" />
                  <circle cx="118" cy="158" r="12" fill="#FFDAB9" />
                </motion.g>
                <motion.g animate={{ rotate: [5, -5, 5] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}>
                  <ellipse cx="260" cy="180" rx="12" ry="35" fill="#FFDAB9" transform="rotate(45 260 180)" />
                  <circle cx="282" cy="158" r="12" fill="#FFDAB9" />
                </motion.g>

                {/* Neck */}
                <rect x="188" y="168" width="24" height="22" rx="8" fill="#FFDAB9" />

                {/* Head */}
                <circle cx="200" cy="135" r="45" fill="#FFDAB9" />

                {/* Hair - Cute messy style */}
                <ellipse cx="200" cy="100" rx="47" ry="30" fill="#059669" />
                <circle cx="160" cy="112" r="14" fill="#059669" />
                <circle cx="240" cy="112" r="14" fill="#059669" />
                <ellipse cx="200" cy="88" rx="38" ry="20" fill="#10B981" />
                {/* Hair strand */}
                <path d="M200 62 Q195 50 205 55 Q210 48 200 62" fill="#059669" />

                {/* Happy Closed Eyes (celebrating) */}
                <motion.g>
                  <path d="M175 130 Q185 120 195 130" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M205 130 Q215 120 225 130" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" fill="none" />
                </motion.g>

                {/* Eyebrows - Excited */}
                <path d="M172 118 Q183 110 194 118" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M206 118 Q217 110 228 118" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Big Open Smile */}
                <motion.path
                  d="M175 150 Q200 180 225 150"
                  stroke="#DC2626"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  animate={{ d: ["M175 150 Q200 180 225 150", "M175 152 Q200 185 225 152", "M175 150 Q200 180 225 150"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {/* Teeth */}
                <path d="M182 155 Q200 162 218 155" fill="white" />

                {/* Rosy Cheeks */}
                <ellipse cx="160" cy="142" rx="12" ry="8" fill="#FCA5A5" opacity="0.5" />
                <ellipse cx="240" cy="142" rx="12" ry="8" fill="#FCA5A5" opacity="0.5" />
              </motion.g>

              {/* Celebration Effects */}
              {/* Stars bursting out */}
              <motion.g animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3], rotate: [0, 15, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <path d="M100 140 L103 148 L112 148 L105 153 L108 162 L100 157 L92 162 L95 153 L88 148 L97 148 Z" fill="#FBBF24" />
              </motion.g>
              <motion.g animate={{ scale: [0.5, 1.3, 0.5], opacity: [0.3, 1, 0.3], rotate: [0, -20, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>
                <path d="M300 130 L302 136 L309 136 L304 140 L306 147 L300 143 L294 147 L296 140 L291 136 L298 136 Z" fill="#F59E0B" />
              </motion.g>
              <motion.g animate={{ scale: [0.5, 1.1, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}>
                <path d="M130 90 L131 94 L136 94 L132 97 L134 102 L130 99 L126 102 L128 97 L124 94 L129 94 Z" fill="#FCD34D" />
              </motion.g>
              <motion.g animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.6 }}>
                <path d="M270 85 L271 89 L276 89 L272 92 L274 97 L270 94 L266 97 L268 92 L264 89 L269 89 Z" fill="#10B981" />
              </motion.g>

              {/* Confetti */}
              <motion.g animate={{ y: [0, 50, 0], opacity: [1, 0, 1], rotate: [0, 360] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <rect x="120" y="70" width="8" height="8" rx="1" fill="#10B981" transform="rotate(45 120 70)" />
                <rect x="280" y="60" width="6" height="6" rx="1" fill="#F59E0B" transform="rotate(30 280 60)" />
                <rect x="90" y="180" width="7" height="7" rx="1" fill="#EC4899" transform="rotate(60 90 180)" />
                <rect x="310" y="170" width="6" height="6" rx="1" fill="#6366F1" transform="rotate(15 310 170)" />
              </motion.g>

              {/* Floating Icons */}
              <motion.g animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <circle cx="75" cy="180" r="16" fill="url(#iconGradS1)" />
                <text x="75" y="185" textAnchor="middle" fontSize="12">🚀</text>
              </motion.g>

              <motion.g animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <circle cx="325" cy="200" r="15" fill="url(#iconGradS2)" />
                <text x="325" y="205" textAnchor="middle" fontSize="11">🎯</text>
              </motion.g>

              <motion.g animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <circle cx="340" cy="140" r="14" fill="url(#iconGradS3)" />
                <text x="340" y="145" textAnchor="middle" fontSize="10">✨</text>
              </motion.g>

              {/* Sparkle Particles */}
              <motion.g animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <circle cx="50" cy="320" r="4" fill="#6EE7B7" />
                <circle cx="350" cy="300" r="3" fill="#34D399" />
                <circle cx="70" cy="350" r="5" fill="#A7F3D0" />
                <circle cx="330" cy="340" r="4" fill="#10B981" />
              </motion.g>

              {/* Gradients */}
              <defs>
                <radialGradient id="bgGradientSignup" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bodyGradientSignup" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="iconGradS1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="iconGradS2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="iconGradS3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#EC4899" />
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

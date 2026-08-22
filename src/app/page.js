'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Sparkles,
  Compass,
  MessageSquare,
  Star,
} from 'lucide-react';

const BRAND = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
};

const features = [
  {
    icon: Target,
    title: 'Skills Mapping',
    description:
      'Upload your resume or add skills manually. Our AI maps your competencies to real career opportunities.',
    color: BRAND.blue,
    tint: 'rgba(66,133,244,0.12)',
  },
  {
    icon: Brain,
    title: 'AI Recommendations',
    description:
      'Get tailored career paths based on your skills, interests, and live market trends.',
    color: BRAND.red,
    tint: 'rgba(234,67,53,0.12)',
  },
  {
    icon: TrendingUp,
    title: 'Industry Insights',
    description:
      'Stay ahead with real-time industry trends and how policy shifts affect your path.',
    color: BRAND.yellow,
    tint: 'rgba(251,188,5,0.16)',
  },
  {
    icon: BookOpen,
    title: 'Personalized Roadmap',
    description:
      'Receive actionable milestones, skill plans, and certification recommendations.',
    color: BRAND.green,
    tint: 'rgba(52,168,83,0.12)',
  },
];

const steps = [
  {
    step: '1',
    title: 'Map your skills',
    description: 'Upload a resume or add your skills. The AI analyzes your strengths in seconds.',
    icon: Target,
    color: BRAND.blue,
  },
  {
    step: '2',
    title: 'Get recommendations',
    description: 'Receive personalized career paths and opportunities matched to your profile.',
    icon: Compass,
    color: BRAND.red,
  },
  {
    step: '3',
    title: 'Follow your roadmap',
    description: 'Track a step-by-step learning path with milestones and certifications.',
    icon: BookOpen,
    color: BRAND.green,
  },
];

const stats = [
  { value: '50K+', label: 'Career paths mapped', color: BRAND.blue },
  { value: '1,200+', label: 'Skills tracked', color: BRAND.red },
  { value: '95%', label: 'Found a clearer path', color: BRAND.green },
  { value: '24/7', label: 'AI guidance', color: BRAND.yellow },
];

const quotes = [
  { text: 'Choose a job you love, and you will never have to work a day in your life.', author: 'Confucius' },
  { text: "Opportunities don't happen. You create them.", author: 'Chris Grosser' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [quoteIndex, setQuoteIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Dotted grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(60,64,67,0.12) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, #000 40%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, #000 40%, transparent 100%)',
          }}
        />
        {/* Drifting color orbs */}
        <motion.div
          aria-hidden
          className="absolute -z-10 top-10 -left-10 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.35), transparent 70%)' }}
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute -z-10 top-24 right-0 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(234,67,53,0.28), transparent 70%)' }}
          animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute -z-10 bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(52,168,83,0.28), transparent 70%)' }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-grey-200 bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-medium text-grey-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4" style={{ color: BRAND.blue }} />
              AI-powered career guidance
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.blue }} />
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.red }} />
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.yellow }} />
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.green }} />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-8 text-5xl md:text-7xl font-bold tracking-tight text-grey-900"
            >
              Your AI-powered
              <br className="hidden sm:block" />
              <span
                className="animate-gradient bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(100deg, ${BRAND.blue}, #9b72f2, ${BRAND.red}, ${BRAND.yellow}, ${BRAND.green}, ${BRAND.blue})`,
                }}
              >
                {' '}career compass
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-lg md:text-2xl text-grey-600 max-w-3xl mx-auto leading-relaxed"
            >
              Navigate your career journey with personalized guidance. Map your
              skills, discover opportunities, and build your future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/auth/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-7 py-3.5 text-base font-medium text-white shadow-md transition-all duration-200 hover:bg-[#1765cc] hover:shadow-lg"
              >
                Get started free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-grey-300 bg-white px-7 py-3.5 text-base font-medium text-grey-800 transition-all duration-200 hover:bg-grey-50 hover:border-grey-400"
              >
                <MessageSquare className="h-5 w-5" style={{ color: BRAND.blue }} />
                Try the assistant
              </Link>
            </motion.div>

            {/* Floating product mock */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="relative mt-16 mx-auto max-w-2xl"
            >
              {/* rotating gradient ring */}
              <div className="pointer-events-none absolute -inset-6 -z-10 flex items-center justify-center">
                <motion.div
                  className="h-64 w-64 rounded-full opacity-40 blur-2xl"
                  style={{
                    background: `conic-gradient(from 0deg, ${BRAND.blue}, ${BRAND.red}, ${BRAND.yellow}, ${BRAND.green}, ${BRAND.blue})`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <div className="rounded-3xl border border-grey-200 bg-white/90 backdrop-blur-xl shadow-2xl shadow-grey-300/40 p-5 text-left">
                <div className="flex items-center gap-2 pb-4 border-b border-grey-100">
                  <span className="h-3 w-3 rounded-full" style={{ background: BRAND.red }} />
                  <span className="h-3 w-3 rounded-full" style={{ background: BRAND.yellow }} />
                  <span className="h-3 w-3 rounded-full" style={{ background: BRAND.green }} />
                  <span className="ml-3 text-sm text-grey-500">Growgle Assistant</span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-br-md bg-[#e8f0fe] px-4 py-2.5 text-sm text-grey-800 max-w-[80%]">
                      What roles fit a React + Python developer?
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div
                      className="mt-0.5 h-7 w-7 shrink-0 rounded-full p-[2px]"
                      style={{
                        background: `conic-gradient(from 0deg, ${BRAND.blue}, ${BRAND.red}, ${BRAND.yellow}, ${BRAND.green}, ${BRAND.blue})`,
                      }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                        <Sparkles className="h-3.5 w-3.5" style={{ color: BRAND.blue }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {['Full-stack Engineer — 94% match', 'ML Platform Engineer — 88% match', 'Developer Advocate — 82% match'].map(
                          (t, i) => (
                            <motion.div
                              key={t}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + i * 0.25, duration: 0.4 }}
                              className="flex items-center gap-2 rounded-xl bg-grey-50 px-3 py-2 text-sm text-grey-700"
                            >
                              <Star className="h-3.5 w-3.5" style={{ color: BRAND.yellow }} fill={BRAND.yellow} />
                              {t}
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="border-y border-grey-100 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-grey-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-grey-900 tracking-tight">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg md:text-xl text-grey-600 max-w-2xl mx-auto">
              Comprehensive tools to guide your career journey from discovery to success.
            </p>
          </motion.div>

          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feature.tint, color: feature.color }}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-grey-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-600">{feature.description}</p>
                <div
                  className="mt-5 h-1 w-0 rounded-full transition-all duration-300 group-hover:w-12"
                  style={{ background: feature.color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="py-24 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-grey-900 tracking-tight">
              How Growgle works
            </h2>
            <p className="mt-4 text-lg md:text-xl text-grey-600 max-w-2xl mx-auto">
              Three simple steps to unlock your career potential.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* connecting line */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] opacity-30" />
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div
                  className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg"
                  style={{ background: step.color }}
                >
                  <step.icon className="h-8 w-8" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-grey-900 shadow">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-grey-900">{step.title}</h3>
                <p className="mt-2 text-grey-600 max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Rotating quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 flex justify-center"
          >
            <div className="max-w-xl w-full text-center min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={quoteIndex}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-grey-700 text-base md:text-lg font-light italic tracking-wide"
                >
                  &ldquo;{quotes[quoteIndex].text}&rdquo;
                  <span className="mt-1 block text-sm font-medium text-grey-500 not-italic">
                    — {quotes[quoteIndex].author}
                  </span>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          background: `linear-gradient(120deg, ${BRAND.blue} 0%, #6b5bf2 48%, ${BRAND.green} 100%)`,
        }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-16 right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Ready to accelerate your career?
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of professionals who found their perfect career path with Growgle.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-medium text-[#1a73e8] shadow-lg transition-transform hover:scale-[1.03]"
              >
                Start your journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-full border border-white/80 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/15"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback, Suspense } from "react";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Circle,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Square,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useSearchParams, useRouter } from "next/navigation";
import { getRoadmapById, updateRoadmap } from "@/lib/services/roadmapApi";

const certifications = [
  {
    name: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    difficulty: "Beginner",
    duration: "3-4 weeks",
    value: "High",
    priority: "Recommended",
  },
  {
    name: "Google Cloud Associate",
    provider: "Google Cloud",
    difficulty: "Intermediate",
    duration: "6-8 weeks",
    value: "High",
    priority: "Optional",
  },
  {
    name: "React Developer Certification",
    provider: "Meta",
    difficulty: "Intermediate",
    duration: "4-6 weeks",
    value: "Medium",
    priority: "Recommended",
  },
];

function RoadmapContent() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const roadmapId = searchParams.get("pageId");

  // Timer state management
  const [activeTimer, setActiveTimer] = useState(null); // { milestoneId, phaseId, startTime } of active timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerInterval = useRef(null);

  // Track how many phases to show in the main roadmap (rest go to Next Actions)
  const [visiblePhasesCount, setVisiblePhasesCount] = useState(3);

  // Compute visible phases and next action phase from roadmap data
  const allPhases = roadmap?.phases || [];
  const visiblePhases = allPhases.slice(0, visiblePhasesCount);
  const nextActionPhase = allPhases[visiblePhasesCount] || null; // Next phase to be added

  // Format seconds to HH:MM:SS
  const formatTime = useCallback((totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }, []);

  // Format total time for display (converts to days/hours/minutes)
  const formatTotalTime = useCallback((totalSeconds) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    }
    return `< 1m`;
  }, []);

  // Start timer for a milestone (syncs with backend using milestone startTime)
  const startTimer = useCallback(async (milestoneId, phaseId) => {
    // Clear any existing timer
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    const startTime = new Date().toISOString();
    setActiveTimer({ milestoneId, phaseId, startTime });
    setElapsedSeconds(0);

    timerInterval.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    // Update milestone startTime in phases and sync to backend
    if (roadmap) {
      const updatedPhases = roadmap.phases.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          status: 'in-progress',
          milestones: phase.milestones.map((milestone) => {
            if (milestone.id !== milestoneId) return milestone;
            return {
              ...milestone,
              status: 'in-progress',
              startTime: startTime,
              endTime: null, // Clear endTime to indicate timer is running
            };
          }),
        };
      });

      setRoadmap({ ...roadmap, phases: updatedPhases });

      // Sync to backend
      try {
        await updateRoadmap(roadmapId, { phases: updatedPhases });
      } catch (err) {
        console.error('Failed to sync timer start:', err);
      }
    }
  }, [roadmapId, roadmap]);

  // Stop timer, update progress, and persist to backend
  const stopTimer = useCallback(async () => {
    if (!activeTimer || !roadmap) return;

    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }

    const { milestoneId, phaseId, startTime } = activeTimer;
    const endTime = new Date().toISOString();
    const timeSpent = elapsedSeconds;

    // Update roadmap state with progress
    const updatedPhases = roadmap.phases.map((phase) => {
      if (phase.id !== phaseId) return phase;

      const updatedMilestones = phase.milestones.map((milestone) => {
        if (milestone.id !== milestoneId) return milestone;
        return {
          ...milestone,
          status: 'completed',
          progress: 100,
          startTime: milestone.startTime || startTime,
          endTime: endTime, // Set endTime to indicate timer stopped
          timeSpent: (milestone.timeSpent || 0) + timeSpent,
        };
      });

      // Calculate phase progress as average of milestone progress
      const phaseProgress = updatedMilestones.length > 0
        ? Math.round(updatedMilestones.reduce((sum, m) => sum + (m.progress || 0), 0) / updatedMilestones.length)
        : 0;

      return {
        ...phase,
        milestones: updatedMilestones,
        progress: phaseProgress,
        status: phaseProgress === 100 ? 'completed' : phaseProgress > 0 ? 'in-progress' : 'pending',
      };
    });

    // Calculate overall progress as average of phase progress (for visible phases only)
    const overallProgress = updatedPhases.length > 0
      ? Math.round(updatedPhases.reduce((sum, p) => sum + (p.progress || 0), 0) / updatedPhases.length)
      : 0;

    const updatedRoadmap = {
      ...roadmap,
      phases: updatedPhases,
      progress: overallProgress,
      completionRate: overallProgress,
    };

    // Update local state
    setRoadmap(updatedRoadmap);
    setActiveTimer(null);
    setElapsedSeconds(0);

    // Persist to backend
    try {
      await updateRoadmap(roadmapId, {
        phases: updatedPhases,
        progress: overallProgress,
        completionRate: overallProgress,
      });
    } catch (err) {
      console.error('Failed to update roadmap:', err);
    }
  }, [activeTimer, roadmap, roadmapId, elapsedSeconds]);

  // Function to add next phase to visible roadmap (called via Continue Learning button)
  const addNextPhaseToRoadmap = useCallback(() => {
    if (!nextActionPhase) return;
    // Simply increment the visible count to show the next phase
    setVisiblePhasesCount(prev => prev + 1);
  }, [nextActionPhase]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!roadmapId) {
        setError("Missing roadmap id.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const { data } = await getRoadmapById(roadmapId);
        const item = data?.data ?? data;
        if (!item) {
          setError("Roadmap not found.");
        } else {
          setRoadmap(item);

          // Calculate initial visible phases count:
          // Show at least 3, but if more phases are completed/in-progress, show those too
          const phases = item.phases || [];
          let activeOrCompletedCount = 0;
          for (const phase of phases) {
            if (phase.status === 'completed' || phase.status === 'in-progress') {
              activeOrCompletedCount++;
            }
          }
          // Also add 1 more (the next pending one) if there are completed ones
          if (activeOrCompletedCount > 0 && activeOrCompletedCount < phases.length) {
            activeOrCompletedCount++;
          }
          setVisiblePhasesCount(Math.max(3, activeOrCompletedCount));

          // Detect running timer from milestone startTime/endTime (cross-device sync)
          // A milestone with startTime but no endTime means timer is running
          let foundActiveTimer = null;
          for (const phase of (item.phases || [])) {
            for (const milestone of (phase.milestones || [])) {
              if (milestone.startTime && !milestone.endTime && milestone.status !== 'completed') {
                foundActiveTimer = {
                  milestoneId: milestone.id,
                  phaseId: phase.id,
                  startTime: milestone.startTime,
                };
                break;
              }
            }
            if (foundActiveTimer) break;
          }

          if (foundActiveTimer) {
            const { milestoneId, phaseId, startTime } = foundActiveTimer;
            const startDate = new Date(startTime);
            const now = new Date();
            const elapsed = Math.floor((now - startDate) / 1000);

            setActiveTimer({ milestoneId, phaseId, startTime });
            setElapsedSeconds(elapsed > 0 ? elapsed : 0);

            // Start the timer interval
            if (timerInterval.current) {
              clearInterval(timerInterval.current);
            }
            timerInterval.current = setInterval(() => {
              setElapsedSeconds(prev => prev + 1);
            }, 1000);
          }
        }
      } catch (e) {
        setError("Failed to load roadmap. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [roadmapId]);

  // Calculate completion based on visible phases only
  const completion = useMemo(() => {
    if (visiblePhases.length === 0) return 0;
    const totalProgress = visiblePhases.reduce((sum, phase) => sum + (phase.progress || 0), 0);
    return Math.round(totalProgress / visiblePhases.length);
  }, [visiblePhases]);

  // Check if the last visible phase is complete (required to add next phase)
  const isLastPhaseComplete = useMemo(() => {
    if (visiblePhases.length === 0) return false;
    const lastPhase = visiblePhases[visiblePhases.length - 1];
    return lastPhase?.status === 'completed' || lastPhase?.progress === 100;
  }, [visiblePhases]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-grey-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-grey-100 text-grey-600";
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-grey-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="py-16 text-center text-grey-600">
              Loading roadmap...
            </div>
          )}
          {!loading && error && (
            <div className="py-6 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4">
              {error}
              <div className="mt-3">
                <Button variant="outlined" onClick={() => router.back()}>
                  Go Back
                </Button>
              </div>
            </div>
          )}
          {!loading && !error && !roadmap && (
            <div className="py-16 text-center text-grey-600">
              No roadmap to display.
            </div>
          )}
          {!loading && !error && roadmap && (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-grey-900 mb-2">
                      Your Career Roadmap
                    </h1>
                    <p className="text-grey-600">
                      Personalized path to become a {roadmap?.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {completion}%
                    </div>
                    <div className="text-sm text-grey-600">Complete</div>
                  </div>
                </div>
              </motion.div>

              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <Card>
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                      <h3 className="text-lg font-semibold text-grey-900">
                        Overall Progress
                      </h3>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-grey-200 rounded-full h-3 mb-6">
                      <motion.div
                        className="bg-blue-600 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completion}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>

                    {/* Phase Progress - Horizontal on desktop, Vertical on mobile */}
                    <div className="hidden sm:flex items-start justify-between gap-2">
                      {visiblePhases.map((phase, index) => (
                        <div key={phase.id} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-3 h-3 rounded-full ${phase.status === "completed"
                              ? "bg-green-500"
                              : phase.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-grey-300"
                              }`}
                          />
                          <div className="mt-2 text-center">
                            <div className="text-xs font-medium text-grey-800 line-clamp-2">
                              {phase.title}
                            </div>
                            <div className="text-xs text-grey-500">
                              {phase.progress || 0}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mobile: Vertical list layout */}
                    <div className="sm:hidden space-y-3">
                      {visiblePhases.map((phase, index) => (
                        <div
                          key={phase.id}
                          className="flex items-center gap-3"
                        >
                          <div
                            className={`w-3 h-3 rounded-full flex-shrink-0 ${phase.status === "completed"
                              ? "bg-green-500"
                              : phase.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-grey-300"
                              }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-grey-800 truncate">
                              {phase.title}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-grey-600">
                            {phase.progress || 0}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Roadmap */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    {visiblePhases.map((phase, phaseIndex) => (
                      <Card key={phase.id} className="overflow-hidden">
                        <CardHeader
                          className={`cursor-pointer ${phase.status === "completed"
                            ? "bg-green-50"
                            : phase.status === "in-progress"
                              ? "bg-blue-50"
                              : "bg-grey-50"
                            }`}
                          onClick={() =>
                            setSelectedPhase(
                              selectedPhase === phase.id ? null : phase.id
                            )
                          }
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(phase.status)}
                              <div>
                                <CardTitle className="text-lg">
                                  {phase.title}
                                </CardTitle>
                                <CardDescription>
                                  {phase.duration}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  phase.status
                                )}`}
                              >
                                {phase.status.replace("-", " ")}
                              </div>
                              <div className="text-sm text-grey-600 mt-1">
                                {phase.progress}% complete
                              </div>
                            </div>
                          </div>
                          {phase.progress > 0 && (
                            <div className="w-full bg-grey-200 rounded-full h-2 mt-3">
                              <motion.div
                                className={`h-2 rounded-full ${phase.status === "completed"
                                  ? "bg-green-600"
                                  : phase.status === "in-progress"
                                    ? "bg-blue-600"
                                    : "bg-grey-400"
                                  }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${phase.progress}%` }}
                                transition={{
                                  duration: 1,
                                  delay: phaseIndex * 0.1,
                                }}
                              />
                            </div>
                          )}
                        </CardHeader>

                        {selectedPhase === phase.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <CardContent className="pt-0">
                              <div className="space-y-3">
                                {(phase.milestones ?? []).map((milestone) => (
                                  <div
                                    key={milestone.id}
                                    className="flex items-center justify-between p-3 border border-grey-200 rounded-lg"
                                  >
                                    <div className="flex items-center space-x-3">
                                      {getStatusIcon(milestone.status)}
                                      <div>
                                        <h4 className="font-medium text-grey-900">
                                          {milestone.title}
                                        </h4>
                                        <div className="flex items-center space-x-2 text-sm text-grey-600">
                                          <span>{milestone.provider}</span>
                                          <span>•</span>
                                          <span>{milestone.duration}</span>
                                          <span>•</span>
                                          <span className="capitalize">
                                            {milestone.type}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {/* Show time spent for this milestone if any */}
                                      {milestone.timeSpent > 0 && activeTimer?.milestoneId !== milestone.id && (
                                        <div className="text-xs text-grey-500 bg-grey-100 px-2 py-1 rounded">
                                          ⏱️ {formatTotalTime(milestone.timeSpent)}
                                        </div>
                                      )}

                                      {activeTimer?.milestoneId === milestone.id ? (
                                        /* Timer is running for this milestone */
                                        <div className="flex items-center space-x-2">
                                          <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-mono text-sm font-medium">
                                            <Clock className="h-4 w-4 mr-2 animate-pulse" />
                                            {formatTime(elapsedSeconds)}
                                          </div>
                                          <Button
                                            variant="outlined"
                                            size="sm"
                                            className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                                            onClick={() => stopTimer()}
                                          >
                                            <Square className="h-4 w-4 mr-1 fill-current" />
                                            Stop
                                          </Button>
                                        </div>
                                      ) : (
                                        /* No timer running - show Start/Continue/Review button */
                                        <Button
                                          variant="outlined"
                                          size="sm"
                                          onClick={() => {
                                            if (milestone.status !== "completed") {
                                              startTimer(milestone.id, phase.id);
                                            }
                                          }}
                                        >
                                          {milestone.status === "completed" ? (
                                            "Done"
                                          ) : (
                                            <>
                                              <Play className="h-4 w-4 mr-1" />
                                              {milestone.status === "in-progress" ? "Continue" : "Start"}
                                            </>
                                          )}
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </Card>
                    ))}
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Next Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Next Actions</CardTitle>
                        <CardDescription>
                          {nextActionPhase
                            ? "Your next learning phase"
                            : "All phases completed!"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {nextActionPhase ? (
                          <>
                            {/* Phase Header */}
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
                              <h4 className="font-semibold text-blue-900 mb-1">
                                {nextActionPhase.title}
                              </h4>
                              <p className="text-xs text-blue-700">
                                {nextActionPhase.duration}
                              </p>
                            </div>

                            {/* Milestones List */}
                            {nextActionPhase.milestones && nextActionPhase.milestones.length > 0 && (
                              <div className="space-y-2 mb-4">
                                <p className="text-xs font-medium text-grey-600 uppercase tracking-wide">
                                  Milestones
                                </p>
                                {nextActionPhase.milestones.map((milestone, index) => (
                                  <div
                                    key={milestone.id || index}
                                    className="flex items-start space-x-2 p-2 bg-grey-50 rounded border border-grey-200"
                                  >
                                    <Circle className="h-4 w-4 text-grey-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-grey-800 truncate">
                                        {milestone.title}
                                      </p>
                                      <p className="text-xs text-grey-500">
                                        {milestone.type} • {milestone.duration}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <Button
                              className="w-full"
                              onClick={() => addNextPhaseToRoadmap()}
                              disabled={!isLastPhaseComplete}
                            >
                              Continue Learning
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                            {!isLastPhaseComplete && (
                              <p className="text-xs text-grey-500 mt-2 text-center">
                                Complete current phase first
                              </p>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="text-sm text-grey-600">
                              Great job! You've completed all available phases.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Recommended Certifications */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Certifications</CardTitle>
                        <CardDescription>
                          Boost your credibility
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="border border-grey-200 rounded-lg p-3"
                            >
                              <h4 className="font-medium text-grey-900 mb-1">
                                {cert.name}
                              </h4>
                              <p className="text-sm text-grey-600 mb-2">
                                {cert.provider}
                              </p>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-grey-500">
                                  {cert.duration}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full ${cert.priority === "Recommended"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-grey-100 text-grey-700"
                                    }`}
                                >
                                  {cert.priority}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Study Time */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Study Schedule</CardTitle>
                        <CardDescription>
                          Optimize your learning time
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-grey-600">
                              Daily Goal
                            </span>
                            <span className="font-medium">2 hours</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-grey-600">
                              This Week
                            </span>
                            <span className="font-medium text-green-600">
                              12/14 hours
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-grey-600">
                              Streak
                            </span>
                            <span className="font-medium text-blue-600">
                              7 days
                            </span>
                          </div>
                        </div>
                        <Button variant="outlined" className="w-full mt-4">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Study Time
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-grey-50 py-8"><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-grey-600">Loading...</div></div>}>
      <RoadmapContent />
    </Suspense>
  );
}

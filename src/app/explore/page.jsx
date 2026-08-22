"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Upload,
  Send,
  Search,
  MessageSquare,
  Trash2,
  SquarePen,
  PanelLeft,
  Volume2,
  VolumeX,
  Globe,
  Languages,
  X,
  FileText,
  Image as ImageIcon,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Briefcase,
  Target,
  Rocket,
  Map,
  Brain,
  Settings,
  BarChart3,
  Code,
  Users,
  MessageCircle,
  Lightbulb,
  DollarSign,
  Building,
  TrendingUp,
  Handshake,
  Award,
  Calendar,
  BookOpen,
  FolderOpen,
  Trophy,
  Compass,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";

import { sendExplore, sendPrompt } from "@/lib/services/exploreApi";
import { getUserProfile } from "@/lib/services/profileApi";
import { translateToEnglish, detectLanguage } from "@/lib/services/translateApi";
import { getChatSessions, getChatSession, createChatSession, updateChatSession, deleteChatSession as apiDeleteChatSession } from "@/lib/services/chatApi";
import AuthGuard from "@/components/AuthGuard";

function useTypewriter(
  text,
  { speed = 30, enabled = true, onTypingState = () => { } }
) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  // Track if effect has been set up for this text
  const textRef = useRef(text);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    const safeText = typeof text === "string" ? text : "";
    textRef.current = text;
    enabledRef.current = enabled;

    if (!enabled) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedText(safeText);
      onTypingState(false);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    indexRef.current = 0;
    setDisplayedText("");
    onTypingState(true);

    if (safeText.length === 0) {
      onTypingState(false);
      return;
    }

    setDisplayedText(safeText.slice(0, 1));
    indexRef.current = 1;

    intervalRef.current = setInterval(() => {
      if (indexRef.current >= safeText.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        onTypingState(false);
        return;
      }
      const nextIndex = indexRef.current + 1;
      setDisplayedText(safeText.slice(0, nextIndex));
      indexRef.current = nextIndex;
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled, speed]);

  return displayedText;
}

const MODES = [
  {
    id: "learning",
    label: "Learning",
    desc: "Master concepts with step-by-step explanations",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "interview",
    label: "Interview",
    desc: "Practice with mock interviews and expert feedback",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "mentorship",
    label: "Mentorship",
    desc: "Get personalized career guidance and action plans",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: "explore",
    label: "Explore",
    desc: "Discover new opportunities and career paths",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    desc: "Build your personalized learning journey",
    icon: Map,
    color: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-500/10 to-violet-500/10",
  },
];

const MODE_SUGGESTIONS = {
  learning: [
    {
      title: "Data Structures Fundamentals",
      prompt:
        "Can you explain the most important data structures for software engineering interviews with examples?",
      icon: Brain,
    },
    {
      title: "System Design Principles",
      prompt:
        "Walk me through the fundamentals of system design that I should know for tech interviews.",
      icon: Settings,
    },
    {
      title: "Algorithm Patterns",
      prompt:
        "Explain common algorithm patterns like two pointers, sliding window, and dynamic programming with examples.",
      icon: BarChart3,
    },
    {
      title: "Language Comparison",
      prompt:
        "What are the key differences between Python, Java, and JavaScript for backend development?",
      icon: Code,
    },
  ],
  interview: [
    {
      title: "Technical Interview Mock",
      prompt:
        "Give me a mock technical interview question for a software engineer position and provide feedback on my approach.",
      icon: Target,
    },
    {
      title: "Behavioral Questions",
      prompt:
        "Ask me common behavioral interview questions and help me structure better STAR method responses.",
      icon: MessageCircle,
    },
    {
      title: "System Design Challenge",
      prompt:
        "Give me a system design interview question and guide me through the solution step by step.",
      icon: Building,
    },
    {
      title: "Negotiation Practice",
      prompt:
        "Help me practice salary negotiation scenarios and provide tips for discussing compensation.",
      icon: DollarSign,
    },
  ],
  mentorship: [
    {
      title: "Career Transition Strategy",
      prompt:
        "I want to transition from [current role] to [target role]. Help me create a detailed action plan.",
      icon: Rocket,
    },
    {
      title: "Skills Assessment",
      prompt:
        "Analyze my current skills and identify gaps I need to fill for my target role in tech.",
      icon: TrendingUp,
    },
    {
      title: "Professional Networking",
      prompt:
        "Give me actionable strategies to build a professional network in the tech industry.",
      icon: Handshake,
    },
    {
      title: "Personal Branding",
      prompt:
        "Help me develop my personal brand and online presence for career advancement.",
      icon: Sparkles,
    },
  ],
  explore: [
    {
      title: "Career Path Discovery",
      prompt:
        "Show me different career paths in tech and help me understand which might fit my interests and skills.",
      icon: Compass,
    },
    {
      title: "Emerging Tech Trends",
      prompt:
        "What are the most promising emerging technology fields and career opportunities they offer?",
      icon: Star,
    },
    {
      title: "Remote Opportunities",
      prompt:
        "Explore remote-friendly career paths and companies that offer flexible work arrangements.",
      icon: Globe,
    },
    {
      title: "Industry Analysis",
      prompt:
        "Compare working at startups vs big tech companies vs consulting firms - pros and cons of each.",
      icon: Building,
    },
  ],
  roadmap: [
    {
      title: "90-Day Success Plan",
      prompt:
        "Create a detailed 90-day roadmap to improve my chances of landing a software engineer role.",
      icon: Calendar,
    },
    {
      title: "Structured Learning Path",
      prompt:
        "Design a weekly learning schedule to master full-stack development in 6 months.",
      icon: BookOpen,
    },
    {
      title: "Portfolio Projects",
      prompt:
        "Help me plan and prioritize projects to build an impressive portfolio for job applications.",
      icon: FolderOpen,
    },
    {
      title: "Certification Journey",
      prompt:
        "Recommend certifications and their timeline for advancing in cloud computing/data science/AI.",
      icon: Trophy,
    },
  ],
};

function ChatHistory({
  sessions,
  currentSessionId,
  searchHistory,
  setSearchHistory,
  onLoadSession,
  onDeleteSession,
  onNewSession,
  speaking,
  onStopSpeaking,
  onToggleSidebar,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  const filteredSessions = sessions
    .filter((session) => {
      if (!searchHistory) return true;
      const q = searchHistory.toLowerCase();
      return (
        session.title?.toLowerCase().includes(q) ||
        session.preview?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  return (
    <div className="h-full w-72 flex flex-col bg-[#f0f4f9]">
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <span className="text-[15px] font-medium text-[#1f1f1f] px-2">Chats</span>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-full text-[#444746] hover:bg-[#e1e5ea] transition-colors"
            title="Close sidebar"
          >
            <PanelLeft size={18} />
          </button>
        )}
      </div>

      <div className="px-3 pb-2 space-y-1">
        <button
          onClick={onNewSession}
          className="w-full inline-flex items-center gap-3 h-10 px-3 rounded-full text-sm font-medium text-[#1f1f1f] hover:bg-[#e1e5ea] transition-colors"
        >
          <SquarePen size={18} strokeWidth={1.75} />
          New chat
        </button>
        <button
          onClick={() => {
            setShowSearch((v) => !v);
            if (showSearch) setSearchHistory("");
          }}
          className={`w-full inline-flex items-center gap-3 h-10 px-3 rounded-full text-sm font-medium transition-colors ${
            showSearch ? "bg-[#d3e3fd] text-[#041e49]" : "text-[#1f1f1f] hover:bg-[#e1e5ea]"
          }`}
        >
          <Search size={18} strokeWidth={1.75} />
          Search chats
        </button>
      </div>

      {showSearch && (
        <div className="px-3 pb-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search chats"
            value={searchHistory}
            onChange={(e) => setSearchHistory(e.target.value)}
            className="w-full h-10 px-4 text-sm rounded-full bg-white border-0 outline-none ring-1 ring-[#c4c7c5] focus:ring-2 focus:ring-[#0b57d0] text-[#1f1f1f] placeholder:text-[#444746]"
          />
        </div>
      )}

      {speaking && (
        <div className="px-3 pb-2">
          <button
            onClick={onStopSpeaking}
            className="w-full h-9 rounded-full text-sm font-medium bg-[#fce8e6] text-[#c5221f] hover:bg-[#f9d7d4] inline-flex items-center justify-center gap-2"
          >
            <VolumeX size={14} />
            Stop reading
          </button>
        </div>
      )}

      <div className="px-5 pt-3 pb-1 text-xs font-medium text-[#444746]">
        Recents
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {filteredSessions.length === 0 ? (
          <p className="px-3 py-6 text-sm text-[#444746]">
            {searchHistory ? "No matching chats" : "No recent chats"}
          </p>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center gap-1 rounded-full cursor-pointer transition-colors ${
                currentSessionId === session.id
                  ? "bg-[#d3e3fd]"
                  : "hover:bg-[#e1e5ea]"
              }`}
              onClick={() => onLoadSession(session.id)}
            >
              <p className="flex-1 min-w-0 px-3 py-2 text-sm text-[#1f1f1f] truncate">
                {session.title}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 rounded-full text-[#444746] hover:bg-white/70 transition-opacity"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SuggestionCards({ mode, suggestions, onSuggestionClick, firstName }) {
  const currentMode = MODES.find((m) => m.id === mode);
  const ModeIcon = currentMode.icon;

  return (
    <div className="max-w-2xl mx-auto px-4 w-full">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4285f4] via-[#34a853] to-[#fbbc04] p-[2px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
            <ModeIcon size={22} className="text-[#1967d2]" strokeWidth={1.75} />
          </div>
        </div>
        <h2 className="text-3xl sm:text-[2.5rem] font-light text-[#1f1f1f] tracking-tight">
          {firstName ? `Hi ${firstName}, what's next?` : "Hi, what's next?"}
        </h2>
        <p className="mt-2 text-[#444746]">
          {currentMode.desc}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((suggestion, idx) => {
          const SuggestionIcon = suggestion.icon;
          return (
            <motion.button
              key={idx}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => onSuggestionClick(suggestion)}
              className="group text-left rounded-2xl border border-[#e8eaed] bg-white p-4 hover:bg-[#f8f9fa] hover:border-[#dadce0] transition-colors"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1967d2]">
                <SuggestionIcon size={16} strokeWidth={1.75} />
              </div>
              <h3 className="font-medium text-[#202124] mb-1">
                {suggestion.title}
              </h3>
              <p className="text-sm text-[#5f6368] line-clamp-2 leading-relaxed">
                {suggestion.prompt}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function getLanguageName(code) {
  const languages = {
    ta: "Tamil",
    hi: "Hindi",
    te: "Telugu",
    ml: "Malayalam",
    kn: "Kannada",
    es: "Spanish",
    fr: "French",
    de: "German",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    en: "English",
  };
  return languages[code] || code.toUpperCase();
}

function MessageBubble({ m, onSpeakMessage, setTyping }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTranslated, setShowTranslated] = useState(false);
  const isAI = m.role === "ai";
  // Only enable typewriter effect for newly generated AI messages
  const shouldType = isAI && m.isNew === true;
  const typedText = useTypewriter(m.text, {
    speed: 15,
    enabled: shouldType,
    onTypingState: setTyping,
  });

  const displayText = shouldType ? typedText : m.text;
  const wasTranslated =
    m.role === "user" && m.translatedText && m.translatedText !== m.text;

  if (m.role === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] md:max-w-[60%] space-y-2">
          {wasTranslated && (
            <div className="flex items-center justify-end gap-2 text-xs text-gray-500 mb-1">
              <Languages size={13} />
              <span>From {getLanguageName(m.detectedLanguage)}</span>
            </div>
          )}
          <div className="bg-[#e8f0fe] text-[#202124] px-4 py-3 rounded-[22px] rounded-br-md">
            <div className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
              {displayText}
            </div>
            {m.files &&
              m.files.map((f, i) => <AttachmentPreview key={i} f={f} />)}
          </div>
          {wasTranslated && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md border border-blue-200"
              >
                <Languages size={12} />
                {showTranslation ? "Hide Translation" : "Show Translation"}
              </button>
            </div>
          )}
          {wasTranslated && showTranslation && m.translatedText && (
            <div className="bg-white border border-blue-200 rounded-xl p-3 shadow-sm">
              <div className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                <Languages size={12} />
                English Translation:
              </div>
              <div className="text-sm text-gray-800">
                {m.translatedText}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    // AI message section - keep as updated before
    const aiWasTranslated = m.translatedText && m.translatedText !== m.text;

    return (
      <div className="flex mb-6">
        <div className="max-w-3xl w-full">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-full bg-gradient-to-br from-[#4285f4] via-[#34a853] to-[#fbbc04] p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <Sparkles size={14} className="text-[#1967d2]" />
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              {aiWasTranslated && (
                <div className="flex items-center justify-between gap-2 text-xs text-[#5f6368] mb-2">
                  <div className="flex items-center gap-2">
                    <Languages size={13} />
                    <span>Translated to {getLanguageName(m.detectedLanguage)}</span>
                  </div>
                  <button
                    onClick={() => setShowTranslated(!showTranslated)}
                    className="text-[#1967d2] font-medium"
                  >
                    {showTranslated ? "Hide English" : "Show English"}
                  </button>
                </div>
              )}
              <div className="whitespace-pre-wrap break-words text-[#202124] text-[15px] leading-7">
                {displayText}
              </div>
              {aiWasTranslated && showTranslated && m.translatedText && (
                <div className="text-sm mt-3 text-[#5f6368] bg-[#f8f9fa] p-3 rounded-xl">
                  <span className="font-medium text-[#202124]">English:</span> {m.translatedText}
                </div>
              )}
              <button
                onClick={() => onSpeakMessage(m.text)}
                className="mt-2 p-1.5 text-[#5f6368] hover:text-[#1967d2] hover:bg-[#e8f0fe] rounded-full transition-colors"
                title="Read aloud"
              >
                <Volume2 size={16} />
              </button>
              {m.files && m.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {m.files.map((f, i) => (
                    <AttachmentPreview key={i} f={f} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function AttachmentPreview({ f }) {
  if (!f) return null;

  if (f.type && f.type.startsWith("image")) {
    return (
      <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
        <img
          src={f.url}
          alt={f.name}
          className="max-h-48 w-full object-cover"
        />
      </div>
    );
  }

  if (f.type === "application/pdf" || (f.url && f.url.endsWith(".pdf"))) {
    return (
      <div className="mt-3 bg-gray-50 rounded-lg border border-gray-200 p-3">
        <a
          href={f.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
        >
          <FileText size={16} />
          {f.name || "View PDF"}
        </a>
      </div>
    );
  }

  return (
    <a
      href={f.url}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2 mt-2 font-medium transition-colors"
    >
      <FileText size={14} />
      {f.name || f.url}
    </a>
  );
}

export default function ChatPage() {
  const [mode, setMode] = useState("learning");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [searchHistory, setSearchHistory] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [detectedLang, setDetectedLang] = useState(null);
  const [typing, setTyping] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Hidden by default, shown on larger screens
  const [isMobile, setIsMobile] = useState(false);
  const [firstName, setFirstName] = useState("");

  const inputRef = useRef();
  const messagesRef = useRef(null);
  const textareaRef = useRef(null);
  const modeDropdownRef = useRef(null);

  // Detect screen size and update responsive states
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Show history by default on desktop, hide on mobile
      if (!mobile && !showHistory) {
        setShowHistory(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    const name = localStorage.getItem("userName") || "";
    setFirstName(name.split(" ")[0] || "");
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-US";

    const onResult = (e) => {
      const text = e.results[0][0].transcript;
      setInput((s) => (s ? s + " " + text : text));
      setListening(false);
    };
    const onEnd = () => setListening(false);

    recog.onresult = onResult;
    recog.onend = onEnd;

    inputRef.current = recog;
    return () => {
      recog.onresult = null;
      recog.onend = null;
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setShowSuggestions(true);
    }
  }, [mode, messages.length]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        console.log('Fetching chat sessions...');
        const response = await getChatSessions();
        console.log('Chat sessions response:', response);
        if (response.success && Array.isArray(response.data)) {
          // Transform date strings back to Date objects for display
          const sessions = response.data.map(session => ({
            ...session,
            date: new Date(session.updatedAt || session.createdAt),
          }));
          console.log('Setting chat sessions:', sessions.length);
          setChatSessions(sessions);
        }
      } catch (error) {
        console.error('Error fetching chat sessions:', error);
        // Start with empty sessions on error
        setChatSessions([]);
      }
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modeDropdownRef.current &&
        !modeDropdownRef.current.contains(event.target)
      ) {
        setShowModeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const startListening = () => {
    const recog = inputRef.current;
    if (!recog)
      return alert("SpeechRecognition not supported in this browser.");
    setListening(true);
    recog.start();
  };

  const stopListening = () => {
    const recog = inputRef.current;
    if (!recog) return;
    recog.stop();
    setListening(false);
  };

  const speakMessage = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (speaking) {
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    setFilePreview({
      name: f.name,
      url: URL.createObjectURL(f),
      file: f,
      type: f.type,
    });
  };

  // Track which session is currently loading
  const [loadingSessionId, setLoadingSessionId] = useState(null);

  const ask = async (customPrompt = null) => {
    const promptText = customPrompt || input;
    if (!promptText && !filePreview) return;

    // Capture the session ID at the start of the request
    let requestSessionId = currentSessionId;
    if (!requestSessionId) {
      requestSessionId = Date.now().toString();
      setCurrentSessionId(requestSessionId);
    }

    // Store the current mode for this request
    const requestMode = mode;

    setInput("");
    setFilePreview(null);
    setShowSuggestions(false);
    setTranslating(true);

    let translatedText = promptText;
    let originalText = promptText;
    let detectedLanguage = 'en';
    let wasTranslated = false;

    // Translate the input to English
    try {
      const translation = await translateToEnglish(promptText);
      translatedText = translation.translatedText;
      detectedLanguage = translation.detectedLanguage;
      wasTranslated = translation.isTranslated;

      if (wasTranslated) {
        setDetectedLang(detectedLanguage);
        console.log(`Detected language: ${detectedLanguage}, Translated to English`);
      }
    } catch (error) {
      console.error('Translation failed, using original text:', error);
    } finally {
      setTranslating(false);
    }

    const userMsg = {
      role: "user",
      text: originalText,  // Original language text
      translatedText: wasTranslated ? translatedText : null,  // English translation
      detectedLanguage: wasTranslated ? detectedLanguage : null,
      files: filePreview ? [filePreview] : [],
      mode: requestMode,
    };

    // Set loading state with session ID to track which session is loading
    setAiLoading(true);
    setLoadingSessionId(requestSessionId);

    // Capture the messages at the time of the request
    let messagesAtRequest = [];
    setMessages((prev) => {
      messagesAtRequest = [...prev, userMsg];
      return messagesAtRequest;
    });

    let aiText = "";
    try {
      // Send the original text (not translated) to the backend
      const textToSend = promptText;

      if (requestMode === "explore") {
        let profileContext = {};
        try {
          const userProfile = await getUserProfile();
          if (userProfile) {
            profileContext = userProfile.data.data;
          }
        } catch (profileErr) {
          console.warn("Could not fetch user profile:", profileErr);
        }
        const { data } = await sendExplore({
          question: textToSend,
          profile: profileContext,
        });
        aiText = (data?.answer || data?.output || "No response").toString();
      } else {
        const { data } = await sendPrompt({ prompt: textToSend });
        aiText = (data?.output || data?.answer || "No response").toString();
      }
    } catch (e) {
      console.error("API request failed", e);
      aiText = e?.response?.data?.error
        ? `Error: ${e.response.data.error}`
        : "Error processing request";
    } finally {
      // Only clear loading state if we're still on the same session
      setLoadingSessionId((currentLoadingId) => {
        if (currentLoadingId === requestSessionId) {
          setAiLoading(false);
          return null;
        }
        return currentLoadingId;
      });
    }

    // If user message was translated, translate AI response back to user's language
    let aiTextInUserLanguage = aiText;
    if (wasTranslated && detectedLanguage !== 'en') {
      try {
        // You'll need to create a translateFromEnglish function in your translateApi
        // For now, we'll just store the English text and show translation option
        aiTextInUserLanguage = aiText; // This would be the translated response
      } catch (error) {
        console.error('AI response translation failed:', error);
      }
    }

    const aiMsg = {
      role: "ai",
      text: aiTextInUserLanguage,  // Response in user's language (for now, English)
      translatedText: wasTranslated ? aiText : null,  // Original English response
      detectedLanguage: wasTranslated ? detectedLanguage : null,
      files: [],
      isNew: true  // Flag to enable typing effect only for new messages
    };

    // Build the complete messages for the session where request originated
    const newMessagesForSession = [...messagesAtRequest, aiMsg];

    // Persist to the correct session (the one where request was made)
    persistSession(requestSessionId, newMessagesForSession);

    // Only update the UI messages if we're still viewing the same session
    setCurrentSessionId((currentViewingSession) => {
      if (currentViewingSession === requestSessionId) {
        setMessages(newMessagesForSession);
      }
      return currentViewingSession;
    });
  };

  const persistSession = async (sessionId, newMessages) => {
    if (!sessionId || newMessages.length === 0) return;
    const firstUserMsg = newMessages.find((m) => m.role === "user");
    const lastAiMsg = [...newMessages].reverse().find((m) => m.role === "ai");
    const title = firstUserMsg
      ? firstUserMsg.text.substring(0, 50) +
      (firstUserMsg.text.length > 50 ? "..." : "")
      : "Untitled Chat";
    // Strip isNew flag when persisting to keep clean history data
    const cleanMessages = newMessages.map(msg => {
      const { isNew, ...rest } = msg;
      return rest;
    });
    const sessionData = {
      title,
      mode,
      messages: cleanMessages,
      preview: firstUserMsg?.text || "",
      lastMessage: lastAiMsg?.text || "",
    };

    // Update local state immediately for responsive UI
    setChatSessions((prev) => {
      const existingSession = prev.find((s) => s.id === sessionId);
      const updatedSessionData = {
        id: sessionId,
        ...sessionData,
        date: new Date(),
        messageCount: cleanMessages.length,
      };
      if (existingSession) {
        return prev.map((s) => s.id === sessionId ? updatedSessionData : s);
      }
      return [updatedSessionData, ...prev];
    });

    // Persist to database in the background
    try {
      const existingSession = chatSessions.find((s) => s.id === sessionId);
      if (existingSession) {
        // Update existing session
        await updateChatSession(sessionId, sessionData);
      } else {
        // Create new session
        const response = await createChatSession(sessionData);
        if (response.success && response.data?.id) {
          // Update the local session with the real database ID
          const dbId = response.data.id;
          setCurrentSessionId(dbId);
          setChatSessions((prev) =>
            prev.map((s) => s.id === sessionId ? { ...s, id: dbId } : s)
          );
        }
      }
    } catch (error) {
      console.error('Error persisting chat session:', error);
      // Session is still in local state, will try again on next message
    }
  };

  const createNewSession = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setShowSuggestions(true);
    setInput("");
    setFilePreview(null);
    setDetectedLang(null);
  };

  const loadSession = (sessionId) => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      // When loading from history, ensure isNew is false for all messages
      // This prevents the typing animation from playing
      const messagesWithoutTyping = (session.messages || []).map(msg => ({
        ...msg,
        isNew: false  // Explicitly set to false for history messages
      }));
      setMessages(messagesWithoutTyping);
      setMode(session.mode);
      setShowSuggestions(session.messages?.length === 0);
      setInput("");
      setFilePreview(null);
      setDetectedLang(null);
      // Reset loading/typing states when switching sessions
      // This prevents "AI is thinking" from appearing in the wrong chat
      // Only clear aiLoading if we're leaving the session that has the active request
      if (loadingSessionId !== sessionId) {
        setAiLoading(false);
      }
      setTyping(false);
    }
  };

  const deleteSession = async (sessionId) => {
    // Update local state immediately for responsive UI
    setChatSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      createNewSession();
    }

    // Delete from database in the background
    try {
      await apiDeleteChatSession(sessionId);
    } catch (error) {
      console.error('Error deleting chat session:', error);
      // Session is already removed from UI, don't add it back
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.prompt);
    setShowSuggestions(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const currentModeData = MODES.find((m) => m.id === mode);

  return (
    <AuthGuard>
      <div className="h-full bg-[#f8f9fa]">
        <div className="h-full flex relative">
          {/* Mobile Overlay Backdrop */}
          {isMobile && showHistory && (
            <button
              type="button"
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setShowHistory(false)}
              aria-label="Close sidebar"
            />
          )}

          <motion.aside
            initial={false}
            animate={
              isMobile
                ? { width: 288, x: showHistory ? 0 : -288 }
                : { width: showHistory ? 288 : 0, x: 0 }
            }
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className={`${
              isMobile ? "fixed left-0 top-0 bottom-0 z-50" : "relative"
            } h-full flex-shrink-0 overflow-hidden ${
              isMobile && !showHistory ? "pointer-events-none" : ""
            }`}
          >
            <ChatHistory
              sessions={chatSessions}
              currentSessionId={currentSessionId}
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
              onLoadSession={(id) => {
                loadSession(id);
                if (isMobile) setShowHistory(false);
              }}
              onDeleteSession={deleteSession}
              onNewSession={() => {
                createNewSession();
                if (isMobile) setShowHistory(false);
              }}
              speaking={speaking}
              onStopSpeaking={stopSpeaking}
              onToggleSidebar={() => setShowHistory(false)}
            />
          </motion.aside>

          <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]">
            <div className="px-3 md:px-5 py-2 flex items-center">
              {!showHistory && (
                <button
                  onClick={() => setShowHistory(true)}
                  className="p-2 text-[#444746] hover:bg-[#e8eaed] rounded-full transition-colors"
                  title="Open sidebar"
                >
                  <PanelLeft size={20} />
                </button>
              )}
            </div>
            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto px-4 py-2"
            >
              {messages.length === 0 && showSuggestions ? (
                <div className="h-full flex items-center justify-center">
                  <SuggestionCards
                    mode={mode}
                    suggestions={MODE_SUGGESTIONS[mode]}
                    onSuggestionClick={handleSuggestionClick}
                    firstName={firstName}
                  />
                </div>
              ) : (
                <div className="mx-auto max-w-3xl">
                  {messages.map((m, idx) => (
                    <MessageBubble
                      key={idx}
                      m={m}
                      onSpeakMessage={speakMessage}
                      setTyping={setTyping}
                    />
                  ))}

                  {aiLoading && loadingSessionId === currentSessionId && (
                    <div className="flex mb-6 items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4285f4] via-[#34a853] to-[#fbbc04] p-[2px]">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                          <Sparkles size={14} className="text-[#1967d2] animate-pulse" />
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-[#5f6368] rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 bg-[#5f6368] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-[#5f6368] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="px-4 pb-5 pt-2 bg-[#f8f9fa]">
              <div className="max-w-3xl mx-auto">
                {/* Translation indicators */}
                {detectedLang && (
                  <div className="mb-3 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-lg border border-emerald-200">
                    <Globe size={16} />
                    <span className="font-medium">
                      Detected {getLanguageName(detectedLang)} - Auto-translating
                      to English
                    </span>
                  </div>
                )}

                {translating && (
                  <div className="mb-3 flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-4 py-2.5 rounded-lg border border-blue-200">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
                    <span className="font-medium">
                      Translating your message...
                    </span>
                  </div>
                )}

                {/* File preview */}
                {filePreview && (
                  <div className="mb-3 inline-flex items-center gap-3 bg-blue-50 px-4 py-2.5 rounded-lg border border-blue-200">
                    {filePreview.type?.startsWith("image") ? (
                      <ImageIcon size={16} className="text-blue-600" />
                    ) : (
                      <FileText size={16} className="text-blue-600" />
                    )}
                    <span className="text-sm text-blue-700 font-medium">
                      {filePreview.name}
                    </span>
                    <button
                      onClick={() => setFilePreview(null)}
                      className="text-blue-600 hover:text-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-end gap-2 rounded-[28px] border border-[#dadce0] bg-white px-2 py-2 shadow-[0_1px_6px_rgba(32,33,36,0.08)] focus-within:border-[#1a73e8] focus-within:shadow-[0_1px_8px_rgba(26,115,232,0.18)]">
                  <div className="relative" ref={modeDropdownRef}>
                    {(() => {
                      const CurrentModeIcon = currentModeData.icon;
                      return (
                        <button
                          onClick={() => setShowModeDropdown(!showModeDropdown)}
                          className="h-10 px-3 rounded-full text-[#1967d2] bg-[#e8f0fe] hover:bg-[#d2e3fc] transition-colors flex items-center gap-1.5 text-sm font-medium"
                          title="Select mode"
                        >
                          <CurrentModeIcon size={16} strokeWidth={1.75} />
                          <span className="hidden sm:inline">{currentModeData.label}</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${showModeDropdown ? "rotate-180" : ""}`}
                          />
                        </button>
                      );
                    })()}

                    <AnimatePresence>
                      {showModeDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-full mb-2 left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#e8eaed] py-2 z-50 max-h-96 overflow-y-auto"
                        >
                          {MODES.map((m) => {
                            const ModeItemIcon = m.icon;
                            return (
                              <button
                                key={m.id}
                                onClick={() => {
                                  setMode(m.id);
                                  setShowModeDropdown(false);
                                  if (mode !== m.id) {
                                    createNewSession();
                                  }
                                }}
                                className={`w-full px-4 py-3 text-left hover:bg-[#f8f9fa] transition-colors flex items-start gap-3 ${mode === m.id ? "bg-[#e8f0fe]" : ""
                                  }`}
                              >
                                <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1967d2]">
                                  <ModeItemIcon size={16} strokeWidth={1.75} />
                                </div>
                                <div className="flex-1">
                                  <div
                                    className={`font-medium text-sm mb-0.5 ${mode === m.id ? "text-[#1967d2]" : "text-[#202124]"
                                      }`}
                                  >
                                    {m.label}
                                  </div>
                                  <div className="text-xs text-[#5f6368]">{m.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          if (!typing && !aiLoading) ask();
                        }
                      }}
                      disabled={typing || aiLoading}
                      placeholder={`Ask anything...`}
                      className="w-full resize-none py-2.5 px-2 pr-10 rounded-2xl border-0 focus:ring-0 outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[15px] text-[#202124] placeholder:text-[#80868b]"
                      rows={1}
                      style={{ minHeight: "40px", maxHeight: "120px" }}
                    />

                    <label className="absolute right-1 top-1.5 cursor-pointer p-1.5 text-[#5f6368] hover:text-[#1967d2] hover:bg-[#e8f0fe] rounded-full transition-colors">
                      <Upload size={16} />
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center gap-1 pb-0.5">
                    <button
                      onClick={() =>
                        listening ? stopListening() : startListening()
                      }
                      disabled={aiLoading}
                      className={`p-2.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${listening
                        ? "bg-[#d93025] text-white"
                        : "text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#1967d2]"
                        }`}
                      title={listening ? "Stop listening" : "Start voice input"}
                    >
                      {listening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    <button
                      onClick={() => ask()}
                      disabled={
                        aiLoading || typing || (!input && !filePreview)
                      }
                      className="h-10 w-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1765cc]"
                      title="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-[#80868b] text-center">
                  Enter to send · Shift + Enter for a new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
} 

import { useState, useMemo } from "react";
import Logo from "./Logo";
import dashboardBg from "../assets/dashboard_bg.png";
import {
  Home,
  Calculator,
  Globe,
  ShoppingBag,
  Calendar,
  User,
  Gift,
  RefreshCw,
  Sparkles,
  Brain,
  Coins,
} from "lucide-react";
import {
  getCountryConfig,
  formatCurrency,
  calculateSavings,
} from "./CountryConfig";
import NadiCalculator from "./NadiCalculator";
import { Market } from "./Market";
import { Me } from "./Me";
import { Quests } from "./Quests";
import { useAIRecommendations } from "./hooks/useAIRecommendations";
import { AIApi } from "../utils/ai-api";

type TabType =
  | "dashboard"
  | "nadi"
  | "market"
  | "quests"
  | "me";

interface DashboardProps {
  hasBaseline?: boolean;
  userEmail?: string;
  onProfileClick?: () => void;
  country?: string;
  onboardingData?: {
    country: string;
    city: string;
    electricityUsage: string;
    commute: {
      car: string;
      motorcycle: string;
      bus: string;
      train: string;
      walkBike: string;
    };
  };
}

interface CircularGaugeProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

function CircularGauge({
  value,
  max,
  size = 120,
  strokeWidth = 8,
}: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / max) * 100;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#22C31B"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl font-medium">
          {value}
        </span>
      </div>
    </div>
  );
}

function BottomNavigation({
  activeTab,
  onTabChange,
}: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  const tabs = [
    {
      id: "dashboard" as TabType,
      icon: Home,
      label: "Dashboard",
    },
    { id: "nadi" as TabType, icon: Globe, label: "Nadi" },
    {
      id: "market" as TabType,
      icon: ShoppingBag,
      label: "Market",
    },
    {
      id: "quests" as TabType,
      icon: Calendar,
      label: "Quests",
    },
    { id: "me" as TabType, icon: User, label: "Me" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-black/20 border-t border-white/20">
        <div className="flex justify-around items-center py-2 px-4 max-w-md lg:max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center h-14 w-14 rounded-lg transition-all duration-200 hover:bg-white/10"
                aria-label={tab.label}
              >
                <Icon
                  size={24}
                  className={`transition-colors ${
                    isActive
                      ? "text-[#22C31B]"
                      : "text-white/70"
                  }`}
                />
                <span
                  className={`text-xs mt-1 transition-colors ${
                    isActive
                      ? "text-[#22C31B]"
                      : "text-white/70"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 h-fit ${className}`}
    >
      {children}
    </div>
  );
}

function NadiScoreCard({
  onNadiClick,
}: {
  onNadiClick: () => void;
}) {
  return (
    <DashboardCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white text-lg mb-2">Eco-score</h3>
          <p className="text-white/90 mb-1">
            62 (vs baseline 74)
          </p>
          <p className="text-white/60 text-sm">
            Keep improving!
          </p>
        </div>
        <div className="ml-6">
          <CircularGauge value={62} max={100} />
        </div>
      </div>
      <button
        onClick={onNadiClick}
        className="h-14 bg-[#22C31B] hover:bg-[#26CC84] text-white rounded-xl px-6 w-full transition-all duration-200 transform hover:scale-105"
      >
        View in Nadi
      </button>
    </DashboardCard>
  );
}

function QuestCard({
  onQuestClick,
  country,
}: {
  onQuestClick: () => void;
  country?: string;
}) {
  const config = getCountryConfig(country || "MY");

  return (
    <DashboardCard>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white text-lg mb-2">
            Today's Quest
          </h3>
          <p className="text-white/90">
            TMRND Forest Restoration Project
          </p>
          <p className="text-[#26CC84]">
            +50 Nadi Points , +5 Carbon Credit
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#105D0D]/30 flex items-center justify-center">
          <span className="text-2xl">🚌</span>
        </div>
      </div>
      <button
        onClick={onQuestClick}
        className="h-14 bg-[#105D0D] hover:bg-[#22C31B] text-white rounded-xl px-6 w-full transition-all duration-200 transform hover:scale-105"
      >
        View all quests
      </button>
    </DashboardCard>
  );
}

function RecommendedActivityCard({
  onTryThis,
}: {
  onTryThis: () => void;
}) {
  // Static recommended activities
  const activities = [
    {
      title: "Log Your Daily Transport",
      description:
        "Track your eco-friendly trips and earn Nadi Points for sustainable choices.",
      icon: "🚶",
      points: "+50 points",
    },
    {
      title: "Analyze Your Meal Impact",
      description:
        "Use AI to track your food's carbon footprint and discover eco-friendly alternatives.",
      icon: "🥗",
      points: "+30 points",
    },
    {
      title: "Record Energy Saving Actions",
      description:
        "Log energy-efficient activities like LED upgrades and smart usage habits.",
      icon: "💡",
      points: "+40 points",
    },
  ];

  // Rotate through activities daily
  const activityIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
    activities.length;
  const currentActivity = activities[activityIndex];

  return (
    <DashboardCard>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎯</span>
            <h3 className="text-white text-lg">
              Recommended Activity
            </h3>
          </div>
          <h4 className="text-white mb-2">
            {currentActivity.title}
          </h4>
          <p className="text-white/90 leading-relaxed text-sm">
            {currentActivity.description}
          </p>
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 rounded-full bg-[#22C31B]/20 flex items-center justify-center">
            <span className="text-2xl">
              {currentActivity.icon}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Coins size={16} className="text-[#22C31B]" />
          <span>Earn {currentActivity.points}</span>
        </div>
      </div>

      <button
        onClick={onTryThis}
        className="h-14 bg-[#22C31B] hover:bg-[#26CC84] text-white rounded-xl px-6 w-full transition-all duration-200 transform hover:scale-105"
      >
        Try this activity
      </button>
    </DashboardCard>
  );
}

function AITipCard({
  tip,
  isLoading,
  onRefresh,
  error,
}: {
  tip: string;
  isLoading: boolean;
  onRefresh?: () => void;
  error?: string | null;
}) {
  // Add debugging info
  console.log("🔍 AITipCard render - tip:", tip);
  console.log("🔍 AITipCard render - isLoading:", isLoading);
  console.log("🔍 AITipCard render - error:", error);

  return (
    <DashboardCard>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={18} className="text-[#2AD5ED]" />
            <h3 className="text-white text-lg">AI Eco Tip</h3>
            <Sparkles size={14} className="text-yellow-400" />
          </div>
          {isLoading ? (
            <div className="flex items-center gap-2 text-white/70">
              <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              <span>Generating personalized tip...</span>
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm">
              <p className="font-medium">AI Error:</p>
              <p className="text-xs mt-1 break-words">
                {error}
              </p>
              <button
                onClick={() => {
                  console.log("Manual refresh triggered");
                  onRefresh?.();
                }}
                className="mt-2 text-xs bg-red-500/20 hover:bg-red-500/30 px-2 py-1 rounded"
              >
                Retry Connection
              </button>
            </div>
          ) : tip ? (
            <div>
              <p className="text-white/90 leading-relaxed text-sm">
                {tip}
              </p>
            </div>
          ) : (
            <p className="text-white/60 text-sm">
              No tip available. Click refresh to try again.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <div className="w-12 h-12 rounded-full bg-[#2AD5ED]/20 flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
              title="Get new tip"
            >
              <RefreshCw
                size={14}
                className={`text-white/70 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          )}
        </div>
      </div>
    </DashboardCard>
  );
}

function EcoChatCard() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{
      role: "user" | "ai";
      content: string;
      timestamp: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");

    // Add user message to history
    setChatHistory((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setIsLoading(true);

    try {
      const response = await AIApi.sendChatMessage(userMessage);

      // Add AI response to history
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          content: response,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error: any) {
      console.error("❌ Chat error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          content: `Sorry, I'm having trouble connecting right now. Please try again.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <DashboardCard>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain size={18} className="text-[#2AD5ED]" />
            <h3 className="text-white text-lg">Eco Chat</h3>
          </div>
          <button
            onClick={clearChat}
            className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-white text-xs rounded"
          >
            Clear
          </button>
        </div>

        {/* Chat History */}
        {chatHistory.length > 0 && (
          <div className="max-h-40 overflow-y-auto mb-3 space-y-2">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded ${
                  chat.role === "user"
                    ? "bg-[#22C31B]/20 text-white ml-4"
                    : "bg-white/10 text-white/90 mr-4"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="flex-1">{chat.content}</span>
                  <span className="text-xs text-white/60 shrink-0">
                    {chat.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && sendMessage()
            }
            placeholder="Ask about eco tips, carbon reduction, or sustainability..."
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !message.trim()}
            className="px-3 py-2 bg-[#22C31B] hover:bg-[#26CC84] disabled:bg-white/20 disabled:text-white/50 text-white rounded-lg text-sm transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>

        <p className="text-white/60 text-xs mt-2">
          Chat with your AI eco-coach. Ask questions about
          reducing your carbon footprint and living sustainably.
        </p>
      </div>
    </DashboardCard>
  );
}

function AIMarketRecommendationCard({
  recommendation,
  isLoading,
  onViewMarket,
  onRefresh,
  country,
}: {
  recommendation: any;
  isLoading: boolean;
  onViewMarket: () => void;
  onRefresh: () => void;
  country?: string;
}) {
  const formatCurrency = (amount: string, country: string) => {
    const currencySymbols: Record<string, string> = {
      MY: "RM",
      SG: "S$",
      US: "$",
      GB: "£",
      EU: "€",
      IN: "₹",
      ID: "Rp",
      TH: "฿",
      VN: "₫",
      PH: "₱",
    };

    return `${currencySymbols[country] || "$"}${amount}`;
  };

  const product = recommendation?.recommendations?.[0] || {
    name: "Loading...",
    benefit: "Fetching AI recommendation...",
    priceRange: "...",
    carbonReduction: "...",
    reason: "...",
  };

  return (
    <DashboardCard>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Brain size={18} className="text-[#22C31B]" />
            <h3 className="text-white text-lg">
              AI Green Product
            </h3>
            <Sparkles size={14} className="text-yellow-400" />
          </div>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
            title="Get new recommendation"
          >
            <RefreshCw
              size={14}
              className={`text-white/70 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-white/70 py-4">
            <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
            <span>Finding personalized product...</span>
          </div>
        ) : (
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h4 className="text-white mb-1">
                {product.name}
              </h4>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                {product.benefit || product.reason}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#26CC84]">
                  {product.priceRange
                    ? formatCurrency(
                        product.priceRange.replace(
                          /[$£€₹]/g,
                          "",
                        ),
                        country || "MY",
                      )
                    : "Price varies"}
                </span>
                <span className="text-[#2AD5ED]">
                  {product.category || "Eco Product"}
                </span>
              </div>
              <p className="text-white/60 text-xs mt-1">
                Impact:{" "}
                {product.carbonReduction ||
                  "Helps reduce carbon footprint"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#22C31B]/20 flex items-center justify-center ml-4">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onViewMarket}
        className="h-14 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white rounded-xl px-6 w-full transition-all duration-200 transform hover:scale-105"
      >
        View in Market
      </button>
    </DashboardCard>
  );
}

function NoBaselineCard({
  onSetBaseline,
}: {
  onSetBaseline: () => void;
}) {
  return (
    <DashboardCard className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full bg-[#22C31B]/20 flex items-center justify-center mx-auto mb-4">
          <Calculator size={32} className="text-[#22C31B]" />
        </div>
        <h3 className="text-white text-xl mb-2">
          Welcome to Nadi!
        </h3>
        <p className="text-white/90">
          Set your baseline to start tracking your carbon
          footprint progress.
        </p>
      </div>
      <button
        onClick={onSetBaseline}
        className="h-14 bg-[#22C31B] hover:bg-[#26CC84] text-white rounded-xl px-6 w-full transition-all duration-200 transform hover:scale-105"
      >
        Set your baseline in Calculator
      </button>
    </DashboardCard>
  );
}

export default function Dashboard({
  hasBaseline = true,
  userEmail,
  onProfileClick,
  country,
  onboardingData,
}: DashboardProps) {
  const [activeTab, setActiveTab] =
    useState<TabType>("dashboard");

  // Enhanced user profile with onboarding data - memoized to prevent infinite re-renders
  const userProfile = useMemo(
    () => ({
      country: country,
      email: userEmail,
      city: onboardingData?.city,
      electricityUsage: onboardingData?.electricityUsage,
      commute: onboardingData?.commute,
      preferences: ["energy_saving", "sustainable_transport"],
    }),
    [
      country, 
      userEmail, 
      onboardingData?.city,
      onboardingData?.electricityUsage,
      JSON.stringify(onboardingData?.commute) // Use JSON stringify for deep comparison
    ],
  );

  const activityHistory = useMemo(() => {
    // Generate activity history based on user's commute patterns
    const activities = [];
    const commute = onboardingData?.commute;
    
    // Use fixed timestamps that don't change on every render
    const baseTime = 1640995200000; // Fixed timestamp: Jan 1, 2022

    // Add activities based on commute patterns
    if (commute?.walkBike && commute.walkBike !== "0") {
      activities.push({
        type: "transport",
        mode: "bicycle",
        frequency: commute.walkBike,
        timestamp: baseTime - 86400000,
      });
    }
    if (commute?.bus && commute.bus !== "0") {
      activities.push({
        type: "transport",
        mode: "public_transport",
        frequency: commute.bus,
        timestamp: baseTime - 172800000,
      });
    }
    if (commute?.car && commute.car !== "0") {
      activities.push({
        type: "transport",
        mode: "car",
        frequency: commute.car,
        timestamp: baseTime - 259200000,
      });
    }

    // Add energy activities based on electricity usage
    if (onboardingData?.electricityUsage) {
      activities.push({
        type: "energy",
        usage: onboardingData.electricityUsage,
        timestamp: baseTime - 345600000,
      });
    }

    return activities.length > 0
      ? activities
      : [
          {
            type: "transport",
            mode: "walking",
            timestamp: baseTime - 86400000,
          },
          {
            type: "energy",
            action: "conscious_usage",
            timestamp: baseTime - 172800000,
          },
        ];
  }, [
    onboardingData?.commute?.walkBike,
    onboardingData?.commute?.bus,
    onboardingData?.commute?.car,
    onboardingData?.electricityUsage
  ]);

  // Use AI recommendations hook
  const {
    carbonTips,
    marketRecommendations,
    loading,
    errors,
    refreshTips,
    refreshMarketRecommendations,
  } = useAIRecommendations({
    country,
    userProfile,
    activityHistory,
  });

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Here you would typically handle navigation to different screens
    console.log(`Navigate to ${tab}`);
  };

  const handleNadiClick = () => {
    console.log("Navigate to Nadi page");
    setActiveTab("nadi");
  };

  const handleQuestClick = () => {
    console.log("Navigate to Quest page");
    setActiveTab("quests");
  };

  const handleTryThis = () => {
    console.log("User accepts tip - navigating to Nadi");
    setActiveTab("nadi");
  };

  const handleViewMarket = () => {
    console.log("Navigate to Market page");
    setActiveTab("market");
  };

  const handleSetBaseline = () => {
    console.log("Navigate to calculator");
    setActiveTab("nadi");
  };

  if (activeTab === "nadi") {
    return (
      <div className="relative">
        <NadiCalculator country={country} />
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  if (activeTab === "market") {
    return (
      <div className="relative">
        <Market />
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  if (activeTab === "me") {
    return (
      <div className="relative">
        <Me />
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  if (activeTab === "quests") {
    return (
      <div className="relative">
        <Quests />
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-20 safe-area">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={dashboardBg}
          alt="Dashboard Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto">
        {/* Header */}
        <div className="pt-8 sm:pt-12 pb-6 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Logo size="lg" className="shrink-0" />
            <div>
              <h1 className="text-white text-xl sm:text-2xl mb-1">
                Welcome back!
              </h1>
              <p className="text-white/80 text-sm sm:text-base">
                Your eco journey continues
              </p>
            </div>
          </div>
          <button
            onClick={onProfileClick}
            className="h-12 w-12 sm:h-14 sm:w-14 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-105 touch-manipulation"
            aria-label="Profile"
          >
            <User size={20} className="text-white" />
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-6">
          <div className="lg:col-span-2 xl:col-span-3">
            <NadiScoreCard onNadiClick={handleNadiClick} />
          </div>
          
          {!hasBaseline && (
            <div className="lg:col-span-2 xl:col-span-3 mb-4">
              <DashboardCard className="border-[#22C31B]/50 bg-[#22C31B]/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#22C31B]/20 flex items-center justify-center">
                    <Calculator size={24} className="text-[#22C31B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-lg mb-1">Welcome to Nadi!</h3>
                    <p className="text-white/80 text-sm">
                      Complete your baseline setup to get personalized eco insights
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSetBaseline}
                  className="w-full h-12 bg-[#22C31B] hover:bg-[#26CC84] text-white rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Set Your Baseline
                </button>
              </DashboardCard>
            </div>
          )}
          
          <RecommendedActivityCard
            onTryThis={handleTryThis}
          />
          <AITipCard
            tip={
              Array.isArray(carbonTips) && carbonTips.length > 0
                ? carbonTips[0] || "Try walking or cycling for short trips to reduce your carbon footprint."
                : typeof carbonTips === 'string' && carbonTips
                ? carbonTips
                : "Try walking or cycling for short trips to reduce your carbon footprint."
            }
            isLoading={loading?.tips || false}
            onRefresh={refreshTips}
            error={errors?.tips}
          />
          <EcoChatCard />
          <AIMarketRecommendationCard
            recommendation={marketRecommendations}
            isLoading={loading.market}
            onViewMarket={handleViewMarket}
            onRefresh={refreshMarketRecommendations}
            country={country}
          />
          <QuestCard
            onQuestClick={handleQuestClick}
            country={country}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
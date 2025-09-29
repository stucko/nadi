import { useCallback, useEffect, useMemo, useState } from "react";
import { AIApi } from "../../utils/ai-api";
import { useAIConfig } from "../../utils/ai-config";

interface UseAIRecommendationsProps {
  country?: string;
  userProfile?: any;
  activityHistory?: any[];
}

export function useAIRecommendations({
  country,
  userProfile,
  activityHistory
}: UseAIRecommendationsProps) {
  // Subscribe to AI config changes
  const { isEnabled: aiEnabled } = useAIConfig();

  // Debug logging
  console.log("🔧 useAIRecommendations initialized with:", {
    country,
    userProfile: userProfile ? "present" : "missing",
    activityHistory: activityHistory ? `${activityHistory.length} items` : "missing",
    aiEnabled: aiEnabled ? "AI ENABLED" : "AI DISABLED (using mock data)"
  });

  const [carbonTips, setCarbonTips] = useState<string[]>([]);
  const [marketRecommendations, setMarketRecommendations] = useState<any>({ recommendations: [] });
  const [loading, setLoading] = useState({
    tips: false,
    market: false
  });
  const [errors, setErrors] = useState({
    tips: null as string | null,
    market: null as string | null
  });

  // Add cooldown to prevent rapid API calls
  const [lastFetchTime, setLastFetchTime] = useState({
    tips: 0,
    market: 0
  });

  const COOLDOWN_MS = 5000; // 5 seconds cooldown

  // Memoize dependencies to prevent unnecessary re-renders
  const stableCountry = useMemo(() => country, [country]);

  // Use shallow comparison for objects to avoid JSON.stringify performance issues
  const stableUserProfile = useMemo(() => {
    if (!userProfile) return null;
    return {
      country: userProfile.country,
      city: userProfile.city,
      electricityUsage: userProfile.electricityUsage,
      preferences: userProfile.preferences?.slice() || [] // shallow copy array
    };
  }, [
    userProfile?.country,
    userProfile?.city,
    userProfile?.electricityUsage,
    userProfile?.preferences?.join(',') // convert array to string for stable comparison
  ]);

  const stableActivityHistory = useMemo(() => {
    if (!activityHistory || !Array.isArray(activityHistory)) return [];
    return activityHistory.slice(0, 5); // limit to last 5 activities to prevent huge payloads
  }, [JSON.stringify(activityHistory?.slice(0, 5))]); // stringify first 5 for stable comparison

  const fetchCarbonTips = useCallback(async () => {
    // Check cooldown
    const now = Date.now();
    if (now - lastFetchTime.tips < COOLDOWN_MS) {
      console.log("🔧 Tips fetch skipped - cooldown active");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, tips: true }));
      setErrors(prev => ({ ...prev, tips: null }));
      setLastFetchTime(prev => ({ ...prev, tips: now }));

      console.log(`🔧 Fetching carbon tips with AI ${aiEnabled ? 'ENABLED' : 'DISABLED'}:`, {
        country: stableCountry,
        userProfile: stableUserProfile,
        activityHistory: stableActivityHistory
      });

      const tips = await AIApi.getCarbonSavingTips(
        stableCountry,
        stableActivityHistory,
        stableUserProfile
      );

      console.log(`✅ Received tips (${aiEnabled ? 'real AI' : 'mock data'}):`, tips);
      console.log("✅ Tips type:", typeof tips, "Array?", Array.isArray(tips));
      console.log("✅ First tip:", tips?.[0]);
      setCarbonTips(tips);
    } catch (error: any) {
      console.error(`DETAILED ${aiEnabled ? 'AI' : 'MOCK'} ERROR:`, error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      setErrors(prev => ({ ...prev, tips: error.message }));
      // Don't set fallback - let the error show
      setCarbonTips([]);
    } finally {
      setLoading(prev => ({ ...prev, tips: false }));
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, aiEnabled]);

  useEffect(() => {
    // Only fetch if we have valid dependencies
    console.log("🔧 useEffect triggered. Dependencies:", {
      stableCountry,
      hasUserProfile: !!stableUserProfile,
      hasActivityHistory: !!stableActivityHistory,
      aiEnabled: aiEnabled ? "ENABLED" : "DISABLED"
    });

    // More restrictive conditions to prevent unnecessary calls
    if (stableCountry && (stableUserProfile || stableActivityHistory?.length > 0)) {
      console.log(`🔧 Conditions met, calling fetchCarbonTips with delay... (AI ${aiEnabled ? 'ENABLED' : 'DISABLED'})`);
      // Add a small delay to prevent rapid successive calls
      const timeoutId = setTimeout(() => {
        fetchCarbonTips();
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      console.log("🔧 Insufficient data for fetch, skipping");
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, aiEnabled]); // Added aiEnabled as dependency

  const fetchMarketRecommendations = useCallback(async () => {
    // Check cooldown
    const now = Date.now();
    if (now - lastFetchTime.market < COOLDOWN_MS) {
      console.log("🔧 Market fetch skipped - cooldown active");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, market: true }));
      setErrors(prev => ({ ...prev, market: null }));
      setLastFetchTime(prev => ({ ...prev, market: now }));

      console.log(`🔧 Fetching market recommendations with AI ${aiEnabled ? 'ENABLED' : 'DISABLED'}`);

      const recommendations = await AIApi.getMarketRecommendations(
        stableCountry,
        stableActivityHistory?.slice(0, 5), // Only recent activities
        stableUserProfile,
        ["energy_efficiency", "sustainable_transport", "waste_reduction"]
      );

      console.log(`✅ Received market recommendations (${aiEnabled ? 'real AI' : 'mock data'}):`, recommendations);
      setMarketRecommendations(recommendations);
    } catch (error: any) {
      console.error(`Failed to fetch market recommendations (${aiEnabled ? 'AI' : 'mock'}):`, error);
      setErrors(prev => ({ ...prev, market: error.message }));
      setMarketRecommendations({ recommendations: [] });
    } finally {
      setLoading(prev => ({ ...prev, market: false }));
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, aiEnabled]);

  useEffect(() => {
    // Only fetch if we have valid dependencies  
    if (stableCountry && (stableUserProfile || stableActivityHistory?.length > 0)) {
      console.log(`🔧 Fetching market recommendations with AI ${aiEnabled ? 'ENABLED' : 'DISABLED'}`);
      // Add delay to prevent rapid successive calls
      const timeoutId = setTimeout(() => {
        fetchMarketRecommendations();
      }, 1500); // Slightly longer delay for market recommendations

      return () => clearTimeout(timeoutId);
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, aiEnabled]); // Added aiEnabled as dependency

  const refreshTips = useCallback(async () => {
    console.log(`🔄 Manual refresh triggered (AI ${aiEnabled ? 'ENABLED' : 'DISABLED'}), clearing current tips...`);
    setCarbonTips([]); // Clear current tips
    setErrors(prev => ({ ...prev, tips: null })); // Clear current errors
    setLastFetchTime(prev => ({ ...prev, tips: 0 })); // Reset cooldown

    // Call fetchCarbonTips with a slight delay to ensure state updates
    setTimeout(() => {
      fetchCarbonTips();
    }, 200);
  }, [stableCountry, stableUserProfile, stableActivityHistory, aiEnabled]);

  const refreshMarketRecommendations = useCallback(async () => {
    console.log(`🔄 Manual market refresh triggered (AI ${aiEnabled ? 'ENABLED' : 'DISABLED'})`);
    setLastFetchTime(prev => ({ ...prev, market: 0 })); // Reset cooldown

    // Call fetchMarketRecommendations with a slight delay
    setTimeout(() => {
      fetchMarketRecommendations();
    }, 200);
  }, [stableCountry, stableUserProfile, stableActivityHistory, aiEnabled]);

  return {
    carbonTips,
    marketRecommendations,
    loading,
    errors,
    refreshTips,
    refreshMarketRecommendations,
    aiEnabled // Expose AI status to components
  };
}
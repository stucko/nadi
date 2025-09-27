import { useState, useEffect, useCallback, useMemo } from "react";
import { AIApi } from "../../utils/ai-api";

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
  // Debug logging
  console.log("🔧 useAIRecommendations initialized with:", { 
    country, 
    userProfile: userProfile ? "present" : "missing", 
    activityHistory: activityHistory ? `${activityHistory.length} items` : "missing" 
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
  }, [activityHistory?.length, activityHistory?.[0]?.type]); // only re-run if length or first item type changes

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
      
      console.log("Fetching carbon tips with:", {
        country: stableCountry,
        userProfile: stableUserProfile,
        activityHistory: stableActivityHistory
      });
      
      const tips = await AIApi.getCarbonSavingTips(
        stableCountry, 
        stableActivityHistory, 
        stableUserProfile
      );
      
      console.log("✅ Received tips:", tips);
      console.log("✅ Tips type:", typeof tips, "Array?", Array.isArray(tips));
      console.log("✅ First tip:", tips?.[0]);
      setCarbonTips(tips);
    } catch (error: any) {
      console.error("DETAILED AI ERROR:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      setErrors(prev => ({ ...prev, tips: error.message }));
      // Don't set fallback - let the error show
      setCarbonTips([]);
    } finally {
      setLoading(prev => ({ ...prev, tips: false }));
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, lastFetchTime.tips]);

  useEffect(() => {
    // Only fetch if we have valid dependencies
    console.log("🔧 useEffect triggered. Dependencies:", { 
      stableCountry, 
      hasUserProfile: !!stableUserProfile, 
      hasActivityHistory: !!stableActivityHistory 
    });
    
    // More restrictive conditions to prevent unnecessary calls
    if (stableCountry && (stableUserProfile || stableActivityHistory?.length > 0)) {
      console.log("🔧 Conditions met, calling fetchCarbonTips...");
      fetchCarbonTips();
    } else {
      console.log("🔧 Insufficient data for fetch, skipping");
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, fetchCarbonTips]);

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
      
      const recommendations = await AIApi.getMarketRecommendations(
        stableCountry,
        stableActivityHistory?.slice(0, 5), // Only recent activities
        stableUserProfile,
        ["energy_efficiency", "sustainable_transport", "waste_reduction"]
      );
      
      setMarketRecommendations(recommendations);
    } catch (error: any) {
      console.error("Failed to fetch market recommendations:", error);
      setErrors(prev => ({ ...prev, market: error.message }));
      setMarketRecommendations({ recommendations: [] });
    } finally {
      setLoading(prev => ({ ...prev, market: false }));
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, lastFetchTime.market]);

  useEffect(() => {
    // Only fetch if we have valid dependencies  
    if (stableCountry && (stableUserProfile || stableActivityHistory?.length > 0)) {
      fetchMarketRecommendations();
    }
  }, [stableCountry, stableUserProfile, stableActivityHistory, fetchMarketRecommendations]);

  const refreshTips = useCallback(async () => {
    console.log("🔄 Manual refresh triggered, clearing current tips...");
    setCarbonTips([]); // Clear current tips
    setErrors(prev => ({ ...prev, tips: null })); // Clear current errors
    setLastFetchTime(prev => ({ ...prev, tips: 0 })); // Reset cooldown
    await fetchCarbonTips();
  }, [fetchCarbonTips]);

  const refreshMarketRecommendations = useCallback(async () => {
    setLastFetchTime(prev => ({ ...prev, market: 0 })); // Reset cooldown
    await fetchMarketRecommendations();  
  }, [fetchMarketRecommendations]);

  return {
    carbonTips,
    marketRecommendations,
    loading,
    errors,
    refreshTips,
    refreshMarketRecommendations
  };
}
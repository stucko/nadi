import { useState } from "react";
import { Button } from "./ui/button";
import { AIApi } from "../utils/ai-api";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function DebugAI() {
  const [clearing, setClearing] = useState(false);
  const [result, setResult] = useState<string>("");
  const [hookStatus, setHookStatus] = useState<string>("Click 'Check Hook' to test");
  const [cacheStatus, setCacheStatus] = useState<string>("Click 'Check Cache' to view");

  const handleClearCache = async () => {
    setClearing(true);
    try {
      await AIApi.clearCache();
      setResult("✅ Cache cleared successfully! Try refreshing the AI tips now.");
      setCacheStatus("Cache cleared - fresh responses will be generated");
    } catch (error: any) {
      setResult(`❌ Cache clear failed: ${error.message}`);
    } finally {
      setClearing(false);
    }
  };

  const handleCheckCache = async () => {
    setClearing(true);
    setCacheStatus("Checking cache status...");
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-abc52aa8/ai/cache/status`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        const cacheInfo = data.data;
        setCacheStatus(`✅ Found ${cacheInfo.totalCachedItems} cached items. Recent: ${cacheInfo.cacheKeys.slice(0, 3).map((item: any) => item.key).join(', ')}`);
      } else {
        setCacheStatus(`❌ Cache check failed: ${data.error}`);
      }
    } catch (error: any) {
      setCacheStatus(`❌ Cache Check Error: ${error.message}`);
    } finally {
      setClearing(false);
    }
  };

  const handleTestTips = async () => {
    setClearing(true);
    setResult("Testing direct API call...");
    
    try {
      const tips = await AIApi.getCarbonSavingTips(
        "US",
        [{ type: "transport", mode: "car", frequency: "daily" }],
        { country: "US", city: "Test City", electricityUsage: "medium" }
      );
      setResult(`✅ Fresh API Success: "${tips[0] || 'No tips returned'}"`);
    } catch (error: any) {
      setResult(`❌ Fresh API Error: ${error.message}`);
    } finally {
      setClearing(false);
    }
  };

  const handleCheckHook = async () => {
    setClearing(true);
    setHookStatus("Checking hook status...");
    
    try {
      // Just check if hook file exists and is importable
      const { useAIRecommendations } = await import("./hooks/useAIRecommendations");
      setHookStatus("✅ Hook imported successfully - check Dashboard console logs for actual hook state");
    } catch (error: any) {
      setHookStatus(`❌ Hook Import Error: ${error.message}`);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="bg-red-100 border border-red-400 p-4 rounded-lg mb-4">
      <h3 className="text-red-800 font-medium mb-2">🔧 AI Debug Tools</h3>
      
      {/* Hook Status */}
      <div className="bg-yellow-50 border border-yellow-300 p-2 rounded mb-2">
        <p className="text-yellow-800 text-sm font-medium">Hook Status:</p>
        <p className="text-yellow-700 text-xs">{hookStatus}</p>
      </div>
      
      {/* Cache Status */}
      <div className="bg-blue-50 border border-blue-300 p-2 rounded mb-2">
        <p className="text-blue-800 text-sm font-medium">Cache Status:</p>
        <p className="text-blue-700 text-xs">{cacheStatus}</p>
      </div>
      
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button 
          onClick={handleClearCache} 
          disabled={clearing}
          variant="outline"
          size="sm"
        >
          {clearing ? "Clearing..." : "🗑️ Clear Cache"}
        </Button>
        <Button 
          onClick={handleCheckCache}
          disabled={clearing}
          variant="outline"
          size="sm"
        >
          {clearing ? "Checking..." : "📋 Check Cache"}
        </Button>
        <Button 
          onClick={handleTestTips} 
          disabled={clearing}
          variant="outline"
          size="sm"
        >
          {clearing ? "Testing..." : "🧪 Test Fresh Tips"}
        </Button>
        <Button 
          onClick={handleCheckHook}
          disabled={clearing}
          variant="outline"
          size="sm"
        >
          {clearing ? "Checking..." : "🔍 Check Hook"}
        </Button>
      </div>
      {result && (
        <div className="text-sm text-red-700 mt-2 p-2 bg-red-50 rounded">
          {result}
        </div>
      )}
    </div>
  );
}
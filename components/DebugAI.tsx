import { useState } from "react";
import { Flame, Leaf, Loader2, RefreshCw, Zap } from "lucide-react";
import { useAIRecommendations } from "./hooks/useAIRecommendations";

import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Button } from "./ui/button";
import { useAIConfig } from "../utils/ai-config";
import { AIApi } from "../utils/ai-api";

export function DebugAI() {
  const [clearing, setClearing] = useState(false);
  const [result, setResult] = useState<string>("");
  const [hookStatus, setHookStatus] = useState<string>("Click 'Check Hook' to test");
  const [cacheStatus, setCacheStatus] = useState<string>("Click 'Check Cache' to view");

  // Use AI config hook
  const { config, isEnabled, toggle, enable, disable } = useAIConfig();

  const handleClearCache = async () => {
    setClearing(true);
    try {
      await AIApi.clearCache();
      if (isEnabled) {
        setResult("✅ Cache cleared successfully! Try refreshing the AI tips now.");
        setCacheStatus("Cache cleared - fresh responses will be generated");
      } else {
        setResult("✅ Mock cache cleared (AI module is disabled)");
        setCacheStatus("AI disabled - using mock data");
      }
    } catch (error: any) {
      setResult(`❌ Cache clear failed: ${error.message}`);
    } finally {
      setClearing(false);
    }
  };

  const handleCheckCache = async () => {
    setClearing(true);
    setCacheStatus("Checking cache status...");

    if (!isEnabled) {
      setCacheStatus("🚫 AI Module disabled - no real cache to check");
      setClearing(false);
      return;
    }

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
    setResult(`Testing ${isEnabled ? 'real AI' : 'mock'} API call...`);

    try {
      const tips = await AIApi.getCarbonSavingTips(
        "US",
        [{ type: "transport", mode: "car", frequency: "daily" }],
        { country: "US", city: "Test City", electricityUsage: "medium" }
      );
      setResult(`✅ ${isEnabled ? 'Real AI' : 'Mock'} API Success: "${tips[0] || 'No tips returned'}"`);
    } catch (error: any) {
      setResult(`❌ ${isEnabled ? 'Real AI' : 'Mock'} API Error: ${error.message}`);
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

  const handleToggleAI = () => {
    const newState = toggle();
    setResult(`🔄 AI Module ${newState ? 'ENABLED' : 'DISABLED'} - ${newState ? 'Using real AI services' : 'Using mock data'}`);
    setCacheStatus(newState ? "AI enabled - real cache available" : "AI disabled - no real cache");
  };

  return (
    <div className="bg-red-100 border border-red-400 p-4 rounded-lg mb-4">
      <h3 className="text-red-800 font-medium mb-2">🔧 AI Debug Tools</h3>

      {/* AI Module Status */}
      <div className={`border p-3 rounded mb-3 ${isEnabled ? 'bg-green-50 border-green-300' : 'bg-orange-50 border-orange-300'}`}>
        <div className="flex items-center justify-between mb-2">
          <p className={`font-medium ${isEnabled ? 'text-green-800' : 'text-orange-800'}`}>
            AI Module Status: {isEnabled ? '🤖 ENABLED' : '🚫 DISABLED'}
          </p>
          <Button
            onClick={handleToggleAI}
            variant="outline"
            size="sm"
            className={isEnabled ? 'border-green-500 text-green-700' : 'border-orange-500 text-orange-700'}
          >
            {isEnabled ? 'Disable AI' : 'Enable AI'}
          </Button>
        </div>
        <p className={`text-xs ${isEnabled ? 'text-green-700' : 'text-orange-700'}`}>
          {isEnabled
            ? 'Using real AI services (OpenAI API)'
            : 'Using mock data - all AI calls return realistic fake responses'
          }
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Last toggled: {new Date(config.lastToggled).toLocaleString()}
        </p>
      </div>

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
          disabled={clearing || !isEnabled}
          variant="outline"
          size="sm"
          title={!isEnabled ? "Enable AI to check real cache" : ""}
        >
          {clearing ? "Checking..." : "📋 Check Cache"}
        </Button>
        <Button
          onClick={handleTestTips}
          disabled={clearing}
          variant="outline"
          size="sm"
        >
          {clearing ? "Testing..." : `🧪 Test ${isEnabled ? 'AI' : 'Mock'} Tips`}
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

      {/* Quick AI Controls */}
      <div className="flex gap-2 mb-2">
        <Button
          onClick={enable}
          disabled={isEnabled}
          variant="outline"
          size="sm"
          className="text-green-700 border-green-300"
        >
          🤖 Enable AI
        </Button>
        <Button
          onClick={disable}
          disabled={!isEnabled}
          variant="outline"
          size="sm"
          className="text-orange-700 border-orange-300"
        >
          🚫 Disable AI
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
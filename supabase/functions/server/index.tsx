import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { AIService } from "./ai-service.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize AI service
let aiService: AIService;
try {
  aiService = new AIService();
  console.log("AI Service initialized successfully");
} catch (error) {
  console.error("Failed to initialize AI Service:", error);
}

// Health check endpoint
app.get("/make-server-abc52aa8/health", (c) => {
  return c.json({ 
    status: "ok",
    aiServiceReady: !!aiService,
    timestamp: new Date().toISOString()
  });
});

// AI Food Analysis endpoint
app.post("/make-server-abc52aa8/ai/analyze-food", async (c) => {
  try {
    if (!aiService) {
      return c.json({
        success: false,
        error: "AI service not available",
        details: "OpenAI API key may be missing or invalid"
      }, 503);
    }

    const body = await c.req.json();
    const { imageUrl, foodDescription, portion } = body;

    if (!imageUrl && !foodDescription) {
      return c.json({
        success: false,
        error: "Either imageUrl or foodDescription is required"
      }, 400);
    }

    // Generate cache key based on input
    const cacheKey = imageUrl ? 
      `food_img_${btoa(imageUrl).slice(0, 20)}` : 
      `food_desc_${btoa(foodDescription + (portion || '')).slice(0, 20)}`;

    // Check cache first
    const cached = await aiService.getCachedAIResponse(cacheKey);
    if (cached) {
      console.log("Returning cached food analysis");
      return c.json({
        success: true,
        data: cached,
        cached: true
      });
    }

    let result;
    if (imageUrl) {
      const rawResponse = await aiService.analyzeFoodImage(imageUrl);
      // The analyzeFoodImage method returns a raw string that needs parsing
      result = aiService.parseAIResponse(rawResponse);
    } else {
      result = await aiService.analyzeFoodDescription({ foodDescription, portion });
    }

    // Cache the result
    await aiService.cacheAIResponse(cacheKey, result, 24);

    return c.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Food analysis error:", error);
    return c.json({
      success: false,
      error: "Food analysis failed",
      details: error.message
    }, 500);
  }
});

// AI Carbon Saving Tips endpoint
app.post("/make-server-abc52aa8/ai/carbon-tips", async (c) => {
  console.log("🚀 Carbon tips endpoint called");
  try {
    if (!aiService) {
      console.error("❌ AI service not available");
      return c.json({
        success: false,
        error: "AI service not available"
      }, 503);
    }

    const body = await c.req.json();
    const { country, activityHistory, userProfile } = body;
    console.log("🚀 Request body:", { country, activityHistory, userProfile });

    // Generate cache key
    const cacheKey = `tips_${btoa(JSON.stringify({ country, activityHistory: activityHistory?.slice(0, 5) })).slice(0, 20)}`;
    console.log("🚀 Cache key:", cacheKey);

    // Check cache first
    const cached = await aiService.getCachedAIResponse(cacheKey);
    if (cached) {
      console.log("✅ Returning cached carbon tips:", cached);
      return c.json({
        success: true,
        data: cached,
        cached: true
      });
    }

    console.log("🚀 Calling AI service to generate tips...");
    const tips = await aiService.generateCarbonSavingTips({
      country,
      activityHistory,
      userProfile
    });
    console.log("✅ Generated tips:", tips);

    // Cache for 12 hours (tips can refresh more frequently)
    await aiService.cacheAIResponse(cacheKey, tips, 12);
    console.log("✅ Cached tips");

    return c.json({
      success: true,
      data: tips
    });

  } catch (error) {
    console.error("❌ Carbon tips generation error:", error);
    console.error("❌ Error details:", error.message);
    console.error("❌ Error stack:", error.stack);
    return c.json({
      success: false,
      error: "Tips generation failed",
      details: error.message
    }, 500);
  }
});

// AI Market Recommendations endpoint
app.post("/make-server-abc52aa8/ai/market-recommendations", async (c) => {
  try {
    if (!aiService) {
      return c.json({
        success: false,
        error: "AI service not available"
      }, 503);
    }

    const body = await c.req.json();
    const { country, recentActivities, userProfile, preferences } = body;

    // Generate cache key
    const cacheKey = `market_${btoa(JSON.stringify({ country, recentActivities: recentActivities?.slice(0, 3), preferences })).slice(0, 20)}`;

    // Check cache first
    const cached = await aiService.getCachedAIResponse(cacheKey);
    if (cached) {
      console.log("Returning cached market recommendations");
      return c.json({
        success: true,
        data: cached,
        cached: true
      });
    }

    const recommendations = await aiService.generateMarketRecommendations({
      country,
      recentActivities,
      userProfile,
      preferences
    });

    // Cache for 6 hours (market recommendations should refresh more often)
    await aiService.cacheAIResponse(cacheKey, recommendations, 6);

    return c.json({
      success: true,
      data: recommendations
    });

  } catch (error) {
    console.error("Market recommendations error:", error);
    return c.json({
      success: false,
      error: "Market recommendations failed",
      details: error.message
    }, 500);
  }
});

// AI Cache management endpoint (for debugging)
app.get("/make-server-abc52aa8/ai/cache/status", async (c) => {
  try {
    // Get cache statistics
    const cacheKeys = await kv.getByPrefix("ai_cache_");
    return c.json({
      success: true,
      data: {
        totalCachedItems: cacheKeys.length,
        cacheKeys: cacheKeys.map(item => ({
          key: item.key,
          timestamp: JSON.parse(item.value).timestamp,
          expiry: JSON.parse(item.value).expiryHours
        }))
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: "Cache status check failed",
      details: error.message
    }, 500);
  }
});

// AI Cache clear endpoint
app.delete("/make-server-abc52aa8/ai/cache/clear", async (c) => {
  try {
    const cacheKeys = await kv.getByPrefix("ai_cache_");
    console.log(`🗑️ Clearing ${cacheKeys.length} cache entries`);
    
    const keysToDelete = cacheKeys.map(item => item.key);
    if (keysToDelete.length > 0) {
      await kv.mdel(keysToDelete);
    }
    
    return c.json({
      success: true,
      message: `Cleared ${keysToDelete.length} cache entries`
    });
  } catch (error) {
    return c.json({
      success: false,
      error: "Cache clear failed",
      details: error.message
    }, 500);
  }
});

// AI Chat endpoint for testing
app.post("/make-server-abc52aa8/ai/chat", async (c) => {
  console.log("💬 Chat endpoint called");
  try {
    if (!aiService) {
      console.error("❌ AI service not available");
      return c.json({
        success: false,
        error: "AI service not available"
      }, 503);
    }

    const body = await c.req.json();
    const { message } = body;
    console.log("💬 User message:", message);

    if (!message || typeof message !== 'string') {
      return c.json({
        success: false,
        error: "Message is required and must be a string"
      }, 400);
    }

    // Simple chat messages for testing the AI connection
    const messages = [
      {
        role: "system",
        content: "You are a helpful AI assistant for Nadi, an eco-coach app. Keep responses concise and friendly. Always respond in plain text, no JSON formatting."
      },
      {
        role: "user",
        content: message
      }
    ];

    console.log("💬 Calling AI service...");
    const response = await aiService.makeOpenAIRequest(messages, 0.7, 500);
    console.log("✅ AI response:", response);

    return c.json({
      success: true,
      data: {
        message: response,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("❌ Chat error:", error);
    console.error("❌ Error details:", error.message);
    return c.json({
      success: false,
      error: "Chat failed",
      details: error.message
    }, 500);
  }
});

Deno.serve(app.fetch);
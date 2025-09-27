import * as kv from "./kv_store.tsx";

interface FoodAnalysisRequest {
  imageUrl?: string;
  foodDescription?: string;
  portion?: string;
}

interface FoodAnalysisResponse {
  foodItems: Array<{
    name: string;
    carbonFootprint: number; // kg CO2e
    calories: number;
    nutrients: {
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
    sustainabilityScore: number; // 1-10
    suggestions: string[];
  }>;
  totalCarbonSaved?: number;
  alternativeSuggestions: string[];
}

interface TipsRequest {
  userProfile?: any;
  activityHistory?: any[];
  country?: string;
}

interface MarketRecommendationRequest {
  userProfile?: any;
  recentActivities?: any[];
  country?: string;
  preferences?: string[];
}

export class AIService {
  private openAIKey: string;
  private baseURL = "https://api.openai.com/v1";

  constructor() {
    this.openAIKey = Deno.env.get("OPEN_AI_KEY") || "";
    console.log("🔐 Initializing AI Service");
    console.log("🔐 Environment variables available:", Object.keys(Deno.env.toObject()));
    console.log("🔐 OPEN_AI_KEY present:", !!this.openAIKey);
    console.log("🔐 OPEN_AI_KEY length:", this.openAIKey?.length);
    console.log("🔐 OPEN_AI_KEY starts with:", this.openAIKey?.substring(0, 7));
    
    if (!this.openAIKey) {
      console.error("🔐 OpenAI API key not found in environment variables");
      throw new Error("OpenAI API key not found in environment variables");
    }
    console.log("✅ AI Service initialized successfully");
  }

  // Helper method to clean and parse JSON from AI responses
  public parseAIResponse(response: string): any {
    try {
      // Remove markdown code blocks if present
      let cleanedResponse = response.trim();
      
      // Remove ```json and ``` markers
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Try to parse the cleaned response
      return JSON.parse(cleanedResponse.trim());
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.error("Raw response:", response);
      throw new Error(`Invalid JSON response from AI: ${error.message}`);
    }
  }

  async makeOpenAIRequest(messages: any[], temperature = 0.7, maxTokens = 1000) {
    console.log("🔑 Making OpenAI request with:");
    console.log("🔑 API Key present:", !!this.openAIKey);
    console.log("🔑 API Key length:", this.openAIKey?.length);
    console.log("🔑 Base URL:", this.baseURL);
    console.log("🔑 Messages count:", messages.length);
    console.log("🔑 Temperature:", temperature);
    console.log("🔑 Max tokens:", maxTokens);
    
    try {
      const requestBody = {
        model: "gpt-4o-mini",
        messages,
        temperature,
        max_tokens: maxTokens,
      };
      console.log("🔑 Request body:", JSON.stringify(requestBody, null, 2));
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.error("🔑 OpenAI request timed out after 12 seconds");
        controller.abort();
      }, 12000); // 12 second timeout for server-side requests
      
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.openAIKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      console.log("🔑 Response status:", response.status);
      console.log("🔑 Response ok:", response.ok);
      
      if (!response.ok) {
        const error = await response.text();
        console.error("🔑 OpenAI error response:", error);
        throw new Error(`OpenAI API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      console.log("🔑 OpenAI response data:", data);
      console.log("🔑 Content:", data.choices?.[0]?.message?.content);
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error("🔑 OpenAI API request failed:", error);
      console.error("🔑 Error type:", typeof error);
      console.error("🔑 Error message:", error.message);
      
      // Handle timeout and network errors more gracefully
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('OpenAI request timed out. Please try again.');
        }
        if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          throw new Error('Network error connecting to OpenAI. Please check your connection.');
        }
      }
      
      throw error;
    }
  }

  async analyzeFoodImage(imageUrl: string): Promise<string> {
    const messages = [
      {
        role: "system",
        content: `You are a nutrition and sustainability expert. Analyze food images and provide detailed information about carbon footprint, nutrition, and eco-friendliness. Always respond in valid JSON format.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this food image and provide: food items, carbon footprint (kg CO2e), calories, nutrients (protein, carbs, fat, fiber in grams), sustainability score (1-10), and eco-friendly suggestions. Format as JSON."
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl
            }
          }
        ]
      }
    ];

    return await this.makeOpenAIRequest(messages, 0.3, 1500);
  }

  async analyzeFoodDescription(request: FoodAnalysisRequest): Promise<FoodAnalysisResponse> {
    const prompt = `
    Analyze this food: ${request.foodDescription} (portion: ${request.portion || 'standard serving'})
    
    Provide a detailed analysis including:
    1. Carbon footprint in kg CO2e
    2. Nutritional information (calories, protein, carbs, fat, fiber)
    3. Sustainability score (1-10, where 10 is most sustainable)
    4. Eco-friendly alternatives or suggestions
    5. Estimated carbon saved compared to less sustainable alternatives
    
    Respond in valid JSON format matching this structure:
    {
      "foodItems": [{
        "name": "string",
        "carbonFootprint": number,
        "calories": number,
        "nutrients": {
          "protein": number,
          "carbs": number,
          "fat": number,
          "fiber": number
        },
        "sustainabilityScore": number,
        "suggestions": ["string"]
      }],
      "totalCarbonSaved": number,
      "alternativeSuggestions": ["string"]
    }
    `;

    const messages = [
      {
        role: "system",
        content: "You are a nutrition and sustainability expert specializing in carbon footprint analysis of food. Always respond with ONLY valid JSON, no markdown formatting or explanations."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    try {
      const response = await this.makeOpenAIRequest(messages, 0.3, 1500);
      return this.parseAIResponse(response);
    } catch (error) {
      console.error("Food analysis failed:", error);
      // Return fallback response
      return {
        foodItems: [{
          name: request.foodDescription || "Unknown food",
          carbonFootprint: 2.5,
          calories: 300,
          nutrients: {
            protein: 15,
            carbs: 30,
            fat: 10,
            fiber: 5
          },
          sustainabilityScore: 6,
          suggestions: ["Consider local and seasonal alternatives", "Reduce portion size to minimize environmental impact"]
        }],
        totalCarbonSaved: 0.5,
        alternativeSuggestions: ["Plant-based alternatives", "Local seasonal produce", "Organic options"]
      };
    }
  }

  async generateCarbonSavingTips(request: TipsRequest): Promise<string[]> {
    const prompt = `
    Based on the user's profile and activity history, generate 1 personalized, actionable tip for reducing carbon emissions:
    
    User Profile:
    - Country: ${request.country || "global"}
    - City: ${request.userProfile?.city || "unknown"}
    - Email: ${request.userProfile?.email || "unknown"}
    - Electricity Usage: ${request.userProfile?.electricityUsage || "unknown"}
    - Commute Patterns: ${JSON.stringify(request.userProfile?.commute || {})}
    - Preferences: ${JSON.stringify(request.userProfile?.preferences || [])}
    
    Recent Activity History:
    ${JSON.stringify(request.activityHistory || [])}
    
    Requirements:
    - Provide 1 specific, actionable tip tailored to this user's profile
    - Consider their country, city, electricity usage, and commute patterns
    - Include estimated carbon savings or environmental impact
    - Be encouraging and practical for their specific situation
    - Maximum 140 characters to ensure readability
    - Focus on areas they can improve based on their electricity usage and commute data
    - Make it personal and relevant to their location
    
    Return ONLY a JSON array with 1 string tip. No markdown formatting.
    
    Example format: ["In your city, using public transport 3 days/week can save 1.2 tons CO₂ annually - your bus routes are well-connected!"]
    `;

    const messages = [
      {
        role: "system",
        content: "You are an AI environmental coach specializing in personalized carbon reduction advice. Always respond with ONLY valid JSON array containing 1 tip, no markdown formatting or explanations."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    console.log("🤖 Starting AI tips generation with prompt:", prompt.substring(0, 200) + "...");
    console.log("🤖 Messages being sent to OpenAI:", messages);
    
    try {
      console.log("🤖 Making OpenAI request...");
      const response = await this.makeOpenAIRequest(messages, 0.8, 200);
      console.log("🤖 Raw OpenAI response:", response);
      
      console.log("🤖 Parsing AI response...");
      const parsed = this.parseAIResponse(response);
      console.log("🤖 Parsed result:", parsed);
      
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log("✅ Successfully generated tips:", parsed);
        return parsed;
      } else {
        console.error("❌ Invalid parsed result, not an array or empty:", parsed);
        throw new Error("AI returned invalid format or empty result");
      }
    } catch (error) {
      console.error("❌ Tips generation failed:", error);
      console.error("❌ Error type:", typeof error);
      console.error("❌ Error message:", error.message);
      console.error("❌ Error stack:", error.stack);
      throw error; // Re-throw instead of returning fallback
    }
  }

  async generateMarketRecommendations(request: MarketRecommendationRequest): Promise<any> {
    const prompt = `
    Based on user profile and activities, recommend 3 eco-friendly products:
    - Country: ${request.country || "global"}
    - Recent activities: ${JSON.stringify(request.recentActivities || [])}
    - Preferences: ${JSON.stringify(request.preferences || [])}
    
    For each product provide:
    1. Product name and category
    2. Environmental benefit
    3. Estimated carbon impact reduction
    4. Price range
    5. Why it matches user's needs
    
    Focus on: renewable energy, sustainable transport, eco-friendly home products, green technology
    
    Return as JSON object with "recommendations" array.
    `;

    const messages = [
      {
        role: "system", 
        content: "You are a green product specialist focused on sustainable consumer choices. Always respond with ONLY valid JSON, no markdown formatting or explanations."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    try {
      const response = await this.makeOpenAIRequest(messages, 0.7, 1200);
      return this.parseAIResponse(response);
    } catch (error) {
      console.error("Market recommendations failed:", error);
      return {
        recommendations: [
          {
            name: "Smart LED Light Bulbs",
            category: "Energy Efficiency",
            benefit: "Reduce energy consumption by up to 80%",
            carbonReduction: "200kg CO2/year",
            priceRange: "$25-50",
            reason: "Perfect for reducing home energy usage"
          },
          {
            name: "Solar Power Bank",
            category: "Renewable Energy", 
            benefit: "Charge devices with clean solar energy",
            carbonReduction: "50kg CO2/year",
            priceRange: "$30-80",
            reason: "Great for outdoor activities and emergency backup"
          },
          {
            name: "Reusable Water Filter Bottle",
            category: "Waste Reduction",
            benefit: "Eliminate single-use plastic bottles",
            carbonReduction: "100kg CO2/year", 
            priceRange: "$20-40",
            reason: "Matches your commitment to reducing plastic waste"
          }
        ]
      };
    }
  }

  async cacheAIResponse(key: string, data: any, expiryHours = 24) {
    const cacheKey = `ai_cache_${key}`;
    const cacheData = {
      data,
      timestamp: Date.now(),
      expiryHours
    };
    await kv.set(cacheKey, JSON.stringify(cacheData));
  }

  async getCachedAIResponse(key: string) {
    try {
      const cacheKey = `ai_cache_${key}`;
      const cached = await kv.get(cacheKey);
      
      if (cached) {
        const cacheData = JSON.parse(cached);
        const isExpired = Date.now() - cacheData.timestamp > (cacheData.expiryHours * 60 * 60 * 1000);
        
        if (!isExpired) {
          return cacheData.data;
        }
      }
      return null;
    } catch (error) {
      console.error("Cache retrieval failed:", error);
      return null;
    }
  }
}
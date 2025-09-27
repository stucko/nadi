import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-abc52aa8`;

interface APIResponse<T> {
  success: boolean;
  data: T;
  cached?: boolean;
  error?: string;
  details?: string;
}

interface FoodAnalysisResult {
  foodItems: Array<{
    name: string;
    carbonFootprint: number;
    calories: number;
    nutrients: {
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
    sustainabilityScore: number;
    suggestions: string[];
  }>;
  totalCarbonSaved?: number;
  alternativeSuggestions: string[];
}

export class AIApi {
  private static async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    console.log(`🔥 Making AI API request to: ${BASE_URL}${endpoint}`);
    console.log("🔥 Request data:", data);
    console.log("🔥 Using projectId:", projectId);
    console.log("🔥 Using publicAnonKey:", publicAnonKey?.substring(0, 20) + "...");
    
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      console.log("🔥 Response status:", response.status);
      console.log("🔥 Response ok:", response.ok);
      console.log("🔥 Response headers:", Object.fromEntries(response.headers.entries()));

      // Get the response text first to see what we're dealing with
      const responseText = await response.text();
      console.log("🔥 Raw response text:", responseText);

      let result: APIResponse<T>;
      try {
        result = JSON.parse(responseText);
        console.log("🔥 Parsed result:", result);
      } catch (parseError) {
        console.error("🔥 JSON Parse Error:", parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!response.ok) {
        console.error("🔥 HTTP Error:", response.status, result.error);
        throw new Error(result.error || `HTTP ${response.status}: ${responseText}`);
      }

      if (!result.success) {
        console.error("🔥 API Error:", result.error, result.details);
        throw new Error(result.error || 'API request failed');
      }

      console.log("🔥 Successful result:", result.data);
      return result.data;
    } catch (error) {
      console.error(`🔥 FULL AI API Error (${endpoint}):`, error);
      console.error("🔥 Error stack:", error instanceof Error ? error.stack : "No stack");
      throw error;
    }
  }

  static async analyzeFoodImage(imageUrl: string): Promise<FoodAnalysisResult> {
    return this.makeRequest<FoodAnalysisResult>('/ai/analyze-food', {
      imageUrl,
    });
  }

  static async analyzeFoodDescription(foodDescription: string, portion?: string): Promise<FoodAnalysisResult> {
    return this.makeRequest<FoodAnalysisResult>('/ai/analyze-food', {
      foodDescription,
      portion,
    });
  }

  static async getCarbonSavingTips(country?: string, activityHistory?: any[], userProfile?: any): Promise<string[]> {
    return this.makeRequest<string[]>('/ai/carbon-tips', {
      country,
      activityHistory,
      userProfile,
    });
  }

  static async getMarketRecommendations(
    country?: string,
    recentActivities?: any[],
    userProfile?: any,
    preferences?: string[]
  ): Promise<any> {
    return this.makeRequest<any>('/ai/market-recommendations', {
      country,
      recentActivities,
      userProfile,
      preferences,
    });
  }

  static async clearCache(): Promise<void> {
    console.log("🗑️ Clearing AI cache...");
    try {
      const response = await fetch(`${BASE_URL}/ai/cache/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();
      console.log("🗑️ Cache clear result:", result);
      
      if (!result.success) {
        throw new Error(result.error || 'Cache clear failed');
      }
    } catch (error) {
      console.error("🗑️ Cache clear error:", error);
      throw error;
    }
  }

  static async sendChatMessage(message: string): Promise<string> {
    return this.makeRequest<{ message: string; timestamp: string }>('/ai/chat', {
      message,
    }).then(response => response.message);
  }
}

// Helper function to upload image to a temporary hosting service for AI analysis
export async function uploadImageForAnalysis(file: File): Promise<string> {
  try {
    // For demo purposes, we'll use a placeholder service
    // In production, you'd upload to your own storage service
    const formData = new FormData();
    formData.append('image', file);
    
    // This is a placeholder - you would implement proper image upload
    // For now, we'll create a temporary object URL and return it
    const objectUrl = URL.createObjectURL(file);
    
    // Note: This won't work with the AI service as it needs a public URL
    // You would need to implement proper image upload to a service like:
    // - Supabase Storage
    // - Cloudinary  
    // - AWS S3
    // - Similar image hosting service
    
    return objectUrl;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Failed to upload image for analysis');
  }
}
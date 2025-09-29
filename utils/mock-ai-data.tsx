// Mock AI Data Service
// Provides realistic mock data when AI module is disabled

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

interface MarketRecommendation {
    recommendations: Array<{
        name: string;
        category: string;
        benefit: string;
        carbonReduction: string;
        priceRange: string;
        reason: string;
    }>;
}

export class MockAIDataService {

    // Mock carbon saving tips based on user profile
    static getCarbonSavingTips(country?: string, activityHistory?: any[], userProfile?: any): string[] {
        const tips = [
            "Switch to LED bulbs to reduce energy consumption by 75% and save 200kg CO₂ annually",
            "Use public transport 3 days/week to cut your transport emissions by 40%",
            "Choose local, seasonal produce to reduce food-related carbon footprint by 30%",
            "Unplug electronics when not in use to save 10% on electricity bills",
            "Walk or cycle for trips under 3km to improve health and reduce emissions",
            "Set your AC to 24°C to balance comfort with 15% energy savings",
            "Use a reusable water bottle to eliminate 167 plastic bottles per year",
            "Batch your errands into one trip to reduce fuel consumption by 25%",
            "Choose energy-efficient appliances to cut household emissions by 20%",
            "Start composting organic waste to reduce methane emissions by 50%",
            "Use cold water for washing clothes to save 90% of washing machine energy",
            "Plant native trees in your area to offset 22kg CO₂ per tree annually"
        ];

        // Personalize based on country
        const countrySpecificTips: Record<string, string[]> = {
            'MY': [
                "Use KTM or LRT for daily commutes in Kuala Lumpur to save RM200/month on fuel",
                "Install solar panels - Malaysia's sunny climate can generate 1,500kWh annually",
                "Choose local Malaysian fruits like rambutan and durian over imported produce"
            ],
            'SG': [
                "Use Singapore's excellent MRT system to reduce transport costs by 60%",
                "Take advantage of NEA's recycling programs to earn rewards",
                "Use HDB's solar panel initiative to reduce electricity bills"
            ],
            'US': [
                "Carpool or use ride-sharing to reduce commute emissions by 45%",
                "Take advantage of federal tax credits for electric vehicle purchases",
                "Use programmable thermostats to save $180 annually on heating/cooling"
            ]
        };

        const personalizedTips = countrySpecificTips[country || 'MY'] || [];
        const allTips = [...tips, ...personalizedTips];

        // Return 1 random tip
        return [allTips[Math.floor(Math.random() * allTips.length)]];
    }

    // Mock food analysis
    static analyzeFoodDescription(foodDescription: string, portion?: string): Promise<FoodAnalysisResult> {
        return new Promise((resolve) => {
            // Simulate API delay
            setTimeout(() => {
                const mockFoods = [
                    {
                        name: foodDescription || "Mixed Vegetable Salad",
                        carbonFootprint: 0.5,
                        calories: 150,
                        nutrients: { protein: 5, carbs: 20, fat: 8, fiber: 6 },
                        sustainabilityScore: 9,
                        suggestions: ["Add more local seasonal vegetables", "Use olive oil instead of processed dressing"]
                    },
                    {
                        name: "Grilled Chicken Breast",
                        carbonFootprint: 2.1,
                        calories: 280,
                        nutrients: { protein: 35, carbs: 0, fat: 12, fiber: 0 },
                        sustainabilityScore: 6,
                        suggestions: ["Consider plant-based protein alternatives", "Source from local free-range farms"]
                    }
                ];

                const isVegetarian = foodDescription.toLowerCase().includes('vegetable') ||
                    foodDescription.toLowerCase().includes('salad') ||
                    foodDescription.toLowerCase().includes('fruit');

                const selectedFood = isVegetarian ? mockFoods[0] : mockFoods[Math.floor(Math.random() * mockFoods.length)];

                resolve({
                    foodItems: [selectedFood],
                    totalCarbonSaved: isVegetarian ? 1.6 : 0.3,
                    alternativeSuggestions: [
                        "Try plant-based protein sources like lentils or tofu",
                        "Choose locally sourced, seasonal ingredients",
                        "Reduce portion sizes to minimize waste"
                    ]
                });
            }, 800); // Simulate network delay
        });
    }

    // Mock food image analysis
    static analyzeFoodImage(imageUrl: string): Promise<FoodAnalysisResult> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockAnalysis = {
                    foodItems: [{
                        name: "Healthy Bowl with Mixed Ingredients",
                        carbonFootprint: 1.2,
                        calories: 320,
                        nutrients: { protein: 18, carbs: 35, fat: 12, fiber: 8 },
                        sustainabilityScore: 8,
                        suggestions: [
                            "Great choice! This meal has a low carbon footprint",
                            "Consider adding more leafy greens for extra nutrients"
                        ]
                    }],
                    totalCarbonSaved: 1.1,
                    alternativeSuggestions: [
                        "Add quinoa for complete protein",
                        "Use seasonal vegetables for better sustainability",
                        "Try locally sourced ingredients"
                    ]
                };
                resolve(mockAnalysis);
            }, 1200);
        });
    }

    // Mock market recommendations
    static getMarketRecommendations(
        country?: string,
        recentActivities?: any[],
        userProfile?: any,
        preferences?: string[]
    ): Promise<MarketRecommendation> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const baseRecommendations = [
                    {
                        name: "Smart LED Light Bulbs (4-pack)",
                        category: "Energy Efficiency",
                        benefit: "Reduce energy consumption by 80% compared to traditional bulbs",
                        carbonReduction: "200kg CO₂/year",
                        priceRange: "25-45",
                        reason: "Perfect for reducing home energy usage based on your electricity consumption"
                    },
                    {
                        name: "Solar Power Bank 20000mAh",
                        category: "Renewable Energy",
                        benefit: "Charge devices with clean solar energy anywhere",
                        carbonReduction: "50kg CO₂/year",
                        priceRange: "35-65",
                        reason: "Great for outdoor activities and emergency backup power"
                    },
                    {
                        name: "Stainless Steel Water Filter Bottle",
                        category: "Waste Reduction",
                        benefit: "Eliminate single-use plastic bottles completely",
                        carbonReduction: "120kg CO₂/year",
                        priceRange: "20-40",
                        reason: "Matches your commitment to reducing plastic waste"
                    },
                    {
                        name: "Bamboo Fiber Lunch Box Set",
                        category: "Sustainable Living",
                        benefit: "Replace disposable containers with eco-friendly alternatives",
                        carbonReduction: "80kg CO₂/year",
                        priceRange: "15-30",
                        reason: "Perfect for meal prep and reducing food packaging waste"
                    },
                    {
                        name: "Smart Thermostat",
                        category: "Energy Efficiency",
                        benefit: "Automatically optimize heating and cooling for maximum efficiency",
                        carbonReduction: "300kg CO₂/year",
                        priceRange: "120-200",
                        reason: "Ideal for managing your home energy consumption intelligently"
                    },
                    {
                        name: "Electric Bike Conversion Kit",
                        category: "Sustainable Transport",
                        benefit: "Convert your regular bike to electric for longer commutes",
                        carbonReduction: "500kg CO₂/year",
                        priceRange: "300-600",
                        reason: "Based on your transport patterns, this could replace car trips"
                    }
                ];

                // Personalize based on country and activities
                let recommendations = [...baseRecommendations];

                if (country === 'MY') {
                    recommendations[0].priceRange = "RM " + recommendations[0].priceRange;
                    recommendations[1].priceRange = "RM " + recommendations[1].priceRange;
                    recommendations[2].priceRange = "RM " + recommendations[2].priceRange;
                } else if (country === 'SG') {
                    recommendations[0].priceRange = "S$ " + recommendations[0].priceRange;
                    recommendations[1].priceRange = "S$ " + recommendations[1].priceRange;
                    recommendations[2].priceRange = "S$ " + recommendations[2].priceRange;
                } else {
                    recommendations[0].priceRange = "$ " + recommendations[0].priceRange;
                    recommendations[1].priceRange = "$ " + recommendations[1].priceRange;
                    recommendations[2].priceRange = "$ " + recommendations[2].priceRange;
                }

                // Shuffle and pick 3 recommendations
                const shuffled = recommendations.sort(() => 0.5 - Math.random());

                resolve({
                    recommendations: shuffled.slice(0, 3)
                });
            }, 1000);
        });
    }

    // Mock chat responses
    static sendChatMessage(message: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = [
                    "That's a great question about sustainability! Here are some practical tips you can try today.",
                    "Based on your eco-journey so far, I'd recommend focusing on energy efficiency in your daily routine.",
                    "Small changes make a big impact! Every sustainable choice you make contributes to a healthier planet.",
                    "I love your commitment to reducing your carbon footprint! Let's explore some new eco-friendly habits.",
                    "Your progress is inspiring! Here's how you can take your sustainability efforts to the next level.",
                    "Great thinking! Sustainable living is all about making conscious choices that benefit both you and the environment."
                ];

                // Simple keyword-based responses
                const lowerMessage = message.toLowerCase();
                let response = responses[Math.floor(Math.random() * responses.length)];

                if (lowerMessage.includes('transport') || lowerMessage.includes('travel')) {
                    response = "For sustainable transport, try walking, cycling, or public transport for short trips. Carpooling and electric vehicles are great for longer distances!";
                } else if (lowerMessage.includes('energy') || lowerMessage.includes('electricity')) {
                    response = "To save energy, switch to LED bulbs, unplug devices when not in use, and set your AC to 24°C. Smart thermostats can save up to 15% on energy bills!";
                } else if (lowerMessage.includes('food') || lowerMessage.includes('eat')) {
                    response = "Choose local, seasonal produce and reduce meat consumption. Plant-based meals 2-3 times per week can significantly reduce your carbon footprint!";
                } else if (lowerMessage.includes('waste') || lowerMessage.includes('recycle')) {
                    response = "Reduce, reuse, recycle! Use reusable bags and bottles, compost organic waste, and buy products with minimal packaging.";
                }

                resolve(response);
            }, 800);
        });
    }

    // Mock cache operations
    static clearCache(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("🗑️ Mock cache cleared (no real cache in mock mode)");
                resolve();
            }, 200);
        });
    }
}

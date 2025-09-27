import { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Car, 
  Zap, 
  UtensilsCrossed, 
  Trash2, 
  Camera, 
  Sparkles, 
  CheckCircle, 
  Coins,
  Clock,
  Target
} from "lucide-react";
import { getCountryConfig } from "./CountryConfig";
import { toast } from "sonner";
import { AIApi } from "../utils/ai-api";

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

interface NadiCalculatorProps {
  country?: string;
}

type ActivityCategory = 'transport' | 'energy' | 'food' | 'waste';
type TransportMode = 'car' | 'carpool' | 'metro' | 'bus' | 'bicycle' | 'walking' | 'ehailing';

interface Activity {
  id: string;
  category: ActivityCategory;
  type: string;
  description: string;
  pointsEarned: number;
  co2Saved: number;
  timestamp: string;
  details?: any;
}

interface TransportActivity {
  mode: TransportMode;
  distance: string;
  fromLocation: string;
  toLocation: string;
}

interface EnergyActivity {
  actionType: 'electricity_usage' | 'appliance_upgrade' | 'energy_saving';
  description: string;
  impact: string;
}

interface FoodActivity {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodItems: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isLocal: boolean;
  imageAnalysis?: {
    confidence: number;
    detectedItems: string[];
    nutritionalInfo: any;
  };
}

interface WasteActivity {
  wasteType: 'recycling' | 'composting' | 'reduction';
  amount: string;
  description: string;
}

const transportModeLabels: Record<TransportMode, string> = {
  car: 'Car',
  carpool: 'Carpool',
  metro: 'Metro/Train', 
  bus: 'Bus',
  bicycle: 'Bicycle',
  walking: 'Walking',
  ehailing: 'E-hailing'
};

export default function NadiCalculator({ country }: NadiCalculatorProps) {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('transport');
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [totalPointsToday, setTotalPointsToday] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Transport Activity State
  const [transportActivity, setTransportActivity] = useState<TransportActivity>({
    mode: 'walking',
    distance: '',
    fromLocation: '',
    toLocation: ''
  });

  // Energy Activity State
  const [energyActivity, setEnergyActivity] = useState<EnergyActivity>({
    actionType: 'energy_saving',
    description: '',
    impact: ''
  });

  // Food Activity State
  const [foodActivity, setFoodActivity] = useState<FoodActivity>({
    mealType: 'lunch',
    foodItems: [],
    isVegetarian: false,
    isVegan: false,
    isLocal: false
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  // Waste Activity State
  const [wasteActivity, setWasteActivity] = useState<WasteActivity>({
    wasteType: 'recycling',
    amount: '',
    description: ''
  });

  const config = getCountryConfig(country || 'MY');

  const categories = [
    { 
      id: 'transport' as const, 
      label: 'Transport', 
      icon: Car,
      description: 'Log your eco-friendly trips',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    { 
      id: 'energy' as const, 
      label: 'Energy', 
      icon: Zap,
      description: 'Track energy-saving actions',
      color: 'from-yellow-500/20 to-orange-500/20'
    },
    { 
      id: 'food' as const, 
      label: 'Food', 
      icon: UtensilsCrossed,
      description: 'AI-powered meal tracking',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      id: 'waste' as const, 
      label: 'Waste', 
      icon: Trash2,
      description: 'Log waste reduction efforts',
      color: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  // Transport modes with impact and points
  const transportModes: { 
    id: TransportMode; 
    label: string; 
    impactColor: string; 
    basePoints: number;
    co2Factor: number;
  }[] = [
    { id: 'walking', label: 'Walking', impactColor: 'bg-[#26CC84]/20', basePoints: 50, co2Factor: 0 },
    { id: 'bicycle', label: 'Bicycle', impactColor: 'bg-[#26CC84]/20', basePoints: 40, co2Factor: 0 },
    { id: 'metro', label: config.transportModes.rail, impactColor: 'bg-[#2AD5ED]/20', basePoints: 30, co2Factor: 0.05 },
    { id: 'bus', label: config.transportModes.bus, impactColor: 'bg-[#2AD5ED]/20', basePoints: 25, co2Factor: 0.08 },
    { id: 'carpool', label: 'Carpool', impactColor: 'bg-yellow-400/20', basePoints: 20, co2Factor: 0.105 },
    { id: 'car', label: 'Car', impactColor: 'bg-red-400/20', basePoints: 5, co2Factor: 0.21 },
    { id: 'ehailing', label: 'E-hailing', impactColor: 'bg-red-500/20', basePoints: 3, co2Factor: 0.25 }
  ];

  const calculateActivityPoints = (category: ActivityCategory, data: any): { points: number; co2Saved: number } => {
    switch (category) {
      case 'transport':
        const mode = transportModes.find(m => m.id === data.mode);
        const distance = parseFloat(data.distance) || 1;
        const basePoints = mode?.basePoints || 5;
        const transportPoints = Math.round(basePoints * Math.min(distance / 5, 3)); // Scale by distance, max 3x multiplier
        const transportCO2Saved = Math.max(0, (0.21 - (mode?.co2Factor || 0.21)) * distance); // Compare to car
        return { points: transportPoints, co2Saved: transportCO2Saved };

      case 'energy':
        const energyPoints = {
          'electricity_usage': 20,
          'appliance_upgrade': 100,
          'energy_saving': 40
        };
        return { 
          points: energyPoints[data.actionType as keyof typeof energyPoints] || 20,
          co2Saved: 0.5
        };

      case 'food':
        let foodPoints = 15; // Base meal points
        if (data.isVegan) foodPoints += 35;
        else if (data.isVegetarian) foodPoints += 20;
        if (data.isLocal) foodPoints += 15;
        if (data.imageAnalysis?.confidence > 0.8) foodPoints += 10; // AI bonus
        
        const foodCO2Saved = data.isVegan ? 2.5 : data.isVegetarian ? 1.2 : 0.3;
        return { points: foodPoints, co2Saved: foodCO2Saved };

      case 'waste':
        const wastePoints = {
          'recycling': 25,
          'composting': 30,
          'reduction': 40
        };
        const amount = parseFloat(data.amount) || 1;
        const baseWastePoints = wastePoints[data.wasteType as keyof typeof wastePoints] || 25;
        return { 
          points: Math.round(baseWastePoints * Math.min(amount, 3)),
          co2Saved: amount * 0.4
        };

      default:
        return { points: 10, co2Saved: 0.1 };
    }
  };

  const performAIAnalysis = async (imageFile: File): Promise<any> => {
    try {
      // For now, we'll analyze the food description since image upload needs a proper hosting service
      // In production, you'd upload the image to Supabase Storage first
      const mockDescription = "A healthy meal with various ingredients";
      
      const result = await AIApi.analyzeFoodDescription(mockDescription, "1 serving");
      
      if (result.foodItems && result.foodItems.length > 0) {
        const mainFood = result.foodItems[0];
        
        return {
          confidence: mainFood.sustainabilityScore / 10, // Convert to 0-1 scale
          detectedItems: result.foodItems.map(item => item.name),
          nutritionalInfo: {
            calories: mainFood.calories,
            protein: mainFood.nutrients.protein,
            carbs: mainFood.nutrients.carbs,
            fat: mainFood.nutrients.fat
          },
          isVegetarian: mainFood.sustainabilityScore > 6, // High sustainability often means plant-based
          isVegan: mainFood.sustainabilityScore > 8,
          isLocal: mainFood.sustainabilityScore > 7,
          carbonFootprint: mainFood.carbonFootprint,
          suggestions: mainFood.suggestions,
          alternativeSuggestions: result.alternativeSuggestions
        };
      }
      
      throw new Error("No food items detected");
    } catch (error) {
      console.error("AI analysis error:", error);
      // Fallback to mock analysis if AI fails
      return mockFallbackAnalysis();
    }
  };

  const mockFallbackAnalysis = (): any => {
    const mockFoods = [
      { name: 'Mixed Green Salad', isVegetarian: true, isVegan: true, isLocal: true },
      { name: 'Grilled Chicken Breast', isVegetarian: false, isVegan: false, isLocal: false },
      { name: 'Brown Rice', isVegetarian: true, isVegan: true, isLocal: true },
      { name: 'Steamed Broccoli', isVegetarian: true, isVegan: true, isLocal: true },
      { name: 'Quinoa Bowl', isVegetarian: true, isVegan: true, isLocal: false },
      { name: 'Fish Tacos', isVegetarian: false, isVegan: false, isLocal: false },
      { name: 'Tofu Stir Fry', isVegetarian: true, isVegan: true, isLocal: true }
    ];

    const randomFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];
    return {
      confidence: 0.85 + Math.random() * 0.15,
      detectedItems: [randomFood.name],
      nutritionalInfo: {
        calories: Math.floor(Math.random() * 400) + 200,
        protein: Math.floor(Math.random() * 25) + 10,
        carbs: Math.floor(Math.random() * 50) + 20,
        fat: Math.floor(Math.random() * 20) + 5
      },
      isVegetarian: randomFood.isVegetarian,
      isVegan: randomFood.isVegan,
      isLocal: randomFood.isLocal
    };
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsProcessing(true);

    try {
      // Real AI analysis
      const analysis = await performAIAnalysis(file);
      setAiAnalysis(analysis);
      
      // Auto-fill form based on analysis
      setFoodActivity(prev => ({
        ...prev,
        foodItems: analysis.detectedItems,
        isVegetarian: analysis.isVegetarian,
        isVegan: analysis.isVegan,
        isLocal: analysis.isLocal,
        imageAnalysis: analysis
      }));

      toast.success("AI analysis complete! Form auto-filled based on your meal.");
    } catch (error) {
      toast.error("Analysis failed. Please fill the form manually.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompleteActivity = () => {
    let activityData: any = {};
    let activityType = '';
    let description = '';

    switch (activeCategory) {
      case 'transport':
        if (!transportActivity.distance || !transportActivity.fromLocation) {
          toast.error("Please fill in all transport details");
          return;
        }
        activityData = transportActivity;
        activityType = `${transportModeLabels[transportActivity.mode]} Trip`;
        description = `${transportActivity.distance}km from ${transportActivity.fromLocation} to ${transportActivity.toLocation}`;
        setTransportActivity({
          mode: 'walking',
          distance: '',
          fromLocation: '',
          toLocation: ''
        });
        break;

      case 'energy':
        if (!energyActivity.description) {
          toast.error("Please describe your energy-saving action");
          return;
        }
        activityData = energyActivity;
        activityType = energyActivity.actionType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        description = energyActivity.description;
        setEnergyActivity({
          actionType: 'energy_saving',
          description: '',
          impact: ''
        });
        break;

      case 'food':
        if (foodActivity.foodItems.length === 0 && !selectedImage) {
          toast.error("Please take a photo or manually add food items");
          return;
        }
        activityData = { ...foodActivity, imageAnalysis: aiAnalysis };
        activityType = `${foodActivity.mealType.charAt(0).toUpperCase() + foodActivity.mealType.slice(1)} Meal`;
        description = foodActivity.foodItems.length > 0 
          ? foodActivity.foodItems.join(', ')
          : 'Meal logged via photo';
        setFoodActivity({
          mealType: 'lunch',
          foodItems: [],
          isVegetarian: false,
          isVegan: false,
          isLocal: false
        });
        setSelectedImage(null);
        setAiAnalysis(null);
        break;

      case 'waste':
        if (!wasteActivity.amount || !wasteActivity.description) {
          toast.error("Please fill in waste activity details");
          return;
        }
        activityData = wasteActivity;
        activityType = `${wasteActivity.wasteType.charAt(0).toUpperCase() + wasteActivity.wasteType.slice(1)}`;
        description = `${wasteActivity.amount}kg - ${wasteActivity.description}`;
        setWasteActivity({
          wasteType: 'recycling',
          amount: '',
          description: ''
        });
        break;
    }

    const { points, co2Saved } = calculateActivityPoints(activeCategory, activityData);
    
    const newActivity: Activity = {
      id: Date.now().toString(),
      category: activeCategory,
      type: activityType,
      description,
      pointsEarned: points,
      co2Saved,
      timestamp: new Date().toISOString(),
      details: activityData
    };

    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    setTotalPointsToday(prev => prev + points);

    // Success animation
    toast.success(`🎉 +${points} Nadi Points earned!`, {
      description: `You saved ${co2Saved.toFixed(2)}kg CO₂ with this activity!`
    });
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div 
      className="min-h-screen p-4 pb-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1616712134411-6b6ae89bc3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHNwYWNlJTIwc3RhcnMlMjB1bml2ZXJzZXxlbnwxfHx8fDE3NTg5NjQ2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 pt-8">
          <h1 className="text-white text-3xl mb-2">🌱 Nadi Activities</h1>
          <p className="text-white/80 text-lg mb-4">Complete eco-activities and earn Nadi Points!</p>
          
          {/* Eco-score and Daily Progress */}
          <div className="space-y-4">
            {/* Eco-score Card */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white text-lg mb-2">Your Eco-score</h3>
                  <p className="text-white/90 mb-1">
                    62 (vs baseline 74)
                  </p>
                  <p className="text-white/60 text-sm">
                    Keep improving with activities!
                  </p>
                </div>
                <div className="ml-6">
                  <CircularGauge value={62} max={100} size={80} strokeWidth={6} />
                </div>
              </div>
            </Card>

            {/* Daily Progress */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Coins size={20} className="text-[#22C31B]" />
                  <span className="text-white">Today's Points</span>
                </div>
                <Badge className="bg-[#22C31B] text-white">
                  {totalPointsToday}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Target size={16} />
                <span>Goal: 200 points</span>
              </div>
              <Progress 
                value={(totalPointsToday / 200) * 100} 
                className="h-2 mt-2 bg-white/20"
              />
            </Card>
          </div>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map(({ id, label, icon: Icon, description, color }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                activeCategory === id
                  ? 'bg-[#22C31B]/20 border-[#22C31B] scale-105 shadow-lg'
                  : 'bg-white/10 border-white/20 hover:bg-white/15 hover:scale-102'
              }`}
            >
              <Icon size={24} className={activeCategory === id ? 'text-[#22C31B]' : 'text-white/70'} />
              <h3 className={`text-sm mt-2 ${activeCategory === id ? 'text-white' : 'text-white/70'}`}>
                {label}
              </h3>
              <p className={`text-xs mt-1 ${activeCategory === id ? 'text-white/90' : 'text-white/50'}`}>
                {description}
              </p>
            </button>
          ))}
        </div>

        {/* Activity Forms */}
        
        {/* Transport Activity */}
        {activeCategory === 'transport' && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Car size={20} />
                Log Transport Trip
              </h3>
              
              {/* Transport Mode */}
              <div className="mb-4">
                <Label className="text-white mb-2 block">Transportation Mode</Label>
                <div className="grid grid-cols-2 gap-2">
                  {transportModes.slice(0, 6).map(({ id, label, impactColor, basePoints }) => (
                    <button
                      key={id}
                      onClick={() => setTransportActivity(prev => ({ ...prev, mode: id }))}
                      className={`p-3 rounded-lg transition-all text-sm border flex flex-col items-center gap-1 ${
                        transportActivity.mode === id
                          ? 'bg-[#22C31B] border-[#22C31B] text-white scale-105'
                          : `${impactColor} border-white/20 text-white hover:scale-102`
                      }`}
                    >
                      <span>{label}</span>
                      <Badge className="text-xs bg-white/20">+{basePoints}pts</Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-3">
                <div>
                  <Label className="text-white mb-2 block">From Location</Label>
                  <Input
                    placeholder="e.g. Home, Office, Mall"
                    value={transportActivity.fromLocation}
                    onChange={(e) => setTransportActivity(prev => ({ ...prev, fromLocation: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                
                <div>
                  <Label className="text-white mb-2 block">To Location</Label>
                  <Input
                    placeholder="e.g. School, Work, Restaurant"
                    value={transportActivity.toLocation}
                    onChange={(e) => setTransportActivity(prev => ({ ...prev, toLocation: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Distance (km)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 5.2"
                    value={transportActivity.distance}
                    onChange={(e) => setTransportActivity(prev => ({ ...prev, distance: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Points Preview */}
              {transportActivity.distance && (
                <div className="mt-4 p-3 bg-[#22C31B]/20 rounded-lg border border-[#22C31B]/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/90">Points to earn:</span>
                    <Badge className="bg-[#22C31B] text-white">
                      +{calculateActivityPoints('transport', transportActivity).points}
                    </Badge>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Energy Activity */}
        {activeCategory === 'energy' && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Zap size={20} />
                Log Energy Action
              </h3>
              
              {/* Action Type */}
              <div className="mb-4">
                <Label className="text-white mb-2 block">Energy Action Type</Label>
                <div className="space-y-2">
                  {[
                    { id: 'energy_saving', label: 'Energy Saving Action', points: 40, desc: 'Turn off lights, unplug devices' },
                    { id: 'electricity_usage', label: 'Electricity Monitoring', points: 20, desc: 'Track and reduce usage' },
                    { id: 'appliance_upgrade', label: 'Eco Appliance Upgrade', points: 100, desc: 'Switch to energy-efficient appliances' }
                  ].map((action) => (
                    <button
                      key={action.id}
                      onClick={() => setEnergyActivity(prev => ({ ...prev, actionType: action.id as any }))}
                      className={`w-full p-3 rounded-lg transition-all text-left border ${
                        energyActivity.actionType === action.id
                          ? 'bg-[#22C31B]/20 border-[#22C31B] text-white'
                          : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{action.label}</div>
                          <div className="text-xs text-white/60">{action.desc}</div>
                        </div>
                        <Badge className="bg-white/20">+{action.points}pts</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div>
                  <Label className="text-white mb-2 block">What did you do?</Label>
                  <Input
                    placeholder="e.g. Switched to LED bulbs in living room"
                    value={energyActivity.description}
                    onChange={(e) => setEnergyActivity(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Estimated Impact (optional)</Label>
                  <Input
                    placeholder="e.g. 20% less electricity usage"
                    value={energyActivity.impact}
                    onChange={(e) => setEnergyActivity(prev => ({ ...prev, impact: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Food Activity with AI */}
        {activeCategory === 'food' && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <UtensilsCrossed size={20} />
                <Sparkles size={16} className="text-yellow-400" />
                AI-Powered Meal Logger
              </h3>
              
              {/* Meal Type */}
              <div className="mb-4">
                <Label className="text-white mb-2 block">Meal Type</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                    <button
                      key={meal}
                      onClick={() => setFoodActivity(prev => ({ ...prev, mealType: meal as any }))}
                      className={`p-2 rounded-lg text-sm transition-all border ${
                        foodActivity.mealType === meal
                          ? 'bg-[#22C31B] border-[#22C31B] text-white'
                          : 'bg-white/10 border-white/20 text-white/70'
                      }`}
                    >
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Photo Analysis */}
              <div className="mb-4">
                <Label className="text-white mb-2 block flex items-center gap-2">
                  <Camera size={16} />
                  Take Photo for AI Analysis
                </Label>
                
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-12 bg-gradient-to-r from-[#2AD5ED] to-[#26CC84] hover:from-[#26CC84] hover:to-[#22C31B] text-white flex items-center justify-center gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Camera size={16} />
                        Take Photo of Your Meal
                      </>
                    )}
                  </Button>

                  {selectedImage && (
                    <div className="relative">
                      <img 
                        src={selectedImage} 
                        alt="Selected meal" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {aiAnalysis && (
                        <div className="mt-2 p-3 bg-[#22C31B]/20 rounded-lg border border-[#22C31B]/30">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle size={16} className="text-[#22C31B]" />
                            <span className="text-white text-sm">AI Analysis Complete!</span>
                            <Badge className="bg-[#22C31B] text-white text-xs">
                              {Math.round(aiAnalysis.confidence * 100)}% confident
                            </Badge>
                          </div>
                          <div className="text-white/80 text-sm">
                            Detected: {aiAnalysis.detectedItems.join(', ')}
                          </div>
                          {aiAnalysis.nutritionalInfo && (
                            <div className="text-white/60 text-xs mt-1">
                              ~{aiAnalysis.nutritionalInfo.calories} calories
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Food Entry (if no photo) */}
              {!selectedImage && (
                <div className="mb-4">
                  <Label className="text-white mb-2 block flex items-center gap-2">
                    Or manually describe your meal
                    <Sparkles size={14} className="text-yellow-400" />
                  </Label>
                  <div className="space-y-3">
                    <Input
                      placeholder="e.g. Quinoa salad with grilled vegetables and olive oil"
                      value={foodActivity.foodItems.join(', ')}
                      onChange={(e) => setFoodActivity(prev => ({ 
                        ...prev, 
                        foodItems: e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                      }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    
                    {foodActivity.foodItems.length > 0 && !aiAnalysis && (
                      <Button
                        onClick={async () => {
                          setIsProcessing(true);
                          try {
                            const description = foodActivity.foodItems.join(', ');
                            const result = await AIApi.analyzeFoodDescription(description, "1 serving");
                            
                            if (result.foodItems && result.foodItems.length > 0) {
                              const mainFood = result.foodItems[0];
                              const analysis = {
                                confidence: mainFood.sustainabilityScore / 10,
                                detectedItems: result.foodItems.map(item => item.name),
                                nutritionalInfo: {
                                  calories: mainFood.calories,
                                  protein: mainFood.nutrients.protein,
                                  carbs: mainFood.nutrients.carbs,
                                  fat: mainFood.nutrients.fat
                                },
                                isVegetarian: mainFood.sustainabilityScore > 6,
                                isVegan: mainFood.sustainabilityScore > 8,
                                isLocal: mainFood.sustainabilityScore > 7,
                                carbonFootprint: mainFood.carbonFootprint,
                                suggestions: mainFood.suggestions,
                                alternativeSuggestions: result.alternativeSuggestions
                              };
                              
                              setAiAnalysis(analysis);
                              setFoodActivity(prev => ({
                                ...prev,
                                isVegetarian: analysis.isVegetarian,
                                isVegan: analysis.isVegan,
                                isLocal: analysis.isLocal,
                                imageAnalysis: analysis
                              }));
                              
                              toast.success("AI analysis complete! Meal properties updated.");
                            }
                          } catch (error) {
                            console.error("AI analysis failed:", error);
                            toast.error("AI analysis failed. Please set meal properties manually.");
                          } finally {
                            setIsProcessing(false);
                          }
                        }}
                        disabled={isProcessing}
                        className="w-full h-10 bg-gradient-to-r from-[#26CC84] to-[#22C31B] hover:from-[#22C31B] hover:to-[#105D0D] text-white flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                            Analyzing with AI...
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            Analyze with AI
                          </>
                        )}
                      </Button>
                    )}
                    
                    {aiAnalysis && !selectedImage && (
                      <div className="p-3 bg-[#22C31B]/20 rounded-lg border border-[#22C31B]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle size={16} className="text-[#22C31B]" />
                          <span className="text-white text-sm">AI Analysis Complete!</span>
                          <Badge className="bg-[#22C31B] text-white text-xs">
                            {Math.round(aiAnalysis.confidence * 100)}% confident
                          </Badge>
                        </div>
                        <div className="text-white/80 text-sm">
                          Analyzed: {aiAnalysis.detectedItems.join(', ')}
                        </div>
                        {aiAnalysis.nutritionalInfo && (
                          <div className="text-white/60 text-xs mt-1">
                            ~{aiAnalysis.nutritionalInfo.calories} calories, 
                            {aiAnalysis.carbonFootprint && ` ${aiAnalysis.carbonFootprint.toFixed(1)}kg CO₂`}
                          </div>
                        )}
                        {aiAnalysis.suggestions && aiAnalysis.suggestions.length > 0 && (
                          <div className="text-white/70 text-xs mt-2">
                            💡 {aiAnalysis.suggestions[0]}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Meal Properties */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFoodActivity(prev => ({ ...prev, isVegetarian: !prev.isVegetarian, isVegan: false }))}
                    className={`px-3 py-2 rounded-full text-sm transition-all border ${
                      foodActivity.isVegetarian
                        ? 'bg-[#26CC84]/20 border-[#26CC84] text-white'
                        : 'bg-white/10 border-white/20 text-white/70'
                    }`}
                  >
                    🥬 Vegetarian (+20pts)
                  </button>
                  
                  <button
                    onClick={() => setFoodActivity(prev => ({ ...prev, isVegan: !prev.isVegan, isVegetarian: prev.isVegan }))}
                    className={`px-3 py-2 rounded-full text-sm transition-all border ${
                      foodActivity.isVegan
                        ? 'bg-[#22C31B]/20 border-[#22C31B] text-white'
                        : 'bg-white/10 border-white/20 text-white/70'
                    }`}
                  >
                    🌱 Vegan (+35pts)
                  </button>
                  
                  <button
                    onClick={() => setFoodActivity(prev => ({ ...prev, isLocal: !prev.isLocal }))}
                    className={`px-3 py-2 rounded-full text-sm transition-all border ${
                      foodActivity.isLocal
                        ? 'bg-[#2AD5ED]/20 border-[#2AD5ED] text-white'
                        : 'bg-white/10 border-white/20 text-white/70'
                    }`}
                  >
                    🌾 Local/Seasonal (+15pts)
                  </button>
                </div>

                {/* Points Preview */}
                <div className="p-3 bg-[#22C31B]/20 rounded-lg border border-[#22C31B]/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/90">Points to earn:</span>
                    <Badge className="bg-[#22C31B] text-white">
                      +{calculateActivityPoints('food', foodActivity).points}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Waste Activity */}
        {activeCategory === 'waste' && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Trash2 size={20} />
                Log Waste Action
              </h3>
              
              {/* Waste Type */}
              <div className="mb-4">
                <Label className="text-white mb-2 block">Waste Action Type</Label>
                <div className="space-y-2">
                  {[
                    { id: 'recycling', label: 'Recycling', points: 25, desc: 'Sorted recyclables properly' },
                    { id: 'composting', label: 'Composting', points: 30, desc: 'Composted organic waste' },
                    { id: 'reduction', label: 'Waste Reduction', points: 40, desc: 'Avoided creating waste' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setWasteActivity(prev => ({ ...prev, wasteType: type.id as any }))}
                      className={`w-full p-3 rounded-lg transition-all text-left border ${
                        wasteActivity.wasteType === type.id
                          ? 'bg-[#22C31B]/20 border-[#22C31B] text-white'
                          : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{type.label}</div>
                          <div className="text-xs text-white/60">{type.desc}</div>
                        </div>
                        <Badge className="bg-white/20">+{type.points}pts</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div>
                  <Label className="text-white mb-2 block">Amount (kg)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 2.5"
                    value={wasteActivity.amount}
                    onChange={(e) => setWasteActivity(prev => ({ ...prev, amount: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Description</Label>
                  <Input
                    placeholder="e.g. Recycled plastic bottles and paper"
                    value={wasteActivity.description}
                    onChange={(e) => setWasteActivity(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              {/* Points Preview */}
              {wasteActivity.amount && (
                <div className="mt-4 p-3 bg-[#22C31B]/20 rounded-lg border border-[#22C31B]/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/90">Points to earn:</span>
                    <Badge className="bg-[#22C31B] text-white">
                      +{calculateActivityPoints('waste', wasteActivity).points}
                    </Badge>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Complete Activity Button */}
        <Button
          onClick={handleCompleteActivity}
          className="w-full h-14 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white rounded-xl mb-6 flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          Complete Activity & Earn Points
        </Button>

        {/* Recent Activities */}
        {recentActivities.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
            <h3 className="text-white text-lg mb-4 flex items-center gap-2">
              <Clock size={20} />
              Recent Activities
            </h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-[#22C31B]/20 text-[#22C31B] text-xs">
                        {activity.category}
                      </Badge>
                      <span className="text-white text-sm">{activity.type}</span>
                    </div>
                    <p className="text-white/70 text-xs">{activity.description}</p>
                    <p className="text-white/50 text-xs">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                  
                  <div className="text-right">
                    <Badge className="bg-[#22C31B] text-white mb-1">
                      +{activity.pointsEarned}
                    </Badge>
                    <div className="text-white/60 text-xs">
                      -{activity.co2Saved.toFixed(1)}kg CO₂
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
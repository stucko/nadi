import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Leaf, 
  TreePine, 
  Recycle, 
  Zap, 
  Car, 
  Utensils, 
  Target, 
  Calendar,
  Award,
  Star,
  Globe,
  Users,
  TrendingDown,
  CheckCircle,
  Lock,
  Flame
} from "lucide-react";


interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'transport' | 'energy' | 'food' | 'waste' | 'general' | 'community';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress: number; // 0-100
  target: number;
  current: number;
  unit: string;
  unlocked: boolean;
  dateUnlocked?: string;
  co2Saved: number; // kg CO2e saved
}

interface AchievementCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  achievements: Achievement[];
}

export function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock achievements data - in real app, this would come from user's actual data
  const achievementCategories: AchievementCategory[] = [
    {
      id: 'transport',
      name: 'Green Transport',
      icon: Car,
      color: '#22C31B',
      achievements: [
        {
          id: 'eco_commuter_bronze',
          title: 'Eco Commuter',
          description: 'Use sustainable transport for 7 days',
          icon: Leaf,
          category: 'transport',
          tier: 'bronze',
          progress: 100,
          target: 7,
          current: 7,
          unit: 'days',
          unlocked: true,
          dateUnlocked: '2024-01-15',
          co2Saved: 15.2
        },
        {
          id: 'bicycle_hero',
          title: 'Bicycle Hero',
          description: 'Cycle 100km total distance',
          icon: Car,
          category: 'transport',
          tier: 'silver',
          progress: 65,
          target: 100,
          current: 65,
          unit: 'km',
          unlocked: false,
          co2Saved: 23.8
        },
        {
          id: 'carbon_cutter',
          title: 'Carbon Cutter',
          description: 'Reduce transport emissions by 50kg CO2e',
          icon: TrendingDown,
          category: 'transport',
          tier: 'gold',
          progress: 30,
          target: 50,
          current: 15,
          unit: 'kg CO2e',
          unlocked: false,
          co2Saved: 15.0
        }
      ]
    },
    {
      id: 'energy',
      name: 'Energy Saver',
      icon: Zap,
      color: '#2AD5ED',
      achievements: [
        {
          id: 'energy_conscious',
          title: 'Energy Conscious',
          description: 'Track energy usage for 14 days',
          icon: Zap,
          category: 'energy',
          tier: 'bronze',
          progress: 100,
          target: 14,
          current: 14,
          unit: 'days',
          unlocked: true,
          dateUnlocked: '2024-01-20',
          co2Saved: 8.5
        },
        {
          id: 'power_saver',
          title: 'Power Saver',
          description: 'Reduce monthly electricity by 20%',
          icon: Flame,
          category: 'energy',
          tier: 'silver',
          progress: 45,
          target: 20,
          current: 9,
          unit: '%',
          unlocked: false,
          co2Saved: 12.3
        }
      ]
    },
    {
      id: 'food',
      name: 'Plant Pioneer',
      icon: Utensils,
      color: '#26CC84',
      achievements: [
        {
          id: 'plant_based_week',
          title: 'Plant-Based Week',
          description: 'Eat 7 plant-based meals in one week',
          icon: Utensils,
          category: 'food',
          tier: 'bronze',
          progress: 100,
          target: 7,
          current: 7,
          unit: 'meals',
          unlocked: true,
          dateUnlocked: '2024-01-10',
          co2Saved: 18.7
        },
        {
          id: 'local_food_champion',
          title: 'Local Food Champion',
          description: 'Source 80% local food for a month',
          icon: Globe,
          category: 'food',
          tier: 'gold',
          progress: 20,
          target: 80,
          current: 16,
          unit: '%',
          unlocked: false,
          co2Saved: 5.2
        }
      ]
    },
    {
      id: 'waste',
      name: 'Waste Warrior',
      icon: Recycle,
      color: '#105D0D',
      achievements: [
        {
          id: 'recycling_rookie',
          title: 'Recycling Rookie',
          description: 'Recycle for 10 consecutive days',
          icon: Recycle,
          category: 'waste',
          tier: 'bronze',
          progress: 80,
          target: 10,
          current: 8,
          unit: 'days',
          unlocked: false,
          co2Saved: 6.8
        },
        {
          id: 'zero_waste_hero',
          title: 'Zero Waste Hero',
          description: 'Reduce general waste by 75%',
          icon: Target,
          category: 'waste',
          tier: 'platinum',
          progress: 15,
          target: 75,
          current: 11,
          unit: '%',
          unlocked: false,
          co2Saved: 45.2
        }
      ]
    },
    {
      id: 'general',
      name: 'Eco Champion',
      icon: Award,
      color: '#22C31B',
      achievements: [
        {
          id: 'tracking_master',
          title: 'Tracking Master',
          description: 'Log activities for 30 consecutive days',
          icon: Calendar,
          category: 'general',
          tier: 'silver',
          progress: 67,
          target: 30,
          current: 20,
          unit: 'days',
          unlocked: false,
          co2Saved: 25.4
        },
        {
          id: 'carbon_neutral',
          title: 'Carbon Neutral',
          description: 'Offset 500kg CO2e in total',
          icon: TreePine,
          category: 'general',
          tier: 'platinum',
          progress: 35,
          target: 500,
          current: 175,
          unit: 'kg CO2e',
          unlocked: false,
          co2Saved: 175.0
        },
        {
          id: 'community_leader',
          title: 'Community Leader',
          description: 'Inspire 5 friends to join Nadi',
          icon: Users,
          category: 'community',
          tier: 'gold',
          progress: 40,
          target: 5,
          current: 2,
          unit: 'friends',
          unlocked: false,
          co2Saved: 85.6
        }
      ]
    }
  ];

  const getAllAchievements = () => {
    return achievementCategories.flatMap(cat => cat.achievements);
  };

  const getFilteredAchievements = () => {
    if (selectedCategory === 'all') {
      return getAllAchievements();
    }
    return achievementCategories.find(cat => cat.id === selectedCategory)?.achievements || [];
  };

  const getTierColor = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'platinum': return '#E5E4E2';
      default: return '#22C31B';
    }
  };

  const getTierGradient = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-[#22C31B] to-[#26CC84]';
    }
  };

  const totalCO2Saved = getAllAchievements()
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.co2Saved, 0);

  const unlockedCount = getAllAchievements().filter(a => a.unlocked).length;
  const totalCount = getAllAchievements().length;



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
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl mb-4">🏆 Eco Achievements</h1>
          <p className="text-white/80 mb-6">
            Track your environmental impact and unlock meaningful milestones
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🏅</div>
                <div className="text-white text-lg">{unlockedCount}/{totalCount}</div>
                <div className="text-white/70 text-sm">Achievements Unlocked</div>
              </div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🌱</div>
                <div className="text-white text-lg">{totalCO2Saved.toFixed(1)} kg</div>
                <div className="text-white/70 text-sm">CO2e Saved</div>
              </div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-white text-lg">{Math.round((unlockedCount / totalCount) * 100)}%</div>
                <div className="text-white/70 text-sm">Completion Rate</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={`h-10 px-4 rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#22C31B] text-white border-[#22C31B]'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            All
          </Button>
          
          {achievementCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`h-10 px-4 rounded-full transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-[#22C31B] text-white border-[#22C31B]'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <Icon size={16} />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredAchievements().map((achievement) => {
            const Icon = achievement.icon;
            const isUnlocked = achievement.unlocked;
            
            return (
              <Card 
                key={achievement.id}
                className={`bg-white/10 backdrop-blur-sm border-white/20 p-6 transition-all duration-300 hover:scale-105 ${
                  isUnlocked ? 'shadow-lg' : 'opacity-75'
                }`}
              >
                {/* Achievement Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${getTierGradient(achievement.tier)}`}>
                    {isUnlocked ? (
                      <Icon size={24} className="text-white" />
                    ) : (
                      <Lock size={24} className="text-white/70" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`capitalize bg-gradient-to-r ${getTierGradient(achievement.tier)} text-white border-0`}
                    >
                      {achievement.tier}
                    </Badge>
                    {isUnlocked && (
                      <CheckCircle size={20} className="text-[#22C31B]" />
                    )}
                  </div>
                </div>

                {/* Achievement Content */}
                <div className="mb-4">
                  <h3 className="text-white text-lg mb-2">{achievement.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{achievement.description}</p>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">
                        {achievement.current}/{achievement.target} {achievement.unit}
                      </span>
                      <span className="text-white/80">{achievement.progress}%</span>
                    </div>
                    
                    <Progress 
                      value={achievement.progress} 
                      className="h-2 bg-white/20"
                    />
                  </div>
                </div>

                {/* CO2 Impact */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf size={16} className="text-[#26CC84]" />
                    <span className="text-white/80 text-sm">
                      {achievement.co2Saved.toFixed(1)} kg CO2e
                    </span>
                  </div>
                  
                  {isUnlocked && achievement.dateUnlocked && (
                    <Badge variant="outline" className="text-xs text-white/70 border-white/20">
                      {new Date(achievement.dateUnlocked).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {getFilteredAchievements().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-white text-xl mb-2">No achievements in this category yet</h3>
            <p className="text-white/70">Start tracking your activities to unlock achievements!</p>
          </div>
        )}

        {/* Motivational Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-[#22C31B]/20 to-[#26CC84]/20 backdrop-blur-sm border-[#22C31B]/30 p-6">
            <h3 className="text-white text-lg mb-2">🌍 Every Action Counts</h3>
            <p className="text-white/80 text-sm">
              You've saved {totalCO2Saved.toFixed(1)} kg of CO2e so far! 
              That's equivalent to planting {Math.round(totalCO2Saved / 22)} trees. 
              Keep going to make an even bigger impact! 🌱
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
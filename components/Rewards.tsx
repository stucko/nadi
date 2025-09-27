import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Coins, 
  Leaf, 
  TreePine, 
  Gift, 
  ShoppingBag,
  Heart,
  Award,
  Zap,
  Globe,
  Camera,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface UserBalance {
  nadiPoints: number;
  carbonCredits: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'eco-products' | 'certificates' | 'donations' | 'discounts' | 'digital';
  cost: {
    nadiPoints?: number;
    carbonCredits?: number;
  };
  value: string;
  popularity: number; // 1-5 stars
  available: number;
  claimed: number;
  image?: string;
  partner?: string;
}

interface RewardCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  rewards: Reward[];
}

export function Rewards() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userBalance] = useState<UserBalance>({
    nadiPoints: 2450,
    carbonCredits: 15
  });

  // Mock rewards data - in real app, this would come from backend
  const rewardCategories: RewardCategory[] = [
    {
      id: 'eco-products',
      name: 'Eco Products',
      icon: ShoppingBag,
      color: '#22C31B',
      description: 'Sustainable products for everyday life',
      rewards: [
        {
          id: 'bamboo_toothbrush',
          title: 'Bamboo Toothbrush Set',
          description: 'Set of 4 biodegradable bamboo toothbrushes',
          icon: Leaf,
          category: 'eco-products',
          cost: { nadiPoints: 500 },
          value: '$25',
          popularity: 4,
          available: 50,
          claimed: 12,
          partner: 'EcoLife Co.'
        },
        {
          id: 'reusable_bags',
          title: 'Organic Cotton Bags',
          description: '3-pack reusable shopping bags made from organic cotton',
          icon: ShoppingBag,
          category: 'eco-products',
          cost: { nadiPoints: 750 },
          value: '$35',
          popularity: 5,
          available: 30,
          claimed: 8,
          partner: 'GreenBag Ltd.'
        },
        {
          id: 'solar_powerbank',
          title: 'Solar Power Bank',
          description: '10000mAh solar-powered portable charger',
          icon: Zap,
          category: 'eco-products',
          cost: { nadiPoints: 1200, carbonCredits: 3 },
          value: '$60',
          popularity: 5,
          available: 20,
          claimed: 15,
          partner: 'SolarTech'
        }
      ]
    },
    {
      id: 'certificates',
      name: 'Certificates',
      icon: Award,
      color: '#26CC84',
      description: 'Environmental impact certificates',
      rewards: [
        {
          id: 'tree_certificate',
          title: 'Tree Planting Certificate',
          description: 'Plant 1 native tree in your region with official certificate',
          icon: TreePine,
          category: 'certificates',
          cost: { carbonCredits: 2 },
          value: '1 Tree',
          popularity: 5,
          available: 100,
          claimed: 45,
          partner: 'Forest Foundation'
        },
        {
          id: 'carbon_offset',
          title: 'Carbon Offset Certificate',
          description: 'Offset 10kg CO2e through verified projects',
          icon: Globe,
          category: 'certificates',
          cost: { carbonCredits: 5 },
          value: '10kg CO2e',
          popularity: 4,
          available: 80,
          claimed: 22,
          partner: 'CarbonZero'
        },
        {
          id: 'renewable_energy',
          title: 'Renewable Energy Support',
          description: 'Support 1 month of renewable energy for a family',
          icon: Zap,
          category: 'certificates',
          cost: { carbonCredits: 8 },
          value: '1 Month',
          popularity: 4,
          available: 50,
          claimed: 18,
          partner: 'Clean Energy Co.'
        }
      ]
    },
    {
      id: 'donations',
      name: 'Donations',
      icon: Heart,
      color: '#2AD5ED',
      description: 'Support environmental causes',
      rewards: [
        {
          id: 'ocean_cleanup',
          title: 'Ocean Cleanup Donation',
          description: 'Remove 1kg of plastic from ocean waters',
          icon: Globe,
          category: 'donations',
          cost: { nadiPoints: 300 },
          value: '1kg Plastic',
          popularity: 5,
          available: 200,
          claimed: 67,
          partner: 'Ocean Rescue'
        },
        {
          id: 'wildlife_protection',
          title: 'Wildlife Protection Fund',
          description: 'Protect 1 acre of endangered species habitat',
          icon: Heart,
          category: 'donations',
          cost: { nadiPoints: 800, carbonCredits: 2 },
          value: '1 Acre',
          popularity: 4,
          available: 100,
          claimed: 34,
          partner: 'Wildlife Trust'
        }
      ]
    },
    {
      id: 'discounts',
      name: 'Discounts',
      icon: Gift,
      color: '#105D0D',
      description: 'Exclusive eco-brand discounts',
      rewards: [
        {
          id: 'sustainable_fashion',
          title: '20% Off Sustainable Fashion',
          description: 'Discount on organic cotton clothing brands',
          icon: Gift,
          category: 'discounts',
          cost: { nadiPoints: 400 },
          value: '20% Off',
          popularity: 5,
          available: 75,
          claimed: 28,
          partner: 'EcoFashion'
        },
        {
          id: 'organic_food',
          title: '15% Off Organic Groceries',
          description: 'Discount on certified organic food products',
          icon: Leaf,
          category: 'discounts',
          cost: { nadiPoints: 250 },
          value: '15% Off',
          popularity: 4,
          available: 100,
          claimed: 42,
          partner: 'OrganicMart'
        }
      ]
    },
    {
      id: 'digital',
      name: 'Digital Rewards',
      icon: Sparkles,
      color: '#22C31B',
      description: 'Digital badges and achievements',
      rewards: [
        {
          id: 'eco_warrior_badge',
          title: 'Eco Warrior Digital Badge',
          description: 'Exclusive digital badge for your social profiles',
          icon: Award,
          category: 'digital',
          cost: { nadiPoints: 200 },
          value: 'Badge',
          popularity: 3,
          available: 500,
          claimed: 156,
          partner: 'Nadi'
        },
        {
          id: 'carbon_neutral_certificate',
          title: 'Digital Carbon Neutral Certificate',
          description: 'Shareable certificate proving your carbon neutrality',
          icon: CheckCircle,
          category: 'digital',
          cost: { carbonCredits: 10 },
          value: 'Certificate',
          popularity: 4,
          available: 200,
          claimed: 89,
          partner: 'Nadi'
        }
      ]
    }
  ];

  const getAllRewards = () => {
    return rewardCategories.flatMap(cat => cat.rewards);
  };

  const getFilteredRewards = () => {
    if (selectedCategory === 'all') {
      return getAllRewards();
    }
    return rewardCategories.find(cat => cat.id === selectedCategory)?.rewards || [];
  };

  const canAfford = (reward: Reward) => {
    const nadiCheck = !reward.cost.nadiPoints || userBalance.nadiPoints >= reward.cost.nadiPoints;
    const carbonCheck = !reward.cost.carbonCredits || userBalance.carbonCredits >= reward.cost.carbonCredits;
    return nadiCheck && carbonCheck && reward.available > 0;
  };

  const handleRedeemReward = (reward: Reward) => {
    if (!canAfford(reward)) {
      toast.error("Insufficient balance or reward unavailable");
      return;
    }

    // Simulate redemption
    console.log('Redeeming reward:', reward.id);
    toast.success(`🎉 Successfully redeemed ${reward.title}!`);
    
    // In real app, would update backend and user balance
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={`${i < count ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
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
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl mb-4">🎁 Eco Rewards</h1>
          <p className="text-white/80 mb-6">
            Redeem your points and credits for meaningful environmental impact
          </p>
          
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
            <Card className="bg-gradient-to-r from-[#22C31B]/20 to-[#26CC84]/20 backdrop-blur-sm border-[#22C31B]/30 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22C31B]/30 flex items-center justify-center">
                  <Coins size={20} className="text-[#22C31B]" />
                </div>
                <div>
                  <div className="text-white text-lg">{userBalance.nadiPoints.toLocaleString()}</div>
                  <div className="text-white/70 text-sm">Nadi Points</div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-r from-[#2AD5ED]/20 to-[#26CC84]/20 backdrop-blur-sm border-[#2AD5ED]/30 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2AD5ED]/30 flex items-center justify-center">
                  <Leaf size={20} className="text-[#2AD5ED]" />
                </div>
                <div>
                  <div className="text-white text-lg">{userBalance.carbonCredits}</div>
                  <div className="text-white/70 text-sm">Carbon Credits</div>
                </div>
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
            All Rewards
          </Button>
          
          {rewardCategories.map((category) => {
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

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredRewards().map((reward) => {
            const Icon = reward.icon;
            const affordable = canAfford(reward);
            const availabilityPercentage = ((reward.available - reward.claimed) / reward.available) * 100;
            
            return (
              <Card 
                key={reward.id}
                className={`bg-white/10 backdrop-blur-sm border-white/20 p-6 transition-all duration-300 hover:scale-105 ${
                  affordable ? 'shadow-lg' : 'opacity-75'
                }`}
              >
                {/* Reward Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#22C31B]/30 to-[#26CC84]/30 flex items-center justify-center">
                    <Icon size={24} className="text-[#22C31B]" />
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      {renderStars(reward.popularity)}
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs text-white/70 border-white/20"
                    >
                      {reward.available - reward.claimed} left
                    </Badge>
                  </div>
                </div>

                {/* Reward Content */}
                <div className="mb-4">
                  <h3 className="text-white text-lg mb-2">{reward.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{reward.description}</p>
                  
                  {/* Partner */}
                  {reward.partner && (
                    <p className="text-white/60 text-xs mb-3">
                      By {reward.partner}
                    </p>
                  )}

                  {/* Availability Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-white/70 mb-1">
                      <span>Availability</span>
                      <span>{Math.round(availabilityPercentage)}%</span>
                    </div>
                    <Progress value={availabilityPercentage} className="h-1 bg-white/20" />
                  </div>
                </div>

                {/* Cost and Action */}
                <div className="space-y-3">
                  {/* Cost Display */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {reward.cost.nadiPoints && (
                        <div className="flex items-center gap-1">
                          <Coins size={16} className="text-[#22C31B]" />
                          <span className="text-white/80 text-sm">
                            {reward.cost.nadiPoints.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {reward.cost.carbonCredits && (
                        <div className="flex items-center gap-1">
                          <Leaf size={16} className="text-[#2AD5ED]" />
                          <span className="text-white/80 text-sm">
                            {reward.cost.carbonCredits}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Badge className="bg-[#26CC84]/20 text-[#26CC84] border-[#26CC84]/30">
                      Worth {reward.value}
                    </Badge>
                  </div>

                  {/* Redeem Button */}
                  <Button
                    onClick={() => handleRedeemReward(reward)}
                    disabled={!affordable}
                    className={`w-full h-12 rounded-xl transition-all flex items-center justify-center gap-2 ${
                      affordable
                        ? 'bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white'
                        : 'bg-white/10 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    {affordable ? (
                      <>
                        <span>Redeem Now</span>
                        <ArrowRight size={16} />
                      </>
                    ) : (
                      <span>Insufficient Balance</span>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {getFilteredRewards().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-white text-xl mb-2">No rewards in this category yet</h3>
            <p className="text-white/70">Check back soon for new eco-friendly rewards!</p>
          </div>
        )}

        {/* How to Earn Points */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-[#22C31B]/20 to-[#26CC84]/20 backdrop-blur-sm border-[#22C31B]/30 p-6">
            <h3 className="text-white text-lg mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-[#22C31B]" />
              How to Earn More Points & Credits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Coins size={16} className="text-[#22C31B]" />
                  <span className="text-white">Nadi Points:</span>
                </div>
                <ul className="space-y-1 ml-6">
                  <li>• Log activities in Calculator: 50 points</li>
                  <li>• Complete weekly challenges: 100 points</li>
                  <li>• Invite friends to join: 200 points</li>
                  <li>• Share eco-tips: 25 points</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf size={16} className="text-[#2AD5ED]" />
                  <span className="text-white">Carbon Credits:</span>
                </div>
                <ul className="space-y-1 ml-6">
                  <li>• Complete daily eco-quests: 1 credit</li>
                  <li>• Monthly sustainability goal: 3 credits</li>
                  <li>• Verified CO2 reduction: 2 credits</li>
                  <li>• Community challenges: 5 credits</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { useState, useMemo } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  ShoppingBag,
  Search,
  Filter,
  Star,
  Coins,
  Leaf,
  TrendingUp,
  Clock,
  Users,
  MapPin,
  ExternalLink,
  ShoppingCart,
  Heart,
  Award,
  Zap,
  Globe,
  Recycle,
  TreePine,
  Gift,
  Brain,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { useAIRecommendations } from "./hooks/useAIRecommendations";

interface MarketItem {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: 'eco-products' | 'services' | 'experiences' | 'certificates' | 'digital' | 'donations';
  price: {
    nadiPoints?: number;
    carbonCredits?: number;
    currency?: { amount: number; code: string; };
  };
  originalPrice?: {
    nadiPoints?: number;
    carbonCredits?: number;
    currency?: { amount: number; code: string; };
  };
  discount?: number;
  rating: number;
  reviewCount: number;
  seller: string;
  location?: string;
  shipping?: {
    free: boolean;
    cost?: number;
    estimatedDays: number;
  };
  inStock: boolean;
  stockCount?: number;
  tags: string[];
  images: string[];
  isFeatured: boolean;
  isNew: boolean;
  isEcoVerified: boolean;
  carbonSaved?: number;
}

interface MarketCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  count: number;
}

export function Market() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');

  // AI recommendations - memoized to prevent infinite re-renders
  const userProfile = useMemo(() => ({ 
    preferences: ['eco-products', 'energy_efficiency'] 
  }), []);
  
  const activityHistory = useMemo(() => [
    { type: 'energy', action: 'led_upgrade' },
    { type: 'transport', mode: 'bicycle' }
  ], []);

  const {
    marketRecommendations,
    loading,
    refreshMarketRecommendations
  } = useAIRecommendations({
    country: 'MY', // Could be passed as prop
    userProfile,
    activityHistory
  });

  // Mock market categories
  const marketCategories: MarketCategory[] = [
    {
      id: 'eco-products',
      name: 'Eco Products',
      icon: Leaf,
      color: '#22C31B',
      description: 'Sustainable and eco-friendly physical products',
      count: 24
    },
    {
      id: 'services',
      name: 'Services',
      icon: Zap,
      color: '#26CC84',
      description: 'Green services and consultations',
      count: 12
    },
    {
      id: 'experiences',
      name: 'Experiences',
      icon: Globe,
      color: '#2AD5ED',
      description: 'Eco-tourism and environmental experiences',
      count: 8
    },
    {
      id: 'certificates',
      name: 'Certificates',
      icon: Award,
      color: '#105D0D',
      description: 'Environmental certifications and courses',
      count: 15
    },
    {
      id: 'digital',
      name: 'Digital',
      icon: Gift,
      color: '#22C31B',
      description: 'Digital rewards and subscriptions',
      count: 18
    },
    {
      id: 'donations',
      name: 'Donations',
      icon: Heart,
      color: '#26CC84',
      description: 'Environmental charity donations',
      count: 6
    }
  ];

  // Mock market items
  const marketItems: MarketItem[] = [
    {
      id: 'prod_001',
      name: 'Bamboo Water Bottle',
      description: 'Premium bamboo fiber water bottle with insulation. Keeps drinks cold for 24 hours and hot for 12 hours. 100% plastic-free and biodegradable.',
      shortDescription: 'Premium bamboo fiber water bottle with insulation',
      category: 'eco-products',
      price: { nadiPoints: 800, carbonCredits: 2 },
      originalPrice: { nadiPoints: 1000, carbonCredits: 3 },
      discount: 20,
      rating: 4.8,
      reviewCount: 156,
      seller: 'EcoWare Malaysia',
      location: 'Kuala Lumpur',
      shipping: { free: true, estimatedDays: 3 },
      inStock: true,
      stockCount: 24,
      tags: ['Plastic-Free', 'Reusable', 'Insulated'],
      images: ['bamboo-bottle'],
      isFeatured: true,
      isNew: false,
      isEcoVerified: true,
      carbonSaved: 0.5
    },
    {
      id: 'exp_001',
      name: 'Mangrove Restoration Tour',
      description: 'Full-day guided tour of mangrove restoration sites. Includes hands-on planting activity, educational sessions, and sustainable lunch.',
      shortDescription: 'Full-day guided mangrove restoration experience',
      category: 'experiences',
      price: { nadiPoints: 1500, carbonCredits: 5 },
      rating: 4.9,
      reviewCount: 89,
      seller: 'Selangor Eco Tourism',
      location: 'Kuala Selangor',
      inStock: true,
      stockCount: 8,
      tags: ['Educational', 'Hands-On', 'Full Day'],
      images: ['mangrove-tour'],
      isFeatured: true,
      isNew: true,
      isEcoVerified: true,
      carbonSaved: 2.5
    },
    {
      id: 'cert_001',
      name: 'Carbon Footprint Analyst Certificate',
      description: 'Professional certification course in carbon footprint analysis. Includes 40 hours of online training, practical projects, and industry recognition.',
      shortDescription: 'Professional carbon footprint analyst certification',
      category: 'certificates',
      price: { nadiPoints: 2500, carbonCredits: 8 },
      rating: 4.7,
      reviewCount: 234,
      seller: 'Green Skills Institute',
      inStock: true,
      tags: ['Professional', 'Online', 'Certified'],
      images: ['certificate-course'],
      isFeatured: true,
      isNew: false,
      isEcoVerified: true
    },
    {
      id: 'dig_001',
      name: 'Premium Eco App Subscription',
      description: 'One-year subscription to premium environmental apps bundle. Includes carbon tracking, sustainable living tips, and eco-challenge participation.',
      shortDescription: 'One-year premium eco apps subscription bundle',
      category: 'digital',
      price: { nadiPoints: 600 },
      originalPrice: { nadiPoints: 800 },
      discount: 25,
      rating: 4.6,
      reviewCount: 445,
      seller: 'EcoTech Solutions',
      inStock: true,
      tags: ['Digital', 'Annual', 'Premium'],
      images: ['app-subscription'],
      isFeatured: false,
      isNew: true,
      isEcoVerified: false
    },
    {
      id: 'don_001',
      name: 'Rainforest Conservation Fund',
      description: 'Direct donation to rainforest conservation efforts in Malaysia. Your contribution helps protect endangered habitats and wildlife.',
      shortDescription: 'Support rainforest conservation in Malaysia',
      category: 'donations',
      price: { nadiPoints: 500, carbonCredits: 10 },
      rating: 5.0,
      reviewCount: 1203,
      seller: 'Malaysian Nature Society',
      inStock: true,
      tags: ['Conservation', 'Wildlife', 'Direct Impact'],
      images: ['rainforest-conservation'],
      isFeatured: true,
      isNew: false,
      isEcoVerified: true,
      carbonSaved: 5.0
    },
    {
      id: 'serv_001',
      name: 'Home Energy Audit',
      description: 'Professional home energy efficiency assessment. Includes detailed report with recommendations and 6-month follow-up consultation.',
      shortDescription: 'Professional home energy efficiency assessment',
      category: 'services',
      price: { nadiPoints: 1200, carbonCredits: 3 },
      rating: 4.8,
      reviewCount: 67,
      seller: 'Green Home Consultants',
      location: 'Klang Valley',
      inStock: true,
      stockCount: 5,
      tags: ['Professional', 'Consultation', 'Follow-up'],
      images: ['energy-audit'],
      isFeatured: false,
      isNew: false,
      isEcoVerified: true,
      carbonSaved: 1.2
    },
    {
      id: 'prod_002',
      name: 'Solar Power Bank',
      description: 'Portable solar power bank with 20,000mAh capacity. Features dual USB ports, LED flashlight, and weather-resistant design.',
      shortDescription: 'Portable solar power bank with 20,000mAh capacity',
      category: 'eco-products',
      price: { nadiPoints: 1100, carbonCredits: 4 },
      rating: 4.5,
      reviewCount: 203,
      seller: 'Solar Solutions Co',
      shipping: { free: false, cost: 15, estimatedDays: 5 },
      inStock: true,
      stockCount: 12,
      tags: ['Solar', 'Portable', 'Weather-Resistant'],
      images: ['solar-powerbank'],
      isFeatured: false,
      isNew: true,
      isEcoVerified: true,
      carbonSaved: 0.8
    },
    {
      id: 'exp_002',
      name: 'Urban Farming Workshop',
      description: 'Weekend workshop on vertical farming and hydroponics. Learn to grow your own organic vegetables in small spaces.',
      shortDescription: 'Weekend urban farming and hydroponics workshop',
      category: 'experiences',
      price: { nadiPoints: 400 },
      rating: 4.7,
      reviewCount: 134,
      seller: 'City Farms Academy',
      location: 'Petaling Jaya',
      inStock: true,
      stockCount: 15,
      tags: ['Weekend', 'Hands-On', 'Organic'],
      images: ['urban-farming'],
      isFeatured: false,
      isNew: false,
      isEcoVerified: true
    }
  ];

  const getFilteredItems = () => {
    let filtered = marketItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort items
    switch (sortBy) {
      case 'featured':
        return filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
      case 'price-low':
        return filtered.sort((a, b) => {
          const aPrice = a.price.nadiPoints || 0;
          const bPrice = b.price.nadiPoints || 0;
          return aPrice - bPrice;
        });
      case 'price-high':
        return filtered.sort((a, b) => {
          const aPrice = a.price.nadiPoints || 0;
          const bPrice = b.price.nadiPoints || 0;
          return bPrice - aPrice;
        });
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
      default:
        return filtered;
    }
  };

  const handleAddToCart = (item: MarketItem) => {
    console.log('Adding to cart:', item.id);
    toast.success(`Added "${item.name}" to cart!`);
  };

  const formatPrice = (item: MarketItem) => {
    const parts = [];
    if (item.price.nadiPoints) {
      parts.push(`${item.price.nadiPoints.toLocaleString()} points`);
    }
    if (item.price.carbonCredits) {
      parts.push(`${item.price.carbonCredits} credits`);
    }
    if (item.price.currency) {
      parts.push(`${item.price.currency.code} ${item.price.currency.amount}`);
    }
    return parts.join(' + ');
  };

  const featuredItems = marketItems.filter(item => item.isFeatured);

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
          <h1 className="text-white text-3xl mb-4">🛒 Eco Market</h1>
          <p className="text-white/80 mb-6">
            Discover sustainable products and services with your rewards
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <Input
                placeholder="Search products, services, or sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-md backdrop-blur-sm"
            >
              <option value="featured" className="bg-gray-800">Featured</option>
              <option value="price-low" className="bg-gray-800">Price: Low to High</option>
              <option value="price-high" className="bg-gray-800">Price: High to Low</option>
              <option value="rating" className="bg-gray-800">Highest Rated</option>
              <option value="newest" className="bg-gray-800">Newest</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={`h-10 px-4 rounded-full transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#22C31B] text-white border-[#22C31B]'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              All ({marketItems.length})
            </Button>
            
            {marketCategories.map((category) => {
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
                  {category.name} ({category.count})
                </Button>
              );
            })}
          </div>
        </div>

        {/* AI Recommendations */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl flex items-center gap-2">
                <Brain size={20} className="text-[#22C31B]" />
                AI Recommended for You
                <Sparkles size={16} className="text-yellow-400" />
              </h2>
              <Button
                onClick={refreshMarketRecommendations}
                disabled={loading.market}
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 p-2"
                title="Get new recommendations"
              >
                <RefreshCw size={16} className={`${loading.market ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            
            {loading.market ? (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  <span>AI is finding personalized product recommendations...</span>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketRecommendations?.recommendations?.slice(0, 3).map((rec: any, index: number) => (
                  <Card key={`ai-rec-${index}`} className="bg-white/10 backdrop-blur-sm border-white/20 p-4 border-[#22C31B]/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#22C31B]/20 flex items-center justify-center">
                          <Brain size={14} className="text-[#22C31B]" />
                        </div>
                        <Badge className="bg-[#22C31B]/20 text-[#22C31B] border-[#22C31B]/30 text-xs">
                          AI Match
                        </Badge>
                      </div>
                      <Sparkles size={14} className="text-yellow-400" />
                    </div>
                    
                    <h3 className="text-white mb-2">{rec.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{rec.benefit}</p>
                    <p className="text-white/60 text-xs mb-3">{rec.reason}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[#26CC84]">{rec.priceRange}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-[#2AD5ED]">{rec.category}</span>
                      </div>
                      
                      {rec.carbonReduction && (
                        <div className="flex items-center gap-1 text-[#2AD5ED] text-sm">
                          <TreePine size={12} />
                          <span>Impact: {rec.carbonReduction}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full h-10 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white text-sm"
                      onClick={() => toast.success(`Looking for "${rec.name}" in marketplace...`)}
                    >
                      Find in Marketplace
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Featured Items */}
        {featuredItems.length > 0 && selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-white text-xl mb-4 flex items-center gap-2">
              <Star size={20} className="text-yellow-400" />
              Featured Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredItems.slice(0, 4).map((item) => (
                <MarketItemCard 
                  key={item.id} 
                  item={item} 
                  onAddToCart={handleAddToCart}
                  featured
                />
              ))}
            </div>
          </div>
        )}

        {/* All Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredItems().map((item) => (
            <MarketItemCard 
              key={item.id} 
              item={item} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Empty State */}
        {getFilteredItems().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-white text-xl mb-2">No items found</h3>
            <p className="text-white/70">
              {searchQuery 
                ? "Try adjusting your search terms or filters"
                : "Check back soon for new eco-friendly products!"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Market Item Card Component
function MarketItemCard({ 
  item, 
  onAddToCart, 
  featured = false 
}: { 
  item: MarketItem; 
  onAddToCart: (item: MarketItem) => void;
  featured?: boolean;
}) {
  const formatPrice = (item: MarketItem) => {
    const parts = [];
    if (item.price.nadiPoints) {
      parts.push(`${item.price.nadiPoints.toLocaleString()} points`);
    }
    if (item.price.carbonCredits) {
      parts.push(`${item.price.carbonCredits} credits`);
    }
    if (item.price.currency) {
      parts.push(`${item.price.currency.code} ${item.price.currency.amount}`);
    }
    return parts.join(' + ');
  };

  const formatOriginalPrice = (item: MarketItem) => {
    if (!item.originalPrice) return '';
    const parts = [];
    if (item.originalPrice.nadiPoints) {
      parts.push(`${item.originalPrice.nadiPoints.toLocaleString()} points`);
    }
    if (item.originalPrice.carbonCredits) {
      parts.push(`${item.originalPrice.carbonCredits} credits`);
    }
    return parts.join(' + ');
  };

  return (
    <Card 
      className={`bg-white/10 backdrop-blur-sm border-white/20 p-6 transition-all duration-300 hover:scale-105 ${
        featured ? 'ring-2 ring-[#22C31B]/50' : ''
      }`}
    >
      {/* Item Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border-yellow-400/30">
              Featured
            </Badge>
          )}
          {item.isNew && (
            <Badge className="bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-blue-400 border-blue-400/30">
              New
            </Badge>
          )}
          {item.isEcoVerified && (
            <Badge className="bg-gradient-to-r from-[#22C31B]/20 to-[#26CC84]/20 text-[#22C31B] border-[#22C31B]/30">
              Eco Verified
            </Badge>
          )}
        </div>
        
        {item.discount && (
          <Badge className="bg-red-500/20 text-red-400 border-red-400/30">
            -{item.discount}%
          </Badge>
        )}
      </div>

      {/* Item Content */}
      <div className="mb-4">
        <h3 className="text-white text-lg mb-2">{item.name}</h3>
        <p className="text-white/70 text-sm mb-3 overflow-hidden text-ellipsis" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const
        }}>{item.shortDescription}</p>
        
        {/* Seller & Location */}
        <div className="space-y-1 mb-3">
          <p className="text-white/60 text-xs">By {item.seller}</p>
          {item.location && (
            <div className="flex items-center gap-1 text-white/60 text-xs">
              <MapPin size={12} />
              <span>{item.location}</span>
            </div>
          )}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-white/80 text-sm">{item.rating}</span>
          </div>
          <span className="text-white/60 text-sm">({item.reviewCount} reviews)</span>
        </div>

        {/* Environmental Impact */}
        {item.carbonSaved && (
          <div className="flex items-center gap-1 text-[#2AD5ED] text-sm mb-3">
            <TreePine size={14} />
            <span>Saves {item.carbonSaved} kg CO₂</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag}
              variant="outline" 
              className="text-xs text-white/70 border-white/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price & Stock */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-white">
            {formatPrice(item)}
          </div>
          {item.originalPrice && (
            <div className="text-white/50 text-sm line-through">
              {formatOriginalPrice(item)}
            </div>
          )}
        </div>
        
        {item.stockCount && (
          <p className="text-white/60 text-xs">
            {item.stockCount} left in stock
          </p>
        )}

        {item.shipping && (
          <p className="text-white/60 text-xs">
            {item.shipping.free ? 'Free shipping' : `Shipping: $${item.shipping.cost}`} 
            • {item.shipping.estimatedDays} days
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          View Details
        </Button>
        
        <Button
          onClick={() => onAddToCart(item)}
          disabled={!item.inStock}
          className={`flex-2 transition-all flex items-center justify-center gap-2 ${
            item.inStock
              ? 'bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={16} />
          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  );
}
import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Coins,
  Leaf,
  TreePine,
  Recycle,
  Heart,
  Zap,
  Globe,
  Camera,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  Star
} from "lucide-react";
import { toast } from "sonner";

interface Quest {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  organizer: string;
  category: 'csr-verified' | 'community' | 'challenge' | 'education' | 'cleanup';
  type: 'physical' | 'virtual' | 'hybrid';
  startDate: string;
  endDate?: string;
  location?: string;
  maxParticipants?: number;
  currentParticipants: number;
  rewards: {
    nadiPoints?: number;
    carbonCredits?: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  requirements?: string[];
  images: string[];
  tags: string[];
  isJoined: boolean;
  isCompleted: boolean;
  isFeatured: boolean;
}

interface QuestCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export function Quests() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock quest data - in real app, this would come from backend
  const questCategories: QuestCategory[] = [
    {
      id: 'csr-verified',
      name: 'CSR Verified',
      icon: Award,
      color: '#22C31B',
      description: 'Corporate sustainability initiatives with verified impact'
    },
    {
      id: 'community',
      name: 'Community',
      icon: Users,
      color: '#26CC84',
      description: 'Local environmental community activities'
    },
    {
      id: 'challenge',
      name: 'Challenges',
      icon: Star,
      color: '#2AD5ED',
      description: 'Personal sustainability challenges and goals'
    },
    {
      id: 'education',
      name: 'Education',
      icon: Globe,
      color: '#105D0D',
      description: 'Learn about environmental topics and solutions'
    },
    {
      id: 'cleanup',
      name: 'Cleanup',
      icon: Recycle,
      color: '#22C31B',
      description: 'Environmental cleanup and restoration activities'
    }
  ];

  const quests: Quest[] = [
    // CSR Verified Events
    {
      id: 'tmrnd_tree_planting',
      title: 'TMRND Forest Restoration Project',
      description: 'Join TMRND\'s flagship forest restoration initiative. Plant native trees in degraded forest areas and help restore biodiversity while earning verified carbon credits.',
      shortDescription: 'Plant native trees with TMRND to restore forests',
      organizer: 'TMRND Environmental Foundation',
      category: 'csr-verified',
      type: 'physical',
      startDate: '2024-02-15',
      endDate: '2024-02-15',
      location: 'Forest Reserve, Selangor',
      maxParticipants: 50,
      currentParticipants: 32,
      rewards: { carbonCredits: 5, nadiPoints: 300 },
      difficulty: 'medium',
      duration: '6 hours',
      requirements: ['Bring water bottle', 'Wear outdoor clothing', 'Age 16+'],
      images: ['tree-planting'],
      tags: ['CSR Verified', 'Carbon Credits', 'Forest Restoration'],
      isJoined: false,
      isCompleted: false,
      isFeatured: true
    },
    {
      id: 'petronas_renewable_workshop',
      title: 'PETRONAS Clean Energy Workshop',
      description: 'Learn about renewable energy technologies and Malaysia\'s transition to clean energy. Interactive workshop with industry experts and site visits.',
      shortDescription: 'Interactive clean energy workshop with PETRONAS experts',
      organizer: 'PETRONAS Sustainability Division',
      category: 'csr-verified',
      type: 'hybrid',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      location: 'PETRONAS Twin Towers + Virtual',
      maxParticipants: 100,
      currentParticipants: 67,
      rewards: { carbonCredits: 3, nadiPoints: 250 },
      difficulty: 'easy',
      duration: '3 days',
      requirements: ['Basic English', 'Laptop for virtual sessions'],
      images: ['renewable-energy'],
      tags: ['CSR Verified', 'Education', 'Clean Energy'],
      isJoined: true,
      isCompleted: false,
      isFeatured: true
    },
    {
      id: 'genting_waste_reduction',
      title: 'Genting Zero Waste Challenge',
      description: 'Join Genting\'s comprehensive waste reduction program. Learn waste segregation, composting, and circular economy principles while implementing zero waste practices.',
      shortDescription: 'Master zero waste practices with Genting Group',
      organizer: 'Genting Group Sustainability',
      category: 'csr-verified',
      type: 'physical',
      startDate: '2024-02-25',
      endDate: '2024-03-01',
      location: 'Genting Highlands Resort',
      maxParticipants: 30,
      currentParticipants: 18,
      rewards: { carbonCredits: 4, nadiPoints: 350 },
      difficulty: 'medium',
      duration: '5 days',
      requirements: ['Accommodation included', 'Commitment to complete program'],
      images: ['waste-management'],
      tags: ['CSR Verified', 'Zero Waste', 'Circular Economy'],
      isJoined: false,
      isCompleted: false,
      isFeatured: false
    },

    // Community Events
    {
      id: 'klang_river_cleanup',
      title: 'Klang River Community Cleanup',
      description: 'Weekly community-led river cleanup initiative. Remove plastic waste, plant riparian vegetation, and help restore the Klang River ecosystem.',
      shortDescription: 'Weekly river cleanup to restore Klang River ecosystem',
      organizer: 'Klang River Restoration Society',
      category: 'community',
      type: 'physical',
      startDate: '2024-02-17',
      location: 'Klang River, Kuala Lumpur',
      maxParticipants: 25,
      currentParticipants: 19,
      rewards: { nadiPoints: 150 },
      difficulty: 'easy',
      duration: '3 hours',
      requirements: ['Gloves provided', 'Bring water'],
      images: ['river-cleanup'],
      tags: ['Community', 'Water Conservation', 'Cleanup'],
      isJoined: false,
      isCompleted: false,
      isFeatured: false
    },
    {
      id: 'urban_farming_workshop',
      title: 'Urban Farming Skills Workshop',
      description: 'Learn sustainable urban farming techniques. Hands-on workshop covering hydroponics, composting, and growing organic vegetables in small spaces.',
      shortDescription: 'Learn to grow organic food in urban environments',
      organizer: 'Green Cities Malaysia',
      category: 'community',
      type: 'physical',
      startDate: '2024-02-18',
      location: 'Community Garden, Petaling Jaya',
      maxParticipants: 20,
      currentParticipants: 14,
      rewards: { nadiPoints: 200 },
      difficulty: 'easy',
      duration: '4 hours',
      requirements: ['Basic gardening interest', 'Notebook for notes'],
      images: ['urban-farming'],
      tags: ['Community', 'Food Security', 'Education'],
      isJoined: true,
      isCompleted: false,
      isFeatured: false
    },

    // Personal Challenges
    {
      id: 'plastic_free_february',
      title: 'Plastic-Free February Challenge',
      description: '28-day challenge to eliminate single-use plastics from your daily life. Daily tips, progress tracking, and community support included.',
      shortDescription: '28-day challenge to eliminate single-use plastics',
      organizer: 'Nadi Community',
      category: 'challenge',
      type: 'virtual',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      maxParticipants: 1000,
      currentParticipants: 423,
      rewards: { nadiPoints: 400, carbonCredits: 2 },
      difficulty: 'medium',
      duration: '28 days',
      requirements: ['Daily check-ins', 'Photo submissions'],
      images: ['plastic-free'],
      tags: ['Challenge', 'Plastic Reduction', 'Lifestyle'],
      isJoined: true,
      isCompleted: false,
      isFeatured: true
    },
    {
      id: 'energy_saving_challenge',
      title: '30% Energy Reduction Challenge',
      description: 'Reduce your home energy consumption by 30% in one month. Get personalized tips, track progress, and compete with other participants.',
      shortDescription: 'Reduce home energy consumption by 30% in one month',
      organizer: 'Energy Efficiency Alliance',
      category: 'challenge',
      type: 'virtual',
      startDate: '2024-02-10',
      endDate: '2024-03-10',
      maxParticipants: 500,
      currentParticipants: 287,
      rewards: { nadiPoints: 350, carbonCredits: 3 },
      difficulty: 'hard',
      duration: '30 days',
      requirements: ['Smart meter or energy tracking', 'Weekly progress reports'],
      images: ['energy-saving'],
      tags: ['Challenge', 'Energy Efficiency', 'Home Improvement'],
      isJoined: false,
      isCompleted: false,
      isFeatured: false
    },

    // Educational Events
    {
      id: 'climate_science_webinar',
      title: 'Climate Science Masterclass',
      description: 'Comprehensive webinar series on climate science, impacts, and solutions. Expert speakers from leading research institutions.',
      shortDescription: 'Learn climate science from leading experts',
      organizer: 'Climate Research Institute',
      category: 'education',
      type: 'virtual',
      startDate: '2024-02-19',
      endDate: '2024-02-21',
      maxParticipants: 200,
      currentParticipants: 156,
      rewards: { nadiPoints: 100 },
      difficulty: 'easy',
      duration: '3 sessions x 2 hours',
      requirements: ['Internet connection', 'Note-taking materials'],
      images: ['climate-education'],
      tags: ['Education', 'Climate Science', 'Webinar'],
      isJoined: false,
      isCompleted: false,
      isFeatured: false
    }
  ];

  const getFilteredQuests = () => {
    let filtered = quests;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(quest => quest.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(quest => 
        quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleJoinQuest = (quest: Quest) => {
    if (quest.isJoined) {
      toast.info("You're already registered for this quest!");
      return;
    }

    if (quest.maxParticipants && quest.currentParticipants >= quest.maxParticipants) {
      toast.error("This quest is fully booked!");
      return;
    }

    console.log('Joining quest:', quest.id);
    toast.success(`🎉 Successfully joined "${quest.title}"!`);
    
    // In real app, would update backend and quest status
  };

  const handleViewDetails = (quest: Quest) => {
    console.log('Viewing quest details:', quest.id);
    // In real app, would navigate to quest details page
    toast.info("Quest details page - Coming soon!");
  };

  const getDifficultyColor = (difficulty: Quest['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const featuredQuests = quests.filter(q => q.isFeatured);
  const regularQuests = getFilteredQuests().filter(q => !q.isFeatured);

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
          <h1 className="text-white text-3xl mb-4">🌍 Eco Quests</h1>
          <p className="text-white/80 mb-6">
            Join meaningful environmental activities and earn rewards for positive impact
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <Input
                placeholder="Search quests, organizers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
            </div>
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
              All Quests
            </Button>
            
            {questCategories.map((category) => {
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
        </div>

        {/* Featured Quests */}
        {featuredQuests.length > 0 && selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-white text-xl mb-4 flex items-center gap-2">
              <Star size={20} className="text-yellow-400" />
              Featured Quests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredQuests.map((quest) => (
                <QuestCard 
                  key={quest.id} 
                  quest={quest} 
                  onJoin={handleJoinQuest}
                  onViewDetails={handleViewDetails}
                  featured
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Quests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === 'all' ? regularQuests : getFilteredQuests()).map((quest) => (
            <QuestCard 
              key={quest.id} 
              quest={quest} 
              onJoin={handleJoinQuest}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Empty State */}
        {getFilteredQuests().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-white text-xl mb-2">No quests found</h3>
            <p className="text-white/70">
              {searchQuery 
                ? "Try adjusting your search terms or filters"
                : "Check back soon for new environmental activities!"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Quest Card Component
function QuestCard({ 
  quest, 
  onJoin, 
  onViewDetails, 
  featured = false 
}: { 
  quest: Quest; 
  onJoin: (quest: Quest) => void;
  onViewDetails: (quest: Quest) => void;
  featured?: boolean;
}) {
  const getCategoryIcon = (category: Quest['category']) => {
    switch (category) {
      case 'csr-verified': return Award;
      case 'community': return Users;
      case 'challenge': return Star;
      case 'education': return Globe;
      case 'cleanup': return Recycle;
      default: return Globe;
    }
  };

  const getDifficultyColor = (difficulty: Quest['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const Icon = getCategoryIcon(quest.category);
  const isAvailable = !quest.maxParticipants || quest.currentParticipants < quest.maxParticipants;
  const availabilityPercentage = quest.maxParticipants 
    ? (quest.currentParticipants / quest.maxParticipants) * 100 
    : 0;

  return (
    <Card 
      className={`bg-white/10 backdrop-blur-sm border-white/20 p-6 transition-all duration-300 hover:scale-105 ${
        featured ? 'ring-2 ring-[#22C31B]/50' : ''
      }`}
    >
      {/* Quest Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#22C31B]/30 to-[#26CC84]/30 flex items-center justify-center">
            <Icon size={20} className="text-[#22C31B]" />
          </div>
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border-yellow-400/30">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <Badge className={`capitalize ${getDifficultyColor(quest.difficulty)} border-0`}>
            {quest.difficulty}
          </Badge>
          {quest.isJoined && (
            <Badge className="bg-[#22C31B]/20 text-[#22C31B] border-[#22C31B]/30">
              Joined
            </Badge>
          )}
        </div>
      </div>

      {/* Quest Content */}
      <div className="mb-4">
        <h3 className="text-white text-lg mb-2">{quest.title}</h3>
        <p className="text-white/70 text-sm mb-3 overflow-hidden text-ellipsis" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const
        }}>{quest.shortDescription}</p>
        
        {/* Organizer */}
        <p className="text-white/60 text-xs mb-3">By {quest.organizer}</p>

        {/* Quest Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Calendar size={14} />
            <span>{formatDate(quest.startDate)}</span>
            {quest.endDate && quest.endDate !== quest.startDate && (
              <span>- {formatDate(quest.endDate)}</span>
            )}
          </div>
          
          {quest.location && (
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin size={14} />
              <span className="truncate">{quest.location}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Clock size={14} />
            <span>{quest.duration}</span>
          </div>

          {quest.maxParticipants && (
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Users size={14} />
              <span>
                {quest.currentParticipants}/{quest.maxParticipants} joined 
                ({Math.round(availabilityPercentage)}% full)
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {quest.tags.slice(0, 3).map((tag) => (
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

      {/* Rewards */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {quest.rewards.nadiPoints && (
            <div className="flex items-center gap-1">
              <Coins size={16} className="text-[#22C31B]" />
              <span className="text-white/80 text-sm">
                {quest.rewards.nadiPoints.toLocaleString()}
              </span>
            </div>
          )}
          {quest.rewards.carbonCredits && (
            <div className="flex items-center gap-1">
              <Leaf size={16} className="text-[#2AD5ED]" />
              <span className="text-white/80 text-sm">
                {quest.rewards.carbonCredits}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => onViewDetails(quest)}
          variant="outline"
          className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          Details
        </Button>
        
        <Button
          onClick={() => onJoin(quest)}
          disabled={!isAvailable || quest.isJoined}
          className={`flex-1 transition-all flex items-center justify-center gap-2 ${
            isAvailable && !quest.isJoined
              ? 'bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          {quest.isJoined ? (
            <>
              <CheckCircle size={16} />
              <span>Joined</span>
            </>
          ) : !isAvailable ? (
            <span>Full</span>
          ) : (
            <>
              <span>Join Quest</span>
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
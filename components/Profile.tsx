import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import newBackground from "figma:asset/8c23a32b95e52ef8dab9316cb6f3f297ae344a12.png";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Globe, 
  Zap, 
  Car, 
  Bell,
  Shield,
  Languages,
  Trash2,
  Save
} from "lucide-react";
import { getCountryConfig } from "./CountryConfig";
import { toast } from "sonner@2.0.3";

interface ProfileProps {
  onBack: () => void;
  userEmail?: string;
  country?: string;
}

interface UserProfile {
  name: string;
  email: string;
  country: string;
  city: string;
  language: string;
  electricityUsage: string;
  commute: {
    car: string;
    motorcycle: string;
    bus: string;
    train: string;
    walkBike: string;
  };
  notifications: {
    tips: boolean;
    achievements: boolean;
    marketing: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
    location: boolean;
  };
}

export default function Profile({ onBack, userEmail, country }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'footprint' | 'privacy'>('account');
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: "Eco Warrior",
    email: userEmail || "user@example.com",
    country: country || "MY",
    city: "Kuala Lumpur",
    language: "en",
    electricityUsage: "300-500",
    commute: {
      car: "2",
      motorcycle: "0",
      bus: "3",
      train: "1",
      walkBike: "5"
    },
    notifications: {
      tips: true,
      achievements: true,
      marketing: false
    },
    privacy: {
      dataSharing: true,
      analytics: true,
      location: false
    }
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const countries = [
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ms', name: 'Bahasa Malaysia' },
    { code: 'zh', name: '中文' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'th', name: 'ไทย' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'tl', name: 'Filipino' }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
      setShowPasswordChange(false);
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'account' as const, label: 'Account', icon: User },
    { id: 'footprint' as const, label: 'Carbon Settings', icon: Globe },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden safe-area">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={newBackground}
          alt="Beautiful Earth space view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="relative z-10 p-4 pb-24 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 pt-4 sm:pt-8 pb-6">
          <button
            onClick={onBack}
            className="h-12 w-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-105 touch-manipulation"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-white text-xl sm:text-2xl">Profile Settings</h1>
            <p className="text-white/80 text-sm sm:text-base">Manage your account and preferences</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === id
                  ? 'bg-[#22C31B] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <User size={20} />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Full Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Email Address</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Language</Label>
                  <Select value={profile.language} onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Lock size={20} />
                Security
              </h3>
              
              {!showPasswordChange ? (
                <Button
                  onClick={() => setShowPasswordChange(true)}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Change Password
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white mb-2 block">Current Password</Label>
                    <Input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">New Password</Label>
                    <Input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">Confirm New Password</Label>
                    <Input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handlePasswordChange}
                      disabled={isLoading}
                      className="bg-[#22C31B] hover:bg-[#26CC84] text-white"
                    >
                      Update Password
                    </Button>
                    <Button
                      onClick={() => setShowPasswordChange(false)}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Bell size={20} />
                Notifications
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Eco Tips</Label>
                    <p className="text-white/60 text-sm">Receive daily carbon reduction tips</p>
                  </div>
                  <Switch
                    checked={profile.notifications.tips}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, tips: checked } 
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Achievements</Label>
                    <p className="text-white/60 text-sm">Get notified about milestones</p>
                  </div>
                  <Switch
                    checked={profile.notifications.achievements}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, achievements: checked } 
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Marketing Updates</Label>
                    <p className="text-white/60 text-sm">Promotions and product news</p>
                  </div>
                  <Switch
                    checked={profile.notifications.marketing}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, marketing: checked } 
                      }))
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Carbon Settings */}
        {activeTab === 'footprint' && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Globe size={20} />
                Location Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Country</Label>
                  <Select value={profile.country} onValueChange={(value) => setProfile(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">City</Label>
                  <Input
                    value={profile.city}
                    onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Zap size={20} />
                Energy Usage
              </h3>
              
              <div>
                <Label className="text-white mb-2 block">Monthly Electricity Usage (kWh)</Label>
                <Select 
                  value={profile.electricityUsage} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, electricityUsage: value }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100">0-100 kWh</SelectItem>
                    <SelectItem value="100-300">100-300 kWh</SelectItem>
                    <SelectItem value="300-500">300-500 kWh</SelectItem>
                    <SelectItem value="500-1000">500-1000 kWh</SelectItem>
                    <SelectItem value="1000+">1000+ kWh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Car size={20} />
                Transportation
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Car (days per week)</Label>
                  <Select 
                    value={profile.commute.car} 
                    onValueChange={(value) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, car: value } 
                    }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0,1,2,3,4,5,6,7].map(days => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} {days === 1 ? 'day' : 'days'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Public Transport (days per week)</Label>
                  <Select 
                    value={profile.commute.bus} 
                    onValueChange={(value) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, bus: value } 
                    }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0,1,2,3,4,5,6,7].map(days => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} {days === 1 ? 'day' : 'days'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Walking/Cycling (days per week)</Label>
                  <Select 
                    value={profile.commute.walkBike} 
                    onValueChange={(value) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, walkBike: value } 
                    }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0,1,2,3,4,5,6,7].map(days => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} {days === 1 ? 'day' : 'days'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Shield size={20} />
                Data & Privacy
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Data Sharing</Label>
                    <p className="text-white/60 text-sm">Share anonymized data to improve our services</p>
                  </div>
                  <Switch
                    checked={profile.privacy.dataSharing}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ 
                        ...prev, 
                        privacy: { ...prev.privacy, dataSharing: checked } 
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Analytics</Label>
                    <p className="text-white/60 text-sm">Help us understand how you use the app</p>
                  </div>
                  <Switch
                    checked={profile.privacy.analytics}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ 
                        ...prev, 
                        privacy: { ...prev.privacy, analytics: checked } 
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Location Services</Label>
                    <p className="text-white/60 text-sm">Use location for better recommendations</p>
                  </div>
                  <Switch
                    checked={profile.privacy.location}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ 
                        ...prev, 
                        privacy: { ...prev.privacy, location: checked } 
                      }))
                    }
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Trash2 size={20} />
                Account Management
              </h3>
              
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Export My Data
                </Button>
                
                <Button
                  variant="destructive"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full h-14 bg-[#22C31B] hover:bg-[#26CC84] text-white transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save size={20} />
                Save Changes
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
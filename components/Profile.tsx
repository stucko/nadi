import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
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
import { toast } from "sonner";

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
}

export default function Profile({ onBack, userEmail, country }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'footprint' | 'privacy'>('account');
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: userEmail || "john.doe@example.com",
    country: country || "MY",
    city: "Kuala Lumpur",
    language: "en",
    electricityUsage: "300",
    commute: {
      car: "20",
      motorcycle: "0",
      bus: "10", 
      train: "15",
      walkBike: "30"
    },
    notifications: {
      tips: true,
      achievements: true,
      marketing: false
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const config = getCountryConfig(profile.country);

  const countries = [
    { code: 'MY', name: 'Malaysia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'EU', name: 'European Union' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'TH', name: 'Thailand' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'PH', name: 'Philippines' }
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
    <div 
      className="min-h-screen p-4 pb-24 relative overflow-hidden safe-area"
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
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">New Password</Label>
                    <Input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Confirm New Password</Label>
                    <Input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowPasswordChange(false)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePasswordChange}
                      disabled={isLoading}
                      className="flex-1 bg-[#22C31B] hover:bg-[#105D0D] text-white"
                    >
                      {isLoading ? "Changing..." : "Change Password"}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Carbon Footprint Settings */}
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
                          {country.name}
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
                    placeholder="Enter your city"
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
                <Label className="text-white mb-2 block">
                  Monthly Electricity Usage ({config.currency}/month)
                </Label>
                <Input
                  type="number"
                  value={profile.electricityUsage}
                  onChange={(e) => setProfile(prev => ({ ...prev, electricityUsage: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="e.g. 300"
                />
                <p className="text-white/60 text-sm mt-1">
                  This helps us calculate your energy footprint more accurately
                </p>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Car size={20} />
                Transportation
              </h3>
              
              <div className="space-y-4">
                <p className="text-white/80 text-sm mb-4">
                  How many kilometers do you travel per week using each mode?
                </p>

                <div>
                  <Label className="text-white mb-2 block">Car (km/week)</Label>
                  <Input
                    type="number"
                    value={profile.commute.car}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, car: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Motorcycle (km/week)</Label>
                  <Input
                    type="number"
                    value={profile.commute.motorcycle}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, motorcycle: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">{config.transportModes.bus} (km/week)</Label>
                  <Input
                    type="number"
                    value={profile.commute.bus}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, bus: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">{config.transportModes.rail} (km/week)</Label>
                  <Input
                    type="number"
                    value={profile.commute.train}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, train: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Walking/Cycling (km/week)</Label>
                  <Input
                    type="number"
                    value={profile.commute.walkBike}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      commute: { ...prev.commute, walkBike: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
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
                <Bell size={20} />
                Notifications
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Eco Tips</Label>
                    <p className="text-white/60 text-sm">Daily environmental tips and recommendations</p>
                  </div>
                  <Switch
                    checked={profile.notifications.tips}
                    onCheckedChange={(checked) => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, tips: checked }
                    }))}
                  />
                </div>

                <Separator className="bg-white/20" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Achievement Updates</Label>
                    <p className="text-white/60 text-sm">Notifications when you earn badges or reach milestones</p>
                  </div>
                  <Switch
                    checked={profile.notifications.achievements}
                    onCheckedChange={(checked) => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, achievements: checked }
                    }))}
                  />
                </div>

                <Separator className="bg-white/20" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Marketing Communications</Label>
                    <p className="text-white/60 text-sm">Updates about new features and eco-friendly products</p>
                  </div>
                  <Switch
                    checked={profile.notifications.marketing}
                    onCheckedChange={(checked) => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, marketing: checked }
                    }))}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                <Trash2 size={20} />
                Data Management
              </h3>
              
              <div className="space-y-4">
                <Button
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  onClick={() => toast.info("Data export will be available soon")}
                >
                  Export My Data
                </Button>
                
                <Button
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
                  onClick={() => toast.error("Account deletion requires email confirmation")}
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
            className="w-full h-14 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Estimates Note */}
        <div className="mt-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm text-center">
            All carbon footprint calculations are estimates based on your settings and activities.
          </p>
        </div>
      </div>
    </div>
  );
}
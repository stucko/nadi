import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner@2.0.3";
import Logo from "./Logo";

interface SignUpScreenProps {
  onBack: () => void;
  onSignUp: (data: { email: string; password: string; name: string }) => void;
  onSignIn: () => void;
}

export default function SignUpScreen({ onBack, onSignUp, onSignIn }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Account created successfully!");
      onSignUp({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1616712134411-6b6ae89bc3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHNwYWNlJTIwc3RhcnMlMjB1bml2ZXJzZXxlbnwxfHx8fDE3NTg5NjQ2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 p-2 text-white hover:bg-white/10 transition-colors touch-manipulation"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </Button>

        {/* Sign Up Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <h1 className="text-white text-3xl mb-2">Join Nadi</h1>
            <p className="text-white/80 text-lg">
              Start your eco journey today
            </p>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label className="text-white text-base">Full Name</Label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#22C31B] focus:ring-[#22C31B] h-14 text-lg"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label className="text-white text-base">Email Address</Label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#22C31B] focus:ring-[#22C31B] h-14 text-lg"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label className="text-white text-base">Password</Label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#22C31B] focus:ring-[#22C31B] h-14 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors touch-manipulation"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label className="text-white text-base">Confirm Password</Label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#22C31B] focus:ring-[#22C31B] h-14 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors touch-manipulation"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-14 bg-[#22C31B] hover:bg-[#26CC84] text-white text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-70 touch-manipulation"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/60">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <Button
              onClick={onSignIn}
              variant="outline"
              className="w-full h-14 bg-white/10 text-white border-white/20 hover:bg-white/20 text-lg transition-all duration-200 touch-manipulation"
            >
              Sign In Instead
            </Button>
          </div>

          {/* Terms */}
          <p className="text-white/60 text-sm text-center mt-6">
            By creating an account, you agree to our{" "}
            <span className="text-[#22C31B] underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-[#22C31B] underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
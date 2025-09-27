import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SignUpScreenProps {
  onBack: () => void;
  onSignUp: (data: { email: string; password: string; name: string }) => void;
  onSignIn: () => void;
}

export default function SignUpScreenSimple({
  onBack,
  onSignUp,
  onSignIn,
}: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    onSignUp({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-blue-500 flex items-center justify-center p-4">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:w-full lg:max-w-6xl lg:gap-12 lg:items-center">
        {/* Left side - Branding */}
        <div className="lg:flex-1">
          <h1 className="text-6xl xl:text-7xl font-bold text-white mb-6">
            Join the Movement
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Start your journey to reduce your carbon footprint and make a positive impact on our planet.
          </p>
          <div className="space-y-4 text-white/60">
            <div className="flex items-center gap-4">
              <div className="text-2xl">📊</div>
              <div>
                <p className="font-semibold">Track Your Impact</p>
                <p className="text-sm">Monitor your daily carbon emissions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl">🎯</div>
              <div>
                <p className="font-semibold">Set Goals</p>
                <p className="text-sm">Create achievable reduction targets</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl">🌱</div>
              <div>
                <p className="font-semibold">Make a Difference</p>
                <p className="text-sm">Join thousands making positive change</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:flex-1 lg:max-w-md">
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 w-full">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="mb-6 text-white hover:text-green-300 transition-colors flex items-center gap-2"
            >
              ← Back to Home
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/80 mb-8">
              Start tracking your carbon footprint today
            </p>

            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Full Name"
                className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email Address"
                className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Password"
                className="w-full p-4 pr-12 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm Password"
                className="w-full p-4 pr-12 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-white text-green-800 font-semibold py-4 rounded-lg hover:bg-gray-100 transition-colors mb-6"
            >
              Create Account
            </button>

            {/* Sign In Link */}
            <p className="text-center text-white/80">
              Already have an account?{" "}
              <button
                onClick={onSignIn}
                className="text-green-300 hover:text-green-200 underline transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-black/20 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 text-white hover:text-green-300 transition-colors"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-white/80 mb-8">
          Start your carbon tracking journey
        </p>

        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Full Name"
            className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Email Address"
            className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Password"
            className="w-full p-4 pr-12 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6 relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-4 pr-12 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-white text-green-800 font-semibold py-4 rounded-lg hover:bg-gray-100 transition-colors mb-6"
        >
          Create Account
        </button>

        {/* Sign In Link */}
        <p className="text-center text-white/80">
          Already have an account?{" "}
          <button
            onClick={onSignIn}
            className="text-green-300 hover:text-green-200 underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

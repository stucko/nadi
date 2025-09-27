import { useState } from "react";

interface SignInScreenProps {
  onBack: () => void;
  onLogin: (data: LoginData) => void;
  onSignUp: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

export default function SignInScreenSimple({
  onBack,
  onLogin,
  onSignUp,
}: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const loginData: LoginData = {
      email,
      password,
    };

    onLogin(loginData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-blue-500 flex items-center justify-center p-4">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:w-full lg:max-w-6xl lg:gap-12 lg:items-center">
        {/* Left side - Branding */}
        <div className="lg:flex-1">
          <h1 className="text-6xl xl:text-7xl font-bold text-white mb-6">
            Welcome Back
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Continue your journey to reduce your carbon footprint and help save our planet.
          </p>
          <div className="flex items-center gap-4 text-white/60">
            <div className="text-4xl">🌍</div>
            <div>
              <p className="font-semibold">Track • Reduce • Impact</p>
              <p className="text-sm">Join thousands making a difference</p>
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
            <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-white/80 mb-8">
              Access your carbon tracking dashboard
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-white text-green-800 font-semibold py-4 rounded-lg hover:bg-gray-100 transition-colors mb-6"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="px-4 text-white/60">or</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* Social Login Placeholders */}
            <div className="flex gap-4 justify-center mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-white text-sm">G</span>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-white text-sm">A</span>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-white text-sm">F</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-white/80">
              Don't have an account?{" "}
              <button
                onClick={onSignUp}
                className="text-green-300 hover:text-green-200 underline transition-colors"
              >
                Sign Up
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
        <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
        <p className="text-white/80 mb-8">
          Want to help save the world?<br />
          Start with your carbon footprint
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-4 rounded-lg bg-transparent border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-white text-green-800 font-semibold py-4 rounded-lg hover:bg-gray-100 transition-colors mb-6"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-4 text-white/60">or</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Social Login Placeholders */}
        <div className="flex gap-4 justify-center mb-6">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
            <span className="text-white text-sm">G</span>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
            <span className="text-white text-sm">A</span>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
            <span className="text-white text-sm">F</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-white/80">
          Don't have an account?{" "}
          <button
            onClick={onSignUp}
            className="text-green-300 hover:text-green-200 underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

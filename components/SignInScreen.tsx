import { useState } from "react";
import svgPaths from "../imports/svg-fcrqcz63lb.ts";
import Logo from "./Logo";
import { ArrowLeft } from "lucide-react";
import dashboardBg from "../assets/dashboard_bg.png";

interface SignInScreenProps {
  onBack: () => void;
  onLogin: (data: LoginData) => void;
  onSignUp: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

export default function SignInScreen({
  onBack,
  onLogin,
  onSignUp,
}: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const loginData: LoginData = {
        email,
        password,
      };
      onLogin(loginData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login attempted`);
    onLogin({
      email: `user@${provider.toLowerCase()}.com`,
      password: "social_login",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={dashboardBg}
          alt="Sign In Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Logo and Back Button (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-8 xl:p-12">
          {/* Logo and Back */}
          <div className="flex items-center justify-between">
            <Logo size="xl" />
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          {/* Welcome Text */}
          <div className="text-white mb-16">
            <h1 className="text-4xl xl:text-5xl mb-4">Welcome back!</h1>
            <p className="text-xl xl:text-2xl text-white/80 leading-relaxed">
              Continue your eco journey and help save our planet, one step at a time.
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-8 xl:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8">
              <div className="flex items-center justify-between mb-6">
                <Logo size="lg" />
                <button
                  onClick={onBack}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-white mb-2">Sign In</h1>
                <p className="text-white/80">Welcome back to your eco journey</p>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl xl:text-4xl text-white mb-2">Sign In</h2>
              <p className="text-white/80 text-lg">Access your Nadi account</p>
            </div>

            {/* Sign In Form */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 lg:p-8">
              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-12 px-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-[#22C31B] focus:ring-2 focus:ring-[#22C31B]/20 transition-all"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-white mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-[#22C31B] focus:ring-2 focus:ring-[#22C31B]/20 transition-all"
                  />
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#1a9c15] hover:to-[#22C31B] text-white rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center font-medium"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-white/60 text-sm">or continue with</span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>

                {/* Social Login */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleSocialLogin("google")}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 35 32" fill="none">
                      <path d={svgPaths.pfab6480} fill="white" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleSocialLogin("facebook")}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 28 31" fill="none">
                      <path d={svgPaths.p2841a780} fill="white" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleSocialLogin("apple")}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 34 31" fill="none">
                      <path d={svgPaths.p21fe8600} fill="white" />
                    </svg>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-6">
                  <p className="text-white/80 text-sm">
                    Don't have an account?{" "}
                    <button
                      onClick={onSignUp}
                      className="text-[#22C31B] hover:text-[#26CC84] transition-colors underline decoration-[#22C31B] underline-offset-2"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
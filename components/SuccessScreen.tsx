import { Button } from "./ui/button";
import { CheckCircle, Leaf } from "lucide-react";

interface SuccessScreenProps {
  onContinueToDashboard: () => void;
}

export function SuccessScreen({ onContinueToDashboard }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle star pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-48 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-8 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 left-12 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        {/* Success Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#22C31B] to-[#26CC84] rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-white/30">
            <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#26CC84] to-[#2AD5ED] rounded-full flex items-center justify-center shadow-xl border-2 border-white/40">
            <Leaf className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-medium text-white drop-shadow-lg">You're all set!</h1>
          <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-xl text-white font-medium drop-shadow-sm">Welcome to your eco journey with Nadi.</p>
            <p className="text-white/90 drop-shadow-sm">Let's start tracking and reducing your carbon footprint together.</p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 space-y-4">
          <h3 className="font-medium text-white text-lg">What's next?</h3>
          <div className="space-y-3 text-left">
            {[
              "📊 View your carbon footprint dashboard",
              "💡 Get personalized eco tips",
              "🎯 Set and track your green goals",
              "📈 Monitor your progress over time"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#22C31B] rounded-full flex-shrink-0 shadow-sm"></div>
                <p className="text-white/90">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={onContinueToDashboard}
          className="w-full h-16 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white rounded-xl shadow-2xl border-2 border-white/20 text-lg font-medium transition-all duration-300 hover:scale-105"
        >
          Go to Dashboard
        </Button>

        {/* Footer */}
        <p className="text-sm text-white/80 drop-shadow-sm">
          Every small step counts towards a greener Malaysia 🌱
        </p>
      </div>
    </div>
  );
}
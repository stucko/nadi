import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";

interface EmailCaptureProps {
  onContinue: (email?: string) => void;
  onBack: () => void;
}

export function EmailCapture({ onContinue, onBack }: EmailCaptureProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(email || undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-green-900 flex flex-col p-6 relative overflow-hidden">
      {/* Subtle stars */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-16 left-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-24 right-12 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-40 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>
      {/* Header */}
      <div className="relative z-10 flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-md mx-auto w-full space-y-8">
        <div className="text-center space-y-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h1 className="text-3xl font-medium text-white drop-shadow-lg">Stay updated</h1>
          <p className="text-white/90 text-lg drop-shadow-sm">Get tips to reduce your carbon footprint.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 focus:border-[#22C31B] text-base text-white placeholder:text-white/60"
            />
            <p className="text-sm text-white/80 drop-shadow-sm">We won't send spam.</p>
          </div>

          <Button 
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white rounded-xl shadow-2xl border-2 border-white/20 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Continue
          </Button>

          <button
            type="button"
            onClick={() => onContinue()}
            className="w-full text-white/80 hover:text-white underline-offset-4 hover:underline transition-colors text-lg drop-shadow-sm"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
}
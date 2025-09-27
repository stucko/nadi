import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-9vffe6lhs7";
import imgDeetouchMediaXuouKyhxFdMUnsplash1 from "figma:asset/233823d9be8d19d8fefa708f4be8b3e136121309.png";
import Logo from "./Logo";
import { ChevronRight } from "lucide-react";

interface MainScreenProps {
  onGetStarted: () => void;
}

function RotatingText() {
  const words = ["Explore", "Track", "Reduce", "Compete"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % words.length,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className="bg-gradient-to-r from-[#22C31B] via-[#26CC84] to-[#2AD5ED] bg-clip-text text-transparent transition-all duration-500 ease-in-out font-bold"
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      key={`rotating-${currentWordIndex}`}
    >
      {words[currentWordIndex]}
    </span>
  );
}

export default function MainScreen({
  onGetStarted,
}: MainScreenProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#232323]">
      {/* Background Image - Responsive */}
      <div className="absolute inset-0">
        <img
          alt="Mountain landscape with winding road"
          className="w-full h-full object-cover"
          src={imgDeetouchMediaXuouKyhxFdMUnsplash1}
          loading="eager"
          decoding="async"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content Container - Responsive Layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Logo size="xl" className="drop-shadow-lg" />
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto text-center">
            
            {/* Main Heading */}
            <div className="space-y-2 mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
                <RotatingText />
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
                Track Your
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
                Carbon Footprint
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 drop-shadow-lg max-w-2xl mx-auto mb-12">
              Join millions making a difference with Nadi, your personal eco coach
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={onGetStarted}
                className="group w-full sm:w-auto bg-[#22C31B] hover:bg-[#26CC84] text-white px-8 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-3 min-w-[200px] max-w-[300px] touch-manipulation"
              >
                <span className="text-lg font-semibold">Get Started</span>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-16 lg:h-20" />
      </div>
    </div>
  );
}
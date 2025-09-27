import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface MainScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onSignUp: () => void;
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
      className="mb-0 bg-gradient-to-r from-[#22C31B] via-[#26CC84] to-[#2AD5ED] bg-clip-text text-transparent transition-all duration-500 ease-in-out"
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

function Frame4() {
  return (
    <div className="absolute h-24 sm:h-[134px] lg:h-[180px] left-0 overflow-hidden top-0 w-80 sm:w-[458px] lg:w-[600px]">
      <div className="absolute font-bold h-22 sm:h-[128px] lg:h-[180px] leading-[0.94] left-0 not-italic text-6xl sm:text-[136px] lg:text-[180px] top-0 w-80 sm:w-[458px] lg:w-[600px]">
        <RotatingText />
      </div>
    </div>
  );
}

function Group75() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute font-bold leading-[0.93] left-0 not-italic text-6xl sm:text-[136px] lg:text-[180px] text-nowrap text-white top-24 sm:top-[128px] lg:top-[180px] whitespace-pre">
        <p className="mb-0">Track</p>
        <p className="mb-0">Your</p>
        <p className="mb-0">Carbon</p>
        <p>Footprint</p>
      </div>
      <Frame4 />
    </div>
  );
}

function Component1() {
  return (
    <div
      className="absolute h-96 sm:h-[622px] lg:h-[800px] left-4 sm:left-[45px] lg:left-[80px] bottom-40 sm:bottom-[45%] lg:bottom-[40%] w-80 sm:w-[680px] lg:w-[900px]"
      data-name="Component 1"
    >
      <Group75 />
    </div>
  );
}

export default function MainScreen({
  onGetStarted,
  onLogin,
  onSignUp,
}: MainScreenProps) {
  return (
    <div
      className="bg-[#232323] relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] min-h-screen w-full overflow-hidden"
      data-name="M A I N"
    >
      {/* Background Image Placeholder */}
      <div
        className="absolute h-full left-[-75px] top-0 w-[150%] sm:w-[584px] lg:w-full bg-gradient-to-br from-green-800 via-green-600 to-blue-500"
        data-name="background-placeholder"
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:min-h-screen lg:items-center lg:justify-between lg:px-20">
        {/* Left side - Text */}
        <div className="lg:flex-1 lg:max-w-2xl">
          <div className="mb-8">
            <div className="text-8xl xl:text-9xl font-bold mb-4">
              <RotatingText />
            </div>
            <div className="text-8xl xl:text-9xl font-bold text-white leading-tight">
              <p className="mb-0">Track</p>
              <p className="mb-0">Your</p>
              <p className="mb-0">Carbon</p>
              <p>Footprint</p>
            </div>
          </div>
          <button
            onClick={onGetStarted}
            className="bg-white text-green-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-3 group"
          >
            Get Started
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right side - Visual element or space */}
        <div className="lg:flex-1 lg:flex lg:justify-center lg:items-center">
          <div className="w-96 h-96 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="text-white/60 text-center">
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-xl">Start Your Journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Main Text Component */}
        <Component1 />

        {/* Get Started Arrow */}
        <button
          onClick={onGetStarted}
          className="absolute right-4 sm:right-[7.91%] bottom-40 sm:bottom-[65%] w-[38px] h-[41px] hover:scale-110 transition-transform duration-200 z-20 touch-manipulation bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
          aria-label="Get started"
          data-name="get-started-button"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
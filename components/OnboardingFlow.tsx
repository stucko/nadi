import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { ArrowLeft, Info } from "lucide-react";
import { COUNTRIES, getCountryConfig } from "./CountryConfig";

interface OnboardingData {
  country: string;
  city: string;
  electricityUsage: string;
  commute: {
    car: string;
    motorcycle: string;
    bus: string;
    train: string;
    walkBike: string;
  };
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
  onSkip: () => void;
}

const getAvailableCities = (countryCode: string): string[] => {
  const config = getCountryConfig(countryCode);
  return config.sampleCities;
};

export function OnboardingFlow({ onComplete, onBack, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    country: "",
    city: "",
    electricityUsage: "",
    commute: {
      car: "",
      motorcycle: "",
      bus: "",
      train: "",
      walkBike: ""
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!data.country.trim()) {
        newErrors.country = "Please select your country";
      }
    } else if (step === 2) {
      if (!data.city.trim()) {
        newErrors.city = "Please select or enter your city";
      }
    } else if (step === 3) {
      const usage = parseFloat(data.electricityUsage);
      if (!data.electricityUsage || isNaN(usage) || usage < 0) {
        newErrors.electricityUsage = "Please enter a valid number";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(data);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const updateCommute = (type: keyof OnboardingData['commute'], value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setData(prev => ({
        ...prev,
        commute: { ...prev.commute, [type]: value }
      }));
    } else if (value === "") {
      setData(prev => ({
        ...prev,
        commute: { ...prev.commute, [type]: "" }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-green-900 flex flex-col p-6 relative overflow-hidden">
      {/* Subtle stars */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-12 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-36 right-16 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-52 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-48 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <button onClick={prevStep} className="p-2 -ml-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full border-2 ${
                step <= currentStep 
                  ? 'bg-[#22C31B] border-[#22C31B] shadow-sm' 
                  : 'bg-transparent border-white/40'
              }`}
            />
          ))}
        </div>
        <button 
          onClick={onSkip} 
          className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-md mx-auto w-full">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h1 className="text-3xl font-medium text-white drop-shadow-lg">Welcome to Nadi!</h1>
              <p className="text-white/90 text-lg drop-shadow-sm">First, let's set up your location for accurate estimates.</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="country" className="text-white font-medium text-lg">Country</Label>
              <Select value={data.country} onValueChange={(value) => setData(prev => ({ ...prev, country: value, city: "" }))}>
                <SelectTrigger className="h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 focus:border-[#22C31B] text-white">
                  <SelectValue placeholder="Select your country" className="text-white/60" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(COUNTRIES).map((country) => (
                    <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {errors.country && <p className="text-sm text-red-400 drop-shadow-sm">{errors.country}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h1 className="text-3xl font-medium text-white drop-shadow-lg">Your city</h1>
              <p className="text-white/90 text-lg drop-shadow-sm">This helps us provide local context and tips.</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="city" className="text-white font-medium text-lg">City</Label>
              <Select value={data.city} onValueChange={(value) => setData(prev => ({ ...prev, city: value }))}>
                <SelectTrigger className="h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 focus:border-[#22C31B] text-white">
                  <SelectValue placeholder="Select your city" className="text-white/60" />
                </SelectTrigger>
                <SelectContent>
                  {data.country && getAvailableCities(data.country).map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              {data.city === "other" && (
                <Input
                  placeholder="Enter your city"
                  value={data.city === "other" ? "" : data.city}
                  onChange={(e) => setData(prev => ({ ...prev, city: e.target.value }))}
                  className="h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 focus:border-[#22C31B] text-white placeholder:text-white/60 mt-2"
                />
              )}
              
              {errors.city && <p className="text-sm text-red-400 drop-shadow-sm">{errors.city}</p>}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h1 className="text-3xl font-medium text-white drop-shadow-lg">Your electricity usage</h1>
              <p className="text-white/90 text-lg drop-shadow-sm">Check your electricity bill for monthly kWh.</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="electricity" className="text-white font-medium text-lg">Monthly usage (kWh)</Label>
              <Input
                id="electricity"
                type="number"
                placeholder="300"
                value={data.electricityUsage}
                onChange={(e) => setData(prev => ({ ...prev, electricityUsage: e.target.value }))}
                className="h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 focus:border-[#22C31B] text-white placeholder:text-white/60 text-base"
                min="0"
              />
              {errors.electricityUsage && <p className="text-sm text-red-400 drop-shadow-sm">{errors.electricityUsage}</p>}
            </div>

            <div className="bg-blue-500/20 backdrop-blur-sm p-5 rounded-xl border border-blue-400/30">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-300 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-100">
                  <p className="font-medium text-white">Don't know your usage?</p>
                  <p className="text-blue-200">Average household uses 300-400 kWh monthly. You can update this later.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h1 className="text-3xl font-medium text-white drop-shadow-lg">Weekly commute</h1>
              <p className="text-white/90 text-lg drop-shadow-sm">How many km do you travel weekly?</p>
            </div>

            <div className="space-y-4">
              {data.country && (() => {
                const config = getCountryConfig(data.country);
                return [
                  { key: 'car' as const, label: config.transportModes.car, placeholder: '50' },
                  { key: 'motorcycle' as const, label: 'Motorcycle', placeholder: '0' },
                  { key: 'bus' as const, label: config.transportModes.bus, placeholder: '0' },
                  { key: 'train' as const, label: config.transportModes.rail, placeholder: '0' },
                  { key: 'walkBike' as const, label: 'Walk/Bike', placeholder: '5' }
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-white font-medium">{label} (km/week)</Label>
                    <Input
                      id={key}
                      type="number"
                      placeholder={placeholder}
                      value={data.commute[key]}
                      onChange={(e) => updateCommute(key, e.target.value)}
                      className="h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 focus:border-[#22C31B] text-white placeholder:text-white/60 text-base"
                      min="0"
                    />
                  </div>
                ));
              })()}
            </div>

            {data.country && (() => {
              const config = getCountryConfig(data.country);
              return (
                <div className="bg-green-500/20 backdrop-blur-sm p-5 rounded-xl border border-green-400/30">
                  <Badge className="bg-gradient-to-r from-[#22C31B] to-[#26CC84] text-white mb-3 px-3 py-1">Assumptions</Badge>
                  <p className="text-sm text-green-100 font-medium">
                    Grid {config.gridFactor} kg/kWh • Fuel {config.currencySymbol}{config.fuelPrice}/L
                  </p>
                  <p className="text-sm text-green-200 mt-1">Numbers are estimates. You can edit assumptions later.</p>
                </div>
              );
            })()}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <Button 
            onClick={nextStep}
            className="w-full h-16 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white rounded-xl shadow-2xl border-2 border-white/20 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            {currentStep === 4 ? 'Complete Setup' : 'Continue'}
          </Button>
          
          {currentStep === 4 && (
            <p className="text-center text-sm text-white/80 mt-4 drop-shadow-sm">
              You can always update these later in settings
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
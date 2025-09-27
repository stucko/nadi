import { useState } from "react";
import MainScreen from "./components/MainScreen";
import SignInScreen from "./components/SignInScreen";
import SignUpScreen from "./components/SignUpScreen";

import { EmailCapture } from "./components/EmailCapture";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { SuccessScreen } from "./components/SuccessScreen";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { Toaster } from "./components/ui/sonner";
import { DebugAI } from "./components/DebugAI";

type AppState = 'main' | 'signin' | 'signup' | 'email' | 'onboarding' | 'success' | 'dashboard' | 'profile';

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

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('main');
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  const handleGetStarted = () => {
    setCurrentState('signin');
  };

  const handleLogin = (data?: any) => {
    // For now, go directly to onboarding after login
    console.log('Login successful:', data);
    setCurrentState('onboarding');
  };

  const handleSignUp = () => {
    setCurrentState('signup');
  };

  const handleGoToSignUp = () => {
    setCurrentState('signup');
  };

  const handleGoToSignIn = () => {
    setCurrentState('signin');
  };

  const handleContinueWithoutLogin = () => {
    setCurrentState('onboarding');
  };

  const handleEmailCapture = (email?: string) => {
    setUserEmail(email);
    setCurrentState('onboarding');
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setCurrentState('success');
  };

  const handleSkipOnboarding = () => {
    setCurrentState('dashboard');
  };

  const handleContinueToDashboard = () => {
    setCurrentState('dashboard');
  };

  const handleBackToMain = () => {
    setCurrentState('main');
  };

  const handleBackToEmail = () => {
    setCurrentState('email');
  };

  const handleSignUpComplete = (data: any) => {
    setCurrentState('onboarding');
  };

  const handleBackToMainFromSignUp = () => {
    setCurrentState('main');
  };

  const handleBackToMainFromSignIn = () => {
    setCurrentState('main');
  };

  const handleProfileClick = () => {
    setCurrentState('profile');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
  };

  return (
    <div className="size-full">
      {currentState === 'main' && (
        <MainScreen
          onGetStarted={handleGetStarted}
        />
      )}
      
      {currentState === 'signin' && (
        <SignInScreen
          onBack={handleBackToMainFromSignIn}
          onLogin={handleLogin}
          onSignUp={handleGoToSignUp}
        />
      )}
      
      {currentState === 'signup' && (
        <SignUpScreen
          onBack={handleBackToMainFromSignUp}
          onSignUp={handleSignUpComplete}
          onSignIn={handleGoToSignIn}
        />
      )}
      

      
      {currentState === 'email' && (
        <EmailCapture
          onContinue={handleEmailCapture}
          onBack={handleBackToMain}
        />
      )}
      
      {currentState === 'onboarding' && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onBack={userEmail !== undefined ? handleBackToEmail : handleBackToMain}
          onSkip={handleSkipOnboarding}
        />
      )}
      
      {currentState === 'success' && (
        <SuccessScreen
          onContinueToDashboard={handleContinueToDashboard}
        />
      )}
      
      {currentState === 'dashboard' && (
        <Dashboard 
          hasBaseline={onboardingData !== null}
          userEmail={userEmail}
          onProfileClick={handleProfileClick}
          country={onboardingData?.country}
          onboardingData={onboardingData}
        />
      )}
      
      {currentState === 'profile' && (
        <Profile
          onBack={handleBackToDashboard}
          userEmail={userEmail}
          country={onboardingData?.country}
        />
      )}
      
      <Toaster />
    </div>
  );
}
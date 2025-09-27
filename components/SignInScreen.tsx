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

function Group69({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onLogin,
  onSignUp,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
}) {
  return (
    <div className="absolute contents left-[-91px] top-0">
      {/* Background Placeholder */}
      <div
        className="absolute h-full left-[-91px] right-[-91px] top-0 min-w-[584px] w-[calc(100vw+182px)] bg-gradient-to-br from-green-800 via-green-600 to-blue-500"
        data-name="background-placeholder"
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Responsive container - shorter for iPhone SE */}
      <div className="absolute backdrop-blur-[5px] backdrop-filter bg-[rgba(45,45,45,0.1)] h-[480px] sm:h-[520px] md:h-[560px] left-[-1px] right-[-1px] rounded-tl-[60px] rounded-tr-[60px] top-[220px] sm:top-[250px] md:top-[300px] max-w-[431px] w-[calc(100vw+2px)] sm:w-[431px]" />

      {/* Title */}
      <div className="absolute font-medium leading-[0] left-[28px] not-italic text-[28px] sm:text-[32px] text-white top-[230px] sm:top-[260px] md:top-[310px] w-[150px]">
        <p className="leading-[1.2] sm:leading-[93px]">Sign In</p>
      </div>

      {/* Subtitle */}
      <div className="absolute font-normal leading-[16.5px] left-[28px] not-italic text-[#ececec] text-[14px] sm:text-[15px] top-[270px] sm:top-[310px] md:top-[380px] w-[322.983px]">
        <p className="mb-0">Want to help save the world ?</p>
        <p>Start with your carbon footprint</p>
      </div>

      {/* Email Input */}
      <div className="absolute contents left-[28px] right-[28px] top-[320px] sm:top-[370px] md:top-[450px]">
        <div className="absolute h-[45px] left-[28px] right-[28px] rounded-[10px] top-[340px] sm:top-[390px] md:top-[470px] max-w-[373px] w-[calc(100vw-56px)] sm:w-[373px]">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email"
            className="absolute inset-0 bg-transparent text-white placeholder:text-white/60 px-4 focus:outline-none focus:border-[#22C31B] z-10 touch-manipulation"
          />
          <div
            aria-hidden="true"
            className="absolute border border-[#ececec] border-solid inset-0 pointer-events-none rounded-[10px]"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="absolute contents left-[28px] right-[28px] top-[370px] sm:top-[430px] md:top-[520px]">
        <div className="absolute h-[45px] left-[28px] right-[28px] rounded-[10px] top-[390px] sm:top-[450px] md:top-[540px] max-w-[373px] w-[calc(100vw-56px)] sm:w-[373px]">
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter your password"
            className="absolute inset-0 bg-transparent text-white placeholder:text-white/60 px-4 focus:outline-none focus:border-[#22C31B] z-10 touch-manipulation"
          />
          <div
            aria-hidden="true"
            className="absolute border border-[#ececec] border-solid inset-0 pointer-events-none rounded-[10px]"
          />
        </div>
      </div>

      {/* Login Button */}
      <div className="absolute contents left-[28px] right-[28px] top-[420px] sm:top-[490px] md:top-[590px]">
        <button
          onClick={onLogin}
          className="absolute bg-white hover:bg-gray-100 transition-colors h-[45px] left-[28px] right-[28px] rounded-[10px] top-[440px] sm:top-[510px] md:top-[610px] max-w-[373px] w-[calc(100vw-56px)] sm:w-[373px] touch-manipulation"
        />
        <button
          onClick={onLogin}
          className="absolute font-medium leading-[0] left-1/2 transform -translate-x-1/2 not-italic text-[#105d0d] hover:text-[#22C31B] transition-colors text-[15px] top-[420px] sm:top-[490px] md:top-[590px] w-[35px] touch-manipulation z-10"
        >
          <p className="leading-[93px]">Login</p>
        </button>
      </div>

      {/* "or" divider */}
      <div className="absolute contents left-[28px] right-[28px] top-[480px] sm:top-[550px] md:top-[660px]">
        <div className="absolute font-medium leading-[0] left-1/2 transform -translate-x-1/2 not-italic text-[#ececec] text-[15px] top-[480px] sm:top-[550px] md:top-[660px] w-[15px]">
          <p className="leading-[93px]">or</p>
        </div>
        <div className="absolute h-0 left-[calc(50%+20px)] right-[28px] top-[500px] sm:top-[570px] md:top-[680px] max-w-[173px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <div className="w-full h-[1px] bg-[#ECECEC]"></div>
          </div>
        </div>
        <div className="absolute h-0 left-[28px] right-[calc(50%+20px)] top-[500px] sm:top-[570px] md:top-[680px] max-w-[173px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <div className="w-full h-[1px] bg-[#ECECEC]"></div>
          </div>
        </div>
      </div>

      {/* Social Icons Placeholder */}
      <div className="absolute contents left-[28px] right-[28px] top-[520px] sm:top-[590px] md:top-[710px]">
        <div className="flex gap-3 sm:gap-4 justify-center absolute left-[28px] right-[28px] top-[540px] sm:top-[610px] md:top-[730px]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform touch-manipulation">
            <span className="text-white text-xs">G</span>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform touch-manipulation">
            <span className="text-white text-xs">A</span>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform touch-manipulation">
            <span className="text-white text-xs">F</span>
          </div>
        </div>
      </div>

      {/* Sign Up Link - much higher for iPhone SE */}
      <div className="absolute font-normal leading-[0] left-[28px] sm:left-[93px] not-italic text-[#ececec] text-[14px] sm:text-[15px] top-[590px] sm:top-[660px] md:top-[790px] w-full sm:w-[157.213px] text-center sm:text-left">
        <p className="leading-[1.2] sm:leading-[93px] inline">Don't have an account? </p>
        <button
          onClick={onSignUp}
          className="font-medium text-[#22C31B] hover:text-[#26CC84] transition-colors text-[14px] sm:text-[15px] cursor-pointer touch-manipulation underline decoration-[#22C31B] underline-offset-2 inline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default function SignInScreen({
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

  const handleSocialLogin = (provider: string) => {
    // Handle social login logic here
    console.log(`${provider} login attempted`);
    // For now, proceed with mock login
    onLogin({
      email: `user@${provider.toLowerCase()}.com`,
      password: "social_login",
    });
  };

  return (
    <div
      className="bg-[#232323] relative size-full overflow-hidden safe-area"
      data-name="U S E R 1"
    >
      <Group69
        email={email}
        onEmailChange={setEmail}
        password={password}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
        onSignUp={onSignUp}
      />
    </div>
  );
}
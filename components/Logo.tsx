import Vector from "../imports/Vector";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Vector />
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends React.ComponentProps<typeof Button> {
  primary?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className, 
  primary = true,
  ...props 
}) => {
  return (
    <Button
      className={cn(
        "relative font-bold border-2 transition-all duration-300 hover:scale-105",
        primary 
          ? "bg-red-600 border-red-600 hover:bg-red-600/80 shadow-[0_0_15px_rgba(255,0,0,0.7)] text-yellow-300" 
          : "bg-yellow-300 border-yellow-300 hover:bg-yellow-300/80 shadow-[0_0_15px_rgba(255,215,0,0.7)] text-red-600",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default NeonButton;

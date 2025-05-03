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
        "bg-[var(--comic-orange)] border-[var(--comic-brown)] hover:bg-[var(--comic-orange-2)] shadow-[4px_4px_0_var(--comic-shadow)] text-white",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default NeonButton;

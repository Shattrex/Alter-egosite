import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  src: string;
  title: string;
  className?: string;
  vertical?: boolean;
  aspectRatio?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ 
  src, 
  title, 
  className, 
  vertical = true,
  aspectRatio
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hardcoded specific video ID that we know works
  const DRIVE_VIDEO_ID = "1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu";
  
  useEffect(() => {
    if (containerRef.current) {
      // Set the appropriate aspect ratio based on orientation
      const paddingBottom = vertical ? '177.78%' : '56.25%';
      
      // Create the direct embed HTML with the specific Drive video ID
      // This format works reliably across environments
      const embedHTML = `
        <div style="position: relative; padding-bottom: ${paddingBottom}; height: 0;">
          <iframe 
            src="https://drive.google.com/file/d/${DRIVE_VIDEO_ID}/preview" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; encrypted-media"
            loading="eager"
          ></iframe>
        </div>
      `;
      
      // Inject the HTML directly
      containerRef.current.innerHTML = embedHTML;
    }
    
    // Clean up function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [vertical]);

  // Container styles optimized for display
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    backgroundColor: 'var(--comic-cream-light)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1
  };

  return (
    <div 
      ref={containerRef}
      className={cn("video-container rounded-lg", className)} 
      style={containerStyle}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-[var(--comic-cream)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[var(--comic-orange)] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[var(--comic-orange)]">Loading video...</p>
        </div>
      </div>
    </div>
  );
};

export default VideoEmbed;

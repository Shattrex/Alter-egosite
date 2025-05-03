import React, { useState, useRef, useEffect } from "react";
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
  const [isProductionSite, setIsProductionSite] = useState(false);

  // Extract video ID from Google Drive URL
  const getVideoId = (url: string) => {
    // For the specific video we're targeting
    if (url.includes("1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu")) {
      return "1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu";
    }
    
    const regex = /\/file\/d\/([^\/]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(src);

  useEffect(() => {
    // Check if we're in production
    const hostname = window.location.hostname;
    const isProduction = hostname.includes('vercel.app') || 
                         hostname !== 'localhost' && !hostname.includes('127.0.0.1');
    
    setIsProductionSite(isProduction);
    
    if (containerRef.current) {
      const container = containerRef.current;
      
      // Create the most reliable video embed structure
      const paddingBottom = vertical ? '177.78%' : '56.25%';
      
      // Create a direct embed that works universally
      const universalEmbed = `
        <div style="position: relative; padding-bottom: ${paddingBottom}; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px;">
          <iframe 
            src="https://drive.google.com/file/d/${videoId}/preview"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen="true"
            loading="eager"
            frameborder="0"
            title="${title}"
          ></iframe>
        </div>
      `;
      
      // Inject the embed code directly
      container.innerHTML = universalEmbed;
    }
    
    // Clean up function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [videoId, vertical, title]);

  // Container styles - simpler to avoid conflicts
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '50px', // Very small minimum height to avoid flash
    backgroundColor: 'var(--comic-cream-light)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  };

  // Render a simple container div that will be populated with our iframe
  return (
    <div 
      ref={containerRef}
      className={cn("video-container rounded-lg", className)} 
      style={containerStyle}
    >
      {/* Loading indicator shown until the iframe is injected */}
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

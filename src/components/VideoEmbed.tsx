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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);

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
  
  // Fixed embed URL that works specifically for Google Drive
  const embedUrl = "https://drive.google.com/file/d/1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu/preview";
  
  // Direct embed HTML that works more reliably
  const directEmbedHtml = `
    <iframe 
      src="${embedUrl}" 
      width="100%" 
      height="100%" 
      allow="autoplay; fullscreen" 
      allowfullscreen
      style="border: none; border-radius: 8px; display: block; width: 100%; height: 100%; min-height: 350px;"
    ></iframe>
  `;

  // Force reload function with incremental backoff
  const reloadIframe = () => {
    if (iframeRef.current) {
      setIsLoaded(false);
      setHasError(false);
      setRetryCount(prev => prev + 1);
      
      // Try using the fallback approach after 2 retries
      if (retryCount >= 2) {
        setFallbackMode(true);
        return;
      }
      
      // Add a timestamp to force reload
      iframeRef.current.src = '';
      const delay = Math.min(50 * Math.pow(2, retryCount), 2000);
      
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = embedUrl;
        }
      }, delay);
    }
  };

  // Set up iframe dimensions and event listeners
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setIsLoaded(true);
        console.log("Video loaded successfully");
      };
      
      iframe.onerror = () => {
        console.error("Error loading video");
        setHasError(true);
        reloadIframe();
      };
    }

    // Set proper dimensions for the container
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const height = vertical 
          ? containerWidth * (16/9) 
          : containerWidth * (9/16);
        
        if (iframeRef.current) {
          iframeRef.current.style.height = `${Math.max(350, height)}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial call to set proper dimensions
    setTimeout(handleResize, 100);

    // Set initial source for iframe
    if (iframe && !isLoaded && !hasError) {
      iframe.src = embedUrl;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [vertical, embedUrl]);

  // Fallback to direct embed if needed
  useEffect(() => {
    if (fallbackMode && containerRef.current) {
      containerRef.current.innerHTML = directEmbedHtml;
    }
  }, [fallbackMode, directEmbedHtml]);

  // Container styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '350px',
    overflow: 'hidden',
    backgroundColor: 'var(--comic-cream-light)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  };

  // iframe styles
  const iframeStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    aspectRatio: aspectRatio || (vertical ? "9/16" : "16/9"),
    display: 'block',
    width: '100%',
    minHeight: '350px',
    background: 'white'
  };

  // Fallback link to original video
  const fallbackLink = `https://drive.google.com/file/d/${videoId}/view?usp=sharing`;

  // If in fallback mode, render a div for direct HTML injection
  if (fallbackMode) {
    return (
      <div 
        ref={containerRef}
        className={cn("video-container rounded-lg", className)}
        style={containerStyle}
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn("video-container rounded-lg", className)} 
      style={containerStyle}
    >
      {!isLoaded && !fallbackMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--comic-cream)]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[var(--comic-orange)] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[var(--comic-orange)]">Loading video...</p>
          </div>
        </div>
      )}
      {hasError && retryCount >= 3 && !fallbackMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--comic-cream)]">
          <div className="flex flex-col items-center">
            <p className="text-[var(--comic-orange)]">Failed to load video</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button 
                onClick={() => setFallbackMode(true)}
                className="px-4 py-2 bg-[var(--comic-orange)] text-white rounded-md hover:bg-[var(--comic-orange-2)] transition-colors"
              >
                Try Alternative View
              </button>
              <a 
                href={fallbackLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[var(--comic-brown)] text-white rounded-md hover:opacity-90 transition-colors text-center"
              >
                Open in Drive
              </a>
            </div>
          </div>
        </div>
      )}
      {!fallbackMode && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={cn("w-full", isLoaded ? "opacity-100" : "opacity-0")}
          style={iframeStyle}
          loading="eager"
        ></iframe>
      )}
    </div>
  );
};

export default VideoEmbed;

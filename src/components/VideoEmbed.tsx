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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Extract video ID from Google Drive URL
  const getVideoId = (url: string) => {
    // This specific video ID
    if (url.includes("1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu")) {
      return "1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu";
    }
    
    const regex = /\/file\/d\/([^\/]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(src);
  
  // Use optimized embed URL format that works reliably with Google Drive
  const embedUrl = videoId === "1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu"
    ? "https://drive.google.com/file/d/1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu/preview"
    : (videoId 
        ? `https://drive.google.com/file/d/${videoId}/preview` 
        : "");

  // Force reload function with incremental backoff
  const reloadIframe = () => {
    if (iframeRef.current) {
      setIsLoaded(false);
      setHasError(false);
      setRetryCount(prev => prev + 1);
      
      // Add a timestamp to force reload
      iframeRef.current.src = '';
      const delay = Math.min(50 * Math.pow(2, retryCount), 2000); // Exponential backoff
      
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = `${embedUrl}?${new Date().getTime()}`;
        }
      }, delay);
    }
  };

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
        if (retryCount < 3) {
          reloadIframe();
        }
      };
    }

    // Add resize event listener for mobile compatibility
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const height = vertical 
          ? containerWidth * (16/9) 
          : containerWidth * (9/16);
        
        if (iframeRef.current) {
          iframeRef.current.style.height = `${height}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial call to set proper dimensions
    setTimeout(handleResize, 100);

    // Initial load attempt
    const timer = setTimeout(() => {
      if (!isLoaded && !hasError && iframe) {
        // Ensure we're using the direct format for the iframe src
        iframe.src = embedUrl;
        console.log("Setting iframe src to:", embedUrl);
      }
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [embedUrl, vertical, retryCount]);

  // Calculate container style based on aspect ratio
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '300px',
    overflow: 'hidden',
    backgroundColor: 'var(--comic-cream-light)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  };

  // Calculate iframe style with the specified aspect ratio
  const iframeStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    aspectRatio: aspectRatio || (vertical ? "9/16" : "16/9"),
    display: 'block',
    width: '100%',
    background: 'white'
  };

  // Create fallback link to video
  const fallbackLink = `https://drive.google.com/file/d/${videoId}/view?usp=sharing`;

  return (
    <div 
      ref={containerRef}
      className={cn("video-container rounded-lg", className)} 
      style={containerStyle}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--comic-cream)]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[var(--comic-orange)] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[var(--comic-orange)]">Loading video...</p>
          </div>
        </div>
      )}
      {hasError && retryCount >= 3 && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--comic-cream)]">
          <div className="flex flex-col items-center">
            <p className="text-[var(--comic-orange)]">Failed to load video</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button 
                onClick={reloadIframe}
                className="px-4 py-2 bg-[var(--comic-orange)] text-white rounded-md hover:bg-[var(--comic-orange-2)] transition-colors"
              >
                Retry
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
    </div>
  );
};

export default VideoEmbed;

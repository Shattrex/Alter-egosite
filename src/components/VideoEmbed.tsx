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
  const [directPlayMode, setDirectPlayMode] = useState(false);
  const [productionMode, setProductionMode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Check if we're in production (Vercel) or development
  useEffect(() => {
    // Check if we're running on Vercel or another production environment
    const isProduction = window.location.hostname.includes('vercel.app') || 
                        !window.location.hostname.includes('localhost');
    
    if (isProduction) {
      setProductionMode(true);
      // In production, immediately use the most reliable method
      setDirectPlayMode(true);
    }
  }, []);

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
  
  // Improved embed URL with forced mobile compatibility
  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;
  
  // Direct embed HTML that works more reliably, including on mobile devices
  const directEmbedHtml = `
    <iframe 
      src="${embedUrl}" 
      width="100%" 
      height="100%" 
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen
      loading="eager"
      style="border: none; border-radius: 8px; display: block; width: 100%; height: 100%; min-height: 350px; position: absolute; top: 0; left: 0;"
    ></iframe>
  `;

  // More compatible embed HTML specifically for production environments
  const productionEmbedHtml = `
    <div style="position: relative; padding-bottom: ${vertical ? '177.78%' : '56.25%'}; height: 0; overflow: hidden; border-radius: 8px;">
      <iframe 
        src="https://drive.google.com/file/d/${videoId}/preview" 
        width="100%" 
        height="100%" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px;"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen="true"
        loading="eager"
        frameborder="0"
      ></iframe>
    </div>
  `;

  // Even more direct HTML5 player fallback for mobile
  const html5PlayerHtml = `
    <div style="position: relative; padding-bottom: ${vertical ? '177.78%' : '56.25%'}; height: 0; overflow: hidden; width: 100%; border-radius: 8px;">
      <iframe 
        src="${embedUrl}"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px;"
        allowfullscreen 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        loading="eager"
      ></iframe>
    </div>
  `;

  // Force reload function with incremental backoff
  const reloadIframe = () => {
    if (iframeRef.current) {
      setIsLoaded(false);
      setHasError(false);
      setRetryCount(prev => prev + 1);
      
      // Try using the fallback approach after 1 retry
      if (retryCount >= 1) {
        setFallbackMode(true);
        return;
      }
      
      // Add a timestamp to force reload
      iframeRef.current.src = '';
      const delay = Math.min(50 * Math.pow(2, retryCount), 1000);
      
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = `${embedUrl}?${new Date().getTime()}`;
        }
      }, delay);
    }
  };

  // Try the more direct play method
  const tryDirectPlay = () => {
    setDirectPlayMode(true);
    if (containerRef.current) {
      containerRef.current.innerHTML = html5PlayerHtml;
    }
  };

  // Try the production optimized method
  const tryProductionMode = () => {
    setProductionMode(true);
    if (containerRef.current) {
      containerRef.current.innerHTML = productionEmbedHtml;
    }
  };

  // Set up iframe dimensions and event listeners
  useEffect(() => {
    const iframe = iframeRef.current;
    
    // Automatically use fallback mode on mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && !fallbackMode && !directPlayMode && !productionMode) {
      // Start with the reliable method on mobile
      setFallbackMode(true);
    }

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
        
        // Calculate height based on aspect ratio
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
    if (iframe && !isLoaded && !hasError && !fallbackMode && !directPlayMode && !productionMode) {
      iframe.src = embedUrl;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [vertical, embedUrl, fallbackMode, directPlayMode, productionMode]);

  // Fallback to direct embed if needed
  useEffect(() => {
    if (fallbackMode && containerRef.current) {
      containerRef.current.innerHTML = directEmbedHtml;
    }
  }, [fallbackMode, directEmbedHtml]);

  // Handle direct play mode
  useEffect(() => {
    if (directPlayMode && containerRef.current) {
      containerRef.current.innerHTML = html5PlayerHtml;
    }
  }, [directPlayMode, html5PlayerHtml]);

  // Handle production mode
  useEffect(() => {
    if (productionMode && containerRef.current) {
      containerRef.current.innerHTML = productionEmbedHtml;
    }
  }, [productionMode, productionEmbedHtml]);

  // Container styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: vertical ? '400px' : '350px',
    overflow: 'hidden',
    backgroundColor: 'var(--comic-cream-light)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  };

  // iframe styles with proper aspect ratios
  const iframeStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    aspectRatio: aspectRatio || (vertical ? "9/16" : "16/9"),
    display: 'block',
    width: '100%',
    minHeight: vertical ? '400px' : '350px',
    background: 'white'
  };

  // Fallback link to original video
  const fallbackLink = `https://drive.google.com/file/d/${videoId}/view?usp=sharing`;

  // If in any special mode, render a div for HTML injection
  if (fallbackMode || directPlayMode || productionMode) {
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
      {!isLoaded && !fallbackMode && !directPlayMode && !productionMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--comic-cream)]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[var(--comic-orange)] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[var(--comic-orange)]">Loading video...</p>
          </div>
        </div>
      )}
      {hasError && retryCount >= 2 && !fallbackMode && !directPlayMode && !productionMode && (
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
              <button 
                onClick={tryDirectPlay}
                className="px-4 py-2 bg-[var(--comic-orange)] text-white rounded-md hover:bg-[var(--comic-orange-2)] transition-colors"
              >
                Mobile Version
              </button>
              <button 
                onClick={tryProductionMode}
                className="px-4 py-2 bg-[var(--comic-orange)] text-white rounded-md hover:bg-[var(--comic-orange-2)] transition-colors"
              >
                Production Fix
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
      {!fallbackMode && !directPlayMode && !productionMode && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
          className={cn("w-full", isLoaded ? "opacity-100" : "opacity-0")}
          style={iframeStyle}
          loading="eager"
        ></iframe>
      )}
    </div>
  );
};

export default VideoEmbed;

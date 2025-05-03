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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract video ID from Google Drive URL
  const getVideoId = (url: string) => {
    const regex = /\/file\/d\/([^\/]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(src);
  const embedUrl = videoId ? `https://drive.google.com/file/d/${videoId}/preview` : "";

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setIsLoaded(true);
      };
    }
  }, []);

  // Calculate container style based on aspect ratio
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };

  // Calculate iframe style with the specified aspect ratio
  const iframeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    aspectRatio: aspectRatio || (vertical ? "9/16" : "16/9")
  };

  return (
    <div className={cn("video-container rounded-lg", className)} style={containerStyle}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--comic-cream)]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[var(--comic-orange)] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[var(--comic-orange)]">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        allow="autoplay"
        className={cn("w-full h-full", isLoaded ? "opacity-100" : "opacity-0")}
        style={iframeStyle}
      ></iframe>
    </div>
  );
};

export default VideoEmbed;

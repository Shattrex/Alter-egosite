
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  src: string;
  title: string;
  className?: string;
  vertical?: boolean;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, title, className, vertical = true }) => {
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

  return (
    <div className={cn("video-container rounded-lg overflow-hidden", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-red-600">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        allow="autoplay"
        className={cn("w-full h-full", isLoaded ? "opacity-100" : "opacity-0")}
        style={{ aspectRatio: vertical ? "9/16" : "16/9" }}
      ></iframe>
    </div>
  );
};

export default VideoEmbed;

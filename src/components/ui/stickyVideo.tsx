"use client";

import { IoCloseCircleOutline, IoExpand, IoPause, IoPlay } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "./loader";

export default function StickyVideo() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const [visible, setVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  }, []);

  if (!visible) return null;

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
  };

  const goFullScreen = () => {
    if (!videoRef.current) return;
    videoRef.current.requestFullscreen?.();
  };

  return (
    <div className="group fixed bottom-2 right-6 z-50 w-[200px] h-[380px] rounded-3xl overflow-hidden shadow-xl hidden md:block">
      {loading && (
        <Skeleton className="absolute inset-0 z-20 rounded-3xl" />
      )}

      <video
        ref={videoRef}
        src="https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/185341-875417497.mp4"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"
          }`}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!loading && (
        <button
          onClick={() => {
            videoRef.current?.pause();
            setVisible(false);
          }}
          className="absolute top-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow"
          aria-label="Close video"
        >
          <IoCloseCircleOutline size={20} />
        </button>
      )}

      {!loading && (
        <button
          onClick={togglePlayPause}
          className="absolute bottom-3 left-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow"
          aria-label="Play or pause"
        >
          {isPlaying ? <IoPause size={18} /> : <IoPlay size={18} />}
        </button>
      )}

      {!loading && (
        <button
          onClick={goFullScreen}
          className="absolute bottom-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow opacity-0 scale-90 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
          aria-label="Fullscreen">
          <IoExpand size={18} />
        </button>
      )}
    </div>
  );
}

"use client";

import { IoCloseCircle } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function StickyVideo() {

   const pathname = usePathname();


   if (pathname.startsWith("/dashboard")) {
    return null;
  }
  const [visible, setVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; 
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-2 right-6 z-50 w-[200px] h-[380px] rounded-3xl overflow-hidden shadow-xl bg-black hidden md:block">
      <video
        ref={videoRef}
        src="https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/185341-875417497.mp4"
        className="w-full h-full object-cover"
        controls
        muted
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Close button */}
      <button
        onClick={() => {
          videoRef.current?.pause();
          setVisible(false);
        }}
        className="absolute top-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow"
      >
        <IoCloseCircle size={20} />
      </button>
    </div>
  );
}

"use client";

import { IoCloseCircleOutline, IoExpand, IoPause, IoPlay } from "react-icons/io5";
import { useRef, useState, useEffect, useCallback } from "react";
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
  const [videoError, setVideoError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Reset video on mount/refresh to ensure it loads
  useEffect(() => {
    // Reset states on mount
    setLoading(true);
    setIsVideoReady(false);
    setVideoError(false);
    setIsPlaying(false);

    // Small delay to ensure smooth transition
    const initTimer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load(); // Force reload video
      }
    }, 100);

    return () => clearTimeout(initTimer);
  }, []);

  // Handle video loading events
  const handleVideoReady = useCallback(() => {
    setLoading(false);
    setIsVideoReady(true);
    setVideoError(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setLoading(false);
    setVideoError(true);
    setIsVideoReady(false);
  }, []);

  const handleVideoLoadStart = useCallback(() => {
    setLoading(true);
    setIsVideoReady(false);
  }, []);

  // Auto-play video when ready
  useEffect(() => {
    if (isVideoReady && videoRef.current && !isPlaying) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Auto-play prevented:", error);
          // Auto-play might be blocked by browser, that's okay
        });
    }
  }, [isVideoReady, isPlaying]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!videoRef.current) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setLoading(true);
    const handleCanPlay = () => {
      setLoading(false);
      setIsVideoReady(true);
    };

    const video = videoRef.current;
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleVideoReady);
    video.addEventListener("error", handleVideoError);
    video.addEventListener("loadstart", handleVideoLoadStart);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleVideoReady);
      video.removeEventListener("error", handleVideoError);
      video.removeEventListener("loadstart", handleVideoLoadStart);
    };
  }, [handleVideoReady, handleVideoError, handleVideoLoadStart]);

  if (!visible) return null;

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  const goFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch((error) => {
        console.error("Error entering fullscreen:", error);
      });
    }
  };

  return (
    <div className="group fixed bottom-2 right-6 z-50 w-[200px] h-[380px] rounded-3xl overflow-hidden shadow-xl hidden md:block">
      {/* Loading Skeleton */}
      {loading && (
        <Skeleton className="absolute inset-0 z-20 rounded-3xl animate-pulse" />
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        src="https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/MilkeKhareedo_02+Final.mp4"
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          loading || !isVideoReady ? "opacity-0" : "opacity-100"
        }`}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={handleVideoReady}
        onCanPlay={handleVideoReady}
        onError={handleVideoError}
        onLoadStart={handleVideoLoadStart}
      />

      {/* Error State */}
      {videoError && !loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-100 rounded-3xl">
          <div className="text-center p-4">
            <p className="text-xs text-gray-500">Video unavailable</p>
          </div>
        </div>
      )}

      {/* Close Button */}
      {isVideoReady && !loading && (
        <button
          onClick={() => {
            videoRef.current?.pause();
            setVisible(false);
          }}
          className="absolute top-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-40"
          aria-label="Close video"
        >
          <IoCloseCircleOutline size={20} />
        </button>
      )}

      {/* Play/Pause Button */}
      {isVideoReady && !loading && (
        <button
          onClick={togglePlayPause}
          className="absolute bottom-3 left-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-40"
          aria-label="Play or pause"
        >
          {isPlaying ? <IoPause size={18} /> : <IoPlay size={18} />}
        </button>
      )}

      {/* Fullscreen Button */}
      {isVideoReady && !loading && (
        <button
          onClick={goFullScreen}
          className="absolute bottom-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 scale-90 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 z-40 hover:scale-110"
          aria-label="Fullscreen"
        >
          <IoExpand size={18} />
        </button>
      )}
    </div>
  );
}


// "use client";

// import {
//   IoCloseCircleOutline,
//   IoExpand,
//   IoPause,
//   IoPlay,
//   IoVolumeHigh,
//   IoVolumeMute,
// } from "react-icons/io5";
// import { useRef, useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { Skeleton } from "./loader";

// export default function StickyVideo() {
//   const pathname = usePathname();
//   if (pathname.startsWith("/dashboard")) return null;

//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   const [visible, setVisible] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       setLoading(false);
//     }, 1200);
//     return () => clearTimeout(t);
//   }, []);

//   if (!visible) return null;

//   const sendCommand = (func: string) => {
//     iframeRef.current?.contentWindow?.postMessage(
//       JSON.stringify({
//         event: "command",
//         func,
//         args: [],
//       }),
//       "*"
//     );
//   };

//   const togglePlayPause = () => {
//     if (isPlaying) sendCommand("pauseVideo");
//     else sendCommand("playVideo");
//     setIsPlaying(!isPlaying);
//   };

//   const toggleMute = () => {
//     if (muted) sendCommand("unMute");
//     else sendCommand("mute");
//     setMuted(!muted);
//   };

//   const goFullScreen = () => {
//     iframeRef.current?.requestFullscreen();
//   };

//   const closeVideo = () => {
//     sendCommand("pauseVideo");
//     setVisible(false);
//   };

//   return (
//     <div className="group fixed bottom-2 right-6 z-50 w-[200px] h-[380px] rounded-3xl overflow-hidden shadow-xl hidden md:block">
//       {loading && (
//         <Skeleton className="absolute inset-0 z-20 rounded-3xl animate-pulse" />
//       )}

//       <iframe
//         ref={iframeRef}
//         className={`w-full h-full transition-opacity duration-500 ${
//           loading ? "opacity-0" : "opacity-100"
//         }`}
//         src={`https://www.youtube.com/embed/k_GvGvt4Id0?enablejsapi=1&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&origin=${window.location.origin}`}
//         title="MilkeKhareedo"
//         allow="autoplay; fullscreen"
//       />

//       {!loading && (
//         <button
//           onClick={closeVideo}
//           className="absolute top-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg z-40"
//         >
//           <IoCloseCircleOutline size={20} />
//         </button>
//       )}

//       {!loading && (
//         <button
//           onClick={togglePlayPause}
//           className="absolute bottom-3 left-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg z-40"
//         >
//           {isPlaying ? <IoPause size={18} /> : <IoPlay size={18} />}
//         </button>
//       )}

//       {!loading && (
//         <button
//           onClick={toggleMute}
//           className="absolute bottom-3 left-14 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg z-40"
//         >
//           {muted ? <IoVolumeMute size={18} /> : <IoVolumeHigh size={18} />}
//         </button>
//       )}

//       {!loading && (
//         <button
//           onClick={goFullScreen}
//           className="absolute bottom-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition z-40"
//         >
//           <IoExpand size={18} />
//         </button>
//       )}
//     </div>
//   );
// }

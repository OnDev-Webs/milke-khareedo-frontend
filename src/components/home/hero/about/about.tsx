"use client";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

export default function AboutSection() {
  const points = [
    {
      title: "Explore & Shortlist",
      desc: "Explore and shortlist properties easily using our search, map view, and virtual site visits.",
    },
    {
      title: "Show interest. No commitment yet.",
      desc: "Once you shortlist a few projects, simply show interest. We add you to a buyer group — nothing is final at this stage.",
    },
    {
      title: "Buyers come together",
      desc: "You join a private buyer group on our platform to stay informed, share views, and move forward together.",
    },
    {
      title: "Unlock better pricing options",
      desc: "When buyers come together, better pricing becomes possible — helping you save much more than individual buying.",
    },
    {
      title: "You decide. No pressure.",
      desc: "Once the group deal is ready, you complete your purchase with confidence — knowing you’re getting the best value available.",
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Reset and load video on mount/refresh
  useEffect(() => {
    if (videoRef.current) {
      setVideoLoading(true);
      setVideoError(false);
      videoRef.current.load();
    }
  }, []);

  const handleVideoReady = () => {
    setVideoLoading(false);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoLoading(false);
    setVideoError(true);
  };

  return (
    <section id="about" className="relative w-full bg-[#F2F5F9] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dotPattern"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="4" r="3" fill="#f0f0f0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE */}
          <div className="max-w-[640px] order-2 lg:order-1 pl-4 lg:pl-8 xl:pl-24">
            <h3 className="text-[24px] md:text-[30px] font-semibold text-[#000] mb-6 md:mb-8 pe-0 md:pe-0">
              How
              <span className="relative inline-block pe-2">
                <span className="text-[#1C4692] ms-2"> Milke Khareedo</span>
                <svg
                  className="absolute left-0 -bottom-2"
                  width="228"
                  height="11"
                  viewBox="0 0 228 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8.5C60 1.5 170 5.5 226 8.5"
                    stroke="#1C4692"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              Makes Buying Easier
            </h3>
            <div className="space-y-3">
              {points.map((item, i) => (
                <div key={i} className="flex gap-3 md:gap-4">
                  {/* Number */}
                  <div className="flex h-8 w-8 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-[#1C4692] text-white font-bold text-sm md:text-base leading-none">
                    {i + 1}
                  </div>

                  {/* Text */}
                  <div>
                    <h5 className="text-[16px] md:text-[18px] font-semibold text-black">
                      {item.title}
                    </h5>
                    <p className="text-[13px] md:text-[12.5px] text-[#373737] mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex order-1 lg:order-2 xl:pl-20">
            <div
              ref={containerRef}
              className="relative w-full max-w-[360px] h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}>
              {/* Loading Skeleton */}
              {videoLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl z-10" />
              )}

              {/* Video Element */}
              <video
                ref={videoRef}
                src="https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/185341-875417497.mp4"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  videoLoading ? "opacity-0" : "opacity-100"
                }`}
                muted={muted}
                autoPlay
                loop
                playsInline
                preload="auto"
                onLoadedData={handleVideoReady}
                onCanPlay={handleVideoReady}
                onError={handleVideoError}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Error State */}
              {videoError && !videoLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100 rounded-3xl">
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-500">Video unavailable</p>
                  </div>
                </div>
              )}

              <div className={`absolute inset-0 mt-118 ms-4 flex justify-start z-30 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
                <button
                  onClick={() => {
                    if (!videoRef.current) return;
                    if (isPlaying) {
                      videoRef.current.pause();
                    } else {
                      videoRef.current.play();
                    }
                  }}
                  className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? <IoPause size={20} /> : <IoPlay size={20} />}
                </button>
              </div>

              {/* Top Left */}
              <div className="absolute top-2 md:top-2 left-2 md:left-2 z-20 flex items-center gap-2 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white">
                <svg
                  className="h-7 w-7 md:h-9 md:w-9 bg-white/90 rounded-full p-[3px]"
                  viewBox="0 0 24 24"
                  fill="#000"
                >
                  <circle cx="8" cy="8" r="2" />
                  <circle cx="16" cy="8" r="2" />
                  <circle cx="8" cy="16" r="2" />
                  <circle cx="16" cy="16" r="2" />
                </svg>
                Milke Khareedo
              </div>

              {/* Top Right */}
              <div className="absolute top-2 right-2 z-40 flex gap-2">
                <button
                  onClick={() => {
                    if (!videoRef.current) return;
                    const nextMuted = !muted;
                    videoRef.current.muted = nextMuted;
                    setMuted(nextMuted);
                    if (!nextMuted) {
                      videoRef.current.play().catch(() => { });
                    }
                  }}
                  className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow">
                  {muted ? <IoVolumeMute size={18} /> : <IoVolumeHigh size={18} />}
                </button>

                <button
                  onClick={() => {
                    if (!containerRef.current) return;
                    if (!document.fullscreenElement) {
                      containerRef.current.requestFullscreen().catch(() => { });
                    } else {
                      document.exitFullscreen().catch(() => { });
                    }
                  }}
                  className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow"
                >
                  {isFullscreen ? (
                    <MdFullscreenExit size={18} />
                  ) : (
                    <MdFullscreen size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

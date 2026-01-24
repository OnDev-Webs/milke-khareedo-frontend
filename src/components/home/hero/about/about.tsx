// "use client";
// import { useEffect, useRef, useState } from "react";
// import { IoPause, IoPlay, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
// import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

// export default function AboutSection() {
//   const points = [
//     {
//       title: "Explore & Shortlist",
//       desc: "Explore and shortlist properties easily using our search, map view, and virtual site visits.",
//     },
//     {
//       title: "Show interest. No commitment yet.",
//       desc: "Once you shortlist a few projects, simply show interest. We add you to a buyer group — nothing is final at this stage.",
//     },
//     {
//       title: "Buyers come together",
//       desc: "You join a private buyer group on our platform to stay informed, share views, and move forward together.",
//     },
//     {
//       title: "Unlock better pricing options",
//       desc: "When buyers come together, better pricing becomes possible — helping you save much more than individual buying.",
//     },
//     {
//       title: "You decide. No pressure.",
//       desc: "Once the group deal is ready, you complete your purchase with confidence — knowing you’re getting the best value available.",
//     },
//   ];

//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [muted, setMuted] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(false);

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () =>
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   return (
//     <section id="about" className="relative w-full bg-[#F2F5F9] overflow-hidden">
//       <svg
//         className="absolute inset-0 w-full h-full pointer-events-none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <pattern
//             id="dotPattern"
//             width="16"
//             height="16"
//             patternUnits="userSpaceOnUse"
//           >
//             <circle cx="4" cy="4" r="3" fill="#f0f0f0" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#dotPattern)" />
//       </svg>

//       <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           {/* LEFT SIDE */}
//           <div className="max-w-[640px]">
//             <h3 className="text-[24px] md:text-[30px] font-semibold text-[#000] mb-6 md:mb-8 pe-0 md:pe-0">
//               How
//               <span className="relative inline-block pe-2">
//                 <span className="text-[#1C4692] ms-2"> Milke Khareedo</span>
//                 <svg
//                   className="absolute left-0 -bottom-2"
//                   width="228"
//                   height="11"
//                   viewBox="0 0 228 11"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M2 8.5C60 1.5 170 5.5 226 8.5"
//                     stroke="#1C4692"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     fill="none"
//                   />
//                 </svg>
//               </span>
//               Makes Buying Easier
//             </h3>

//             <div className="space-y-6">
//               {points.map((item, i) => (
//                 <div key={i} className="flex items-center gap-3 md:gap-4">
//                   {/* Number */}
//                   <div className="flex h-8 w-8 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-[#1C4692] text-white font-bold text-sm md:text-base leading-none">
//                     {i + 1}
//                   </div>

//                   {/* Text */}
//                   <div>
//                     <h5 className="text-[16px] md:text-[18px] font-semibold text-black">
//                       {item.title}
//                     </h5>
//                     <p className="text-[13px] md:text-[12.5px] text-[#373737] mt-1">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex justify-center h-[350px] md:h-[500px]">
//             <div ref={containerRef} className="relative w-full max-w-[360px] h-[520px] rounded-3xl overflow-hidden shadow-xl"
//               onMouseEnter={() => setShowControls(true)}
//               onMouseLeave={() => setShowControls(false)}>
//               <video
//                 ref={videoRef}
//                 src="https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/185341-875417497.mp4"
//                 className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
//                 muted={muted}
//                 autoPlay
//                 loop
//                 playsInline
//                 preload="metadata"
//                 onPlay={() => setIsPlaying(true)}
//                 onPause={() => setIsPlaying(false)}
//               />

//               <div
//                 className={`absolute inset-0 mt-118 ms-4 flex justify-start z-30 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
//                   }`}
//               >
//                 <button
//                   onClick={() => {
//                     if (!videoRef.current) return;
//                     if (isPlaying) {
//                       videoRef.current.pause();
//                     } else {
//                       videoRef.current.play();
//                     }
//                   }}
//                   className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
//                 >
//                   {isPlaying ? <IoPause size={20} /> : <IoPlay size={20} />}
//                 </button>
//               </div>

//               {/* Top Left */}
//               <div className="absolute top-2 md:top-2 left-2 md:left-2 z-20 flex items-center gap-2 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white">
//                 <svg
//                   className="h-7 w-7 md:h-9 md:w-9 bg-white/90 rounded-full p-[3px]"
//                   viewBox="0 0 24 24"
//                   fill="#000"
//                 >
//                   <circle cx="8" cy="8" r="2" />
//                   <circle cx="16" cy="8" r="2" />
//                   <circle cx="8" cy="16" r="2" />
//                   <circle cx="16" cy="16" r="2" />
//                 </svg>
//                 Milke Khareedo
//               </div>

//               {/* Top Right */}
//               <div className="absolute top-2 right-2 z-40 flex gap-2">
//                 <button
//                   onClick={() => {
//                     if (!videoRef.current) return;
//                     const nextMuted = !muted;
//                     videoRef.current.muted = nextMuted;
//                     setMuted(nextMuted);
//                     if (!nextMuted) {
//                       videoRef.current.play().catch(() => { });
//                     }
//                   }}
//                   className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow">
//                   {muted ? <IoVolumeMute size={18} /> : <IoVolumeHigh size={18} />}
//                 </button>

//                 <button
//                   onClick={() => {
//                     if (!containerRef.current) return;
//                     if (!document.fullscreenElement) {
//                       containerRef.current.requestFullscreen().catch(() => { });
//                     } else {
//                       document.exitFullscreen().catch(() => { });
//                     }
//                   }}
//                   className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow"
//                 >
//                   {isFullscreen ? (
//                     <MdFullscreenExit size={18} />
//                   ) : (
//                     <MdFullscreen size={18} />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <section
      id="about"
      className="relative w-full bg-[#F2F5F9] overflow-hidden"
    >
      {/* Background Pattern */}
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
          <div className="w-full lg:w-[60%]">
            <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold text-black mb-10 leading-snug">
              How
              <span className="relative inline-block mx-2 text-[#1C4692]">
                Milke Khareedo
                <svg
                  className="absolute left-0 -bottom-2 w-full"
                  height="10"
                  viewBox="0 0 228 11"
                  fill="none"
                >
                  <path
                    d="M2 8.5C60 1.5 170 5.5 226 8.5"
                    stroke="#1C4692"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Makes Buying Easier
            </h3>

            <div className="space-y-8">
              {points.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C4692] text-white font-bold text-base">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="text-[18px] sm:text-[20px] font-semibold text-black">
                      {item.title}
                    </h5>
                    <p className="text-[15px] sm:text-[16px] text-[#373737] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[40%] h-full flex justify-center">
            <div
              ref={containerRef}
              className="relative w-full h-[360px] sm:h-[600px] rounded-3xl overflow-hidden shadow-xl"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src="https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/185341-875417497.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                muted={muted}
                autoPlay
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div
                className={`absolute bottom-6 left-4 z-30 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={() => {
                    if (!videoRef.current) return;
                    isPlaying
                      ? videoRef.current.pause()
                      : videoRef.current.play();
                  }}
                  className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? <IoPause size={18} /> : <IoPlay size={18} />}
                </button>
              </div>

              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold">
                Milke Khareedo
              </div>

              <div className="absolute top-3 right-3 z-30 flex gap-2">
                <button
                  onClick={() => {
                    if (!videoRef.current) return;
                    const nextMuted = !muted;
                    videoRef.current.muted = nextMuted;
                    setMuted(nextMuted);
                  }}
                  className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow"
                >
                  {muted ? (
                    <IoVolumeMute size={16} />
                  ) : (
                    <IoVolumeHigh size={16} />
                  )}
                </button>

                <button
                  onClick={() => {
                    if (!containerRef.current) return;
                    !document.fullscreenElement
                      ? containerRef.current.requestFullscreen()
                      : document.exitFullscreen();
                  }}
                  className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow"
                >
                  {isFullscreen ? (
                    <MdFullscreenExit size={16} />
                  ) : (
                    <MdFullscreen size={16} />
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

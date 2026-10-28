/**
 * Hero video background — fades in when ready.
 * Before the video loads, the section's bg-dark-hero provides a dark backdrop.
 *
 * @param {{ videoRef: React.RefObject, isVideoReady: boolean, hasError: boolean }} props
 */
export default function HeroVideoBackground({ videoRef, isVideoReady, hasError }) {
  const showVideo = isVideoReady && !hasError;

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-in-out md:object-center"
      style={{
        opacity: showVideo ? 1 : 0,
        objectPosition: "60% center",
      }}
    />
  );
}

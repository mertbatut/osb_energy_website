import heroPoster from "../../assets/images/hero-poster.jpg";

/** Keep the real video poster visible until playback is ready, including failures. */
export default function HeroVideoBackground({ videoRef, isVideoReady, hasError }) {
  const showVideo = isVideoReady && !hasError;

  return (
    <>
      <img
        src={heroPoster}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "60% center" }}
      />
      <video
        ref={videoRef}
        autoPlay
        poster={heroPoster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-in-out md:object-center"
        style={{ opacity: showVideo ? 1 : 0, objectPosition: "60% center" }}
      />
    </>
  );
}

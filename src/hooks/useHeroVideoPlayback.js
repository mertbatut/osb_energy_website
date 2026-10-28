import { useRef, useState, useEffect, useCallback } from "react";
import useReducedMotion from "./useReducedMotion.js";

/**
 * Manages hero video lifecycle: lazy-load via IntersectionObserver,
 * play/pause based on viewport visibility and tab focus,
 * respects saveData and reduced-motion preferences.
 *
 * @param {string} videoSrc - Path to the video file
 * @returns {{ videoRef: React.RefObject, isPlaying: boolean, hasError: boolean, isVideoReady: boolean }}
 */
export default function useHeroVideoPlayback(desktopSrc, mobileSrc) {
  const [videoSrc] = useState(() => window.matchMedia("(max-width: 767px)").matches && mobileSrc ? mobileSrc : desktopSrc);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const isVisibleRef = useRef(false);
  const isTabActiveRef = useRef(typeof document !== "undefined" ? !document.hidden : true);
  const loadedSrcRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [saveData] = useState(() => navigator.connection?.saveData === true);

  const shouldSkipVideo = prefersReducedMotion || saveData;

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isVisibleRef.current || !isTabActiveRef.current) return;
    video.defaultPlaybackRate = 0.7;
    video.playbackRate = 0.7;
    if (video.paused) {
      video.play().catch((err) => {
        if (err.name === "NotSupportedError") {
          setHasError(true);
        }
        // NotAllowedError and AbortError are expected — poster remains visible
      });
    }
  }, []);

  const tryPause = useCallback(() => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
    }
  }, []);

  // Prioritize the above-the-fold source without waiting for an observer.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldSkipVideo) return;
    loadedSrcRef.current = videoSrc;
    video.defaultPlaybackRate = 0.7;
    video.playbackRate = 0.7;
    video.src = videoSrc;
    video.load();
  }, [videoSrc, shouldSkipVideo]);

  // Intersection observer: track hero visibility + lazy-load video src
  useEffect(() => {
    if (shouldSkipVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Lazy-load: set src on first intersection or when videoSrc changes
          if (loadedSrcRef.current !== videoSrc) {
            loadedSrcRef.current = videoSrc;
            video.src = videoSrc;
            video.load();
          }
          tryPlay();
        } else {
          tryPause();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldSkipVideo, videoSrc, tryPlay, tryPause]);

  // Tab visibility: pause when hidden, resume when visible
  useEffect(() => {
    if (shouldSkipVideo) return;

    function handleVisibilityChange() {
      isTabActiveRef.current = !document.hidden;
      if (document.hidden) {
        tryPause();
      } else if (isVisibleRef.current) {
        tryPlay();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [shouldSkipVideo, tryPlay, tryPause]);

  // Video element event listeners
  useEffect(() => {
    if (shouldSkipVideo) return;

    const video = videoRef.current;
    if (!video) return;

    function handleCanPlay() {
      setIsVideoReady(true);
      // Retry play after video has buffered enough data —
      // the initial tryPlay() in IO callback may have failed with AbortError
      tryPlay();
    }
    function handlePlaying() {
      setIsPlaying(true);
    }
    function handlePause() {
      setIsPlaying(false);
    }
    function handleError() {
      setHasError(true);
      setIsPlaying(false);
    }

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, [shouldSkipVideo, tryPlay]);

  return { videoRef, isPlaying, hasError, isVideoReady, shouldSkipVideo };
}

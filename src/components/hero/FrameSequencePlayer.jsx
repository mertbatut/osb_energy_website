import { useRef, useEffect } from "react";
import useFrameLoader from "../../hooks/useFrameLoader.js";

/**
 * Canvas-based image sequence renderer driven by scroll progress.
 * Draws frames via requestAnimationFrame — no React re-renders on scroll.
 * Uses cover scaling to fill canvas while preserving aspect ratio.
 *
 * @param {Object} props
 * @param {{ current: number }} props.progressRef - Scroll progress 0-1
 * @param {number} props.frameCount - Total number of frames
 * @param {string} props.basePath - Base URL path (e.g. "/frames/desktop")
 * @param {"webp" | "avif" | "jpg"} [props.format="webp"]
 * @param {(loaded: number, total: number) => void} [props.onLoadProgress]
 */
export default function FrameSequencePlayer({
  progressRef,
  frameCount,
  basePath,
  format = "webp",
  onLoadProgress,
}) {
  const canvasRef = useRef(null);
  const lastFrameRef = useRef(-1);
  const getFrameRef = useRef(null);

  const { getFrame } = useFrameLoader({
    frameCount,
    basePath,
    format,
    onLoadProgress,
  });

  // Keep getFrame ref fresh so rAF loop never restarts
  useEffect(() => {
    getFrameRef.current = getFrame;
  }, [getFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;

    function updateSize() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const newW = Math.round(w * dpr);
      const newH = Math.round(h * dpr);
      if (canvas.width !== newW || canvas.height !== newH) {
        canvas.width = newW;
        canvas.height = newH;
        canvasWidth = newW;
        canvasHeight = newH;
        lastFrameRef.current = -1; // Force redraw after resize
      }
    }

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(canvas);
    updateSize();

    function drawCover(img) {
      if (canvasWidth === 0 || canvasHeight === 0) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover scaling: fill canvas, crop overflow, center
      const scale = Math.max(canvasWidth / iw, canvasHeight / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (canvasWidth - dw) / 2;
      const dy = (canvasHeight - dh) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function tick() {
      const progress = progressRef.current;
      const targetFrame = Math.round(progress * (frameCount - 1));

      if (targetFrame !== lastFrameRef.current) {
        const img = getFrameRef.current?.(targetFrame);
        if (img) {
          drawCover(img);
          lastFrameRef.current = targetFrame;
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [progressRef, frameCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

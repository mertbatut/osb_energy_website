import { useRef, useState, useEffect, useCallback } from "react";

const MAX_CONCURRENT = 4;
const MAX_RETRIES = 2;
const PRIORITY_FRAME_COUNT = 5;

/**
 * Pads a number to 3 digits with leading zeros.
 * @param {number} n
 * @returns {string}
 */
function pad3(n) {
  return String(n).padStart(3, "0");
}

/**
 * Builds the URL for a given frame index.
 * @param {string} basePath
 * @param {number} index
 * @param {string} format
 * @returns {string}
 */
function buildFrameUrl(basePath, index, format) {
  return `${basePath}/frame-${pad3(index)}.${format}`;
}

/**
 * Generates a priority-ordered load queue.
 * First PRIORITY_FRAME_COUNT frames load first, then the rest in order.
 * @param {number} frameCount
 * @returns {number[]}
 */
function buildLoadQueue(frameCount) {
  const priority = [];
  const rest = [];
  for (let i = 0; i < frameCount; i++) {
    if (i < PRIORITY_FRAME_COUNT) {
      priority.push(i);
    } else {
      rest.push(i);
    }
  }
  return [...priority, ...rest];
}

/**
 * Progressive frame preloader for image sequence playback.
 * Loads frames with priority zones and concurrent loading limits.
 * Returns nearest loaded frame when requested frame is not yet available.
 *
 * @param {Object} options
 * @param {number} options.frameCount - Total number of frames
 * @param {string} options.basePath - Base URL path for frames (e.g. "/frames/desktop")
 * @param {string} options.format - Image format extension (e.g. "webp")
 * @param {(loaded: number, total: number) => void} [options.onLoadProgress] - Progress callback
 * @returns {{ getFrame: (index: number) => HTMLImageElement | null, progress: { loaded: number, failed: number, total: number }, ready: boolean }}
 */
export default function useFrameLoader({ frameCount, basePath, format, onLoadProgress }) {
  const cacheRef = useRef(new Map());
  const [progress, setProgress] = useState(() => ({ loaded: 0, failed: 0, total: frameCount }));
  const [ready, setReady] = useState(false);
  const abortRef = useRef(false);
  const readyFiredRef = useRef(false);
  const onLoadProgressRef = useRef(onLoadProgress);

  useEffect(() => {
    onLoadProgressRef.current = onLoadProgress;
  }, [onLoadProgress]);

  useEffect(() => {
    abortRef.current = false;
    readyFiredRef.current = false;
    const cache = new Map();
    cacheRef.current = cache;

    const queue = buildLoadQueue(frameCount);
    let successCount = 0;
    let failedCount = 0;
    let queueIndex = 0;
    let activeCount = 0;
    const retries = new Map();
    const activeImages = [];

    function updateProgress() {
      setProgress({ loaded: successCount, failed: failedCount, total: frameCount });
      onLoadProgressRef.current?.(successCount, frameCount);
    }

    function checkReady() {
      if (!readyFiredRef.current && successCount >= Math.min(PRIORITY_FRAME_COUNT, frameCount)) {
        readyFiredRef.current = true;
        setReady(true);
      }
    }

    function loadNext() {
      if (abortRef.current) return;
      if (queueIndex >= queue.length) return;
      if (activeCount >= MAX_CONCURRENT) return;

      activeCount++;
      const frameIndex = queue[queueIndex++];
      const url = buildFrameUrl(basePath, frameIndex, format);
      const img = document.createElement("img");
      activeImages.push(img);

      img.onload = () => {
        activeCount--;
        if (abortRef.current) return;
        cache.set(frameIndex, img);
        successCount++;
        updateProgress();
        checkReady();
        loadNext();
      };

      img.onerror = () => {
        activeCount--;
        if (abortRef.current) return;
        const attempt = (retries.get(frameIndex) ?? 0) + 1;
        retries.set(frameIndex, attempt);

        if (attempt <= MAX_RETRIES) {
          queue.push(frameIndex);
        } else {
          failedCount++;
          updateProgress();
        }
        loadNext();
      };

      img.src = url;
    }

    const initialBatch = Math.min(MAX_CONCURRENT, queue.length);
    for (let i = 0; i < initialBatch; i++) {
      loadNext();
    }

    return () => {
      abortRef.current = true;
      // Abort in-flight image loads
      for (const img of activeImages) {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      }
      activeImages.length = 0;
      cacheRef.current = new Map();
    };
  }, [frameCount, basePath, format]);

  /**
   * Returns the image for the given frame index, or the nearest loaded frame.
   * @param {number} index
   * @returns {HTMLImageElement | null}
   */
  const getFrame = useCallback(
    (index) => {
      const cache = cacheRef.current;
      if (cache.has(index)) return cache.get(index);

      // Nearest-neighbor fallback: search outward from requested index
      for (let offset = 1; offset < frameCount; offset++) {
        if (cache.has(index - offset)) return cache.get(index - offset);
        if (cache.has(index + offset)) return cache.get(index + offset);
      }

      return null;
    },
    [frameCount],
  );

  return { getFrame, progress, ready };
}

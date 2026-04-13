import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 96;
const MOBILE_FRAMES = 32; // Fewer frames on mobile for performance
const FRAME_PATH = "/hero-frames/frame-";
const FRAME_EXT = ".webp";

function isMobile() {
  return window.innerWidth < 768;
}

/**
 * Apple-style image-sequence hook.
 * On mobile, loads fewer frames (every 3rd) for smoother performance.
 */
export function useFrameSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameMapRef = useRef<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentIndexRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Pre-load frames
  useEffect(() => {
    let cancelled = false;
    const mobile = isMobile();
    const totalToLoad = mobile ? MOBILE_FRAMES : TOTAL_FRAMES;
    const step = mobile ? Math.floor(TOTAL_FRAMES / MOBILE_FRAMES) : 1;

    const images: HTMLImageElement[] = [];
    const frameMap: number[] = [];
    let count = 0;

    for (let i = 0; i < totalToLoad; i++) {
      const frameNum = Math.min(i * step + 1, TOTAL_FRAMES);
      frameMap.push(frameNum);
      const img = new Image();
      img.src = `${FRAME_PATH}${String(frameNum).padStart(3, "0")}${FRAME_EXT}`;
      img.onload = () => {
        count++;
        if (count === totalToLoad && !cancelled) {
          imagesRef.current = images;
          frameMapRef.current = frameMap;
          setLoaded(true);
          drawFrame(0);
        }
      };
      images.push(img);
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index];
      if (!img) return;

      // Lower DPR on mobile for performance
      const mobile = isMobile();
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width * dpr;
      const h = rect.height * dpr;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // Cover-fit the image
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let sw: number, sh: number, sx: number, sy: number;

      if (imgRatio > canvasRatio) {
        sh = img.naturalHeight;
        sw = sh * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    },
    [canvasRef],
  );

  /** Call this with a 0-1 progress value (from scroll position) */
  const setProgress = useCallback(
    (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const totalFrames = imagesRef.current.length || 1;
      const index = Math.min(
        Math.floor(clamped * totalFrames),
        totalFrames - 1,
      );

      if (index !== currentIndexRef.current) {
        currentIndexRef.current = index;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }
    },
    [drawFrame],
  );

  return { loaded, setProgress };
}

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 96;
const FRAME_PATH = "/hero-frames/frame-";
const FRAME_EXT = ".webp";

/**
 * Apple-style image-sequence hook.
 * Pre-loads all frames into Image objects, then draws the correct one
 * on a <canvas> based on a 0-1 progress value.
 */
export function useFrameSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentIndexRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Pre-load all frames
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${String(i).padStart(3, "0")}${FRAME_EXT}`;
      img.onload = () => {
        count++;
        if (count === TOTAL_FRAMES && !cancelled) {
          imagesRef.current = images;
          setLoaded(true);
          // Draw first frame immediately
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

      // Match canvas size to its display size for crisp rendering
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      const index = Math.min(
        Math.floor(clamped * TOTAL_FRAMES),
        TOTAL_FRAMES - 1,
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

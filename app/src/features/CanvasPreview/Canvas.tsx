import { useEffect, useRef } from "react";

const long =
  "https://firebasestorage.googleapis.com/v0/b/thesync.appspot.com/o/bakalari%2Fsupl-Mon%20Jun%2007%202021%2010%3A00%3A00%20GMT%2B0000.png?alt=media&token=8ca3ab05-e918-472d-a255-1443a75f130b";

function Canvas() {
  const scroll = useRef(0);
  const ref = useRef<HTMLCanvasElement | null>(null);
  const image = useRef<HTMLImageElement | null>(null);
  const updateCanvas = () => {
    if (!ref.current || !image.current) {
      return;
    }
    const context = ref.current.getContext("2d") as CanvasRenderingContext2D;
    image.current.onload = () =>
      context.drawImage(image.current as HTMLImageElement, 0, scroll.current);
    scroll.current = scroll.current + 1;

    // context.drawImage(image.current, 0, scroll.current);
  };
  useEffect(() => {
    image.current = new Image();
    image.current.src = long;

    const interval = setInterval(updateCanvas, 100);
    return () => clearInterval(interval);
  }, []);
  return <canvas ref={ref} width={1920} height={1080}></canvas>;
}

export default Canvas;

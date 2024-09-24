import React, { useEffect, useRef } from 'react';

interface LegendProps {
  colors: string[];
}

const MiniLegend: React.FC<LegendProps> = ({ colors }) => {
  const boxSize = 20;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');

    // Adjust canvas width based on the number of colors
    canvas!.width = boxSize * colors.length;
    canvas!.height = boxSize;

    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

    colors.forEach((color, index) => {
      // Draw color box
      ctx!.fillStyle = color;
      ctx!.fillRect(index * boxSize, 0, boxSize, boxSize);
    });
  }, [colors]);

  return <canvas ref={canvasRef} style={{ height: boxSize }}></canvas>;
};

export default MiniLegend;

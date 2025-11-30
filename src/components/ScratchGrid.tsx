"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface ScratchGridProps {
  onComplete: () => void;
  gridSize?: number; // Default to 3 for a 3x3 grid
  cellPrizes: number[]; // Array of prizes for each cell
}

const ScratchGrid: React.FC<ScratchGridProps> = ({ onComplete, gridSize = 3, cellPrizes }) => {
  const totalCells = gridSize * gridSize;
  const [scratchedCells, setScratchedCells] = useState<boolean[]>(
    new Array(totalCells).fill(false)
  );
  const [isScratching, setIsScratching] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scratchedCells.every(Boolean)) {
      onComplete();
    }
  }, [scratchedCells, onComplete]);

  const handleScratch = (index: number) => {
    setScratchedCells((prev) => {
      if (!prev[index]) {
        const newScratched = [...prev];
        newScratched[index] = true;
        return newScratched;
      }
      return prev;
    });
  };

  const handleInteractionStart = (index: number) => {
    setIsScratching(true);
    handleScratch(index);
  };

  const handleInteractionMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || !gridRef.current) return;

    let clientX, clientY;
    if ('touches' in e) { // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else { // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const target = document.elementFromPoint(clientX, clientY);
    if (target && target instanceof HTMLElement && target.dataset.cellIndex) {
      const index = parseInt(target.dataset.cellIndex);
      handleScratch(index);
    }
  };

  const handleInteractionEnd = () => {
    setIsScratching(false);
  };

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid grid-cols-3 gap-2 p-4 border-4 border-dyad-yellow rounded-lg touch-none",
        "w-full max-w-xs md:max-w-md"
      )}
      onMouseLeave={handleInteractionEnd}
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={handleInteractionEnd}
      onMouseMove={handleInteractionMove}
    >
      {Array.from({ length: totalCells }).map((_, index) => (
        <div
          key={index}
          data-cell-index={index}
          className={cn(
            "relative w-20 h-20 md:w-24 md:h-24 rounded-md flex items-center justify-center text-gray-700 text-xl font-bold cursor-pointer select-none",
            scratchedCells[index] ? "bg-gray-100" : "bg-gradient-to-br from-dyad-yellow to-orange-400"
          )}
          onMouseDown={() => handleInteractionStart(index)}
          onTouchStart={() => handleInteractionStart(index)}
        >
          {scratchedCells[index] ? (
            <span className="text-green-600">R${cellPrizes[index]?.toFixed(2).replace(".", ",")}</span>
          ) : (
            <Sparkles className="h-10 w-10 text-white" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ScratchGrid;
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

// Unified Background Component
const UnifiedBackground = () => {
  const [elements, setElements] = useState([]);
  
  const floatingElements = [
    {
      size: "w-96 h-96",
      color: "bg-gradient-to-br from-blue-400/20 via-purple-500/15 to-pink-500/10",
      animation: "animate-float-slow",
      shape: "rounded-[60%_40%_50%_50%/40%_50%_60%_50%]",
      blur: "blur-3xl",
    },
    {
      size: "w-64 h-64",
      color: "bg-gradient-to-br from-red-400/25 via-orange-500/20 to-yellow-500/15",
      animation: "animate-float-delayed",
      shape: "rounded-[50%_60%_40%_50%/60%_40%_50%_60%]",
      blur: "blur-3xl",
    },
    {
      size: "w-80 h-80",
      color: "bg-gradient-to-br from-purple-400/20 to-blue-500/15",
      animation: "animate-float-slow",
      shape: "rounded-full",
      blur: "blur-3xl",
    },
    {
      size: "w-48 h-48",
      color: "border-4 border-dashed border-blue-400/30",
      animation: "animate-spin-slow",
      shape: "rounded-full",
    },
    {
      size: "w-40 h-40",
      color: "border-4 border-dashed border-red-400/30",
      animation: "animate-spin-slow",
      shape: "rounded-full",
    },
    ...Array(12).fill(null).map(() => ({
      size: "w-4 h-4",
      color: `bg-${['blue', 'red', 'purple', 'orange'][Math.floor(Math.random() * 4)]}-500/40`,
      animation: "animate-pulse-glow",
      shape: "rounded-full",
      blur: "blur-sm",
    })),
  ];

  useEffect(() => {
    const generateElements = () => {
      return floatingElements.map((base, i) => ({
        ...base,
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        delay: `${Math.random() * 8}s`,
        scale: Math.random() * 0.4 + 0.8,
      }));
    };

    setElements(generateElements());

    const interval = setInterval(() => {
      setElements(generateElements());
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${element.animation}`}
          style={{
            left: element.left,
            top: element.top,
            animationDelay: element.delay,
            transform: `scale(${element.scale})`,
          }}
        >
          <div
            className={`
              ${element.size}
              ${element.color}
              ${element.shape}
              ${element.blur || ""}
              transition-all duration-1000
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default UnifiedBackground ;
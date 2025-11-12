"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ConnectionLinesProps {
  currentMode: string;
  animationComplete: boolean;
  inputSources: { name: string; icon: string; description: string }[];
  outputDestinations: { name: string; icon: string; description: string }[];
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  currentMode,
  animationComplete,
  inputSources,
  outputDestinations,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!animationComplete) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    canvas.width = parentElement.offsetWidth;
    canvas.height = parentElement.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Animation properties
    let animationFrame: number;
    let progress = 0;
    let dashOffset = 0;
    const animationDuration = 1000; // 1 second
    const startTime = performance.now();

    const lineColor =
      currentMode === "dark"
        ? "rgba(147, 197, 253, 0.5)"
        : "rgba(37, 99, 235, 0.3)";

    const drawAnimatedLine = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      progress: number,
    ) => {
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;

      // Set up the dotted/dashed line style
      ctx.setLineDash([4, 4]); // [dash length, gap length]
      ctx.lineDashOffset = -dashOffset; // Animate the dash offset

      // Calculate current end point based on progress
      const currentEndX = startX + (endX - startX) * progress;
      const currentEndY = startY + (endY - startY) * progress;

      // Draw the path
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentEndX, currentEndY);

      // Add glow effect
      ctx.shadowColor = lineColor;
      ctx.shadowBlur = 5;
      ctx.stroke();

      // Reset shadow for next drawing
      ctx.shadowBlur = 0;
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      progress = Math.min(elapsed / animationDuration, 1);

      // Update dash offset for sliding effect
      dashOffset = (dashOffset + 0.5) % 8;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw desktop connections
      const inputItems = parentElement.querySelectorAll(".input-item");
      const outputItems = parentElement.querySelectorAll(".output-item");
      const pgWire = parentElement.querySelector(".connector-item");
      const database = parentElement.querySelector(".database-item");

      if (inputItems.length && pgWire && database && outputItems.length) {
        const pgWireRect = pgWire.getBoundingClientRect();
        const pgWireX =
          pgWireRect.left +
          pgWireRect.width / 2 -
          parentElement.getBoundingClientRect().left;
        const pgWireY =
          pgWireRect.top +
          pgWireRect.height / 2 -
          parentElement.getBoundingClientRect().top;

        const databaseRect = database.getBoundingClientRect();
        const databaseX =
          databaseRect.left +
          databaseRect.width / 2 -
          parentElement.getBoundingClientRect().left;
        const databaseY =
          databaseRect.top +
          databaseRect.height / 2 -
          parentElement.getBoundingClientRect().top;

        // Animate main connection
        drawAnimatedLine(
          pgWireX + pgWireRect.width / 2,
          pgWireY,
          databaseX - databaseRect.width / 2,
          databaseY,
          progress,
        );

        // Animate input connections
        inputItems.forEach((input, index) => {
          const inputRect = input.getBoundingClientRect();
          const inputX =
            inputRect.right - parentElement.getBoundingClientRect().left;
          const inputY =
            inputRect.top +
            inputRect.height / 2 -
            parentElement.getBoundingClientRect().top;

          drawAnimatedLine(
            inputX,
            inputY,
            pgWireX - pgWireRect.width / 2,
            pgWireY,
            progress,
          );
        });

        // Animate output connections
        outputItems.forEach((output) => {
          const outputRect = output.getBoundingClientRect();
          const outputX =
            outputRect.left - parentElement.getBoundingClientRect().left;
          const outputY =
            outputRect.top +
            outputRect.height / 2 -
            parentElement.getBoundingClientRect().top;

          drawAnimatedLine(
            databaseX + databaseRect.width / 2,
            databaseY,
            outputX,
            outputY,
            progress,
          );
        });
      }

      // Draw mobile connections with animation
      const inputItemsMobile =
        parentElement.querySelectorAll(".input-item-mobile");
      const outputItemsMobile = parentElement.querySelectorAll(
        ".output-item-mobile",
      );
      const pgWireMobile = parentElement.querySelector(
        ".connector-item-mobile",
      );
      const databaseMobile = parentElement.querySelector(
        ".database-item-mobile",
      );

      if (
        inputItemsMobile.length &&
        pgWireMobile &&
        databaseMobile &&
        outputItemsMobile.length
      ) {
        const pgWireRectMobile = pgWireMobile.getBoundingClientRect();
        const pgWireXMobile =
          pgWireRectMobile.left +
          pgWireRectMobile.width / 2 -
          parentElement.getBoundingClientRect().left;
        const pgWireYMobile =
          pgWireRectMobile.top +
          pgWireRectMobile.height / 2 -
          parentElement.getBoundingClientRect().top;

        const databaseRectMobile = databaseMobile.getBoundingClientRect();
        const databaseXMobile =
          databaseRectMobile.left +
          databaseRectMobile.width / 2 -
          parentElement.getBoundingClientRect().left;
        const databaseYMobile =
          databaseRectMobile.top +
          databaseRectMobile.height / 2 -
          parentElement.getBoundingClientRect().top;

        // Animate main mobile connection
        drawAnimatedLine(
          pgWireXMobile + pgWireRectMobile.width / 2,
          pgWireYMobile,
          databaseXMobile - databaseRectMobile.width / 2,
          databaseYMobile,
          progress,
        );

        // Animate mobile input connections
        inputItemsMobile.forEach((input) => {
          const inputRectMobile = input.getBoundingClientRect();
          const inputXMobile =
            inputRectMobile.right - parentElement.getBoundingClientRect().left;
          const inputYMobile =
            inputRectMobile.top +
            inputRectMobile.height / 2 -
            parentElement.getBoundingClientRect().top;

          drawAnimatedLine(
            inputXMobile,
            inputYMobile,
            pgWireXMobile - pgWireRectMobile.width / 2,
            pgWireYMobile,
            progress,
          );
        });

        // Animate mobile output connections
        outputItemsMobile.forEach((output) => {
          const outputRectMobile = output.getBoundingClientRect();
          const outputXMobile =
            outputRectMobile.left - parentElement.getBoundingClientRect().left;
          const outputYMobile =
            outputRectMobile.top +
            outputRectMobile.height / 2 -
            parentElement.getBoundingClientRect().top;

          drawAnimatedLine(
            databaseXMobile + databaseRectMobile.width / 2,
            databaseYMobile,
            outputXMobile,
            outputYMobile,
            progress,
          );
        });
      }

      // Continue animation
      if (progress < 1 || true) {
        // Always continue for sliding effect
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [animationComplete, currentMode]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: animationComplete ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
  );
};

export default ConnectionLines;

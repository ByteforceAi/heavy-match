"use client";

import { useRef, useState, useEffect } from "react";
import { colors } from "@/lib/design-system";

interface Props {
  onSave: (dataUrl: string) => void;
  width?: number;
  height?: number;
}

export default function SignatureCanvas({ onSave, width = 600, height = 200 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colors.ink;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = colors.ink4;
    ctx.font = "16px 'Pretendard Variable', Pretendard, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("여기에 서명해주세요", width / 2, height / 2);
  }, [width, height]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    if (isEmpty) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = colors.ink;
    }
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setIsEmpty(false);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = colors.ink4;
    ctx.font = "16px 'Pretendard Variable', Pretendard, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("여기에 서명해주세요", width / 2, height / 2);
    setIsEmpty(true);
  };

  const save = () => {
    if (isEmpty) return;
    const dataUrl = canvasRef.current?.toDataURL("image/png");
    if (dataUrl) onSave(dataUrl);
  };

  return (
    <div className="space-y-3">
      <div className="border border-dashed border-cy-navy/25 rounded-2xl overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair"
          style={{ height: "160px" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
      <div className="flex gap-3">
        <button onClick={clear}
          className="press flex-1 min-h-12 text-base font-semibold text-cy-ink-2 border border-cy-line rounded-xl hover:bg-cy-bg hover:border-cy-navy/25 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-lg">delete</span>지우기
        </button>
        <button onClick={save} disabled={isEmpty}
          className="press flex-1 min-h-12 text-base font-bold bg-cy-navy text-white rounded-xl hover:bg-cy-navy-mid disabled:opacity-40 shadow-[0_4px_12px_rgba(0,44,95,0.2)] flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-lg">check_circle</span>서명 저장
        </button>
      </div>
    </div>
  );
}

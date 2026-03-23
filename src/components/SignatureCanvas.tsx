"use client";

import { useRef, useState, useEffect } from "react";

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

    // 모바일 고해상도 대응 (레티나)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.lineWidth = 3; // 두꺼운 선 (모바일에서 잘 보이게)
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1E293B";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // 안내 텍스트
    ctx.fillStyle = "#CBD5E1";
    ctx.font = "16px Pretendard, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("여기에 서명해주세요", width / 2, height / 2);
  }, [width, height]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // 첫 터치 시 안내 텍스트 지우기
    if (isEmpty) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "#1E293B";
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
    ctx.fillStyle = "#CBD5E1";
    ctx.font = "16px Pretendard, sans-serif";
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
      <div className="border-2 border-dashed border-primary/30 rounded-2xl overflow-hidden bg-white">
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
        <button
          onClick={clear}
          className="flex-1 py-3 text-base font-medium border-2 border-border rounded-xl hover:bg-gray-50 active:bg-gray-100 transition touch-active"
        >
          🗑️ 지우기
        </button>
        <button
          onClick={save}
          disabled={isEmpty}
          className="flex-1 py-3 text-base font-bold bg-primary text-white rounded-xl hover:bg-primary-light active:bg-blue-800 transition disabled:opacity-40 touch-active"
        >
          ✅ 서명 저장
        </button>
      </div>
    </div>
  );
}

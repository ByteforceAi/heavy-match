"use client";

/**
 * Boot Splash — 세션당 1회 재생되는 로고 어셈블리 애니메이션.
 * 중장비 부품이 조립되는 메타포.
 * localStorage로 세션 체크.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as tokens } from "@/lib/design-system";

export default function BootSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = "hm-splash-seen";
    if (!sessionStorage.getItem(key)) {
      setShow(true);
      sessionStorage.setItem(key, "1");
      setTimeout(() => setShow(false), 3200);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 1, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: "#0A0A0B",
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo Assembly Animation */}
            <div className="relative w-20 h-20">
              {/* Background rect */}
              <motion.div
                initial={{ scale: 0, borderRadius: "50%" }}
                animate={{ scale: 1, borderRadius: "17.5%" }}
                transition={{ ...tokens.spring.bouncy, delay: 0.2 }}
                className="absolute inset-0 bg-[#121216] border border-[#3A3D45]/40"
                style={{ borderRadius: "17.5%" }}
              />
              {/* H stroke */}
              <motion.svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
                <motion.path
                  d="M16 18 L16 46 M16 32 L28 32 M28 18 L28 46"
                  stroke="#FAFAFA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                />
                {/* M stroke */}
                <motion.path
                  d="M36 46 L36 18 L42 32 L48 18 L48 46"
                  stroke="#FF6B1A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                />
                {/* Bottom bar */}
                <motion.rect
                  x="14" y="52" width="36" height="2.5" rx="1.25"
                  fill="#FF6B1A"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                />
              </motion.svg>
            </div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="flex items-center gap-1"
            >
              <span className="text-2xl font-black text-[#FAFAFA] tracking-[-0.03em]">HEAVY</span>
              <span className="text-2xl font-black text-[#FF6B1A] tracking-[-0.03em]">MATCH</span>
            </motion.div>

            {/* Loading bar */}
            <motion.div className="w-32 h-0.5 bg-[#242428] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF6B1A] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, delay: 0.3, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

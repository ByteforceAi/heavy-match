"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import {
  TypedLog, NetworkActivityBar, SMSSendingIndicator,
  DBWriteIndicator, RealtimeIndicator, StatusTransition, SystemClock, ProcessingPulse,
} from "@/components/motion/NativeFeel";

/** System Log 문자열을 TypedLog 형식으로 파싱 — 화살표(→) 단위로 분할 */
function parseSystemLog(log: string): { text: string; color?: string; delay?: number }[] {
  const parts = log.split("→").map((p) => p.trim()).filter(Boolean);
  return parts.map((text, i) => ({
    text,
    // POST/GET은 주황, UPDATE/INSERT는 파랑, 나머지는 초록
    color: /^(POST|GET|DELETE|PUT)/i.test(text) ? "#FFA523"
         : /^(UPDATE|INSERT|SELECT|UPSERT)/i.test(text) ? "#3B82F6"
         : /SMS/i.test(text) ? "#FF6B1A"
         : "#10B981",
    delay: i === 0 ? 100 : 300,  // 각 줄 사이 300ms 지연
  }));
}

// ═════ 시나리오 데이터 ═════
const SCENARIO = {
  equipment: "크레인 50T",
  time: "오전(4h)",
  site: "서울시 강남구 삼성동 코엑스 신축현장",
  company: "한양건설(주)",
  requester: "김건설 소장",
  owner: "박중장비 (대한크레인)",
  operator: "이기사",
  price: 1200000,
  commission: 180000,
};

interface Step {
  id: number;
  label: string;
  timer?: number;
  leftRole: string;
  leftIcon: string;
  leftTitle: string;
  leftContent: React.ReactNode;
  rightRole: string;
  rightIcon: string;
  rightTitle: string;
  rightContent: React.ReactNode;
  systemLog: string;
}

function MiniCard({ children, glow, className = "" }: { children: React.ReactNode; glow?: boolean; className?: string }) {
  return (
    <div className={`bg-white rounded-lg p-2.5 border text-xs transition-all ${glow ? "border-[#0059b9]/40 ring-1 ring-[#0059b9]/10 shadow-md" : "border-[#c1c6d6]/30 shadow-sm"} ${className}`}>
      {children}
    </div>
  );
}

function MiniBadge({ label, color }: { label: string; color: string }) {
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${color}`}>{label}</span>;
}

// ═════ 6단계 정의 (각 단계별 좌우 화면 + 시스템 로그) ═════
const STEPS: Step[] = [
  {
    id: 0, label: "장비 요청", timer: undefined,
    leftRole: "장비요청자", leftIcon: "person_search", leftTitle: "6단계 위자드 입력 중",
    leftContent: (
      <div className="space-y-2">
        {/* 진행바 */}
        <div className="flex gap-1">
          {[1,2,3,4,5,6].map((s,i) => (
            <motion.div
              key={s}
              className="flex-1 h-1.5 rounded-full bg-[#c1c6d6]/30"
              initial={false}
              animate={{ backgroundColor: "#0059b9" }}
              transition={{ delay: 0.15 + i * 0.2 }}
            />
          ))}
        </div>

        {/* 장비 선택 */}
        <div className="grid grid-cols-2 gap-1">
          {["🏗️ 크레인","⛏️ 굴삭기","🔝 스카이","💧 펌프카"].map((e, i) => (
            <motion.div
              key={e}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                borderColor: e.includes("크레인") ? "#0059b9" : "rgba(193,198,214,0.3)",
                backgroundColor: e.includes("크레인") ? "#eef4ff" : "transparent",
              }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="text-center p-1.5 rounded-lg border text-[10px] font-bold"
              style={{ color: e.includes("크레인") ? "#0059b9" : "#727785" }}
            >
              {e}
            </motion.div>
          ))}
        </div>

        {/* 선택 확정 */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-[#eef4ff] rounded-lg p-2"
        >
          <p className="font-bold text-[11px] text-[#111c29]">크레인 50T · 오전(4h)</p>
          <p className="text-[#0059b9] font-black text-sm tabular-nums">{formatPrice(SCENARIO.price)}원</p>
        </motion.div>

        {/* 서명 SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="border-t border-dashed border-[#c1c6d6]/30 pt-1.5"
        >
          <p className="text-[9px] text-[#727785] mb-1">전자서명</p>
          <div className="h-8 bg-[#f8f9ff] rounded border border-dashed border-[#0059b9]/30 relative overflow-hidden">
            <motion.svg viewBox="0 0 200 32" className="w-full h-full">
              <motion.path
                d="M 15 18 Q 35 5, 55 20 T 100 18 Q 115 10, 130 22 T 180 16"
                stroke="#0059b9"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, delay: 1.5, ease: "easeInOut" }}
              />
            </motion.svg>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
              className="absolute top-1 right-1 text-[8px] text-emerald-600 font-bold"
            >
              ✓
            </motion.span>
          </div>
        </motion.div>
      </div>
    ),
    rightRole: "시스템", rightIcon: "cloud_sync", rightTitle: "요청 대기",
    rightContent: (
      <div className="flex flex-col items-center justify-center py-6 space-y-2">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="material-symbols-outlined text-4xl text-[#c1c6d6]" style={{ fontVariationSettings: "'FILL' 1" }}>
            cloud_sync
          </span>
        </motion.div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280] font-mono">
          <motion.span
            className="w-1 h-1 bg-[#6B7280] rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span>서버 준비 완료 · 요청 대기 중</span>
        </div>
      </div>
    ),
    systemLog: "POST /api/dispatch/create → body: {equipment_id, spec, time, company, site, signature} → validate input → INSERT dispatch_requests (status='exclusive_call', exclusive_call_at=NOW()) → trigger SMS dispatch",
  },
  {
    id: 1, label: "전용콜 (60초)", timer: 10,
    leftRole: "시스템", leftIcon: "sms", leftTitle: "Naver Cloud SMS API",
    leftContent: (
      <SMSSendingIndicator
        recipient="박중장비 (010-9876-****)"
        message={`[Heavy Match] 크레인 50T 요청\n현장: 코엑스 신축현장\n금액: 1,200,000원\n확인: heavy-match.kr/call/...`}
        duration={1800}
      />
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "콜 수신 (Realtime)",
    rightContent: (
      <div className="space-y-2">
        {/* Realtime 수신 시뮬레이션 */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.9, type: "spring", stiffness: 300, damping: 18 }}
        >
          <MiniCard glow>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <MiniBadge label="전용콜 ● NEW" color="bg-[#d7e2ff] text-[#004491]" />
              </motion.span>
            </div>
            <p className="text-[9px] text-[#414754]">코엑스 신축현장</p>
            <p className="text-[#0059b9] font-black text-sm tabular-nums">{formatPrice(SCENARIO.price)}원</p>
            <div className="flex gap-1 mt-1.5">
              <motion.div
                className="flex-1 py-1 bg-emerald-500 text-white text-center rounded text-[10px] font-bold"
                whileHover={{ scale: 1.02 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(16,185,129,0.4)", "0 0 0 6px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                수락
              </motion.div>
              <div className="flex-1 py-1 bg-[#ba1a1a]/60 text-white text-center rounded text-[10px] font-bold">거절</div>
            </div>
          </MiniCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="flex items-center justify-center gap-1.5 text-[9px] text-emerald-400 font-mono"
        >
          <motion.span
            className="w-1 h-1 bg-emerald-400 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          Realtime channel 구독 중 · dispatch_requests
        </motion.div>
      </div>
    ),
    systemLog: "POST /api/dispatch/create → INSERT dispatch_requests (status='exclusive_call') → INSERT sms_logs → exclusive_call_at = NOW() → Naver Cloud SMS 발송",
  },
  {
    id: 2, label: "사장 수락",
    leftRole: "장비요청자", leftIcon: "person_search", leftTitle: "Realtime push",
    leftContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 18 }}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 text-center"
        >
          <motion.span
            className="material-symbols-outlined text-2xl text-emerald-400"
            style={{ fontVariationSettings: "'FILL' 1" }}
            animate={{ scale: [0.8, 1.15, 1] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            check_circle
          </motion.span>
          <p className="text-[11px] font-bold text-emerald-400 mt-0.5">📩 배차 매칭 완료!</p>
          <p className="text-[9px] text-[#8899b3]">대한크레인 박중장비 수락</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <StatusTransition
            from="exclusive_call"
            to="matched"
            fromColor="#FF6B1A"
            toColor="#10B981"
            duration={900}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-[9px] text-[#6B7280] font-mono flex items-center gap-1.5"
        >
          <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
          Supabase Realtime → 요청자 디바이스 푸시
        </motion.div>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "수락 & 정산 생성",
    rightContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 text-center"
        >
          <span className="material-symbols-outlined text-xl text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <p className="text-[10px] font-bold text-emerald-400">수락 완료 · 200 OK</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <DBWriteIndicator
            operation="INSERT"
            table="commissions"
            fields={["company_fee: 60,000", "callcenter_fee: 30,000", "salesperson_fee: 30,000", "requester_reward: 60,000"]}
            duration={1100}
          />
        </motion.div>
      </div>
    ),
    systemLog: "POST /api/dispatch/accept → UPDATE dispatch_requests SET status='matched', matched_at=NOW() → INSERT commissions (15% split) → UPSERT call_history (재주문 이력)",
  },
  {
    id: 3, label: "기사 배정",
    leftRole: "시스템", leftIcon: "sms", leftTitle: "Naver Cloud SMS API",
    leftContent: (
      <div className="space-y-2">
        <SMSSendingIndicator
          recipient="이기사 (010-5555-****)"
          message={`[Heavy Match] 배차 안내\n크레인 50T · 코엑스 신축현장\n담당자: 홍현장 010-9876-****`}
          duration={1400}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <StatusTransition
            from="matched"
            to="operator_assigned"
            fromColor="#10B981"
            toColor="#0059b9"
            duration={800}
          />
        </motion.div>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "기사 선택 UI",
    rightContent: (
      <div className="space-y-1.5">
        <p className="text-[9px] text-[#6B7280] font-mono mb-1">소속 기사 3명 · 선택 대기</p>
        {["이기사","장운전","손기술"].map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className={`flex items-center justify-between p-1.5 rounded-lg border text-[10px] ${i === 0 ? "border-[#FF6B1A] bg-[#FF6B1A]/10 ring-2 ring-[#FF6B1A]/20" : "border-[#c1c6d6]/30"}`}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#d7e2ff] rounded-full flex items-center justify-center text-[8px] font-bold text-[#0059b9]">{name[0]}</div>
              <span className="font-bold">{name}</span>
            </div>
            {i === 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 15 }}
              >
                <MiniBadge label="✓ 배정" color="bg-[#FF6B1A] text-white" />
              </motion.span>
            ) : <span className="text-[#c1c6d6]">선택</span>}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <DBWriteIndicator
            operation="UPDATE"
            table="dispatch_requests"
            fields={["status = 'operator_assigned'", "assigned_operator_id = '이기사'"]}
            duration={900}
          />
        </motion.div>
      </div>
    ),
    systemLog: "POST /api/dispatch/assign → UPDATE dispatch_requests SET status='operator_assigned', assigned_operator_id='이기사' WHERE status='matched' → Naver Cloud SMS 발송",
  },
  {
    id: 4, label: "작업 시작",
    leftRole: "기사", leftIcon: "engineering", leftTitle: "현장 도착 & 시작 보고",
    leftContent: (
      <div className="space-y-2">
        {/* 현장 도착 GPS 알림 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <motion.span
              className="material-symbols-outlined text-sm text-amber-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              location_on
            </motion.span>
            <span className="text-[10px] font-bold text-amber-500">현장 도착 확인</span>
          </div>
          <p className="text-[9px] text-[#9CA3AF]">서울시 강남구 삼성동 · 08:47 AM</p>
        </motion.div>

        {/* 작업 시작 버튼 애니메이션 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <MiniCard glow>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
              <MiniBadge label="기사배정" color="bg-[#e5eeff] text-[#0059b9]" />
            </div>
            <p className="text-[9px] text-[#414754]">코엑스 신축현장</p>
            <motion.div
              className="mt-1 py-1.5 bg-amber-500 text-white text-center rounded text-[10px] font-bold flex items-center justify-center gap-1"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(251,191,36,0.6)",
                  "0 0 0 8px rgba(251,191,36,0)",
                  "0 0 0 0 rgba(251,191,36,0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="material-symbols-outlined text-xs">rocket_launch</span>
              작업 시작
            </motion.div>
          </MiniCard>
        </motion.div>

        {/* Status transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <StatusTransition
            from="operator_assigned"
            to="in_progress"
            fromColor="#0059b9"
            toColor="#8B5CF6"
            duration={900}
          />
        </motion.div>
      </div>
    ),
    rightRole: "장비요청자", rightIcon: "person_search", rightTitle: "Realtime 진행 모니터링",
    rightContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <MiniCard>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[11px]">크레인 50T</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, type: "spring" }}
              >
                <MiniBadge label="● 작업중" color="bg-amber-100 text-amber-700" />
              </motion.span>
            </div>
            <p className="text-[9px] text-[#414754]">코엑스 신축현장</p>

            {/* Progress bar animated */}
            <div className="mt-1.5 h-1.5 bg-[#d8e3f5] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "35%" }}
                transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-[8px] text-[#727785] flex items-center gap-1"
              >
                <motion.span
                  className="w-1 h-1 bg-amber-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                작업 진행중
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                className="text-[8px] text-amber-600 font-mono font-bold"
              >
                35%
              </motion.span>
            </div>
          </MiniCard>
        </motion.div>

        {/* Realtime push */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex items-center gap-1.5 text-[9px] text-[#0059b9] font-mono px-1"
        >
          <motion.span
            className="w-1 h-1 bg-[#0059b9] rounded-full"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          Supabase Realtime · 상태 변경 자동 수신
        </motion.div>
      </div>
    ),
    systemLog: "POST /api/dispatch/start → UPDATE dispatch_requests SET status='in_progress' WHERE assigned_operator_id=$1 → Supabase Realtime broadcast → 요청자 디바이스 실시간 갱신",
  },
  {
    id: 5, label: "작업 완료",
    leftRole: "기사", leftIcon: "engineering", leftTitle: "전자서명 + 완료 전송",
    leftContent: (
      <div className="space-y-2">
        {/* 서명 캔버스 시뮬레이션 */}
        <div className="border-2 border-dashed border-[#0059b9]/30 rounded-lg p-2 bg-white relative overflow-hidden">
          <motion.svg
            viewBox="0 0 200 40"
            className="w-full h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.path
              d="M 10 25 Q 30 10, 50 25 T 90 25 Q 100 15, 110 28 T 150 22 Q 165 18, 180 26"
              stroke="#0059b9"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
            />
          </motion.svg>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="text-[9px] text-emerald-600 text-right italic"
          >
            ✓ 기사 서명 저장됨
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
          <StatusTransition
            from="in_progress"
            to="completed"
            fromColor="#8B5CF6"
            toColor="#10B981"
            duration={900}
          />
        </motion.div>
      </div>
    ),
    rightRole: "시스템", rightIcon: "receipt_long", rightTitle: "작업확인서 생성",
    rightContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <DBWriteIndicator
            operation="UPDATE"
            table="dispatch_requests"
            fields={["status = 'completed'", "operator_signature = base64...", "completed_at = NOW()"]}
            duration={1100}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, type: "spring", stiffness: 300, damping: 18 }}
          className="bg-[#eef4ff] rounded-lg p-2 border border-[#0059b9]/20"
        >
          <p className="text-[10px] font-bold text-center text-[#0059b9] mb-1">📋 작업확인서 PDF 생성됨</p>
          <div className="text-[9px] text-[#414754] space-y-0.5">
            <p>장비: 크레인 50T · 오전(4h)</p>
            <p>건설사: {SCENARIO.company}</p>
            <p>금액: <span className="font-black">{formatPrice(SCENARIO.price)}원</span></p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-1.5">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.0, type: "spring" }}
              className="bg-emerald-50 rounded p-1 text-center text-[8px] border border-emerald-200"
            >
              <p className="text-[#727785]">요청자 서명</p>
              <p className="italic text-emerald-600 font-bold">✓ 검증됨</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.15, type: "spring" }}
              className="bg-emerald-50 rounded p-1 text-center text-[8px] border border-emerald-200"
            >
              <p className="text-[#727785]">기사 서명</p>
              <p className="italic text-emerald-600 font-bold">✓ 검증됨</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
    systemLog: "POST /api/dispatch/complete → UPDATE status='completed' → operator_signature (base64 PNG) 저장 → completed_at=NOW() → PDF 작업확인서 자동 생성 → 요청자+기사 SMS 발송",
  },
];

// ═════ STEPS_A = 기존 해피패스 (6단계) ═════
const STEPS_A: Step[] = STEPS;

// ═════ STEPS_B = 에스컬레이션 경로 (8단계) ═════
const STEPS_B: Step[] = [
  STEPS[0], // B-1: 장비 요청 (동일)
  STEPS[1], // B-2: 전용콜 발송 (동일, 10초 타이머)
  { // B-3: 타이머 만료 → 콜센터 전달
    id: 20, label: "⚠️ 타이머 만료",
    leftRole: "Vercel Cron", leftIcon: "schedule", leftTitle: "1분 간격 자동 체크",
    leftContent: (
      <div className="space-y-2">
        <motion.div
          animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0.4)", "0 0 0 10px rgba(239,68,68,0)", "0 0 0 0 rgba(239,68,68,0)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-[#EF4444]/10 border border-[#EF4444]/40 rounded-lg p-3 text-center"
        >
          <motion.span
            className="material-symbols-outlined text-3xl text-[#EF4444]"
            style={{ fontVariationSettings: "'FILL' 1" }}
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            timer_off
          </motion.span>
          <p className="text-[11px] font-bold text-[#EF4444] mt-1">전용콜 60초 만료</p>
          <p className="text-[9px] text-[#9CA3AF]">박중장비 사장 · 미수락</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <StatusTransition
            from="exclusive_call"
            to="callcenter_call"
            fromColor="#FF6B1A"
            toColor="#FFA523"
            duration={900}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-[9px] text-amber-400 font-bold text-center"
        >
          ▼ 자동 에스컬레이션 실행 ▼
        </motion.div>
      </div>
    ),
    rightRole: "콜센터", rightIcon: "support_agent", rightTitle: "콜 자동 전달됨",
    rightContent: (
      <div className="space-y-2">
        <SMSSendingIndicator
          recipient="정콜센터 (중부콜센터)"
          message={`[Heavy Match] 콜 전달\n박중장비 미수락 건\n크레인 50T · 코엑스 현장\n처리: heavy-match.kr/call/...`}
          duration={1400}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <MiniCard glow>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
              <MiniBadge label="콜센터 전달" color="bg-amber-100 text-amber-700" />
            </div>
            <p className="text-[9px] text-[#414754]">박중장비 미수락 → 콜센터 자동 전달</p>
            <p className="text-[#0059b9] font-black text-sm tabular-nums">{formatPrice(SCENARIO.price)}원</p>
          </MiniCard>
        </motion.div>
      </div>
    ),
    systemLog: "GET /api/cron/timer → SELECT dispatch_requests WHERE exclusive_call_at < NOW() - 60s → UPDATE status='callcenter_call', callcenter_call_at=NOW() → Naver Cloud SMS to 콜센터",
  },
  { // B-4: 콜센터 60초 대기
    id: 21, label: "콜센터 대기", timer: 8,
    leftRole: "콜센터", leftIcon: "support_agent", leftTitle: "상담원 처리 대기",
    leftContent: (
      <div className="space-y-2">
        {/* 콜센터 상담원 heads-up display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2"
        >
          <div className="flex items-center justify-between text-[9px] font-mono mb-1">
            <span className="text-amber-500 font-bold">INCOMING CALL</span>
            <motion.span
              className="w-1.5 h-1.5 bg-amber-500 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
          <p className="text-[10px] text-amber-500">정콜센터 상담원 · 대기 중</p>
        </motion.div>

        {/* 콜 처리 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MiniCard glow>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
              <MiniBadge label="대기" color="bg-amber-100 text-amber-700" />
            </div>
            <p className="text-[9px] text-[#414754]">코엑스 신축현장 · {formatPrice(SCENARIO.price)}원</p>
            <div className="flex gap-1 mt-1.5">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex-1 py-1 bg-emerald-500 text-white text-center rounded text-[10px] font-bold cursor-pointer"
              >
                직접 수락
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(0,89,185,0.4)",
                    "0 0 0 6px rgba(0,89,185,0)",
                    "0 0 0 0 rgba(0,89,185,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-1 py-1 bg-[#0059b9] text-white text-center rounded text-[10px] font-bold cursor-pointer"
              >
                공유콜 전환
              </motion.div>
            </div>
          </MiniCard>
        </motion.div>

        {/* 60초 타이머 바 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 text-[9px] text-[#FFA523]"
        >
          <span className="material-symbols-outlined text-xs">timer</span>
          <div className="flex-1 h-1 bg-[#242428] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </div>
          <span className="font-mono font-bold">자동 에스컬레이션</span>
        </motion.div>
      </div>
    ),
    rightRole: "장비요청자", rightIcon: "person_search", rightTitle: "대기 화면 (Realtime)",
    rightContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MiniCard>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[11px]">크레인 50T</span>
              <MiniBadge label="콜센터 전달됨" color="bg-amber-100 text-amber-700" />
            </div>
            <p className="text-[9px] text-[#414754] mb-1.5">콜센터에서 처리 중입니다...</p>

            <div className="h-1 bg-[#d8e3f5] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                animate={{ width: ["0%", "90%"] }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </div>

            <div className="flex justify-between mt-0.5 text-[8px]">
              <span className="text-[#727785]">전달 시각 09:14:22</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-amber-600 font-bold"
              >
                진행중
              </motion.span>
            </div>
          </MiniCard>
        </motion.div>

        {/* 가능한 다음 단계 예고 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-[#1A1A20] border border-[#3A3D45]/40 rounded-lg p-2 text-[9px] font-mono"
        >
          <p className="text-[#6B7280] mb-1">다음 단계 예상</p>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1 h-1 bg-emerald-400 rounded-full" />
              <span className="flex-1">A) 콜센터 직접 수락</span>
              <span>→ 즉시 매칭</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#3B82F6]">
              <span className="w-1 h-1 bg-[#3B82F6] rounded-full" />
              <span className="flex-1">B) 공유콜 전환</span>
              <span>→ 지역 사장 Broadcast</span>
            </div>
          </div>
        </motion.div>
      </div>
    ),
    systemLog: "콜센터 상담원이 60초간 처리 대기 중 → 수동 판단 대기 → 만료 시 자동 UPDATE status='shared_call' + shared_call_at=NOW() → 지역 매칭 알고리즘 호출",
  },
  { // B-5: 공유콜 전환 (Broadcast)
    id: 22, label: "공유콜 전환",
    leftRole: "시스템", leftIcon: "campaign", leftTitle: "지역 사장 Broadcast",
    leftContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatusTransition
            from="callcenter_call"
            to="shared_call"
            fromColor="#FFA523"
            toColor="#3B82F6"
            duration={700}
          />
        </motion.div>

        <div className="bg-[#111] rounded-lg border border-[#3A3D45] p-2">
          <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-mono">
            <motion.span
              className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[#3B82F6] font-bold uppercase tracking-wider">Broadcasting · 3 recipients</span>
          </div>
          {["김임대 (한국중기)", "최장비 (경인중장비)", "강중장 (충청크레인)"].map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.25 }}
              className="flex items-center gap-2 text-[10px] font-mono py-0.5"
            >
              <motion.span
                className="material-symbols-outlined text-xs text-emerald-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0 + i * 0.25, type: "spring" }}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                send
              </motion.span>
              <span className="text-[#D1D5DB]">{n}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.25 }}
                className="ml-auto text-[8px] text-emerald-400 font-bold"
              >
                ✓ Sent
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="text-center text-[9px] text-amber-400 font-bold"
        >
          🏁 선착순 매칭 시작
        </motion.p>
      </div>
    ),
    rightRole: "중장비사장 3명", rightIcon: "groups", rightTitle: "동시 수신 · 선착순 경쟁",
    rightContent: (
      <div className="space-y-1.5">
        {["김임대", "최장비", "강중장"].map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.2 }}
          >
            <MiniCard glow={i === 1}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${i === 1 ? "bg-emerald-500 text-white" : "bg-[#d7e2ff] text-[#0059b9]"}`}>{name[0]}</div>
                  <span className="text-[10px] font-bold">{name}</span>
                </div>
                {i === 1 ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, -10, 0] }}
                    transition={{ delay: 2.4, type: "spring", stiffness: 400 }}
                    className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold shadow-lg"
                  >
                    ⚡ 수락!
                  </motion.span>
                ) : (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: 3, delay: 1.5 + i * 0.2 }}
                    className="text-[9px] text-[#FFA523]"
                  >
                    대기중...
                  </motion.span>
                )}
              </div>
            </MiniCard>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7 }}
          className="text-[9px] text-[#6B7280] font-mono text-center pt-1"
        >
          Race condition 방지: UPDATE WHERE status=&apos;shared_call&apos;
        </motion.div>
      </div>
    ),
    systemLog: "UPDATE dispatch_requests SET status='shared_call', shared_call_at=NOW() → 지역 매칭 알고리즘 실행 → Broadcast SMS to 3명 (지역+장비종류 일치) → 선착순 대기",
  },
  { // B-6: 다른 사장 수락
    id: 23, label: "다른 사장 수락",
    leftRole: "장비요청자", leftIcon: "person_search", leftTitle: "매칭 알림",
    leftContent: (
      <div className="bg-emerald-50 rounded-lg p-2 text-center">
        <span className="material-symbols-outlined text-2xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        <p className="text-[11px] font-bold text-emerald-700 mt-0.5">배차 매칭 완료!</p>
        <p className="text-[9px] text-[#414754]">경인중장비 최장비</p>
        <p className="text-[8px] text-[#727785] mt-0.5">공유콜 → 선착순 매칭</p>
      </div>
    ),
    rightRole: "중장비사장 (최장비)", rightIcon: "local_shipping", rightTitle: "수락 완료",
    rightContent: (
      <div className="space-y-1.5">
        <div className="bg-emerald-50 rounded-lg p-2 text-center">
          <span className="material-symbols-outlined text-xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <p className="text-[11px] font-bold text-emerald-700">선착순 수락 성공!</p>
        </div>
        <MiniCard>
          <p className="text-[10px] font-bold mb-1">수수료 계산</p>
          <div className="grid grid-cols-2 gap-0.5 text-[9px]">
            <div className="bg-emerald-50 rounded p-0.5 text-center"><p className="text-[#727785]">본사</p><p className="font-bold">60,000</p></div>
            <div className="bg-blue-50 rounded p-0.5 text-center"><p className="text-[#727785]">적립</p><p className="font-bold">60,000</p></div>
            <div className="bg-purple-50 rounded p-0.5 text-center"><p className="text-[#727785]">콜센터</p><p className="font-bold">30,000</p></div>
            <div className="bg-pink-50 rounded p-0.5 text-center"><p className="text-[#727785]">영업</p><p className="font-bold">30,000</p></div>
          </div>
        </MiniCard>
      </div>
    ),
    systemLog: "UPDATE status='matched', matched_owner_id=최장비 (선착순) → INSERT commissions → UPSERT call_history",
  },
  STEPS[3], // B-7: 기사 배정 (동일)
  STEPS[5], // B-8: 작업 완료 (동일)
];

// ═════ STEPS_C = 취소 페널티 경로 (5단계) ═════
const STEPS_C: Step[] = [
  STEPS[0], // C-1: 장비 요청 (동일)
  { // C-2: 전용콜 수락 (축약)
    id: 30, label: "전용콜 수락",
    leftRole: "시스템", leftIcon: "sms", leftTitle: "SMS → 수락",
    leftContent: (
      <div className="space-y-1.5">
        <div className="bg-emerald-50 rounded-lg p-2 text-center">
          <span className="material-symbols-outlined text-xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
          <p className="text-[11px] font-bold text-emerald-700">즉시 수락</p>
          <p className="text-[9px] text-[#414754]">박중장비 사장이 전용콜을 수락</p>
        </div>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "매칭 완료",
    rightContent: (
      <div className="bg-emerald-50 rounded-lg p-2 text-center">
        <span className="material-symbols-outlined text-2xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        <p className="text-[11px] font-bold text-emerald-700">매칭 완료</p>
        <p className="text-[9px] text-[#414754]">수수료 {formatPrice(SCENARIO.commission)}원 계산 완료</p>
      </div>
    ),
    systemLog: "UPDATE status='matched' → INSERT commissions (총 수수료: 180,000원)",
  },
  STEPS[3], // C-3: 기사 배정 (동일)
  { // C-4: 취소 요청
    id: 31, label: "❌ 취소 요청",
    leftRole: "장비요청자", leftIcon: "person_search", leftTitle: "취소 확인 다이얼로그",
    leftContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              className="material-symbols-outlined text-xl text-[#EF4444]"
              style={{ fontVariationSettings: "'FILL' 1" }}
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              warning
            </motion.span>
            <p className="text-[11px] font-bold text-[#EF4444]">배차를 취소하시겠습니까?</p>
          </div>

          {/* 페널티 강조 */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#EF4444]/20 rounded-lg p-2 text-center border border-[#EF4444]/40"
          >
            <p className="text-[9px] text-[#EF4444] font-bold mb-0.5">⚠️ 7.5% 취소 수수료 발생</p>
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="text-[16px] font-black text-[#EF4444] tabular-nums"
            >
              {formatPrice(90000)}원
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-1 mt-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(239,68,68,0.4)",
                  "0 0 0 6px rgba(239,68,68,0)",
                  "0 0 0 0 rgba(239,68,68,0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex-1 py-1.5 bg-[#EF4444] text-white text-center rounded text-[10px] font-bold cursor-pointer"
            >
              취소 확인
            </motion.div>
            <div className="flex-1 py-1.5 bg-[#242428] text-[#9CA3AF] text-center rounded text-[10px] font-bold">
              돌아가기
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <StatusTransition
            from="operator_assigned"
            to="cancelled"
            fromColor="#0059b9"
            toColor="#EF4444"
            duration={900}
          />
        </motion.div>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "notifications_active", rightTitle: "취소 푸시 알림",
    rightContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.7, type: "spring", stiffness: 300, damping: 18 }}
          className="bg-[#1A1A20] border border-[#EF4444]/30 rounded-lg p-2 shadow-xl"
        >
          <div className="flex items-center justify-between mb-1 text-[9px] font-mono">
            <span className="text-[#EF4444] font-bold">🔔 Heavy Match</span>
            <span className="text-[#6B7280]">지금</span>
          </div>
          <p className="text-[10px] font-bold text-[#FAFAFA]">배차 취소 알림</p>
          <p className="text-[9px] text-[#9CA3AF] mt-0.5">요청자가 배차를 취소했습니다. 페널티 수수료 {formatPrice(90000)}원 발생</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <MiniCard>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold">크레인 50T</span>
              <MiniBadge label="취소됨" color="bg-[#ffdad6] text-[#ba1a1a]" />
            </div>
            <p className="text-[9px] text-[#6B7280] mt-1">매칭 후 취소 → 페널티 적용</p>
          </MiniCard>
        </motion.div>
      </div>
    ),
    systemLog: "POST /api/dispatch/cancel → SELECT previous status → UPDATE dispatch_requests SET status='cancelled' → 이전 상태 ∈ [matched, operator_assigned, in_progress] → 페널티 INSERT commissions 트리거",
  },
  { // C-5: 페널티 정산
    id: 32, label: "페널티 정산",
    leftRole: "시스템", leftIcon: "calculate", leftTitle: "취소 수수료 계산",
    leftContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#EF4444]/10 rounded-lg p-2.5 border border-[#EF4444]/30"
        >
          <p className="text-[10px] font-bold text-[#EF4444] text-center mb-2">📋 취소 수수료 계산서</p>

          <div className="space-y-1 text-[10px]">
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between"
            >
              <span className="text-[#9CA3AF]">임대비</span>
              <span className="font-bold tabular-nums text-[#D1D5DB]">{formatPrice(SCENARIO.price)}원</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between"
            >
              <span className="text-[#9CA3AF]">페널티율</span>
              <span className="font-bold text-[#EF4444]">× 7.5%</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8 }}
              className="border-t border-[#EF4444]/30 pt-1 mt-1 origin-left"
            >
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#EF4444]">취소 수수료</span>
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.0, type: "spring", stiffness: 400 }}
                  className="font-black text-lg text-[#EF4444] tabular-nums"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  {formatPrice(90000)}원
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-[9px] text-[#6B7280] text-center font-mono"
        >
          💰 전액 본사 귀속 · 콜센터/영업 수수료 없음
        </motion.div>
      </div>
    ),
    rightRole: "관리자", rightIcon: "admin_panel_settings", rightTitle: "정산 DB 기록",
    rightContent: (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <DBWriteIndicator
            operation="INSERT"
            table="commissions"
            fields={["is_cancelled: true", "cancel_fee: 90,000", "company_fee: 90,000", "callcenter/salesperson/requester: 0"]}
            duration={1100}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-[#1A1A20] border border-[#3A3D45]/40 rounded-lg p-2"
        >
          <p className="text-[10px] font-bold text-[#FAFAFA] mb-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#EF4444]" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
            취소 건 정산 내역
          </p>
          <div className="space-y-0.5 text-[9px] font-mono">
            {[
              { label: "본사 수익", value: formatPrice(90000), color: "text-emerald-400" },
              { label: "콜센터", value: "0", color: "text-[#6B7280]" },
              { label: "영업사원", value: "0", color: "text-[#6B7280]" },
              { label: "건설사 적립", value: "0", color: "text-[#6B7280]" },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0 + i * 0.1 }}
                className="flex justify-between"
              >
                <span className="text-[#9CA3AF]">{row.label}</span>
                <span className={`font-bold tabular-nums ${row.color}`}>{row.value}원</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
    systemLog: "INSERT commissions (dispatch_id, is_cancelled=true, cancel_fee=90,000, company_fee=90,000) → 취소 페널티는 전액 본사 귀속 → 콜센터/영업/건설사 적립 없음 → 재무 리포트에 cancelled 건으로 분류",
  },
];

const ALL_SCENARIOS = {
  A: { label: "해피패스", desc: "전용콜 → 즉시 수락 → 완료", steps: STEPS_A, icon: "check_circle", color: "from-emerald-500 to-green-600", count: 6 },
  B: { label: "에스컬레이션", desc: "미수락 → 콜센터 → 공유콜 → 선착순", steps: STEPS_B, icon: "swap_horiz", color: "from-amber-500 to-orange-600", count: 8 },
  C: { label: "취소 페널티", desc: "수락 후 취소 → 7.5% 페널티 정산", steps: STEPS_C, icon: "cancel", color: "from-[#ba1a1a] to-rose-700", count: 5 },
} as const;

type ScenarioKey = keyof typeof ALL_SCENARIOS;

// ═════ 메인 컴포넌트 ═════
export default function SimulationPage() {
  const [scenario, setScenario] = useState<ScenarioKey | null>(null);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const currentSteps = scenario ? ALL_SCENARIOS[scenario].steps : [];

  const [networkActive, setNetworkActive] = useState(false);

  // 자동 진행 — 각 스텝 전후에 "네트워크 작업 중" 지연을 삽입
  useEffect(() => {
    if (!running || step >= currentSteps.length - 1) { if (step >= currentSteps.length - 1) setRunning(false); return; }
    const nextStep = currentSteps[step + 1];

    // 타이머가 있는 스텝은 타이머 + 처리시간, 없으면 기본 처리시간
    const delay = nextStep?.timer ? nextStep.timer * 1000 + 1500 : 3500;

    // 진행 전 네트워크 활동 바 활성화 (1.2초)
    const networkTimeout = setTimeout(() => setNetworkActive(true), delay - 1200);
    const doneTimeout = setTimeout(() => setNetworkActive(false), delay - 100);
    const stepTimeout = setTimeout(() => setStep(s => s + 1), delay);

    return () => {
      clearTimeout(networkTimeout);
      clearTimeout(doneTimeout);
      clearTimeout(stepTimeout);
    };
  }, [running, step, currentSteps]);

  // 타이머 카운트다운
  useEffect(() => {
    const s = currentSteps[step];
    if (!s?.timer) return;
    setTimer(s.timer);
    const iv = setInterval(() => setTimer(t => { if (t <= 1) { clearInterval(iv); return 0; } return t - 1; }), 1000);
    return () => clearInterval(iv);
  }, [step, currentSteps]);

  const start = (key: ScenarioKey) => { setScenario(key); setStep(0); setRunning(true); };
  const reset = () => { setScenario(null); setStep(-1); setRunning(false); setTimer(0); };
  const next = () => { if (step < currentSteps.length - 1) setStep(s => s + 1); };
  const isComplete = scenario !== null && step >= currentSteps.length - 1;
  const current = step >= 0 && step < currentSteps.length ? currentSteps[step] : null;

  return (
    <main className="min-h-screen bg-[#0A0A0B]" style={{ fontFamily: "'Inter','Pretendard',sans-serif", letterSpacing: "-0.02em" }}>
      {/* Top network activity indicator (iOS-style) */}
      <NetworkActivityBar active={networkActive} />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4 md:px-6 h-14">
          <Link href="/demo" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF6B1A]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="font-black text-white tracking-tight">Heavy Match</span>
          </Link>
          <div className="flex items-center gap-3">
            <RealtimeIndicator />
            {running && !isComplete && <ProcessingPulse label="Running" />}
            <span className="px-3 py-1 bg-[#FF6B1A]/20 text-[#FF6B1A] rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              E2E 시뮬레이션
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-16 pb-10 px-4 md:px-6 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-[800] text-white mb-1">배차 플로우 시뮬레이션</h1>
          <p className="text-[#8899b3] text-sm">장비 요청 → 전용콜 → 수락 → 기사배정 → 작업완료 전 과정</p>
        </div>

        {/* ── Scenario Card ── */}
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <p className="text-white font-[800] text-lg">{SCENARIO.equipment} · {SCENARIO.time}</p>
              <p className="text-[#8899b3] text-sm">{SCENARIO.site}</p>
            </div>
          </div>
          <p className="text-2xl font-black text-[#FF6B1A] tabular-nums">{formatPrice(SCENARIO.price)}원</p>
        </div>

        {/* ── Progress Bar ── */}
        <div className="flex gap-1 mb-6">
          {currentSteps.map((s, i) => (
            <div key={s.id} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-[#0059b9]" : "bg-white/10"}`} />
              <span className={`text-[9px] font-bold transition-colors hidden md:block ${i <= step ? "text-[#FF6B1A]" : "text-white/20"}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Split Screen ── */}
        {current && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-in" key={step}>
            {/* LEFT DEVICE */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-3 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                <span className={`material-symbols-outlined text-sm text-[#FF6B1A]`}>{current.leftIcon}</span>
                <span className="text-xs font-bold text-[#FF6B1A]">{current.leftRole}</span>
                <span className="text-[10px] text-white/40 ml-auto">{current.leftTitle}</span>
              </div>
              <div className="p-3 min-h-[160px]">
                {current.leftContent}
              </div>
            </div>

            {/* RIGHT DEVICE */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-3 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                <span className={`material-symbols-outlined text-sm text-[#FF6B1A]`}>{current.rightIcon}</span>
                <span className="text-xs font-bold text-[#FF6B1A]">{current.rightRole}</span>
                <span className="text-[10px] text-white/40 ml-auto">{current.rightTitle}</span>
                {current.timer && timer > 0 && (
                  <span className="px-2 py-0.5 bg-[#ba1a1a] text-white rounded-full text-[10px] font-bold animate-pulse tabular-nums">⏱ {timer}초</span>
                )}
              </div>
              <div className="p-3 min-h-[160px]">
                {current.rightContent}
              </div>
            </div>
          </div>
        )}

        {/* ── System Log with Typed effect ── */}
        {current && (
          <div className="bg-[#111] rounded-xl border border-[#3A3D45]/40 p-4 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3A3D45]/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFA523]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
                </div>
                <span className="text-[10px] text-[#6B7280] font-mono ml-2">heavy-match@server:~$</span>
              </div>
              <div className="flex items-center gap-3">
                <RealtimeIndicator />
                <SystemClock />
                <span className="text-[10px] text-[#6B7280] font-mono">Step {step + 1}/{currentSteps.length}</span>
              </div>
            </div>
            <TypedLog
              key={`log-${step}`}
              lines={parseSystemLog(current.systemLog)}
              speed={16}
            />
          </div>
        )}

        {/* ── Controls ── */}
        <div className="flex gap-3 max-w-md mx-auto">
          {scenario === null ? (
            <div className="w-full space-y-3">
              <p className="text-center text-sm text-[#8899b3] font-medium mb-2">시나리오를 선택하세요</p>
              {(Object.entries(ALL_SCENARIOS) as [ScenarioKey, typeof ALL_SCENARIOS[ScenarioKey]][]).map(([key, sc]) => (
                <button key={key} onClick={() => start(key)}
                  className={`w-full py-4 bg-gradient-to-br ${sc.color} text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3`}>
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{sc.icon}</span>
                  <div className="text-left">
                    <p className="text-base font-[800]">{sc.label} ({sc.count}단계)</p>
                    <p className="text-[11px] opacity-80">{sc.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : isComplete ? (
            <>
              <button onClick={reset} className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl active:scale-95">다시 하기</button>
              <Link href="/demo" className="flex-1 py-3 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 text-center flex items-center justify-center gap-1">
                역할별 체험 <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </>
          ) : (
            <>
              <button onClick={() => setRunning(!running)} className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl active:scale-95 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-lg">{running ? "pause" : "play_arrow"}</span>
                {running ? "일시정지" : "자동 진행"}
              </button>
              <button onClick={next} className="flex-1 py-3 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 flex items-center justify-center gap-1">
                다음 단계 <span className="material-symbols-outlined text-lg">skip_next</span>
              </button>
            </>
          )}
        </div>

        {/* ── Completion Summary (시나리오별 차별화) ── */}
        {isComplete && scenario === "A" && (
          <div className="mt-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 text-center animate-fade-in">
            <span className="material-symbols-outlined text-5xl text-emerald-400 block mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
            <h3 className="text-xl font-[800] text-white">배차 완료!</h3>
            <p className="text-sm text-[#8899b3] mt-1 mb-4">전용콜 → 즉시 수락 → 기사 배정 → 작업 완료</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-white tabular-nums">{formatPrice(SCENARIO.price)}원</p><p className="text-[10px] text-[#8899b3]">임대비</p></div>
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-emerald-400 tabular-nums">{formatPrice(SCENARIO.commission)}원</p><p className="text-[10px] text-[#8899b3]">총 수수료 (15%)</p></div>
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-[#FF6B1A] tabular-nums">{formatPrice(60000)}원</p><p className="text-[10px] text-[#8899b3]">본사 수익</p></div>
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-amber-400 tabular-nums">{formatPrice(60000)}원</p><p className="text-[10px] text-[#8899b3]">건설사 적립</p></div>
            </div>
          </div>
        )}
        {isComplete && scenario === "B" && (
          <div className="mt-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 text-center animate-fade-in">
            <span className="material-symbols-outlined text-5xl text-amber-400 block mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>swap_horiz</span>
            <h3 className="text-xl font-[800] text-white">에스컬레이션 후 배차 완료!</h3>
            <p className="text-sm text-[#8899b3] mt-1 mb-2">전용콜 미수락 → 콜센터 전달 → 공유콜 → <b className="text-amber-400">선착순 매칭</b></p>
            <p className="text-xs text-[#8899b3] mb-4">원래 사장(박중장비) 미수락 → 다른 사장(최장비)이 공유콜에서 수락</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-white tabular-nums">{formatPrice(SCENARIO.price)}원</p><p className="text-[10px] text-[#8899b3]">임대비</p></div>
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-emerald-400 tabular-nums">{formatPrice(SCENARIO.commission)}원</p><p className="text-[10px] text-[#8899b3]">총 수수료</p></div>
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-[#FF6B1A] tabular-nums">{formatPrice(60000)}원</p><p className="text-[10px] text-[#8899b3]">본사</p></div>
              <div className="bg-amber-500/20 rounded-xl p-3 border border-amber-500/30"><p className="text-sm font-black text-amber-400">3단계 폴백</p><p className="text-[10px] text-amber-400/70">전용→콜센터→공유</p></div>
            </div>
          </div>
        )}
        {isComplete && scenario === "C" && (
          <div className="mt-8 bg-[#ba1a1a]/10 backdrop-blur rounded-2xl border border-[#ba1a1a]/20 p-6 text-center animate-fade-in">
            <span className="material-symbols-outlined text-5xl text-[#ba1a1a] block mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
            <h3 className="text-xl font-[800] text-white">배차 취소 — 페널티 정산</h3>
            <p className="text-sm text-[#8899b3] mt-1 mb-4">매칭 후 취소 시 7.5% 페널티 수수료가 발생합니다</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-white tabular-nums">{formatPrice(SCENARIO.price)}원</p><p className="text-[10px] text-[#8899b3]">임대비</p></div>
              <div className="bg-[#ba1a1a]/20 rounded-xl p-3 border border-[#ba1a1a]/30"><p className="text-lg font-black text-[#ba1a1a] tabular-nums">{formatPrice(90000)}원</p><p className="text-[10px] text-[#ba1a1a]/70">페널티 (7.5%)</p></div>
              <div className="bg-white/5 rounded-xl p-3"><p className="text-lg font-black text-emerald-400 tabular-nums">{formatPrice(90000)}원</p><p className="text-[10px] text-[#8899b3]">본사 귀속</p></div>
            </div>
          </div>
        )}

        {/* ── Step Overview (mini) ── */}
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {currentSteps.map((s, i) => (
            <button key={s.id} onClick={() => { setStep(i); setRunning(false); }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                i === step ? "bg-[#FF6B1A] text-white" : i < step ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/30"
              }`}>
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

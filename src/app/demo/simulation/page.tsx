"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

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
    leftRole: "장비요청자", leftIcon: "person_search", leftTitle: "장비 요청서 작성",
    leftContent: (
      <div className="space-y-1.5">
        <div className="grid grid-cols-2 gap-1">
          {["🏗️ 크레인","⛏️ 굴삭기","🔝 스카이","💧 펌프카"].map(e => (
            <div key={e} className={`text-center p-1.5 rounded-lg border text-[10px] font-bold ${e.includes("크레인") ? "border-[#0059b9] bg-[#eef4ff] text-[#0059b9]" : "border-[#c1c6d6]/30 text-[#727785]"}`}>{e}</div>
          ))}
        </div>
        <div className="bg-[#eef4ff] rounded-lg p-2">
          <p className="font-bold text-[11px]">크레인 50T · 오전(4h)</p>
          <p className="text-[#0059b9] font-black text-sm tabular-nums">{formatPrice(SCENARIO.price)}원</p>
        </div>
        <div className="border-t border-dashed border-[#c1c6d6]/30 pt-1">
          <p className="text-[9px] text-[#727785]">전자서명</p>
          <div className="h-6 bg-[#f8f9ff] rounded border border-dashed border-[#c1c6d6]/30 flex items-center justify-center">
            <span className="text-[9px] text-[#0059b9] italic">서명 완료 ✓</span>
          </div>
        </div>
      </div>
    ),
    rightRole: "시스템", rightIcon: "cloud", rightTitle: "대기중",
    rightContent: (
      <div className="flex flex-col items-center justify-center h-20 text-[#c1c6d6]">
        <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
        <p className="text-[10px] mt-1">요청 접수 대기</p>
      </div>
    ),
    systemLog: "POST /api/dispatch/create → dispatch_requests INSERT → status: exclusive_call",
  },
  {
    id: 1, label: "전용콜 (60초)", timer: 10,
    leftRole: "시스템", leftIcon: "sms", leftTitle: "SMS 발송",
    leftContent: (
      <div className="space-y-1.5">
        <div className="bg-[#111c29] text-white rounded-lg p-2 text-[10px]">
          <p className="text-[#8899b3] text-[9px]">수신: 박중장비 사장 (010-9876-****)</p>
          <p className="mt-1 leading-relaxed">[Heavy Match] 크레인 50T 요청<br />현장: 코엑스 신축현장<br />금액: 1,200,000원<br />확인: heavy-match.kr/call/...</p>
        </div>
        <div className="text-center text-[10px] text-[#727785]">sms_logs INSERT · token: a8Kf...</div>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "콜 수신",
    rightContent: (
      <div className="space-y-1.5">
        <MiniCard glow>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
            <MiniBadge label="전용콜" color="bg-[#d7e2ff] text-[#004491]" />
          </div>
          <p className="text-[9px] text-[#414754]">코엑스 신축현장</p>
          <p className="text-[#0059b9] font-black text-sm tabular-nums">{formatPrice(SCENARIO.price)}원</p>
          <div className="flex gap-1 mt-1.5">
            <div className="flex-1 py-1 bg-emerald-500 text-white text-center rounded text-[10px] font-bold">수락</div>
            <div className="flex-1 py-1 bg-[#ba1a1a] text-white text-center rounded text-[10px] font-bold">거절</div>
          </div>
        </MiniCard>
      </div>
    ),
    systemLog: "SMS 발송 → Naver Cloud API → exclusive_call_at = NOW() → 60초 타이머 시작",
  },
  {
    id: 2, label: "사장 수락",
    leftRole: "장비요청자", leftIcon: "person_search", leftTitle: "매칭 알림 수신",
    leftContent: (
      <div className="space-y-1.5">
        <div className="bg-emerald-50 rounded-lg p-2 text-center">
          <span className="material-symbols-outlined text-2xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="text-[11px] font-bold text-emerald-700 mt-0.5">배차 매칭 완료!</p>
          <p className="text-[9px] text-[#414754]">대한크레인 박중장비</p>
        </div>
        <MiniCard>
          <div className="flex justify-between text-[10px]">
            <span className="text-[#727785]">업체</span>
            <span className="font-bold">대한크레인</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-[#727785]">상태</span>
            <MiniBadge label="매칭완료" color="bg-emerald-100 text-emerald-700" />
          </div>
        </MiniCard>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "수락 완료",
    rightContent: (
      <div className="space-y-1.5">
        <div className="bg-emerald-50 rounded-lg p-2 text-center">
          <span className="material-symbols-outlined text-2xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <p className="text-[11px] font-bold text-emerald-700">수락 완료</p>
        </div>
        <MiniCard>
          <p className="text-[10px] font-bold mb-1">수수료 자동 계산</p>
          <div className="grid grid-cols-2 gap-0.5 text-[9px]">
            <div className="bg-emerald-50 rounded p-0.5 text-center"><p className="text-[#727785]">본사</p><p className="font-bold tabular-nums">60,000</p></div>
            <div className="bg-blue-50 rounded p-0.5 text-center"><p className="text-[#727785]">적립</p><p className="font-bold tabular-nums">60,000</p></div>
            <div className="bg-purple-50 rounded p-0.5 text-center"><p className="text-[#727785]">콜센터</p><p className="font-bold tabular-nums">30,000</p></div>
            <div className="bg-pink-50 rounded p-0.5 text-center"><p className="text-[#727785]">영업</p><p className="font-bold tabular-nums">30,000</p></div>
          </div>
        </MiniCard>
      </div>
    ),
    systemLog: "UPDATE dispatch_requests SET status='matched' WHERE status='exclusive_call' → commissions INSERT → call_history UPSERT",
  },
  {
    id: 3, label: "기사 배정",
    leftRole: "시스템", leftIcon: "sms", leftTitle: "기사 SMS 발송",
    leftContent: (
      <div className="space-y-1.5">
        <div className="bg-[#111c29] text-white rounded-lg p-2 text-[10px]">
          <p className="text-[#8899b3] text-[9px]">수신: 이기사 (010-5555-****)</p>
          <p className="mt-1">[Heavy Match] 배차 안내<br />크레인 50T · 코엑스 신축현장<br />담당자: 홍현장 010-9876-****</p>
        </div>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "기사 선택",
    rightContent: (
      <div className="space-y-1">
        {["이기사","장운전","손기술"].map((name, i) => (
          <div key={name} className={`flex items-center justify-between p-1.5 rounded-lg border text-[10px] ${i === 0 ? "border-[#0059b9] bg-[#eef4ff]" : "border-[#c1c6d6]/30"}`}>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#d7e2ff] rounded-full flex items-center justify-center text-[8px] font-bold text-[#0059b9]">{name[0]}</div>
              <span className="font-bold">{name}</span>
            </div>
            {i === 0 ? <MiniBadge label="배정" color="bg-[#0059b9] text-white" /> : <span className="text-[#c1c6d6]">선택</span>}
          </div>
        ))}
      </div>
    ),
    systemLog: "POST /api/dispatch/assign → UPDATE status='operator_assigned', assigned_operator_id=이기사",
  },
  {
    id: 4, label: "작업 시작",
    leftRole: "기사", leftIcon: "engineering", leftTitle: "현장 도착",
    leftContent: (
      <div className="space-y-1.5">
        <MiniCard glow>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
            <MiniBadge label="기사배정" color="bg-[#e5eeff] text-[#0059b9]" />
          </div>
          <p className="text-[9px] text-[#414754]">코엑스 신축현장</p>
          <div className="mt-1 py-1 bg-amber-500 text-white text-center rounded text-[10px] font-bold flex items-center justify-center gap-0.5">
            <span className="material-symbols-outlined text-xs">rocket_launch</span>작업 시작
          </div>
        </MiniCard>
      </div>
    ),
    rightRole: "장비요청자", rightIcon: "person_search", rightTitle: "실시간 상태",
    rightContent: (
      <div className="space-y-1.5">
        <MiniCard>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px]">크레인 50T</span>
            <MiniBadge label="작업중" color="bg-amber-100 text-amber-700" />
          </div>
          <p className="text-[9px] text-[#414754]">코엑스 신축현장</p>
          <div className="mt-1 h-1 bg-[#d8e3f5] rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-1/3 animate-pulse" />
          </div>
          <p className="text-[8px] text-[#727785] text-right mt-0.5">작업 진행중...</p>
        </MiniCard>
      </div>
    ),
    systemLog: "POST /api/dispatch/start → UPDATE status='in_progress'",
  },
  {
    id: 5, label: "작업 완료",
    leftRole: "기사", leftIcon: "engineering", leftTitle: "전자서명",
    leftContent: (
      <div className="space-y-1.5">
        <div className="border-2 border-dashed border-[#0059b9]/20 rounded-lg p-1 bg-white">
          <div className="h-10 bg-[#f8f9ff] rounded flex items-center justify-center">
            <span className="text-[10px] italic text-[#0059b9]">✍️ 기사 서명 완료</span>
          </div>
        </div>
        <div className="py-1 bg-emerald-600 text-white text-center rounded text-[10px] font-bold flex items-center justify-center gap-0.5">
          <span className="material-symbols-outlined text-xs">task_alt</span>작업 완료 확인
        </div>
      </div>
    ),
    rightRole: "시스템", rightIcon: "receipt_long", rightTitle: "작업확인서 생성",
    rightContent: (
      <div className="space-y-1">
        <div className="bg-[#eef4ff] rounded-lg p-2">
          <p className="text-[10px] font-bold text-center text-[#0059b9] mb-1">📋 작업확인서</p>
          <div className="text-[9px] text-[#414754] space-y-0.5">
            <p>장비: 크레인 50T</p>
            <p>금액: {formatPrice(SCENARIO.price)}원</p>
            <p>건설사: {SCENARIO.company}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-1">
            <div className="bg-white rounded p-0.5 text-center text-[8px]"><p className="text-[#727785]">요청자 서명</p><p className="italic text-[#0059b9]">✓</p></div>
            <div className="bg-white rounded p-0.5 text-center text-[8px]"><p className="text-[#727785]">기사 서명</p><p className="italic text-[#0059b9]">✓</p></div>
          </div>
        </div>
      </div>
    ),
    systemLog: "POST /api/dispatch/complete → status='completed' → operator_signature 저장 → 작업확인서 자동 생성",
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
    leftRole: "시스템", leftIcon: "timer_off", leftTitle: "자동 에스컬레이션",
    leftContent: (
      <div className="space-y-2">
        <div className="bg-[#ffdad6]/20 border border-[#ba1a1a]/20 rounded-lg p-2 text-center">
          <span className="material-symbols-outlined text-2xl text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>timer_off</span>
          <p className="text-[11px] font-bold text-[#ba1a1a] mt-0.5">전용콜 60초 만료</p>
          <p className="text-[9px] text-[#414754]">박중장비 사장 미수락</p>
        </div>
        <div className="text-center text-[10px] text-amber-400 font-bold">▼ 자동 에스컬레이션 ▼</div>
      </div>
    ),
    rightRole: "콜센터", rightIcon: "support_agent", rightTitle: "콜 전달 수신",
    rightContent: (
      <div className="space-y-1.5">
        <MiniCard glow>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
            <MiniBadge label="콜센터 전달" color="bg-[#ffdad6] text-[#ba1a1a]" />
          </div>
          <p className="text-[9px] text-[#414754]">박중장비 미수락 → 콜센터 자동 전달</p>
          <p className="text-[#0059b9] font-black text-sm tabular-nums">{formatPrice(SCENARIO.price)}원</p>
        </MiniCard>
      </div>
    ),
    systemLog: "GET /api/cron/timer → UPDATE status='callcenter_call', callcenter_call_at=NOW() → 콜센터 SMS 발송",
  },
  { // B-4: 콜센터 60초 대기
    id: 21, label: "콜센터 대기", timer: 8,
    leftRole: "콜센터", leftIcon: "support_agent", leftTitle: "콜 처리 대기",
    leftContent: (
      <div className="space-y-1.5">
        <MiniCard glow>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px]">🏗️ 크레인 50T</span>
            <MiniBadge label="대기" color="bg-amber-100 text-amber-700" />
          </div>
          <p className="text-[9px] text-[#414754]">코엑스 신축현장 · {formatPrice(SCENARIO.price)}원</p>
          <div className="flex gap-1 mt-1.5">
            <div className="flex-1 py-1 bg-emerald-500 text-white text-center rounded text-[10px] font-bold">직접 수락</div>
            <div className="flex-1 py-1 bg-[#0059b9] text-white text-center rounded text-[10px] font-bold">공유콜 전환</div>
          </div>
        </MiniCard>
      </div>
    ),
    rightRole: "장비요청자", rightIcon: "person_search", rightTitle: "상태 확인",
    rightContent: (
      <div className="space-y-1.5">
        <MiniCard>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px]">크레인 50T</span>
            <MiniBadge label="콜센터 전달" color="bg-amber-100 text-amber-700" />
          </div>
          <p className="text-[9px] text-[#414754]">콜센터에서 처리 중입니다...</p>
          <div className="mt-1 h-1 bg-[#d8e3f5] rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full w-1/2 animate-pulse" /></div>
        </MiniCard>
      </div>
    ),
    systemLog: "콜센터 상담원이 60초간 처리 대기중... 직접 수락 또는 공유콜 전환 가능",
  },
  { // B-5: 공유콜 전환
    id: 22, label: "공유콜 전환",
    leftRole: "시스템", leftIcon: "campaign", leftTitle: "SMS 일괄 발송",
    leftContent: (
      <div className="space-y-1.5">
        <div className="bg-[#111c29] text-white rounded-lg p-2 text-[10px]">
          <p className="text-amber-400 text-[9px] font-bold mb-1">📢 공유콜 일괄 발송 (3명)</p>
          {["김임대 (한국중기)","최장비 (경인중장비)","강중장 (충청크레인)"].map(n => (
            <p key={n} className="text-[#8899b3] text-[9px]">→ {n}</p>
          ))}
        </div>
        <div className="text-center text-[10px] text-[#727785]">선착순 매칭 시작</div>
      </div>
    ),
    rightRole: "중장비사장들", rightIcon: "groups", rightTitle: "공유콜 수신 (선착순)",
    rightContent: (
      <div className="space-y-1">
        {["김임대","최장비","강중장"].map((name, i) => (
          <MiniCard key={name} glow={i === 1}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#d7e2ff] rounded-full flex items-center justify-center text-[7px] font-bold text-[#0059b9]">{name[0]}</div>
                <span className="text-[10px] font-bold">{name}</span>
              </div>
              {i === 1 ? (
                <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-bold">수락!</span>
              ) : (
                <span className="text-[9px] text-[#c1c6d6]">대기</span>
              )}
            </div>
          </MiniCard>
        ))}
      </div>
    ),
    systemLog: "UPDATE status='shared_call', shared_call_at=NOW() → 같은 지역 사장 3명에게 SMS 일괄 발송",
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
    leftRole: "장비요청자", leftIcon: "person_search", leftTitle: "취소 확인",
    leftContent: (
      <div className="space-y-1.5">
        <div className="bg-[#ffdad6]/30 border border-[#ba1a1a]/20 rounded-lg p-2">
          <p className="text-[11px] font-bold text-[#ba1a1a] text-center">배차를 취소하시겠습니까?</p>
          <div className="mt-1.5 bg-[#ffdad6] rounded-lg p-1.5 text-center">
            <p className="text-[10px] text-[#ba1a1a] font-bold">⚠️ 취소 수수료 안내</p>
            <p className="text-[14px] font-black text-[#ba1a1a] tabular-nums">{formatPrice(90000)}원 (7.5%)</p>
          </div>
          <div className="flex gap-1 mt-1.5">
            <div className="flex-1 py-1 bg-[#ba1a1a] text-white text-center rounded text-[10px] font-bold">취소 확인</div>
            <div className="flex-1 py-1 bg-[#c1c6d6]/30 text-[#414754] text-center rounded text-[10px] font-bold">돌아가기</div>
          </div>
        </div>
      </div>
    ),
    rightRole: "중장비사장", rightIcon: "local_shipping", rightTitle: "취소 알림",
    rightContent: (
      <div className="space-y-1.5">
        <div className="bg-[#ffdad6]/20 rounded-lg p-2 text-center">
          <span className="material-symbols-outlined text-2xl text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
          <p className="text-[11px] font-bold text-[#ba1a1a] mt-0.5">배차 취소됨</p>
          <p className="text-[9px] text-[#414754]">요청자가 배차를 취소했습니다</p>
        </div>
        <MiniCard>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold">크레인 50T</span>
            <MiniBadge label="취소" color="bg-[#ffdad6] text-[#ba1a1a]" />
          </div>
        </MiniCard>
      </div>
    ),
    systemLog: "POST /api/dispatch/cancel → UPDATE status='cancelled' (이전 상태: operator_assigned → 페널티 적용)",
  },
  { // C-5: 페널티 정산
    id: 32, label: "페널티 정산",
    leftRole: "시스템", leftIcon: "receipt_long", leftTitle: "취소 수수료 계산",
    leftContent: (
      <div className="space-y-1.5">
        <div className="bg-[#ffdad6]/20 rounded-lg p-2">
          <p className="text-[10px] font-bold text-[#ba1a1a] text-center mb-1">취소 수수료 계산서</p>
          <div className="space-y-0.5 text-[9px]">
            <div className="flex justify-between"><span className="text-[#727785]">임대비</span><span className="font-bold tabular-nums">{formatPrice(SCENARIO.price)}원</span></div>
            <div className="flex justify-between"><span className="text-[#727785]">페널티율</span><span className="font-bold text-[#ba1a1a]">7.5%</span></div>
            <div className="flex justify-between border-t border-[#ba1a1a]/20 pt-0.5 mt-0.5"><span className="font-bold text-[#ba1a1a]">취소 수수료</span><span className="font-black text-[#ba1a1a] tabular-nums">{formatPrice(90000)}원</span></div>
          </div>
        </div>
        <div className="text-[9px] text-[#727785] text-center">전액 본사 귀속 (콜센터·영업 수수료 없음)</div>
      </div>
    ),
    rightRole: "관리자", rightIcon: "admin_panel_settings", rightTitle: "정산 기록",
    rightContent: (
      <div className="space-y-1">
        <MiniCard>
          <p className="text-[10px] font-bold text-[#111c29] mb-1">취소 건 정산 내역</p>
          <div className="space-y-0.5 text-[9px]">
            <div className="flex justify-between"><span className="text-[#727785]">본사 수익</span><span className="font-bold text-emerald-600 tabular-nums">{formatPrice(90000)}원</span></div>
            <div className="flex justify-between"><span className="text-[#727785]">콜센터</span><span className="tabular-nums">0원</span></div>
            <div className="flex justify-between"><span className="text-[#727785]">영업사원</span><span className="tabular-nums">0원</span></div>
            <div className="flex justify-between"><span className="text-[#727785]">건설사 적립</span><span className="tabular-nums">0원</span></div>
          </div>
        </MiniCard>
      </div>
    ),
    systemLog: "INSERT commissions (is_cancelled=true, cancel_fee=90,000, company_fee=90,000, 나머지 0원)",
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

  // 자동 진행
  useEffect(() => {
    if (!running || step >= currentSteps.length - 1) { if (step >= currentSteps.length - 1) setRunning(false); return; }
    const nextStep = currentSteps[step + 1];
    const delay = nextStep?.timer ? nextStep.timer * 1000 + 1500 : 3000;
    const t = setTimeout(() => setStep(s => s + 1), delay);
    return () => clearTimeout(t);
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
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4 md:px-6 h-14">
          <Link href="/demo" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF6B1A]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="font-black text-white tracking-tight">Heavy Match</span>
          </Link>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            E2E 시뮬레이션
          </span>
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

        {/* ── System Log ── */}
        {current && (
          <div className="bg-[#1A1A20] rounded-xl border border-[#3A3D45]/30 p-3 mb-6 animate-fade-in font-mono text-[11px]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-amber-400 text-xs">terminal</span>
              <span className="text-amber-400 font-bold text-[10px]">SYSTEM LOG</span>
              <span className="text-white/20 text-[10px]">Step {step + 1}/{currentSteps.length}</span>
            </div>
            <p className="text-emerald-400">{current.systemLog}</p>
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

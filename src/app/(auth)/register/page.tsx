"use client";

import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPhone, parsePhone, formatBusinessNumber, getRoleLabel } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AuthShell, ErrorAlert, INPUT_CLS, LABEL_CLS } from "../_shared";
import type { UserRole } from "@/types/database";

/**
 * 회원가입 — 3단계 (휴대폰 → 인증 → 프로필). 가입 로직은 변경 없음.
 * 역할 선택은 DemoRoleSwitcher와 같은 아이콘 언어를 쓴다.
 */

const ROLES: { value: UserRole; label: string; desc: string; icon: string }[] = [
  { value: "requester", label: "장비요청자", desc: "건설사 현장소장", icon: "apartment" },
  { value: "owner", label: "중장비사장", desc: "장비 임대 업체", icon: "front_loader" },
  { value: "operator", label: "기사", desc: "장비 운전 기사", icon: "engineering" },
  { value: "callcenter", label: "콜센터", desc: "중장비사장 관리", icon: "support_agent" },
  { value: "salesperson", label: "영업사원", desc: "앱 분양 담당", icon: "trending_up" },
];

const REGIONS = [
  { sido: "서울특별시", sigungu: ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"] },
  { sido: "부산광역시", sigungu: ["강서구","금정구","기장군","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구"] },
  { sido: "경기도", sigungu: ["가평군","고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","양평군","여주시","연천군","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시"] },
  { sido: "인천광역시", sigungu: ["강화군","계양구","남동구","동구","미추홀구","부평구","서구","연수구","옹진군","중구"] },
  { sido: "대전광역시", sigungu: ["대덕구","동구","서구","유성구","중구"] },
  { sido: "대구광역시", sigungu: ["남구","달서구","달성군","동구","북구","서구","수성구","중구"] },
  { sido: "울산광역시", sigungu: ["남구","동구","북구","울주군","중구"] },
  { sido: "광주광역시", sigungu: ["광산구","남구","동구","북구","서구"] },
  { sido: "세종특별자치시", sigungu: ["세종시"] },
  { sido: "강원도", sigungu: ["강릉시","고성군","동해시","삼척시","속초시","양구군","양양군","영월군","원주시","인제군","정선군","철원군","춘천시","태백시","평창군","홍천군","화천군","횡성군"] },
  { sido: "충청북도", sigungu: ["괴산군","단양군","보은군","영동군","옥천군","음성군","제천시","증평군","진천군","청주시","충주시"] },
  { sido: "충청남도", sigungu: ["계룡시","공주시","금산군","논산시","당진시","보령시","부여군","서산시","서천군","아산시","예산군","천안시","청양군","태안군","홍성군"] },
  { sido: "전라북도", sigungu: ["고창군","군산시","김제시","남원시","무주군","부안군","순창군","완주군","익산시","임실군","장수군","전주시","정읍시","진안군"] },
  { sido: "전라남도", sigungu: ["강진군","고흥군","곡성군","광양시","구례군","나주시","담양군","목포시","무안군","보성군","순천시","신안군","여수시","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"] },
  { sido: "경상북도", sigungu: ["경산시","경주시","고령군","구미시","군위군","김천시","문경시","봉화군","상주시","성주군","안동시","영덕군","영양군","영주시","영천시","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군","포항시"] },
  { sido: "경상남도", sigungu: ["거제시","거창군","고성군","김해시","남해군","밀양시","사천시","산청군","양산시","의령군","진주시","창녕군","창원시","통영시","하동군","함안군","함양군","합천군"] },
  { sido: "제주특별자치도", sigungu: ["서귀포시","제주시"] },
];

export default function RegisterPageWrapper() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-cy-bg text-cy-ink-3 text-sm font-semibold">로딩중...</div>}>
      <RegisterPage />
    </Suspense>
  );
}

const STEP_INDEX = { phone: 1, otp: 2, profile: 3 } as const;

function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referredOwner = searchParams.get("ref"); // 초대 링크의 사장 ID

  const [step, setStep] = useState<"phone" | "otp" | "profile">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(referredOwner ? "requester" : "owner");
  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [regionSido, setRegionSido] = useState("");
  const [regionSigungu, setRegionSigungu] = useState("");

  const supabase = createClient();

  const handleSendOTP = async () => {
    const digits = parsePhone(phone);
    if (digits.length !== 11 || !digits.startsWith("010")) {
      setError("올바른 휴대폰 번호를 입력하세요");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+82${digits.slice(1)}`,
      });
      if (error) throw error;
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "OTP 발송 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("인증번호 6자리를 입력하세요");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const digits = parsePhone(phone);
      const { error } = await supabase.auth.verifyOtp({
        phone: `+82${digits.slice(1)}`,
        token: otp,
        type: "sms",
      });
      if (error) throw error;
      setStep("profile");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "인증 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || name.length < 2) {
      setError("이름을 2자 이상 입력하세요");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("인증 정보가 없습니다");

      const { error } = await supabase.from("users").insert({
        id: user.id,
        phone: parsePhone(phone),
        name,
        role,
        company_name: companyName || null,
        business_number: businessNumber ? businessNumber.replace(/\D/g, "") : null,
        referred_owner_id: referredOwner || null,
        region_sido: regionSido || null,
        region_sigungu: regionSigungu || null,
      });
      if (error) throw error;

      router.push(`/${role}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "가입 실패");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    setPhone(formatPhone(digits));
  };

  const handleBNChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setBusinessNumber(formatBusinessNumber(digits));
  };

  const selectedSido = REGIONS.find((r) => r.sido === regionSido);

  return (
    <AuthShell
      badge="NEW ACCOUNT · OTP"
      stepIndex={STEP_INDEX[step]}
      stepTotal={3}
      title="회원가입"
    >
      {step === "phone" && (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (!loading) handleSendOTP(); }}>
          <div>
            <label htmlFor="reg-phone" className={LABEL_CLS}>휴대폰 번호</label>
            <input
              id="reg-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="010-0000-0000"
              className={`${INPUT_CLS} tabular-nums`}
              autoFocus
            />
          </div>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          <Button type="submit" size="lg" fullWidth loading={loading} icon={loading ? undefined : "send"}>
            {loading ? "발송중..." : "인증번호 받기"}
          </Button>
        </form>
      )}

      {step === "otp" && (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (!loading) handleVerifyOTP(); }}>
          <div className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-cy-navy-pale/70 border border-cy-navy/10">
            <span className="text-sm font-bold tabular-nums text-cy-navy">{formatPhone(parsePhone(phone))}</span>
            <span className="mono-label text-cy-navy/60">SMS SENT</span>
          </div>
          <div>
            <label htmlFor="reg-otp" className={LABEL_CLS}>인증번호</label>
            <input
              id="reg-otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="······"
              className={`${INPUT_CLS} text-2xl text-center tracking-[0.5em] font-mono`}
              autoFocus
            />
          </div>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          <Button type="submit" size="lg" fullWidth loading={loading} icon={loading ? undefined : "verified"}>
            {loading ? "확인중..." : "인증 확인"}
          </Button>
        </form>
      )}

      {step === "profile" && (
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (!loading) handleRegister(); }}>
          {/* 역할 선택 */}
          <div>
            <span className={LABEL_CLS}>역할 선택</span>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="역할 선택">
              {ROLES.map((r) => {
                const active = role === r.value;
                return (
                  <button
                    type="button"
                    key={r.value}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRole(r.value)}
                    className={`press relative p-3 rounded-xl border text-left ${
                      active
                        ? "border-cy-navy bg-cy-navy-pale/60 shadow-[0_0_0_1px_var(--color-cy-navy)]"
                        : "border-cy-line hover:border-cy-navy/35 hover:bg-cy-navy-pale/25"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-xl block mb-1 ${active ? "text-cy-navy" : "text-cy-ink-3"}`}
                      style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                      {r.icon}
                    </span>
                    <span className={`block text-sm font-bold ${active ? "text-cy-navy" : "text-cy-ink"}`}>{r.label}</span>
                    <span className="block text-xs text-cy-ink-3 mt-0.5">{r.desc}</span>
                    {active && (
                      <span className="material-symbols-outlined absolute top-2.5 right-2.5 text-base text-cy-navy" aria-hidden>
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 이름 */}
          <div>
            <label htmlFor="reg-name" className={LABEL_CLS}>이름</label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className={INPUT_CLS}
            />
          </div>

          {/* 회사명 */}
          <div>
            <label htmlFor="reg-company" className={LABEL_CLS}>회사명 (선택)</label>
            <input
              id="reg-company"
              type="text"
              autoComplete="organization"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="바이트포스 건설"
              className={INPUT_CLS}
            />
          </div>

          {/* 사업자번호 */}
          {(role === "owner" || role === "callcenter") && (
            <div>
              <label htmlFor="reg-bn" className={LABEL_CLS}>사업자번호</label>
              <input
                id="reg-bn"
                type="text"
                inputMode="numeric"
                value={businessNumber}
                onChange={(e) => handleBNChange(e.target.value)}
                placeholder="000-00-00000"
                className={`${INPUT_CLS} tabular-nums`}
              />
            </div>
          )}

          {/* 활동지역 */}
          {(role === "owner" || role === "requester") && (
            <div className="space-y-2">
              <label htmlFor="reg-sido" className={LABEL_CLS}>활동지역</label>
              <select
                id="reg-sido"
                value={regionSido}
                onChange={(e) => { setRegionSido(e.target.value); setRegionSigungu(""); }}
                className={`${INPUT_CLS} text-base`}
              >
                <option value="">시/도 선택</option>
                {REGIONS.map((r) => (
                  <option key={r.sido} value={r.sido}>{r.sido}</option>
                ))}
              </select>
              {selectedSido && (
                <select
                  aria-label="시/군/구 선택"
                  value={regionSigungu}
                  onChange={(e) => setRegionSigungu(e.target.value)}
                  className={`${INPUT_CLS} text-base`}
                >
                  <option value="">시/군/구 선택</option>
                  {selectedSido.sigungu.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}
            </div>
          )}

          {error && <ErrorAlert>{error}</ErrorAlert>}
          <Button type="submit" size="lg" fullWidth loading={loading} icon={loading ? undefined : "how_to_reg"}>
            {loading ? "가입중..." : `${getRoleLabel(role)}로 가입`}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}

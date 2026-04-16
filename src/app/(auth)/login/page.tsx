"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPhone, parsePhone } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
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

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single() as { data: { role: string } | null };

        if (profile) {
          router.push(`/${profile.role}`);
        } else {
          router.push("/register");
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "인증 실패");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    setPhone(formatPhone(digits));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4" style={{ fontFamily: "'Inter', 'Pretendard', sans-serif", letterSpacing: "-0.02em" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-3xl text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="text-2xl font-black text-[#111c29] tracking-tighter">Heavy Match</span>
          </div>
          <p className="text-sm text-[#727785]">중장비 배차 실시간 매칭 플랫폼</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(17,28,41,0.06)] border border-[#c1c6d6]/20 p-7">
          <h1 className="text-2xl font-[800] text-center text-[#111c29] mb-6">로그인</h1>

          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#414754] mb-1.5">
                  <span className="material-symbols-outlined text-sm align-text-bottom mr-1">phone_android</span>
                  휴대폰 번호
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3.5 text-lg border border-[#c1c6d6] rounded-xl bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#0059b9]/30 focus:border-[#0059b9] transition-all"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-[#ba1a1a] text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>{error}
                </p>
              )}
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-br from-[#0059b9] to-[#1071e5] text-white text-lg font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin">progress_activity</span>발송중...</>
                ) : (
                  <><span className="material-symbols-outlined">send</span>인증번호 받기</>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center bg-[#eef4ff] rounded-xl p-3">
                <p className="text-sm text-[#414754]">
                  <span className="font-bold text-[#0059b9]">{formatPhone(parsePhone(phone))}</span>로 인증번호 발송
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#414754] mb-1.5">인증번호</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6자리 입력"
                  className="w-full px-4 py-3.5 text-2xl text-center tracking-[0.5em] font-mono border border-[#c1c6d6] rounded-xl bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#0059b9]/30 focus:border-[#0059b9] transition-all"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-[#ba1a1a] text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>{error}
                </p>
              )}
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-br from-[#0059b9] to-[#1071e5] text-white text-lg font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin">progress_activity</span>확인중...</>
                ) : (
                  <><span className="material-symbols-outlined">login</span>로그인</>
                )}
              </button>
              <button
                onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="w-full py-2 text-[#727785] text-sm font-medium flex items-center justify-center gap-1 hover:text-[#0059b9] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                다른 번호로 시도
              </button>
            </div>
          )}
        </div>

        {/* Footer links */}
        <div className="mt-6 text-center space-y-3">
          <Link href="/register" className="text-[#0059b9] text-sm font-bold hover:underline">
            회원가입
          </Link>
          <p className="text-xs text-[#727785]">
            <Link href="/demo" className="hover:text-[#0059b9] transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              데모 체험하기
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

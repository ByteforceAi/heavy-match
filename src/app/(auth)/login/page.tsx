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

      // 사용자 프로필 확인 후 역할별 대시보드로 이동
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
          // 프로필이 없으면 회원가입 페이지로
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
    <main className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm bg-card rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">로그인</h1>

        {step === "phone" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                휴대폰 번호
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-4 py-3 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
            {error && <p className="text-danger text-sm">{error}</p>}
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-light transition disabled:opacity-50"
            >
              {loading ? "발송중..." : "인증번호 받기"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-text-muted text-sm">
              {formatPhone(parsePhone(phone))}로 인증번호를 발송했습니다
            </p>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                인증번호
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="6자리 입력"
                className="w-full px-4 py-3 text-lg text-center tracking-widest border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
            {error && <p className="text-danger text-sm">{error}</p>}
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-light transition disabled:opacity-50"
            >
              {loading ? "확인중..." : "로그인"}
            </button>
            <button
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
              className="w-full py-2 text-text-muted text-sm"
            >
              다른 번호로 시도
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/register" className="text-primary text-sm font-medium">
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}

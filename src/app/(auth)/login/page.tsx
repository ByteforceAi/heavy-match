"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPhone, parsePhone } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AuthShell, ErrorAlert, INPUT_CLS, LABEL_CLS } from "../_shared";

/**
 * 로그인 — 외부에서 가장 먼저 만나는 화면. 인증 로직은 변경 없음.
 */
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

  const footer = (
    <>
      <p className="text-sm text-cy-ink-3">
        아직 계정이 없다면{" "}
        <Link href="/register" className="font-bold text-cy-navy hover:text-cy-navy-mid underline underline-offset-4 decoration-cy-navy/30 hover:decoration-cy-navy-mid transition-colors">
          회원가입
        </Link>
      </p>
      <Link
        href="/demo"
        className="inline-flex items-center justify-center gap-1 min-h-11 text-sm font-semibold text-cy-ink-3 hover:text-cy-navy transition-colors"
      >
        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
        데모 체험하기
      </Link>
    </>
  );

  return (
    <AuthShell
      badge="SECURE ACCESS · OTP"
      stepIndex={step === "phone" ? 1 : 2}
      stepTotal={2}
      title="로그인"
      footer={footer}
    >
      {step === "phone" ? (
        <form
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); if (!loading) handleSendOTP(); }}
        >
          <div>
            <label htmlFor="login-phone" className={LABEL_CLS}>휴대폰 번호</label>
            <input
              id="login-phone"
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
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); if (!loading) handleVerifyOTP(); }}
        >
          <div className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-cy-navy-pale/70 border border-cy-navy/10">
            <span className="text-sm font-bold tabular-nums text-cy-navy">{formatPhone(parsePhone(phone))}</span>
            <span className="mono-label text-cy-navy/60">SMS SENT</span>
          </div>
          <div>
            <label htmlFor="login-otp" className={LABEL_CLS}>인증번호</label>
            <input
              id="login-otp"
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
          <Button type="submit" size="lg" fullWidth loading={loading} icon={loading ? undefined : "login"}>
            {loading ? "확인중..." : "로그인"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            fullWidth
            icon="arrow_back"
            onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
          >
            다른 번호로 시도
          </Button>
        </form>
      )}
    </AuthShell>
  );
}

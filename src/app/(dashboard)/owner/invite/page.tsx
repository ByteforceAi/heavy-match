"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default function OwnerInvitePage() {
  const [inviteUrl, setInviteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const url = `${window.location.origin}/register?ref=${user.id}`;
        setInviteUrl(url);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <PageHeader title="장비요청자 초대" description="건설사 현장소장에게 링크를 보내세요" />

      <Card className="space-y-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm font-medium text-primary mb-2">초대 링크</p>
          <p className="text-xs text-text-muted break-all font-mono bg-white rounded-lg p-3 border border-border">
            {inviteUrl || "로딩중..."}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`w-full py-4 text-lg font-bold rounded-xl transition ${
            copied
              ? "bg-success text-white"
              : "bg-primary text-white hover:bg-primary-light"
          }`}
        >
          {copied ? "복사됨 ✓" : "링크 복사"}
        </button>

        <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">이 링크로 가입한 장비요청자는:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>장비 요청 시 사장님에게 <b>전용콜</b>이 먼저 발송됩니다</li>
            <li>사장님이 설정한 <b>단가표</b>가 자동 적용됩니다</li>
            <li>60초 내 미수락 시 공유콜로 전환됩니다</li>
          </ul>
        </div>
      </Card>

      <Card className="mt-4">
        <h4 className="font-semibold mb-2">카카오톡으로 보내기</h4>
        <p className="text-sm text-text-muted mb-3">
          위 링크를 복사해서 카카오톡이나 문자로 현장소장에게 보내주세요.
        </p>
        <a
          href={`sms:?body=중장비 배차 앱 Heavy Match 설치 링크: ${inviteUrl}`}
          className="block w-full py-3 bg-accent text-white text-center font-semibold rounded-xl"
        >
          문자로 보내기
        </a>
      </Card>
    </div>
  );
}

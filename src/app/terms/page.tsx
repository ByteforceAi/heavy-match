"use client";

/**
 * /terms — 이용약관
 *
 * 중장비 B2B SaaS 표준 템플릿.
 * 전자상거래법 제10조 · 통신판매업 고시 준수.
 * 최종 검토는 이한결 대표 + 법무 자문이 필요하다.
 */

import Link from "next/link";
import { footer as footerCopy, nav as navCopy } from "@/content/copy";

const LAST_UPDATED = "2026-04-18";
const EFFECTIVE_DATE = "2026-04-18";

export default function TermsPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <LegalNav />

      <article
        className="max-w-[820px] mx-auto px-6 md:px-8 py-12 md:py-16"
        style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
      >
        <header className="pb-8 border-b border-[#E3E8EF]">
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            LEGAL · 이용약관
          </p>
          <h1 className="text-[28px] md:text-[36px] font-[900] text-[#0A1628] tracking-[-0.02em] mb-3">
            철연 CHEOLYEON 서비스 이용약관
          </h1>
          <div
            className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-[#6B7B8F]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            <span>시행일: {EFFECTIVE_DATE}</span>
            <span>최종 개정: {LAST_UPDATED}</span>
            <span>제정자: {footerCopy.business.representative} (BYTEFORCE 대표)</span>
          </div>
        </header>

        <div
          className="mt-10 space-y-10 text-[15px] md:text-[16px] text-[#0A1628]"
          style={{ lineHeight: 1.85, letterSpacing: "-0.015em" }}
        >
          <Section n={1} title="목적">
            <p>
              본 약관은 ㈜바이트포스(이하 &quot;회사&quot;)가 제공하는 철연 CHEOLYEON 중장비 배차·계약·정산 통합 플랫폼(이하 &quot;서비스&quot;)의 이용과 관련하여, 회사와 이용자의 권리·의무·책임사항을 규정함을 목적으로 한다.
            </p>
          </Section>

          <Section n={2} title="정의">
            <Ol>
              <li>&quot;서비스&quot;는 회사가 운영하는 철연 CHEOLYEON 플랫폼 및 관련 부가서비스를 의미한다.</li>
              <li>&quot;이용자&quot;는 본 약관에 동의하고 서비스를 이용하는 회원 또는 비회원을 의미한다.</li>
              <li>&quot;회원&quot;은 본 약관에 따라 이용계약을 체결하고 이용자 계정을 부여받은 개인 또는 법인이다.</li>
              <li>&quot;장비요청자&quot;, &quot;중장비사장&quot;, &quot;기사&quot;, &quot;콜센터 상담원&quot;, &quot;영업사원&quot;, &quot;관리자&quot;는 서비스 내 정의된 6역할을 의미한다.</li>
              <li>&quot;배차&quot;는 서비스를 통해 중장비 요청이 중장비사장에게 전달·수락되고 기사 배정에 이르는 전 과정이다.</li>
              <li>&quot;거래&quot;는 장비요청자와 중장비사장(또는 기사) 간의 장비 임대·운영 계약을 의미한다.</li>
            </Ol>
          </Section>

          <Section n={3} title="약관의 효력 및 변경">
            <Ol>
              <li>본 약관은 서비스 초기화면 또는 별도 연결 화면에 게시되며, 이용자가 가입 절차에서 동의한 시점부터 효력을 발생한다.</li>
              <li>회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있다. 개정 시 시행일 7일 전(이용자에게 불리한 변경은 30일 전)까지 서비스 내 공지 및 이용자 이메일로 통지한다.</li>
              <li>이용자가 개정 약관에 동의하지 않는 경우 이용계약을 해지할 수 있다. 공지된 시행일까지 거절 의사를 표시하지 않는 경우 동의한 것으로 본다.</li>
            </Ol>
          </Section>

          <Section n={4} title="이용계약의 체결">
            <Ol>
              <li>이용계약은 이용자가 본 약관에 동의하고 회원가입 신청을 한 후, 회사가 이를 승낙함으로써 체결된다.</li>
              <li>회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 거부하거나 사후 해지할 수 있다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>허위 정보를 기재하거나 필수 사항을 누락한 경우</li>
                  <li>사업자등록번호 검증이 실패한 경우</li>
                  <li>법령 또는 본 약관 위반으로 이전에 이용계약이 해지된 적이 있는 경우</li>
                </ul>
              </li>
            </Ol>
          </Section>

          <Section n={5} title="서비스의 제공">
            <Ol>
              <li>회사는 다음 서비스를 제공한다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>중장비 배차 매칭 (전용콜·콜센터 전달·공유콜 3단계 폴백)</li>
                  <li>전자계약 작성·서명·보관</li>
                  <li>수수료 정산 및 지급 대행</li>
                  <li>SMS·이메일 알림 전송</li>
                  <li>작업확인서 자동 생성</li>
                  <li>관리자 대시보드 및 통계 리포트</li>
                </ul>
              </li>
              <li>서비스는 연중무휴 24시간 제공을 원칙으로 한다. 단, 정기 점검·장애·불가항력의 경우 제한될 수 있다.</li>
              <li>회사는 서비스 내용을 변경할 수 있으며, 중대한 변경 시 사전 공지한다.</li>
            </Ol>
          </Section>

          <Section n={6} title="요금 및 결제">
            <Ol>
              <li>서비스 이용료(플랫폼 수수료)는 거래금액의 15%를 원칙으로 하며, 내부적으로 본사 5%·콜센터 2.5%·영업사원 2.5%·장비요청자 적립 5%로 분배된다.</li>
              <li>매칭 후 취소 시 거래금액의 7.5%를 취소 페널티로 부과한다. 취소 페널티는 중장비사장의 기회비용 보호 및 무분별한 취소 방지를 위한 것이다.</li>
              <li>정산은 작업 완료 후 48시간 이내에 자동 처리된다. 미지급 시 자동 독촉이 발송된다.</li>
              <li>세금계산서는 회사가 발행하며, 이용자는 세법상 의무를 준수한다.</li>
            </Ol>
          </Section>

          <Section n={7} title="이용자의 의무">
            <Ol>
              <li>이용자는 다음 행위를 하지 않는다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>타인의 정보 도용 또는 허위 정보 기재</li>
                  <li>서비스의 역공학·복제·변조·유포</li>
                  <li>서비스 내 배차·결제 시스템의 우회·악용</li>
                  <li>무허가 하도급 알선 또는 중간 착취</li>
                  <li>법령·공공질서·미풍양속에 반하는 행위</li>
                </ul>
              </li>
              <li>이용자는 계정 정보를 안전하게 관리할 책임이 있으며, 계정 양도·대여는 금지된다.</li>
            </Ol>
          </Section>

          <Section n={8} title="회사의 책임 제한">
            <Ol>
              <li>회사는 배차 매칭 플랫폼 운영자로서 장비 품질·기사 작업 결과·현장 안전사고에 대해 직접 책임을 지지 않는다.</li>
              <li>회사는 이용자 간 거래에 관한 분쟁에 개입하지 않는 것을 원칙으로 하되, 증빙 기록(전자계약·배차 이력·정산 기록)을 분쟁 해결을 위해 제공할 수 있다.</li>
              <li>회사는 다음 사유로 인한 서비스 중단에 책임을 지지 않는다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>천재지변·불가항력</li>
                  <li>정부 정책·행정 조치</li>
                  <li>통신사·클라우드 제공자(Naver Cloud·Vercel·Supabase 등)의 장애</li>
                  <li>이용자 귀책 사유로 인한 손해</li>
                </ul>
              </li>
            </Ol>
          </Section>

          <Section n={9} title="계약 해지">
            <Ol>
              <li>이용자는 언제든지 서비스 설정에서 이용계약 해지를 신청할 수 있다.</li>
              <li>회사는 이용자가 본 약관을 중대하게 위반한 경우 사전 통지 후 계약을 해지할 수 있다.</li>
              <li>계약 해지 시 이용자의 개인정보는 개인정보처리방침에 따라 처리된다. 거래 증빙 자료는 관계 법령에 따라 보존된다.</li>
            </Ol>
          </Section>

          <Section n={10} title="준거법 및 관할">
            <p>
              본 약관은 대한민국 법률에 따라 해석·적용된다. 서비스 이용과 관련하여 발생한 분쟁에 대하여는 회사 주소지 관할 법원을 제1심 전속 관할 법원으로 한다.
            </p>
          </Section>

          <Section n={11} title="부칙">
            <p>
              본 약관은 {EFFECTIVE_DATE}부터 시행한다. 개정 이력은 다음과 같다.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[14px]">
              <li>{EFFECTIVE_DATE} · 초판 제정</li>
            </ul>
          </Section>
        </div>

        {/* 면책 안내 */}
        <aside
          className="mt-12 pt-6 border-t border-[#E3E8EF] text-[12px] text-[#6B7B8F] leading-[1.7]"
          style={{ fontFamily: "var(--font-roboto-mono), Pretendard, sans-serif" }}
        >
          <p className="font-bold text-[#3A4A5F] mb-2">법률 자문 고지</p>
          <p>
            본 약관은 국내 B2B SaaS 표준에 기반하여 초안한다. 시행 전 법무 자문의 검토가 필요하다. 관련 문의: {" "}
            <a
              href={`mailto:${footerCopy.business.email}`}
              className="text-[#002C5F] font-medium hover:text-[#0046A4] transition-colors"
            >
              {footerCopy.business.email}
            </a>
          </p>
        </aside>
      </article>

      <LegalFooter />
    </main>
  );

  // ── LOCAL COMPONENTS ─────────────────────────────────────
  function Section({
    n,
    title,
    children,
  }: {
    n: number;
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section>
        <h2 className="text-[19px] md:text-[22px] font-[800] text-[#0A1628] mb-4 tracking-[-0.015em]">
          <span
            className="text-[#002C5F] mr-2"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            제{n}조
          </span>
          {title}
        </h2>
        <div className="text-[#3A4A5F]">{children}</div>
      </section>
    );
  }

  function Ol({ children }: { children: React.ReactNode }) {
    return <ol className="list-decimal pl-6 space-y-2.5">{children}</ol>;
  }

  function LegalNav() {
    return (
      <nav
        className="sticky top-0 z-50 h-[60px] bg-white/95 border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6"
        style={{ backdropFilter: "blur(12px) saturate(180%)" }}
      >
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]">
            {navCopy.brand.ko}
          </span>
          <span
            className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {navCopy.brand.en}
          </span>
        </Link>
        <Link
          href="/"
          className="ml-auto text-[13px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors min-h-0 inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            arrow_back
          </span>
          메인으로
        </Link>
      </nav>
    );
  }

  function LegalFooter() {
    return (
      <footer className="border-t border-[#E3E8EF] py-6 bg-[#EEF1F5]">
        <div className="max-w-[820px] mx-auto px-6 md:px-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#6B7B8F]">
          <Link href="/privacy" className="hover:text-[#002C5F] transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/help" className="hover:text-[#002C5F] transition-colors">
            고객센터
          </Link>
          <span className="ml-auto text-[#9AA8B8]">{footerCopy.copyright}</span>
        </div>
      </footer>
    );
  }
}

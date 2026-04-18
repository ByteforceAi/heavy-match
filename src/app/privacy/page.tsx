"use client";

/**
 * /privacy — 개인정보처리방침
 *
 * 정보통신망법 제27조의2 + 개인정보보호법 제30조 의무 표기.
 * 최종 검토는 이한결 대표 + 법무 자문이 필요하다.
 */

import Link from "next/link";
import { footer as footerCopy, nav as navCopy } from "@/content/copy";

const LAST_UPDATED = "2026-04-18";
const EFFECTIVE_DATE = "2026-04-18";

export default function PrivacyPage() {
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
            LEGAL · 개인정보처리방침
          </p>
          <h1 className="text-[28px] md:text-[36px] font-[900] text-[#0A1628] tracking-[-0.02em] mb-3">
            철연 CHEOLYEON 개인정보처리방침
          </h1>
          <div
            className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-[#6B7B8F]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            <span>시행일: {EFFECTIVE_DATE}</span>
            <span>최종 개정: {LAST_UPDATED}</span>
          </div>
        </header>

        <div
          className="mt-10 space-y-10 text-[15px] md:text-[16px] text-[#0A1628]"
          style={{ lineHeight: 1.85, letterSpacing: "-0.015em" }}
        >
          <Section n={1} title="개인정보의 처리 목적">
            <p>
              ㈜바이트포스(이하 &quot;회사&quot;)는 다음 목적을 위하여 개인정보를 처리한다. 처리하고 있는 개인정보는 다음 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우 정보주체의 동의를 다시 받는다.
            </p>
            <Ol>
              <li>회원 가입 및 관리 (본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지)</li>
              <li>서비스 제공 (중장비 배차 매칭, 전자계약, 정산·결제, SMS·이메일 알림 전송, 작업확인서 생성)</li>
              <li>민원 처리 (민원인의 신원 확인, 민원사항 확인·사실조사, 연락·통지, 처리결과 통보)</li>
              <li>마케팅·광고 활용 (이용자 선택 동의 범위 내)</li>
            </Ol>
          </Section>

          <Section n={2} title="수집하는 개인정보의 항목 및 수집 방법">
            <h3 className="text-[16px] font-bold text-[#0A1628] mt-4 mb-2">가. 필수 항목</h3>
            <Ol>
              <li>이름, 휴대전화번호, 이메일 주소</li>
              <li>사업자등록번호, 상호, 대표자명, 사업장 주소 (법인·개인사업자)</li>
              <li>로그인 자격증명 (이메일·OTP·세션 토큰)</li>
              <li>서비스 이용 기록 (배차 요청·수락·완료 이력, 결제 기록)</li>
              <li>자동 수집: IP 주소, 쿠키, 접속 일시, 기기 정보, 서비스 이용 기록</li>
            </Ol>

            <h3 className="text-[16px] font-bold text-[#0A1628] mt-5 mb-2">나. 선택 항목</h3>
            <Ol>
              <li>프로필 사진, 직함, 부서</li>
              <li>마케팅 수신 동의 정보</li>
              <li>전자서명 이미지 (작업확인서 서명 시)</li>
            </Ol>

            <h3 className="text-[16px] font-bold text-[#0A1628] mt-5 mb-2">다. 수집 방법</h3>
            <Ol>
              <li>회원가입 폼 직접 입력</li>
              <li>서비스 이용 과정에서 자동 생성</li>
              <li>고객 문의·상담 과정에서 직접 제공</li>
              <li>제휴사를 통한 정보 제공 (이용자 동의 후)</li>
            </Ol>
          </Section>

          <Section n={3} title="개인정보의 처리 및 보유 기간">
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보 수집 시 동의받은 기간 내에서 개인정보를 처리·보유한다.
            </p>
            <Ol>
              <li>회원 정보: 회원탈퇴 시까지 (단, 관계 법령에 의한 보존 의무가 있는 경우 해당 기간)</li>
              <li>전자상거래 법령에 따른 보존:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                </ul>
              </li>
              <li>통신비밀보호법에 따른 보존: 로그인·접속 기록 3개월</li>
              <li>전자서명 및 작업확인서: 전자서명법에 따라 10년</li>
            </Ol>
          </Section>

          <Section n={4} title="개인정보의 제3자 제공">
            <p>
              회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공한다.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table
                className="w-full text-[13px] text-left border-collapse"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                <thead>
                  <tr className="border-b-2 border-[#0A1628]">
                    <th className="py-2 pr-3 font-bold">제공받는 자</th>
                    <th className="py-2 pr-3 font-bold">제공 목적</th>
                    <th className="py-2 pr-3 font-bold">제공 항목</th>
                    <th className="py-2 font-bold">보유 기간</th>
                  </tr>
                </thead>
                <tbody className="text-[#3A4A5F]">
                  <tr className="border-b border-[#E3E8EF]">
                    <td className="py-2.5 pr-3">Naver Cloud Platform</td>
                    <td className="py-2.5 pr-3">SMS·LMS 발송</td>
                    <td className="py-2.5 pr-3">휴대전화번호, 발송내용</td>
                    <td className="py-2.5">발송 완료 시까지</td>
                  </tr>
                  <tr className="border-b border-[#E3E8EF]">
                    <td className="py-2.5 pr-3">거래 상대방 이용자</td>
                    <td className="py-2.5 pr-3">배차 매칭·계약 체결</td>
                    <td className="py-2.5 pr-3">상호, 담당자명, 연락처</td>
                    <td className="py-2.5">계약 종료 후 5년</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section n={5} title="개인정보 처리업무의 위탁">
            <p>
              회사는 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리업무를 위탁한다.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table
                className="w-full text-[13px] text-left border-collapse"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                <thead>
                  <tr className="border-b-2 border-[#0A1628]">
                    <th className="py-2 pr-3 font-bold">수탁업체</th>
                    <th className="py-2 pr-3 font-bold">위탁 업무</th>
                    <th className="py-2 font-bold">위탁 기간</th>
                  </tr>
                </thead>
                <tbody className="text-[#3A4A5F]">
                  <tr className="border-b border-[#E3E8EF]">
                    <td className="py-2.5 pr-3">Vercel Inc.</td>
                    <td className="py-2.5 pr-3">웹 서비스 호스팅·배포</td>
                    <td className="py-2.5">계약 종료 시까지</td>
                  </tr>
                  <tr className="border-b border-[#E3E8EF]">
                    <td className="py-2.5 pr-3">Supabase Inc.</td>
                    <td className="py-2.5 pr-3">데이터베이스 저장·인증</td>
                    <td className="py-2.5">계약 종료 시까지</td>
                  </tr>
                  <tr className="border-b border-[#E3E8EF]">
                    <td className="py-2.5 pr-3">Naver Cloud Platform</td>
                    <td className="py-2.5 pr-3">SMS·본인인증</td>
                    <td className="py-2.5">계약 종료 시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13px] text-[#6B7B8F]">
              해외 이전 수탁업체(Vercel·Supabase)에 대해서는 개인정보보호법 제28조의8에 따라 별도 고지·동의 절차를 따른다.
            </p>
          </Section>

          <Section n={6} title="정보주체의 권리·의무 및 행사방법">
            <Ol>
              <li>정보주체는 언제든지 다음 권리를 행사할 수 있다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>개인정보 열람 요구</li>
                  <li>오류 정정 요구</li>
                  <li>삭제 요구 (단, 법령상 보존 의무가 있는 경우 제외)</li>
                  <li>처리정지 요구</li>
                </ul>
              </li>
              <li>권리 행사는 서비스 내 설정 → 계정 관리에서 직접 수행하거나, 개인정보보호책임자에게 서면·이메일·팩스 등으로 연락하여 요청할 수 있다. 회사는 지체 없이 조치한다.</li>
              <li>14세 미만 아동의 회원가입 및 서비스 이용은 허용되지 않는다. 의도치 않게 수집된 경우 즉시 파기한다.</li>
            </Ol>
          </Section>

          <Section n={7} title="개인정보의 파기">
            <Ol>
              <li>회사는 보유 기간 경과 또는 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기한다.</li>
              <li>파기 절차: 파기 사유가 발생한 개인정보를 선정하여 회사의 개인정보보호책임자 승인을 받아 파기한다.</li>
              <li>파기 방법: 전자적 파일은 복원 불가능한 방법으로 영구 삭제하고, 종이 문서는 분쇄 또는 소각한다.</li>
            </Ol>
          </Section>

          <Section n={8} title="개인정보의 안전성 확보 조치">
            <Ol>
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
              <li>기술적 조치: 개인정보처리시스템 접근권한 관리, 접근통제시스템 설치, 암호화(전송 TLS 1.3, 저장 AES-256), 보안프로그램 설치</li>
              <li>물리적 조치: 전산실·자료보관실 접근통제</li>
            </Ol>
          </Section>

          <Section n={9} title="쿠키의 운영">
            <p>
              회사는 이용자에게 맞춤 서비스를 제공하기 위해 쿠키(cookie)를 사용한다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 서비스 이용에 제약이 발생할 수 있다.
            </p>
          </Section>

          <Section n={10} title="개인정보보호책임자">
            <div
              className="mt-3 p-4 bg-[#E8F1FB] rounded-xl text-[14px]"
              style={{ fontFamily: "Pretendard, sans-serif" }}
            >
              <p className="font-bold text-[#0A1628] mb-2">개인정보보호책임자 (DPO)</p>
              <ul className="space-y-1 text-[#3A4A5F]">
                <li>
                  성명: <span className="font-medium">{footerCopy.dpo.name}</span> {footerCopy.dpo.title}
                </li>
                <li>
                  이메일: {" "}
                  <a
                    href={`mailto:${footerCopy.dpo.email}`}
                    className="text-[#002C5F] font-medium hover:text-[#0046A4] transition-colors"
                  >
                    {footerCopy.dpo.email}
                  </a>
                </li>
                <li>
                  전화: <span className="font-medium">{footerCopy.dpo.phone}</span>
                </li>
              </ul>
            </div>
          </Section>

          <Section n={11} title="권익침해 구제방법">
            <p>
              정보주체는 다음 기관에 개인정보 침해 신고·상담을 할 수 있다.
            </p>
            <Ol>
              <li>개인정보분쟁조정위원회: 1833-6972 · <a href="https://www.kopico.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#002C5F] font-medium hover:text-[#0046A4] transition-colors">www.kopico.go.kr</a></li>
              <li>개인정보침해신고센터: 118 · <a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer" className="text-[#002C5F] font-medium hover:text-[#0046A4] transition-colors">privacy.kisa.or.kr</a></li>
              <li>대검찰청 사이버수사과: 1301 · <a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#002C5F] font-medium hover:text-[#0046A4] transition-colors">www.spo.go.kr</a></li>
              <li>경찰청 사이버안전국: 182 · <a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#002C5F] font-medium hover:text-[#0046A4] transition-colors">cyberbureau.police.go.kr</a></li>
            </Ol>
          </Section>

          <Section n={12} title="개정 이력">
            <ul className="list-disc pl-6 space-y-1 text-[14px]">
              <li>{EFFECTIVE_DATE} · 초판 제정</li>
            </ul>
          </Section>
        </div>

        <aside
          className="mt-12 pt-6 border-t border-[#E3E8EF] text-[12px] text-[#6B7B8F] leading-[1.7]"
          style={{ fontFamily: "var(--font-roboto-mono), Pretendard, sans-serif" }}
        >
          <p className="font-bold text-[#3A4A5F] mb-2">법률 자문 고지</p>
          <p>
            본 방침은 정보통신망법 제27조의2 · 개인정보보호법 제30조 기준으로 초안한다. 서비스 시행 전 법무 자문의 검토 후 개정판 발행이 필요하다. 관련 문의: {" "}
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
          <Link href="/terms" className="hover:text-[#002C5F] transition-colors">
            이용약관
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

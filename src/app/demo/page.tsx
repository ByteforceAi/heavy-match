import Link from "next/link";

const ROLES = [
  { value: "requester", label: "장비요청자", icon: "person_search", desc: "현장 맞춤형 장비 요청", color: "bg-[#d7e2ff]", iconColor: "text-[#0059b9]", tags: ["장비 요청", "배차 현황", "적립금"] },
  { value: "owner", label: "중장비사장", icon: "local_shipping", desc: "배차 및 매출 통합 관리", color: "bg-[#dde3ef]", iconColor: "text-[#595f69]", tags: ["콜 수신", "단가 설정", "기사 관리"] },
  { value: "operator", label: "기사", icon: "engineering", desc: "스마트한 업무 스케줄", color: "bg-[#d5e4f8]", iconColor: "text-[#4f5d6e]", tags: ["배차 확인", "전자서명", "작업 이력"] },
  { value: "callcenter", label: "콜센터", icon: "support_agent", desc: "실시간 상담 및 매칭", color: "bg-[#ffdad6]", iconColor: "text-[#ba1a1a]", tags: ["콜 관리", "사장 관리", "수수료"] },
  { value: "salesperson", label: "영업사원", icon: "payments", desc: "파트너 확장 및 정산", color: "bg-[#acc7ff]", iconColor: "text-[#1071e5]", tags: ["분양 현황", "수수료", "월별 실적"] },
  { value: "admin", label: "관리자", icon: "admin_panel_settings", desc: "전체 시스템 통합 모니터링", color: "bg-[#26313f]", iconColor: "text-[#eaf1ff]", tags: ["대시보드", "사용자 관리", "마스터 데이터"] },
];

const FLOW_STEPS = [
  { num: "1", title: "장비 요청", desc: "건설사가 장비/규격/시간 선택 후 전자서명으로 요청", icon: "edit_note", role: "장비요청자", roleColor: "bg-[#d7e2ff] text-[#004491]" },
  { num: "2", title: "전용콜 (60초)", desc: "요청자 지정 사장에게 SMS 발송, 60초 타이머 시작", icon: "timer", role: "중장비사장", roleColor: "bg-[#dde3ef] text-[#595f69]", highlight: true },
  { num: "3", title: "콜센터 전달", desc: "60초 미수락 시 해당 사장의 콜센터로 자동 전달", icon: "swap_horiz", role: "콜센터", roleColor: "bg-[#ffdad6] text-[#ba1a1a]" },
  { num: "4", title: "공유콜 (선착순)", desc: "같은 지역 사장 전체에게 동시 발송, 선착순 매칭", icon: "campaign", role: "중장비사장", roleColor: "bg-[#dde3ef] text-[#595f69]" },
  { num: "5", title: "기사 배정", desc: "매칭된 사장이 소속 기사를 선택하여 배정", icon: "person_add", role: "중장비사장", roleColor: "bg-[#dde3ef] text-[#595f69]" },
  { num: "6", title: "작업 완료", desc: "기사 전자서명 → 작업확인서 자동 생성, 수수료 정산", icon: "task_alt", role: "기사", roleColor: "bg-[#d5e4f8] text-[#4f5d6e]" },
];

const STATS = [
  { value: "6개", label: "역할 시스템" },
  { value: "15%", label: "수수료 구조" },
  { value: "60초", label: "전용콜 타이머" },
  { value: "3단계", label: "배차 로직" },
];

export default function DemoPage() {
  return (
    <main className="bg-[#f8f9ff] text-[#111c29] min-h-screen" style={{ fontFamily: "'Inter', 'Pretendard', sans-serif", letterSpacing: "-0.02em" }}>
      {/* ── TopAppBar ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center max-w-5xl mx-auto px-6 h-16">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="text-2xl font-black text-[#111c29] tracking-tighter">Heavy Match</span>
          </div>
          <Link href="/login" className="text-[#0059b9] font-bold hover:text-[#1071e5] transition-colors px-4 py-2 rounded-lg">로그인</Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5eeff] text-[#0059b9] font-bold text-sm mb-6">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          현장 장비 매칭의 디지털 전환
        </div>
        <h1 className="text-4xl md:text-6xl font-[800] leading-[1.15] text-[#111c29] mb-4 tracking-tight">
          장비 요청부터 작업완료까지<br />
          <span className="text-[#0059b9]">60초</span>면 매칭 끝.
        </h1>
        <p className="text-lg md:text-xl text-[#414754] font-medium leading-relaxed mb-6">
          실시간 현장 맞춤 배차부터 정산까지 한 번에.
        </p>

        {/* Stat Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {STATS.map((s) => (
            <span key={s.label} className="px-3 py-1.5 bg-[#dee9fb] text-[#111c29] rounded-full text-sm font-bold">
              {s.value} <span className="text-[#414754] font-medium">{s.label}</span>
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Link href="/demo/owner" className="flex-1 px-8 py-5 rounded-xl bg-gradient-to-br from-[#0059b9] to-[#1071e5] text-white font-extrabold text-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95">
            사장님 화면 체험
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link href="/demo/requester" className="flex-1 px-8 py-5 rounded-xl bg-[#dae0ec] text-[#595f69] font-extrabold text-lg hover:bg-[#c1c7d3] transition-all flex items-center justify-center gap-2 active:scale-95">
            요청자 화면 체험
            <span className="material-symbols-outlined">visibility</span>
          </Link>
        </div>
      </section>

      {/* ── Role Cards ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto bg-[#eef4ff] rounded-[2rem] mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-[800] text-[#111c29] mb-3">6가지 맞춤형 역할 시스템</h2>
          <p className="text-[#414754]">현장의 모든 구성원을 위한 세분화된 인터페이스</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ROLES.map((role) => (
            <Link key={role.value} href={`/demo/${role.value}`} className="group">
              <div className="bg-white p-5 rounded-2xl shadow-[0_20px_40px_rgba(17,28,41,0.06)] border border-white/50 flex flex-col items-center text-center hover:shadow-lg transition-all active:scale-[0.98]">
                <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center mb-3`}>
                  <span className={`material-symbols-outlined text-2xl ${role.iconColor}`}>{role.icon}</span>
                </div>
                <h3 className="font-bold text-[#111c29] text-base mb-0.5">{role.label}</h3>
                <p className="text-xs text-[#414754] mb-3">{role.desc}</p>
                {/* Feature Tags */}
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {role.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#e5eeff] text-[#0059b9] rounded-full font-medium">{tag}</span>
                  ))}
                </div>
                <span className="w-full py-2 bg-[#e5eeff] text-[#0059b9] font-bold rounded-lg text-sm group-hover:bg-[#0059b9] group-hover:text-white transition-all">체험하기</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 6-Step Flow Timeline ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-[800] text-center mb-4">한 눈에 보는 배차 흐름</h2>
        <p className="text-center text-[#414754] mb-12">장비 요청부터 작업 완료까지 6단계</p>

        <div className="space-y-6 relative">
          <div className="absolute left-[23px] md:left-6 top-0 bottom-0 w-1 bg-[#d8e3f5]" />

          {FLOW_STEPS.map((step) => (
            <div key={step.num} className="relative flex items-start pl-16 md:pl-20">
              <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ring-4 ring-[#f8f9ff] ${step.highlight ? "bg-[#ba1a1a]" : "bg-[#0059b9]"}`}>
                <span className="text-white font-bold text-sm">{step.num}</span>
              </div>
              <div className={`bg-white p-5 rounded-2xl shadow-[0_20px_40px_rgba(17,28,41,0.06)] border-l-4 w-full ${step.highlight ? "border-[#ba1a1a]" : "border-[#0059b9]"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#0059b9] text-xl">{step.icon}</span>
                  <h4 className="font-bold text-lg">{step.title}</h4>
                  {step.highlight && (
                    <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold rounded-full animate-pulse">⏱ 60초</span>
                  )}
                </div>
                <p className="text-[#414754] text-sm mb-2">{step.desc}</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${step.roleColor}`}>{step.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Commission Section ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="bg-[#0059b9] p-10 md:p-12 rounded-[2rem] text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-[10rem]">account_balance_wallet</span>
          </div>
          <div className="relative">
            <h2 className="text-3xl font-[800] mb-2">공정하고 투명한 15% 수수료 분배</h2>
            <p className="text-white/80 mb-3">모든 파트너가 상생할 수 있는 최적의 분배 시스템</p>
            <p className="text-white/60 text-sm mb-10">예시: 크레인 50T 1일 임대비 1,000,000원 기준</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { pct: "5%", label: "본사", amount: "50,000원" },
                { pct: "2.5%", label: "영업", amount: "25,000원" },
                { pct: "2.5%", label: "콜센터", amount: "25,000원" },
                { pct: "5%", label: "건설사 적립", amount: "50,000원" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
                  <div className="text-3xl font-black mb-1">{item.pct}</div>
                  <div className="text-white/70 text-sm font-bold">{item.label}</div>
                  <div className="text-white/50 text-xs mt-1 tabular-nums">{item.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust / Tech Stack ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#111c29] mb-6">신뢰할 수 있는 기술력</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Realtime", "PWA", "Vercel", "Naver Cloud SMS"].map((tech) => (
            <span key={tech} className="px-3 py-1.5 bg-[#dee9fb] text-[#111c29] rounded-lg text-sm font-semibold">{tech}</span>
          ))}
        </div>
        <div className="bg-[#dee9fb] p-8 rounded-2xl">
          <p className="text-[#0059b9] font-extrabold text-xl mb-5">로그인 없이 6개 화면을 바로 체험해보세요</p>
          <Link href="/demo/owner" className="inline-block px-8 py-4 bg-[#0059b9] text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform active:scale-95">
            무료 체험 시작하기
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-50 w-full py-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-bold text-[#111c29] mb-3">Heavy Match</div>
            <p className="text-[#414754] font-medium mb-2">개발사: <b>BYTEFORCE (바이트포스)</b></p>
            <p className="text-sm text-[#727785]">© 2026 BYTEFORCE. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <span className="block text-[#727785]">이용약관</span>
              <span className="block text-[#727785]">개인정보처리방침</span>
            </div>
            <div className="space-y-2">
              <span className="block text-[#727785]">고객센터</span>
              <span className="block text-[#727785]">인재채용</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

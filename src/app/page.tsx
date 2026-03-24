import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#f8f9ff] text-[#111c29] min-h-screen" style={{ fontFamily: "'Inter','Pretendard',sans-serif", letterSpacing: "-0.02em" }}>
      {/* ── Glass Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center max-w-5xl mx-auto px-6 h-16">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="text-2xl font-black tracking-tighter">Heavy Match</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/demo" className="text-[#414754] font-semibold hover:text-[#0059b9] transition-colors px-3 py-2 rounded-lg text-sm">데모</Link>
            <Link href="/login" className="text-[#0059b9] font-bold hover:text-[#1071e5] transition-colors px-4 py-2 rounded-lg">로그인</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-16 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5eeff] text-[#0059b9] font-bold text-sm mb-6">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          현장 장비 매칭의 디지털 전환
        </div>
        <h1 className="text-4xl md:text-6xl font-[800] leading-[1.12] mb-5 tracking-tight">
          장비 요청부터 작업완료까지<br />
          <span className="text-[#0059b9]">60초</span>면 매칭 끝.
        </h1>
        <p className="text-lg md:text-xl text-[#414754] font-medium leading-relaxed mb-6">
          건설사와 중장비 업체를 실시간으로 연결하는<br className="md:hidden" /> B2B 배차 중개 플랫폼
        </p>

        {/* Stat Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { v: "6개", l: "역할 시스템" }, { v: "15%", l: "수수료 구조" },
            { v: "60초", l: "전용콜 타이머" }, { v: "8종", l: "장비 지원" },
          ].map(s => (
            <span key={s.l} className="px-3 py-1.5 bg-[#dee9fb] rounded-full text-sm font-bold">
              {s.v} <span className="text-[#414754] font-medium">{s.l}</span>
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-3 justify-center max-w-md mx-auto">
          <Link href="/login" className="flex-1 px-8 py-5 rounded-xl bg-gradient-to-br from-[#0059b9] to-[#1071e5] text-white font-extrabold text-lg shadow-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2">
            시작하기 <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link href="/demo" className="flex-1 px-8 py-5 rounded-xl bg-[#dae0ec] text-[#595f69] font-extrabold text-lg hover:bg-[#c1c7d3] transition-all active:scale-95 flex items-center justify-center gap-2">
            🎮 무료 체험 <span className="material-symbols-outlined">visibility</span>
          </Link>
        </div>
      </section>

      {/* ── 장비 8종 ── */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-[800] text-center mb-6">지원 장비 8종</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[
            { n: "크레인", i: "🏗️" }, { n: "스카이", i: "🔝" }, { n: "카고크레인", i: "🚛" }, { n: "거미크레인", i: "🕷️" },
            { n: "펌프카", i: "💧" }, { n: "굴삭기", i: "⛏️" }, { n: "지게차", i: "📦" }, { n: "덤프", i: "🚚" },
          ].map(eq => (
            <div key={eq.n} className="bg-white rounded-2xl p-3 text-center border border-[#c1c6d6]/30 shadow-[0_2px_12px_rgba(17,28,41,0.04)]">
              <span className="text-2xl block">{eq.i}</span>
              <span className="text-xs font-bold mt-1 block text-[#111c29]">{eq.n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 핵심 기능 ── */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-[800] text-center mb-8">핵심 기능</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "swap_horiz", title: "3단계 배차", desc: "전용콜 → 콜센터 → 공유콜 자동 전환", gradient: "from-[#0059b9] to-[#1071e5]" },
            { icon: "timer", title: "60초 매칭", desc: "타이머 기반 실시간 선착순 배정", gradient: "from-amber-500 to-orange-600" },
            { icon: "draw", title: "전자서명", desc: "요청서·작업확인서 디지털 서명", gradient: "from-emerald-600 to-green-700" },
            { icon: "account_balance", title: "자동 정산", desc: "15% 수수료 4자 자동 분배", gradient: "from-violet-600 to-purple-700" },
          ].map(f => (
            <div key={f.title} className={`bg-gradient-to-br ${f.gradient} rounded-2xl p-5 text-white shadow-lg`}>
              <span className="material-symbols-outlined text-3xl block mb-2 opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
              <h3 className="font-[800] text-base mb-1">{f.title}</h3>
              <p className="text-white/70 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 배차 흐름 6단계 ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-[800] text-center mb-3">배차 흐름 6단계</h2>
        <p className="text-center text-[#414754] text-sm mb-10">장비 요청부터 작업 완료까지</p>
        <div className="space-y-4 relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-[#d8e3f5]" />
          {[
            { n: "1", t: "장비 요청", d: "건설사가 장비/규격/시간 선택 후 전자서명", ic: "edit_note", role: "장비요청자", rc: "bg-[#d7e2ff] text-[#004491]" },
            { n: "2", t: "전용콜 (60초)", d: "지정 사장에게 SMS 발송, 60초 타이머", ic: "timer", role: "중장비사장", rc: "bg-[#dde3ef] text-[#595f69]", hl: true },
            { n: "3", t: "콜센터 전달", d: "미수락 시 콜센터로 자동 전달", ic: "swap_horiz", role: "콜센터", rc: "bg-[#ffdad6] text-[#ba1a1a]" },
            { n: "4", t: "공유콜", d: "같은 지역 사장 전체에게 선착순 발송", ic: "campaign", role: "중장비사장", rc: "bg-[#dde3ef] text-[#595f69]" },
            { n: "5", t: "기사 배정", d: "매칭된 사장이 소속 기사를 배정", ic: "person_add", role: "중장비사장", rc: "bg-[#dde3ef] text-[#595f69]" },
            { n: "6", t: "작업 완료", d: "기사 전자서명 → 작업확인서 자동 생성", ic: "task_alt", role: "기사", rc: "bg-[#d5e4f8] text-[#4f5d6e]" },
          ].map(s => (
            <div key={s.n} className="relative flex items-start pl-14">
              <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ring-4 ring-[#f8f9ff] ${s.hl ? "bg-[#ba1a1a]" : "bg-[#0059b9]"}`}>
                <span className="text-white font-bold text-sm">{s.n}</span>
              </div>
              <div className={`bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(17,28,41,0.04)] border-l-4 w-full ${s.hl ? "border-[#ba1a1a]" : "border-[#0059b9]"}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="material-symbols-outlined text-[#0059b9] text-lg">{s.ic}</span>
                  <h4 className="font-bold text-base">{s.t}</h4>
                  {s.hl && <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold rounded-full animate-pulse">⏱ 60초</span>}
                </div>
                <p className="text-[#414754] text-sm">{s.d}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${s.rc}`}>{s.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 수수료 ── */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="bg-[#0059b9] p-8 md:p-12 rounded-[2rem] text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <span className="material-symbols-outlined text-[8rem]">account_balance_wallet</span>
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-[800] mb-2">투명한 15% 수수료 분배</h2>
            <p className="text-white/60 text-sm mb-8">예시: 크레인 50T 1일 임대비 1,000,000원 기준</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { p: "5%", l: "본사", a: "50,000원" }, { p: "2.5%", l: "영업", a: "25,000원" },
                { p: "2.5%", l: "콜센터", a: "25,000원" }, { p: "5%", l: "건설사 적립", a: "50,000원" },
              ].map(c => (
                <div key={c.l} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <div className="text-3xl font-black">{c.p}</div>
                  <div className="text-white/70 text-sm font-bold">{c.l}</div>
                  <div className="text-white/50 text-xs mt-1 tabular-nums">{c.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 기술 스택 + CTA ── */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-5">신뢰할 수 있는 기술력</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["Next.js 16","TypeScript","Tailwind CSS","Supabase","PostgreSQL","Realtime","PWA","Vercel","Naver Cloud SMS"].map(t => (
            <span key={t} className="px-3 py-1.5 bg-[#dee9fb] rounded-lg text-sm font-semibold">{t}</span>
          ))}
        </div>
        <div className="bg-[#dee9fb] p-8 rounded-2xl">
          <p className="text-[#0059b9] font-extrabold text-xl mb-5">로그인 없이 6개 화면을 바로 체험해보세요</p>
          <Link href="/demo" className="inline-block px-8 py-4 bg-[#0059b9] text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform active:scale-95">
            무료 체험 시작하기
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#26313f] text-[#eaf1ff] w-full py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-lg font-black mb-2">Heavy Match</div>
            <p className="text-[#acc7ff]/70 text-sm mb-1">개발사: <b className="text-[#acc7ff]">BYTEFORCE (바이트포스)</b></p>
            <p className="text-[#acc7ff]/50 text-xs">© 2026 BYTEFORCE. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-[#acc7ff]/60">
            <div className="space-y-2"><span className="block">이용약관</span><span className="block">개인정보처리방침</span></div>
            <div className="space-y-2"><span className="block">고객센터</span><span className="block">인재채용</span></div>
          </div>
        </div>
      </footer>
    </main>
  );
}

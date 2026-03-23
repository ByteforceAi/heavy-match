import Link from "next/link";

const ROLES = [
  { value: "requester", label: "장비요청자", icon: "🏗️", desc: "건설사 현장소장", color: "from-blue-500 to-blue-700", features: ["장비 요청 (6단계 위자드)", "진행중 배차 현황", "요청 이력 / 재주문", "적립금 내역"] },
  { value: "owner", label: "중장비사장", icon: "🏭", desc: "장비 임대 업체", color: "from-emerald-500 to-emerald-700", features: ["전용콜 / 공유콜 수신 (60초 타이머)", "단가 설정 매트릭스", "기사 관리 / 배정", "초대 링크 생성"] },
  { value: "operator", label: "기사", icon: "👷", desc: "장비 운전 기사", color: "from-amber-500 to-amber-700", features: ["배차 정보 확인", "작업 시작 / 완료", "전자서명 제출", "작업 이력"] },
  { value: "callcenter", label: "콜센터", icon: "📞", desc: "사장 관리 업체", color: "from-purple-500 to-purple-700", features: ["전달된 콜 관리", "소속 사장 관리", "수수료 내역"] },
  { value: "salesperson", label: "영업사원", icon: "💼", desc: "앱 분양 담당", color: "from-pink-500 to-pink-700", features: ["분양 현황", "수수료 상세", "월별 실적"] },
  { value: "admin", label: "관리자", icon: "🔧", desc: "플랫폼 운영자", color: "from-red-500 to-red-700", features: ["통합 대시보드", "배차/사용자/수수료 관리", "마스터 데이터 설정", "작업확인서 조회"] },
];

const FLOW_STEPS = [
  { num: "1", title: "장비 요청", desc: "건설사가 장비/규격/시간 선택 후 전자서명", icon: "📋", role: "장비요청자" },
  { num: "2", title: "전용콜 (60초)", desc: "요청자의 지정 사장에게 SMS 발송", icon: "📞", role: "중장비사장" },
  { num: "3", title: "콜센터 전달", desc: "미수락 시 해당 사장의 콜센터로 자동 전달", icon: "🔄", role: "콜센터" },
  { num: "4", title: "공유콜 (선착순)", desc: "같은 지역 사장 전체에게 동시 발송", icon: "📢", role: "중장비사장" },
  { num: "5", title: "기사 배정", desc: "매칭된 사장이 소속 기사를 배정", icon: "👷", role: "중장비사장" },
  { num: "6", title: "작업 완료", desc: "기사 전자서명 → 작업확인서 자동 생성", icon: "✅", role: "기사" },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            🎮 데모 시뮬레이터
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Heavy Match 체험하기</h1>
          <p className="text-gray-300 text-lg md:text-xl mb-2">
            로그인 없이 6개 역할의 화면을 직접 체험해보세요
          </p>
          <p className="text-gray-400 text-sm">
            실제 건설 현장 시나리오 기반 데이터로 모든 기능을 미리 확인할 수 있습니다
          </p>

          {/* 추천 시작 버튼 */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link
              href="/demo/owner"
              className="flex-1 py-4 px-6 bg-emerald-500 text-white text-lg font-bold rounded-2xl text-center hover:bg-emerald-400 transition shadow-lg active:scale-[0.98]"
            >
              🏭 사장님 화면부터 보기
            </Link>
            <Link
              href="/demo/requester"
              className="flex-1 py-4 px-6 bg-white/10 backdrop-blur text-white text-lg font-semibold rounded-2xl text-center border border-white/20 hover:bg-white/20 transition active:scale-[0.98]"
            >
              🏗️ 요청자 화면 보기
            </Link>
          </div>
        </div>
      </div>

      {/* 배차 흐름 가이드 */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-center text-text mb-2">배차 흐름</h2>
        <p className="text-center text-text-muted text-sm mb-8">장비 요청부터 작업 완료까지 6단계</p>

        <div className="grid md:grid-cols-2 gap-3">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0">
                {step.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.icon}</span>
                  <h3 className="font-bold text-base">{step.title}</h3>
                </div>
                <p className="text-sm text-text-muted mt-0.5">{step.desc}</p>
                <span className="inline-block mt-1 text-xs bg-gray-100 text-text-muted px-2 py-0.5 rounded-full">{step.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 수수료 구조 */}
      <section className="bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-center text-text mb-2">수수료 구조 (15%)</h2>
          <p className="text-center text-text-muted text-sm mb-6">예시: 크레인 50T 임대비 1,000,000원</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto">
            {[
              { role: "건설사 적립", pct: "5%", amount: "50,000원", color: "text-blue-600", bg: "bg-blue-50" },
              { role: "본사 수익", pct: "5%", amount: "50,000원", color: "text-green-600", bg: "bg-green-50" },
              { role: "콜센터", pct: "2.5%", amount: "25,000원", color: "text-purple-600", bg: "bg-purple-50" },
              { role: "영업사원", pct: "2.5%", amount: "25,000원", color: "text-pink-600", bg: "bg-pink-50" },
            ].map((item) => (
              <div key={item.role} className={`${item.bg} rounded-xl p-3 text-center`}>
                <p className={`text-xl font-bold tabular-nums ${item.color}`}>{item.pct}</p>
                <p className="text-xs text-text-muted mt-0.5">{item.role}</p>
                <p className={`text-sm font-bold tabular-nums mt-1 ${item.color}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 역할별 체험 */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-center text-text mb-2">역할별 체험</h2>
        <p className="text-center text-text-muted text-sm mb-8">각 역할을 클릭하면 해당 대시보드를 바로 볼 수 있습니다</p>

        <div className="grid md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <Link key={role.value} href={`/demo/${role.value}`} className="group block">
              <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary transition-all overflow-hidden active:scale-[0.98]">
                <div className={`bg-gradient-to-r ${role.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{role.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{role.label}</h3>
                      <p className="text-sm opacity-80">{role.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="space-y-1.5">
                    {role.features.map((f) => (
                      <li key={f} className="text-sm text-text-muted flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                    체험하기 →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="text-xl font-bold text-center mb-6">기술 스택</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Realtime", "PWA", "Vercel", "Naver Cloud SMS"].map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-lg text-sm">{tech}</span>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">개발사: <b className="text-white">BYTEFORCE (바이트포스)</b></p>
            <p className="text-gray-500 text-xs mt-1">&copy; 2026 BYTEFORCE. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

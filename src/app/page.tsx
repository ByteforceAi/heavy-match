import Link from "next/link";

const FEATURES = [
  { icon: "📞", title: "3단계 배차", desc: "전용콜 → 콜센터 → 공유콜 자동 전환" },
  { icon: "⚡", title: "실시간 매칭", desc: "선착순 공유콜로 빠른 장비 배정" },
  { icon: "📋", title: "전자서명", desc: "요청서·작업확인서 디지털 서명" },
  { icon: "💰", title: "자동 정산", desc: "수수료 15% 자동 분배 관리" },
];

const EQUIPMENT = ["🏗️ 크레인", "🔝 스카이", "🚛 카고크레인", "🕷️ 거미크레인", "💧 펌프카", "⛏️ 굴삭기", "📦 지게차", "🚚 덤프"];

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-lg mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            서울 리전 · 실시간 운영중
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Heavy Match
          </h1>
          <p className="text-xl text-blue-100 mb-2">중장비 배차 실시간 매칭 플랫폼</p>
          <p className="text-sm text-blue-200 mb-8">
            건설사와 중장비 업체를 60초 안에 연결합니다
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Link
              href="/login"
              className="block py-4 px-6 bg-white text-primary text-lg font-bold rounded-2xl text-center hover:bg-blue-50 transition shadow-lg"
            >
              로그인
            </Link>
            <Link
              href="/register"
              className="block py-4 px-6 bg-white/10 backdrop-blur text-white text-lg font-semibold rounded-2xl text-center border border-white/30 hover:bg-white/20 transition"
            >
              회원가입
            </Link>
            <Link
              href="/demo"
              className="block py-3 px-6 text-blue-200 text-sm font-medium text-center hover:text-white transition"
            >
              🎮 데모 체험하기
            </Link>
          </div>
        </div>
      </section>

      {/* 장비 종류 */}
      <section className="max-w-lg mx-auto px-6 py-10">
        <h2 className="text-lg font-bold text-center text-text mb-4">지원 장비 8종</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {EQUIPMENT.map((eq) => (
            <span key={eq} className="px-3 py-2 bg-card rounded-xl text-sm font-medium border border-border shadow-sm">
              {eq}
            </span>
          ))}
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="max-w-lg mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-card rounded-2xl p-4 border border-border shadow-sm">
              <span className="text-2xl block mb-2">{f.icon}</span>
              <h3 className="font-bold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 역할 */}
      <section className="bg-card border-t border-border">
        <div className="max-w-lg mx-auto px-6 py-10">
          <h2 className="text-lg font-bold text-center text-text mb-4">누가 사용하나요?</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { emoji: "🏗️", role: "장비요청자", desc: "건설사" },
              { emoji: "🏭", role: "중장비사장", desc: "임대업체" },
              { emoji: "👷", role: "기사", desc: "장비운전" },
              { emoji: "📞", role: "콜센터", desc: "사장관리" },
              { emoji: "💼", role: "영업사원", desc: "앱분양" },
              { emoji: "🔧", role: "관리자", desc: "플랫폼" },
            ].map((r) => (
              <div key={r.role} className="p-3 bg-bg rounded-xl">
                <span className="text-xl">{r.emoji}</span>
                <p className="text-xs font-semibold mt-1">{r.role}</p>
                <p className="text-xs text-text-muted">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p className="font-semibold text-white">BYTEFORCE</p>
        <p className="mt-1">중장비 배차 매칭 솔루션</p>
        <p className="mt-1">&copy; 2026 BYTEFORCE. All rights reserved.</p>
      </footer>
    </main>
  );
}

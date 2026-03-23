import Link from "next/link";

const ROLES = [
  { value: "requester", label: "장비요청자", icon: "🏗️", desc: "건설사 현장소장 화면", color: "from-blue-500 to-blue-700", features: ["장비 요청 (6단계 위자드)", "진행중 배차 현황", "요청 이력 / 재주문", "적립금 내역"] },
  { value: "owner", label: "중장비사장", icon: "🏭", desc: "장비 임대 업체 화면", color: "from-emerald-500 to-emerald-700", features: ["전용콜 / 공유콜 수신", "단가 설정 매트릭스", "소속 기사 관리", "초대 링크 생성"] },
  { value: "operator", label: "기사", icon: "👷", desc: "장비 운전 기사 화면", color: "from-amber-500 to-amber-700", features: ["현재 배차 정보", "작업완료 전자서명", "작업 이력"] },
  { value: "callcenter", label: "콜센터", icon: "📞", desc: "중장비사장 관리 화면", color: "from-purple-500 to-purple-700", features: ["전달된 콜 관리", "소속 사장 관리", "수수료 내역"] },
  { value: "salesperson", label: "영업사원", icon: "💼", desc: "앱 분양 담당 화면", color: "from-pink-500 to-pink-700", features: ["분양 현황", "수수료 상세", "월별 실적"] },
  { value: "admin", label: "관리자", icon: "🔧", desc: "플랫폼 운영자 화면", color: "from-red-500 to-red-700", features: ["통합 대시보드", "전체 배차 현황", "사용자/수수료 관리", "마스터 설정"] },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 rounded-full px-4 py-1 text-sm mb-4">
            🎮 데모 시뮬레이터
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Heavy Match 체험하기</h1>
          <p className="text-gray-300 text-lg">
            6개 역할의 화면을 직접 체험해보세요
          </p>
          <p className="text-gray-400 text-sm mt-2">
            실제 데이터 없이 모든 기능을 미리 확인할 수 있습니다
          </p>
        </div>
      </div>

      {/* 역할 카드 */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <Link
              key={role.value}
              href={`/demo/${role.value}`}
              className="group block"
            >
              <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary transition-all overflow-hidden">
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
                  <ul className="space-y-1">
                    {role.features.map((f) => (
                      <li key={f} className="text-sm text-text-muted flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    체험하기 →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-text-muted text-sm hover:text-primary">
            ← 메인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}

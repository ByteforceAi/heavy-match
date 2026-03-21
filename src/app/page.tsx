import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Heavy Match</h1>
        <p className="text-lg text-text-muted mb-8">중장비 배차 실시간 매칭 플랫폼</p>
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
          <Link
            href="/login"
            className="block w-full py-4 px-6 bg-primary text-white text-lg font-semibold rounded-xl text-center hover:bg-primary-light transition"
          >
            로그인
          </Link>
          <Link
            href="/register"
            className="block w-full py-4 px-6 bg-white text-primary text-lg font-semibold rounded-xl text-center border-2 border-primary hover:bg-blue-50 transition"
          >
            회원가입
          </Link>
        </div>
        <p className="mt-8 text-sm text-text-muted">
          BYTEFORCE &copy; 2026
        </p>
      </div>
    </main>
  );
}

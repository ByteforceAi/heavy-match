"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import SignatureCanvas from "@/components/SignatureCanvas";
import { DEMO_DISPATCHES, DEMO_COMMISSIONS, DEMO_OPERATORS, DEMO_OWNERS, DEMO_CALL_HISTORY, DEMO_ALL_USERS } from "@/lib/demoData";
import { exportDispatchesToCSV, exportCommissionsToCSV, exportUsersToCSV } from "@/lib/exportExcel";

/* ═════ MD3 Primitives ═════ */
function Md3Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl border border-[#c1c6d6]/30 p-5 shadow-[0_2px_12px_rgba(17,28,41,0.04)] ${className}`}>{children}</div>;
}
function Md3Badge({ label, color = "bg-[#e5eeff] text-[#0059b9]" }: { label: string; color?: string }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${color}`}>{label}</span>;
}
function Md3Toast({ message }: { message: string }) {
  return <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold bg-[#26313f] text-white animate-fade-in">✅ {message}</div>;
}
function Md3Stat({ icon, value, label, gradient }: { icon: string; value: string | number; label: string; gradient: string }) {
  return (
    <div className={`${gradient} rounded-2xl p-4 text-white text-center`}>
      <span className="material-symbols-outlined text-2xl block mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      <p className="text-xl font-black tabular-nums">{value}</p>
      <p className="text-[10px] font-semibold opacity-70 mt-0.5">{label}</p>
    </div>
  );
}
function PageTitle({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-2xl font-[800] text-[#111c29]">{title}</h2>
        {desc && <p className="text-sm text-[#414754] mt-0.5">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  exclusive_call: { label: "전용콜", color: "bg-[#d7e2ff] text-[#004491]" },
  shared_call: { label: "공유콜", color: "bg-[#dde3ef] text-[#595f69]" },
  matched: { label: "매칭완료", color: "bg-emerald-100 text-emerald-700" },
  operator_assigned: { label: "기사배정", color: "bg-[#e5eeff] text-[#0059b9]" },
  in_progress: { label: "작업중", color: "bg-amber-100 text-amber-700" },
  completed: { label: "완료", color: "bg-emerald-100 text-emerald-700" },
};
const EQ_ICONS: Record<string, string> = { "크레인": "🏗️", "굴삭기": "⛏️", "스카이": "🔝", "펌프카": "💧", "지게차": "📦", "덤프": "🚚", "카고크레인": "🚛", "거미크레인": "🕷️" };

/* ═════ Router ═════ */
export default function DemoSubPage() {
  const params = useParams<{ role: string; subpage: string[] }>();
  const key = `${params.role}/${params.subpage?.join("/") ?? ""}`;

  switch (key) {
    case "requester/request": return <DemoRequest />;
    case "requester/history": return <DemoHistory dispatches={DEMO_DISPATCHES} title="요청 이력" desc="내가 요청한 장비 배차 내역" />;
    case "requester/rewards": return <DemoRewards />;
    case "owner/prices": return <DemoPrices />;
    case "owner/operators": return <DemoOperators />;
    case "owner/history": return <DemoHistory dispatches={DEMO_DISPATCHES.filter(d => ["matched","completed"].includes(d.status))} title="매칭 이력" desc="내가 수락한 배차 내역" />;
    case "owner/invite": return <DemoInvite />;
    case "operator/history": return <DemoHistory dispatches={DEMO_DISPATCHES.filter(d => ["completed","in_progress"].includes(d.status))} title="작업 이력" desc="내가 수행한 작업 내역" />;
    case "callcenter/owners": return <DemoCallcenterOwners />;
    case "callcenter/commission": return <DemoCommission type="callcenter" />;
    case "salesperson/commission": return <DemoCommission type="salesperson" />;
    case "admin/dispatch": return <DemoAdminDispatch />;
    case "admin/users": return <DemoAdminUsers />;
    case "admin/commission": return <DemoAdminCommission />;
    case "admin/settings": return <DemoSettings />;
    default: return <div className="text-center py-12 text-[#727785]"><span className="material-symbols-outlined text-5xl block mb-2">construction</span>{key}</div>;
  }
}

/* ═══════════════════════════════════════
   장비요청 6단계 위자드
   ═══════════════════════════════════════ */
function DemoRequest() {
  const ALL_SPECS: Record<number, { id: number; name: string }[]> = {
    1: [{id:1,name:"25T"},{id:2,name:"50T"},{id:3,name:"70T"},{id:4,name:"100T"},{id:5,name:"200T"}],
    2: [{id:6,name:"45m"},{id:7,name:"52m"},{id:8,name:"58m"},{id:9,name:"65m"}],
    3: [{id:10,name:"5T"},{id:11,name:"8T"},{id:12,name:"11T"}],
    4: [{id:13,name:"3T"},{id:14,name:"5T"},{id:15,name:"8T"}],
    5: [{id:16,name:"32m"},{id:17,name:"37m"},{id:18,name:"42m"}],
    6: [{id:19,name:"0.6T"},{id:20,name:"1T"},{id:21,name:"3T"},{id:22,name:"6T"},{id:23,name:"8T"}],
    7: [{id:24,name:"2.5T"},{id:25,name:"3T"},{id:26,name:"5T"}],
    8: [{id:27,name:"15T"},{id:28,name:"25T"}],
  };
  const EQ = [
    {id:1,name:"크레인",icon:"🏗️"},{id:2,name:"스카이",icon:"🔝"},{id:3,name:"카고크레인",icon:"🚛"},{id:4,name:"거미크레인",icon:"🕷️"},
    {id:5,name:"펌프카",icon:"💧"},{id:6,name:"굴삭기",icon:"⛏️"},{id:7,name:"지게차",icon:"📦"},{id:8,name:"덤프",icon:"🚚"},
  ];
  const TIMES = [{id:1,name:"1시간"},{id:2,name:"오전(4h)"},{id:3,name:"오후(4h)"},{id:4,name:"하루(8h)"}];

  const [step, setStep] = useState(1);
  const [eq, setEq] = useState<typeof EQ[0]|null>(null);
  const [spec, setSpec] = useState<string|null>(null);
  const [time, setTime] = useState<string|null>(null);
  const [price, setPrice] = useState("300000");
  const [signed, setSigned] = useState(false);
  const [toast, setToast] = useState<string|null>(null);
  const [submitting, setSubmitting] = useState<"idle"|"uploading"|"creating"|"notifying"|"done">("idle");
  const show = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const handleSubmit = async () => {
    if (!signed) return;
    setSubmitting("uploading");
    await new Promise(r => setTimeout(r, 600));
    setSubmitting("creating");
    await new Promise(r => setTimeout(r, 700));
    setSubmitting("notifying");
    await new Promise(r => setTimeout(r, 800));
    setSubmitting("done");
    show("장비 요청 완료! 사장님에게 SMS 발송됨");
    setTimeout(() => {
      setStep(1); setSigned(false); setSubmitting("idle");
    }, 2500);
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      {toast && <Md3Toast message={toast} />}
      <div className="flex gap-1">{[1,2,3,4,5,6].map(s => <div key={s} className={`flex-1 h-2 rounded-full transition-all ${s <= step ? "bg-[#0059b9]" : "bg-[#d8e3f5]"}`} />)}</div>

      {step === 1 && (<>
        <h3 className="text-xl font-[800] text-[#111c29]">장비 선택</h3>
        <div className="grid grid-cols-2 gap-3">
          {EQ.map(e => (
            <button key={e.id} onClick={() => { setEq(e); setStep(2); }}
              className="bg-white rounded-2xl p-4 text-center border border-[#c1c6d6]/30 hover:border-[#0059b9] hover:shadow-md transition-all active:scale-95">
              <span className="text-3xl block mb-1">{e.icon}</span>
              <span className="text-base font-bold text-[#111c29]">{e.name}</span>
            </button>
          ))}
        </div>
      </>)}

      {step === 2 && eq && (<>
        <h3 className="text-xl font-[800] text-[#111c29]">{eq.icon} {eq.name} 규격</h3>
        <div className="grid grid-cols-2 gap-3">
          {(ALL_SPECS[eq.id]||[]).map(s => (
            <button key={s.id} onClick={() => { setSpec(s.name); setStep(3); }}
              className="bg-white rounded-2xl p-4 text-center border border-[#c1c6d6]/30 hover:border-[#0059b9] transition-all active:scale-95">
              <span className="text-xl font-black text-[#111c29]">{s.name}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setStep(1)} className="text-sm text-[#727785] flex items-center gap-1"><span className="material-symbols-outlined text-base">arrow_back</span>장비 다시 선택</button>
      </>)}

      {step === 3 && (<>
        <h3 className="text-xl font-[800] text-[#111c29]">시간 선택</h3>
        <div className="grid grid-cols-2 gap-3">
          {TIMES.map(t => (
            <button key={t.id} onClick={() => { setTime(t.name); setStep(4); }}
              className="bg-white rounded-2xl p-4 text-center border border-[#c1c6d6]/30 hover:border-[#0059b9] transition-all active:scale-95">
              <span className="text-lg font-bold text-[#111c29]">{t.name}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setStep(2)} className="text-sm text-[#727785] flex items-center gap-1"><span className="material-symbols-outlined text-base">arrow_back</span>규격 다시 선택</button>
      </>)}

      {step === 4 && (<>
        <h3 className="text-xl font-[800] text-[#111c29]">단가 확인</h3>
        <div className="bg-[#eef4ff] rounded-2xl p-5">
          <p className="text-sm text-[#414754]">{eq?.name} {spec} / {time}</p>
          <input type="text" inputMode="numeric" value={price} onChange={e => setPrice(e.target.value.replace(/\D/g,""))}
            className="w-full mt-2 px-4 py-3 text-2xl font-black text-right border border-[#c1c6d6] rounded-xl tabular-nums focus:ring-2 focus:ring-[#0059b9]/30 focus:border-[#0059b9]" />
          <p className="text-xs text-[#727785] text-right mt-1">원 (₩)</p>
        </div>
        <button onClick={() => setStep(5)} className="w-full py-4 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">arrow_forward</span>다음
        </button>
        <button onClick={() => setStep(3)} className="text-sm text-[#727785] flex items-center gap-1"><span className="material-symbols-outlined text-base">arrow_back</span>이전</button>
      </>)}

      {step === 5 && (<>
        <h3 className="text-xl font-[800] text-[#111c29]">현장 정보</h3>
        <input type="text" defaultValue="한양건설(주)" placeholder="건설사명 *" className="w-full px-4 py-3 border border-[#c1c6d6] rounded-xl bg-white focus:ring-2 focus:ring-[#0059b9]/30" />
        <input type="text" defaultValue="서울시 강남구 삼성동 코엑스 신축현장" placeholder="현장주소 *" className="w-full px-4 py-3 border border-[#c1c6d6] rounded-xl bg-white focus:ring-2 focus:ring-[#0059b9]/30" />
        <input type="text" defaultValue="김건설" placeholder="요청자명" className="w-full px-4 py-3 border border-[#c1c6d6] rounded-xl bg-white focus:ring-2 focus:ring-[#0059b9]/30" />
        <input type="tel" defaultValue="010-1234-5678" placeholder="연락처" className="w-full px-4 py-3 border border-[#c1c6d6] rounded-xl bg-white focus:ring-2 focus:ring-[#0059b9]/30" />
        <button onClick={() => setStep(6)} className="w-full py-4 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">draw</span>다음 (전자서명)
        </button>
        <button onClick={() => setStep(4)} className="text-sm text-[#727785] flex items-center gap-1"><span className="material-symbols-outlined text-base">arrow_back</span>이전</button>
      </>)}

      {step === 6 && (<>
        <h3 className="text-xl font-[800] text-[#111c29]">전자서명</h3>
        <div className="bg-[#eef4ff] rounded-xl p-3 text-sm">
          <p><b>{eq?.name}</b> {spec} / {time}</p>
          <p className="text-[#0059b9] font-black tabular-nums text-lg">{formatPrice(parseInt(price)||0)}원</p>
        </div>
        <SignatureCanvas onSave={() => setSigned(true)} />
        {signed && <p className="text-emerald-600 text-sm text-center font-bold">✅ 서명 완료</p>}

        {/* 진행 단계 표시 (submitting 중) */}
        {submitting !== "idle" && submitting !== "done" && (
          <div className="space-y-1.5 bg-[#f8f9ff] border border-[#c1c6d6]/30 rounded-xl p-3">
            {[
              { key: "uploading", label: "서명 이미지 업로드 중...", icon: "cloud_upload" },
              { key: "creating", label: "배차 요청 생성 중...", icon: "sync" },
              { key: "notifying", label: "사장님에게 SMS 발송 중...", icon: "send" },
            ].map(s => {
              const isActive = submitting === s.key;
              const isPast = ["uploading","creating","notifying"].indexOf(submitting) > ["uploading","creating","notifying"].indexOf(s.key);
              return (
                <div key={s.key} className="flex items-center gap-2 text-xs">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{
                      color: isPast ? "#10B981" : isActive ? "#0059b9" : "#c1c6d6",
                      fontVariationSettings: isPast ? "'FILL' 1" : undefined,
                      animation: isActive ? "spin 1s linear infinite" : undefined,
                    }}
                  >
                    {isPast ? "check_circle" : s.icon}
                  </span>
                  <span className={isPast ? "text-emerald-600 line-through" : isActive ? "text-[#0059b9] font-bold" : "text-[#c1c6d6]"}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {submitting === "done" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-3xl text-emerald-500 block" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <p className="text-sm font-bold text-emerald-700 mt-1">요청 완료!</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!signed || submitting !== "idle"}
          className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white text-lg font-black rounded-xl disabled:opacity-40 disabled:cursor-wait active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {submitting === "idle" ? (
            <><span className="material-symbols-outlined">send</span>장비 요청하기</>
          ) : submitting === "done" ? (
            <><span className="material-symbols-outlined">check_circle</span>완료</>
          ) : (
            <>
              <span
                className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                style={{ animation: "spin 0.9s linear infinite" }}
              />
              처리중...
            </>
          )}
        </button>
        <button onClick={() => setStep(5)} className="text-sm text-[#727785] flex items-center gap-1"><span className="material-symbols-outlined text-base">arrow_back</span>이전</button>
      </>)}
    </div>
  );
}

/* ═════ 이력 (공통) ═════ */
function DemoHistory({ dispatches, title, desc }: { dispatches: typeof DEMO_DISPATCHES; title: string; desc: string }) {
  return (
    <div>
      <PageTitle title={title} desc={desc} />
      <div className="space-y-3">
        {dispatches.map(d => (
          <Md3Card key={d.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#111c29]">{EQ_ICONS[d.equipment_types.name]} {d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <Md3Badge label={STATUS_MAP[d.status]?.label||d.status} color={STATUS_MAP[d.status]?.color} />
            </div>
            <p className="text-sm text-[#414754]">{d.site_address}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-black tabular-nums text-[#0059b9]">{formatPrice(d.price)}원</span>
              <span className="text-xs text-[#727785]">{new Date(d.created_at).toLocaleDateString("ko-KR")}</span>
            </div>
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

/* ═════ 적립금 ═════ */
function DemoRewards() {
  const total = DEMO_COMMISSIONS.reduce((s,c) => s + c.requester_reward, 0);
  return (
    <div>
      <PageTitle title="적립금 내역" desc="장비 이용 시 적립된 포인트" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Md3Stat icon="savings" value={`${formatPrice(total)}원`} label="총 적립금" gradient="bg-gradient-to-br from-emerald-600 to-teal-700" />
        <Md3Stat icon="receipt_long" value={DEMO_COMMISSIONS.length} label="적립 건수" gradient="bg-gradient-to-br from-[#0059b9] to-[#1071e5]" />
      </div>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map(c => (
          <Md3Card key={c.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#111c29] text-sm">{formatPrice(c.total_price)}원 건</p>
              <p className="text-xs text-[#727785]">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <span className="font-black tabular-nums text-emerald-600">+{formatPrice(c.requester_reward)}원</span>
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

/* ═════ 단가 설정 ═════ */
function DemoPrices() {
  const ALL_SPECS: Record<string,string[]> = {
    "크레인":["25T","50T","70T","100T","200T"],"스카이":["45m","52m","58m","65m"],
    "카고크레인":["5T","8T","11T","15T","25T"],"거미크레인":["3T","5T","8T","10T"],
    "펌프카":["32m","37m","42m","47m","52m"],"굴삭기":["0.6T","1T","3T","6T","8T","20T","30T"],
    "지게차":["2.5T","3T","5T","7T","11T"],"덤프":["15T","25T"],
  };
  const TYPES = Object.keys(ALL_SPECS);
  const TIMES = ["1시간","오전(4h)","오후(4h)","하루(8h)"];
  const [sel, setSel] = useState("크레인");
  const [prices, setPrices] = useState<Record<string,string>>({"크레인-50T-1시간":"300000","크레인-50T-오전(4h)":"300000","크레인-50T-오후(4h)":"300000","크레인-50T-하루(8h)":"300000"});
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-4">
      <PageTitle title="단가 설정" desc="장비×규격×시간 매트릭스" action={
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`px-5 py-2.5 font-bold rounded-xl text-sm active:scale-95 transition-all ${saved ? "bg-emerald-600 text-white" : "bg-[#0059b9] text-white"}`}>
          {saved ? <><span className="material-symbols-outlined text-base align-middle mr-1">check</span>저장됨</> : "저장"}
        </button>
      } />
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TYPES.map(t => (
          <button key={t} onClick={() => setSel(t)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all active:scale-95 ${sel === t ? "bg-[#0059b9] text-white shadow-md" : "bg-white border border-[#c1c6d6]/50 text-[#414754] hover:border-[#0059b9]"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl border border-[#c1c6d6]/30 shadow-sm">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#c1c6d6]/30 bg-[#eef4ff]">
            <th className="text-left p-3 font-bold text-[#414754]">규격</th>
            {TIMES.map(t => <th key={t} className="text-center p-3 font-bold text-[#414754] whitespace-nowrap">{t}</th>)}
          </tr></thead>
          <tbody>{(ALL_SPECS[sel]||[]).map(spec => (
            <tr key={spec} className="border-b border-[#c1c6d6]/10 hover:bg-[#eef4ff]/50 transition-colors">
              <td className="p-3 font-black text-[#111c29]">{spec}</td>
              {TIMES.map(t => { const k=`${sel}-${spec}-${t}`; return (
                <td key={t} className="p-1.5">
                  <input type="text" inputMode="numeric" value={prices[k]??""} onChange={e => setPrices(p => ({...p,[k]:e.target.value.replace(/\D/g,"")}))}
                    placeholder="0" className="w-full px-3 py-2.5 text-sm text-right border border-[#c1c6d6]/50 rounded-xl tabular-nums focus:ring-2 focus:ring-[#0059b9]/30 focus:border-[#0059b9] transition-all" />
                </td>
              ); })}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ═════ 기사 관리 ═════ */
function DemoOperators() {
  const [ops, setOps] = useState(DEMO_OPERATORS);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState(""); const [phone, setPhone] = useState("");
  const [toast, setToast] = useState<string|null>(null);
  const show = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  return (
    <div>
      {toast && <Md3Toast message={toast} />}
      <PageTitle title="소속 기사 관리" desc={`총 ${ops.length}명`} action={
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2.5 bg-[#0059b9] text-white font-bold rounded-xl text-sm active:scale-95 flex items-center gap-1">
          <span className="material-symbols-outlined text-lg">{showAdd ? "close" : "person_add"}</span>{showAdd ? "취소" : "추가"}
        </button>
      } />
      {showAdd && (
        <Md3Card className="mb-4 space-y-3">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="기사 이름" className="w-full px-4 py-3 border border-[#c1c6d6] rounded-xl focus:ring-2 focus:ring-[#0059b9]/30" />
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="010-0000-0000" className="w-full px-4 py-3 border border-[#c1c6d6] rounded-xl focus:ring-2 focus:ring-[#0059b9]/30" />
          <button onClick={() => { if(!name) return; setOps(p => [...p,{id:`n${Date.now()}`,name,phone:phone||"010-0000-0000",created_at:new Date().toISOString()}]); setName(""); setPhone(""); setShowAdd(false); show(`${name} 등록!`); }}
            disabled={!name} className="w-full py-3 bg-[#0059b9] text-white font-bold rounded-xl disabled:opacity-40 active:scale-95">등록</button>
        </Md3Card>
      )}
      <div className="space-y-2">
        {ops.map(op => (
          <Md3Card key={op.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d7e2ff] text-[#0059b9] rounded-full flex items-center justify-center font-bold">{op.name[0]}</div>
              <div><p className="font-bold text-[#111c29]">{op.name}</p><p className="text-sm text-[#727785]">{op.phone}</p></div>
            </div>
            <button onClick={() => show(`${op.name} 전화 연결`)} className="px-3 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold active:scale-95 flex items-center gap-1">
              <span className="material-symbols-outlined text-base">call</span>전화
            </button>
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

/* ═════ 초대 링크 ═════ */
function DemoInvite() {
  const [copied, setCopied] = useState(false);
  const url = "https://heavy-match.vercel.app/register?ref=demo-own-1";
  const copy = () => { navigator.clipboard?.writeText(url).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div>
      <PageTitle title="장비요청자 초대" desc="건설사 현장소장에게 링크를 보내세요" />
      <Md3Card className="space-y-4">
        <div className="bg-[#eef4ff] rounded-xl p-4">
          <p className="text-sm font-bold text-[#0059b9] mb-2 flex items-center gap-1"><span className="material-symbols-outlined text-base">link</span>초대 링크</p>
          <p className="text-xs text-[#727785] break-all font-mono bg-white rounded-lg p-3 border border-[#c1c6d6]/30 select-all">{url}</p>
        </div>
        <button onClick={copy} className={`w-full py-4 font-bold rounded-xl text-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${copied ? "bg-emerald-600 text-white" : "bg-[#0059b9] text-white"}`}>
          <span className="material-symbols-outlined">{copied ? "check" : "content_copy"}</span>{copied ? "복사됨!" : "링크 복사"}
        </button>
        <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-bold mb-1">이 링크로 가입한 요청자는:</p>
          <ul className="space-y-1 ml-4 list-disc text-xs">
            <li>장비 요청 시 사장님에게 <b>전용콜</b> 우선 발송</li>
            <li>사장님 <b>단가표</b> 자동 적용</li>
          </ul>
        </div>
      </Md3Card>
    </div>
  );
}

/* ═════ 콜센터 소속 사장 ═════ */
function DemoCallcenterOwners() {
  const [toast, setToast] = useState<string|null>(null);
  const show = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };
  return (
    <div>
      {toast && <Md3Toast message={toast} />}
      <PageTitle title="소속 사장 관리" desc={`총 ${DEMO_OWNERS.length}개 업체`} />
      <div className="space-y-2">
        {DEMO_OWNERS.map(o => (
          <Md3Card key={o.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">{o.name[0]}</div>
              <div>
                <p className="font-bold text-[#111c29]">{o.name}</p>
                <p className="text-sm text-[#727785]">{o.company_name}</p>
                <p className="text-xs text-[#727785]">{o.region_sido} {o.region_sigungu}</p>
              </div>
            </div>
            <button onClick={() => show(`${o.name} 전화 연결`)} className="px-3 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold active:scale-95 flex items-center gap-1">
              <span className="material-symbols-outlined text-base">call</span>전화
            </button>
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

/* ═════ 수수료 (공통) ═════ */
function DemoCommission({ type }: { type: "callcenter"|"salesperson" }) {
  const feeKey = type === "callcenter" ? "callcenter_fee" : "salesperson_fee";
  const total = DEMO_COMMISSIONS.reduce((s,c) => s + c[feeKey], 0);
  return (
    <div>
      <PageTitle title="수수료 내역" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Md3Stat icon="savings" value={`${formatPrice(total)}원`} label="누적 수수료" gradient="bg-gradient-to-br from-emerald-600 to-teal-700" />
        <Md3Stat icon="receipt_long" value={DEMO_COMMISSIONS.length} label="건수" gradient="bg-gradient-to-br from-[#0059b9] to-[#1071e5]" />
      </div>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map(c => (
          <Md3Card key={c.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#111c29] text-sm">거래 {formatPrice(c.total_price)}원</p>
              <p className="text-xs text-[#727785]">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <span className="font-black tabular-nums text-emerald-600">+{formatPrice(c[feeKey])}원</span>
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

/* ═════ 관리자 페이지들 ═════ */
function DemoAdminDispatch() {
  return (
    <div>
      <PageTitle title="전체 배차 현황" desc={`총 ${DEMO_DISPATCHES.length}건`} action={
        <button onClick={() => exportDispatchesToCSV(DEMO_DISPATCHES)} className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm active:scale-95 flex items-center gap-1">
          <span className="material-symbols-outlined text-base">download</span>엑셀
        </button>
      } />
      <div className="space-y-2">
        {DEMO_DISPATCHES.map(d => (
          <Md3Card key={d.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#111c29]">{EQ_ICONS[d.equipment_types.name]} {d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <Md3Badge label={STATUS_MAP[d.status]?.label||d.status} color={STATUS_MAP[d.status]?.color} />
            </div>
            <p className="text-sm text-[#414754]">{d.company_name} · {d.site_address}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-black tabular-nums text-[#0059b9]">{formatPrice(d.price)}원</span>
              <span className="text-xs text-[#727785]">{new Date(d.created_at).toLocaleString("ko-KR")}</span>
            </div>
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

function DemoAdminUsers() {
  const labels: Record<string,string> = {requester:"장비요청자",owner:"중장비사장",operator:"기사",callcenter:"콜센터",salesperson:"영업사원",admin:"관리자"};
  const roleCounts: Record<string,number> = {};
  DEMO_ALL_USERS.forEach(u => { roleCounts[u.role] = (roleCounts[u.role]||0)+1; });

  return (
    <div>
      <PageTitle title="사용자 관리" desc={`총 ${DEMO_ALL_USERS.length}명`} action={
        <button onClick={() => exportUsersToCSV(DEMO_ALL_USERS)} className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm active:scale-95 flex items-center gap-1">
          <span className="material-symbols-outlined text-base">download</span>엑셀
        </button>
      } />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        {Object.entries(labels).map(([role,label]) => (
          <div key={role} className="bg-white rounded-xl p-3 text-center border border-[#c1c6d6]/30 shadow-sm">
            <p className="text-xl font-black tabular-nums text-[#111c29]">{roleCounts[role]??0}</p>
            <p className="text-[10px] text-[#727785] font-semibold">{label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {DEMO_ALL_USERS.map(u => (
          <Md3Card key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#eef4ff] rounded-full flex items-center justify-center text-sm font-bold text-[#0059b9]">{u.name[0]}</div>
              <div>
                <span className="font-bold text-[#111c29]">{u.name}</span>
                {u.company_name && <span className="text-sm text-[#727785] ml-2">{u.company_name}</span>}
              </div>
            </div>
            <Md3Badge label={labels[u.role]||u.role} />
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

function DemoAdminCommission() {
  const t = {
    company: DEMO_COMMISSIONS.reduce((s,c) => s+c.company_fee,0),
    cc: DEMO_COMMISSIONS.reduce((s,c) => s+c.callcenter_fee,0),
    sp: DEMO_COMMISSIONS.reduce((s,c) => s+c.salesperson_fee,0),
    rq: DEMO_COMMISSIONS.reduce((s,c) => s+c.requester_reward,0),
  };
  return (
    <div>
      <PageTitle title="수수료 현황" action={
        <button onClick={() => exportCommissionsToCSV(DEMO_COMMISSIONS)} className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm active:scale-95 flex items-center gap-1">
          <span className="material-symbols-outlined text-base">download</span>엑셀
        </button>
      } />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Md3Stat icon="apartment" value={`${formatPrice(t.company)}원`} label="본사 수익" gradient="bg-gradient-to-br from-emerald-600 to-green-700" />
        <Md3Stat icon="support_agent" value={`${formatPrice(t.cc)}원`} label="콜센터" gradient="bg-gradient-to-br from-violet-600 to-purple-700" />
        <Md3Stat icon="person" value={`${formatPrice(t.sp)}원`} label="영업사원" gradient="bg-gradient-to-br from-pink-600 to-rose-700" />
        <Md3Stat icon="redeem" value={`${formatPrice(t.rq)}원`} label="건설사 적립" gradient="bg-gradient-to-br from-[#0059b9] to-[#1071e5]" />
      </div>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map(c => (
          <Md3Card key={c.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-[#111c29]">거래 {formatPrice(c.total_price)}원</span>
              <span className="text-xs text-[#727785]">{new Date(c.created_at).toLocaleDateString("ko-KR")}</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-xs text-center">
              <div className="bg-emerald-50 rounded-lg p-1.5"><p className="text-[#727785]">본사</p><p className="font-black tabular-nums">{formatPrice(c.company_fee)}</p></div>
              <div className="bg-violet-50 rounded-lg p-1.5"><p className="text-[#727785]">콜센터</p><p className="font-black tabular-nums">{formatPrice(c.callcenter_fee)}</p></div>
              <div className="bg-pink-50 rounded-lg p-1.5"><p className="text-[#727785]">영업</p><p className="font-black tabular-nums">{formatPrice(c.salesperson_fee)}</p></div>
              <div className="bg-blue-50 rounded-lg p-1.5"><p className="text-[#727785]">적립</p><p className="font-black tabular-nums">{formatPrice(c.requester_reward)}</p></div>
            </div>
          </Md3Card>
        ))}
      </div>
    </div>
  );
}

/* ═════ 마스터 설정 ═════ */
function DemoSettings() {
  const TYPES = [
    {name:"크레인",icon:"🏗️",specs:["25T","50T","70T","100T","200T"]},{name:"스카이",icon:"🔝",specs:["45m","52m","58m","65m"]},
    {name:"카고크레인",icon:"🚛",specs:["5T","8T","11T","15T","25T"]},{name:"거미크레인",icon:"🕷️",specs:["3T","5T","8T","10T"]},
    {name:"펌프카",icon:"💧",specs:["32m","37m","42m","47m","52m"]},{name:"굴삭기",icon:"⛏️",specs:["0.6T","1T","3T","6T","8T","20T","30T"]},
    {name:"지게차",icon:"📦",specs:["2.5T","3T","5T","7T","11T"]},{name:"덤프",icon:"🚚",specs:["15T","25T"]},
  ];
  const TIMES = [{name:"1시간",h:"1.0"},{name:"오전(4h)",h:"4.0"},{name:"오후(4h)",h:"4.0"},{name:"하루(8h)",h:"8.0"}];
  const [sel, setSel] = useState<string|null>(null);

  return (
    <div>
      <PageTitle title="마스터 데이터 설정" desc="장비 종류, 규격, 시간 단위 관리" />
      <Md3Card className="mb-4">
        <h3 className="font-[800] text-lg text-[#111c29] mb-3">장비 종류 (8종)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TYPES.map(t => (
            <button key={t.name} onClick={() => setSel(sel === t.name ? null : t.name)}
              className={`p-3 rounded-xl border-2 text-center transition-all active:scale-95 ${sel === t.name ? "border-[#0059b9] bg-[#eef4ff]" : "border-[#c1c6d6]/30 hover:border-[#0059b9]"}`}>
              <span className="text-2xl block">{t.icon}</span>
              <span className="text-sm font-bold text-[#111c29]">{t.name}</span>
            </button>
          ))}
        </div>
      </Md3Card>
      {sel && (
        <Md3Card className="mb-4 animate-fade-in">
          <h3 className="font-[800] text-lg text-[#111c29] mb-3">{sel} 규격</h3>
          <div className="flex flex-wrap gap-2">
            {TYPES.find(t => t.name === sel)?.specs.map(s => (
              <span key={s} className="px-4 py-2 bg-[#d7e2ff] text-[#004491] rounded-xl text-sm font-bold">{s}</span>
            ))}
          </div>
        </Md3Card>
      )}
      <Md3Card>
        <h3 className="font-[800] text-lg text-[#111c29] mb-3">시간 단위</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TIMES.map(t => (
            <div key={t.name} className="p-3 bg-[#eef4ff] rounded-xl text-center">
              <span className="font-bold text-[#111c29]">{t.name}</span>
              <p className="text-xs text-[#727785]">{t.h}시간</p>
            </div>
          ))}
        </div>
      </Md3Card>
    </div>
  );
}

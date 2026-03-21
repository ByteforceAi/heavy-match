"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, formatPhone, parsePhone } from "@/lib/utils";
import SignatureCanvas from "@/components/SignatureCanvas";
import { useRouter } from "next/navigation";

interface EquipmentType { id: number; name: string; icon: string | null; }
interface EquipmentSpec { id: number; spec_name: string; }
interface TimeUnit { id: number; name: string; hours: number; }

export default function RequestPage() {
  const [step, setStep] = useState(1); // 1: 장비, 2: 규격, 3: 시간, 4: 단가, 5: 현장정보, 6: 서명
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [specs, setSpecs] = useState<EquipmentSpec[]>([]);
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [price, setPrice] = useState(0);

  const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<EquipmentSpec | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeUnit | null>(null);

  // 현장 정보
  const [companyName, setCompanyName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [requesterTitle, setRequesterTitle] = useState("");
  const [requesterPhone, setRequesterPhone] = useState("");
  const [siteManagerName, setSiteManagerName] = useState("");
  const [siteManagerTitle, setSiteManagerTitle] = useState("");
  const [siteManagerPhone, setSiteManagerPhone] = useState("");
  const [signature, setSignature] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    loadEquipmentTypes();
    loadTimeUnits();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadEquipmentTypes = async () => {
    const { data } = await supabase.from("equipment_types").select("*").order("sort_order");
    if (data) setEquipmentTypes(data as unknown as EquipmentType[]);
  };

  const loadTimeUnits = async () => {
    const { data } = await supabase.from("time_units").select("*").order("sort_order");
    if (data) setTimeUnits(data as unknown as TimeUnit[]);
  };

  const loadSpecs = async (typeId: number) => {
    const { data } = await supabase
      .from("equipment_specs")
      .select("*")
      .eq("equipment_type_id", typeId)
      .order("sort_order");
    if (data) setSpecs(data as unknown as EquipmentSpec[]);
  };

  const loadPrice = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !selectedType || !selectedSpec || !selectedTime) return;

    // 요청자의 사장 단가 조회
    const { data: profile } = await supabase
      .from("users")
      .select("referred_owner_id")
      .eq("id", user.id)
      .single();

    if (profile?.referred_owner_id) {
      const { data: ownerPrice } = await supabase
        .from("owner_prices")
        .select("price")
        .eq("owner_id", profile.referred_owner_id)
        .eq("equipment_type_id", selectedType.id)
        .eq("spec_id", selectedSpec.id)
        .eq("time_unit_id", selectedTime.id)
        .single();

      if (ownerPrice) {
        setPrice(ownerPrice.price);
        return;
      }
    }
    // 단가 미설정 시 직접 입력
    setPrice(0);
  };

  const handleSelectType = (type: EquipmentType) => {
    setSelectedType(type);
    loadSpecs(type.id);
    setStep(2);
  };

  const handleSelectSpec = (spec: EquipmentSpec) => {
    setSelectedSpec(spec);
    setStep(3);
  };

  const handleSelectTime = (time: TimeUnit) => {
    setSelectedTime(time);
    setStep(4);
    setTimeout(loadPrice, 100);
  };

  const handleSubmit = async () => {
    if (!companyName || companyName.length < 2) { setError("건설사명을 입력하세요"); return; }
    if (!siteAddress || siteAddress.length < 10) { setError("현장주소를 10자 이상 입력하세요"); return; }
    if (!signature) { setError("서명을 해주세요"); return; }

    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("인증 필요");

      const res = await fetch("/api/dispatch/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requester_id: user.id,
          equipment_type_id: selectedType!.id,
          spec_id: selectedSpec!.id,
          time_unit_id: selectedTime!.id,
          price,
          company_name: companyName,
          site_address: siteAddress,
          payment_date: paymentDate || null,
          requester_name: requesterName,
          requester_title: requesterTitle,
          requester_phone: parsePhone(requesterPhone),
          site_manager_name: siteManagerName,
          site_manager_title: siteManagerTitle,
          site_manager_phone: parsePhone(siteManagerPhone),
          requester_signature: signature,
        }),
      });

      const result = await res.json();
      if (result.error) throw new Error(result.error);

      router.push("/requester");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "요청 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* 진행 바 */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full ${s <= step ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>

      {/* 1단계: 장비 선택 */}
      {step === 1 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text">장비 선택</h3>
          <div className="grid grid-cols-2 gap-3">
            {equipmentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelectType(type)}
                className="bg-card rounded-xl p-4 text-center border-2 border-border hover:border-primary transition shadow-sm"
              >
                <span className="text-3xl block mb-1">{type.icon}</span>
                <span className="text-base font-semibold">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2단계: 규격 선택 */}
      {step === 2 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text">{selectedType?.name} 규격</h3>
          <div className="grid grid-cols-2 gap-3">
            {specs.map((spec) => (
              <button
                key={spec.id}
                onClick={() => handleSelectSpec(spec)}
                className="bg-card rounded-xl p-4 text-center border-2 border-border hover:border-primary transition shadow-sm"
              >
                <span className="text-lg font-bold">{spec.spec_name}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-text-muted text-sm">← 이전</button>
        </div>
      )}

      {/* 3단계: 시간 선택 */}
      {step === 3 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text">시간 선택</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeUnits.map((tu) => (
              <button
                key={tu.id}
                onClick={() => handleSelectTime(tu)}
                className="bg-card rounded-xl p-4 text-center border-2 border-border hover:border-primary transition shadow-sm"
              >
                <span className="text-lg font-bold">{tu.name}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="text-text-muted text-sm">← 이전</button>
        </div>
      )}

      {/* 4단계: 단가 확인 */}
      {step === 4 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text">단가 확인</h3>
          <div className="bg-blue-50 rounded-xl p-4 space-y-2">
            <p className="text-sm text-text-muted">
              {selectedType?.name} {selectedSpec?.spec_name} / {selectedTime?.name}
            </p>
            {price > 0 ? (
              <p className="text-3xl font-bold tabular-nums text-primary">{formatPrice(price)}원</p>
            ) : (
              <div>
                <p className="text-sm text-accent mb-2">단가가 설정되지 않았습니다. 직접 입력해주세요.</p>
                <input
                  type="number"
                  value={price || ""}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  placeholder="금액 입력"
                  className="w-full px-4 py-3 text-lg border border-border rounded-xl"
                />
              </div>
            )}
          </div>
          <button
            onClick={() => { if (price > 0) setStep(5); else setError("금액을 입력하세요"); }}
            className="w-full py-4 bg-primary text-white text-lg font-semibold rounded-xl"
          >
            다음
          </button>
          <button onClick={() => setStep(3)} className="text-text-muted text-sm">← 이전</button>
        </div>
      )}

      {/* 5단계: 현장 정보 */}
      {step === 5 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text">현장 정보</h3>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="건설사명 *" className="w-full px-4 py-3 border border-border rounded-xl" />
          <input type="text" value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} placeholder="현장주소 * (최소 10자)" className="w-full px-4 py-3 border border-border rounded-xl" />
          <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl" />
          <hr className="border-border" />
          <p className="text-sm font-medium text-text-muted">요청자 정보</p>
          <input type="text" value={requesterName} onChange={(e) => setRequesterName(e.target.value)} placeholder="요청자명" className="w-full px-4 py-3 border border-border rounded-xl" />
          <input type="text" value={requesterTitle} onChange={(e) => setRequesterTitle(e.target.value)} placeholder="직책" className="w-full px-4 py-3 border border-border rounded-xl" />
          <input type="tel" value={requesterPhone} onChange={(e) => setRequesterPhone(formatPhone(e.target.value))} placeholder="연락처" className="w-full px-4 py-3 border border-border rounded-xl" />
          <hr className="border-border" />
          <p className="text-sm font-medium text-text-muted">현장 담당자 (선택)</p>
          <input type="text" value={siteManagerName} onChange={(e) => setSiteManagerName(e.target.value)} placeholder="담당자명" className="w-full px-4 py-3 border border-border rounded-xl" />
          <input type="text" value={siteManagerTitle} onChange={(e) => setSiteManagerTitle(e.target.value)} placeholder="직책" className="w-full px-4 py-3 border border-border rounded-xl" />
          <input type="tel" value={siteManagerPhone} onChange={(e) => setSiteManagerPhone(formatPhone(e.target.value))} placeholder="연락처" className="w-full px-4 py-3 border border-border rounded-xl" />

          {error && <p className="text-danger text-sm">{error}</p>}
          <button onClick={() => setStep(6)} className="w-full py-4 bg-primary text-white text-lg font-semibold rounded-xl">
            다음 (전자서명)
          </button>
          <button onClick={() => setStep(4)} className="text-text-muted text-sm">← 이전</button>
        </div>
      )}

      {/* 6단계: 전자서명 */}
      {step === 6 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text">전자서명</h3>

          <div className="bg-blue-50 rounded-xl p-3 text-sm space-y-1">
            <p><b>{selectedType?.name}</b> {selectedSpec?.spec_name} / {selectedTime?.name}</p>
            <p className="text-primary font-bold tabular-nums">{formatPrice(price)}원</p>
            <p>{companyName} / {siteAddress}</p>
          </div>

          <SignatureCanvas onSave={(dataUrl) => setSignature(dataUrl)} />

          {signature && (
            <p className="text-success text-sm text-center">서명 완료 ✓</p>
          )}

          {error && <p className="text-danger text-sm">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading || !signature}
            className="w-full py-4 bg-accent text-white text-xl font-bold rounded-xl disabled:opacity-50"
          >
            {loading ? "요청중..." : "장비 요청하기"}
          </button>
          <button onClick={() => setStep(5)} className="text-text-muted text-sm">← 이전</button>
        </div>
      )}
    </div>
  );
}

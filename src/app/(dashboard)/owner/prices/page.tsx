"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";

interface EquipmentType { id: number; name: string; }
interface EquipmentSpec { id: number; equipment_type_id: number; spec_name: string; }
interface TimeUnit { id: number; name: string; }

export default function OwnerPricesPage() {
  const [types, setTypes] = useState<EquipmentType[]>([]);
  const [specs, setSpecs] = useState<EquipmentSpec[]>([]);
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const [typesRes, specsRes, timeRes, pricesRes] = await Promise.all([
      supabase.from("equipment_types").select("*").order("sort_order"),
      supabase.from("equipment_specs").select("*").order("sort_order"),
      supabase.from("time_units").select("*").order("sort_order"),
      supabase.from("owner_prices").select("*"),
    ]);

    if (typesRes.data) setTypes(typesRes.data as unknown as EquipmentType[]);
    if (specsRes.data) setSpecs(specsRes.data as unknown as EquipmentSpec[]);
    if (timeRes.data) setTimeUnits(timeRes.data as unknown as TimeUnit[]);

    // 기존 단가를 key로 변환
    if (pricesRes.data) {
      const priceMap: Record<string, number> = {};
      (pricesRes.data as unknown as Array<{ equipment_type_id: number; spec_id: number; time_unit_id: number; price: number }>).forEach((p) => {
        priceMap[`${p.equipment_type_id}-${p.spec_id}-${p.time_unit_id}`] = p.price;
      });
      setPrices(priceMap);
    }

    if (typesRes.data?.[0]) setSelectedType((typesRes.data[0] as unknown as EquipmentType).id);
  };

  const handlePriceChange = (specId: number, timeId: number, value: string) => {
    const key = `${selectedType}-${specId}-${timeId}`;
    setPrices((prev) => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !selectedType) return;

    const filteredSpecs = specs.filter((s) => s.equipment_type_id === selectedType);

    for (const spec of filteredSpecs) {
      for (const tu of timeUnits) {
        const key = `${selectedType}-${spec.id}-${tu.id}`;
        const price = prices[key] || 0;
        if (price > 0) {
          await supabase.from("owner_prices").upsert({
            owner_id: user.id,
            equipment_type_id: selectedType,
            spec_id: spec.id,
            time_unit_id: tu.id,
            price,
          }, { onConflict: "owner_id,equipment_type_id,spec_id,time_unit_id" });
        }
      }
    }
    setSaving(false);
    alert("저장 완료!");
  };

  const filteredSpecs = specs.filter((s) => s.equipment_type_id === selectedType);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text">단가 설정</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-primary text-white font-semibold rounded-xl disabled:opacity-50"
        >
          {saving ? "저장중..." : "저장"}
        </button>
      </div>

      {/* 장비 탭 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {types.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium ${
              selectedType === t.id
                ? "bg-primary text-white"
                : "bg-card border border-border text-text"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* 단가 매트릭스 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 font-medium text-text-muted">규격</th>
              {timeUnits.map((tu) => (
                <th key={tu.id} className="text-center p-2 font-medium text-text-muted">{tu.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSpecs.map((spec) => (
              <tr key={spec.id} className="border-b border-border">
                <td className="p-2 font-semibold">{spec.spec_name}</td>
                {timeUnits.map((tu) => {
                  const key = `${selectedType}-${spec.id}-${tu.id}`;
                  return (
                    <td key={tu.id} className="p-1">
                      <input
                        type="number"
                        value={prices[key] || ""}
                        onChange={(e) => handlePriceChange(spec.id, tu.id, e.target.value)}
                        placeholder="0"
                        className="w-full px-2 py-2 text-sm text-right border border-border rounded-lg tabular-nums"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

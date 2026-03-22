"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

interface EquipmentType { id: number; name: string; icon: string | null; sort_order: number; }
interface EquipmentSpec { id: number; equipment_type_id: number; spec_name: string; sort_order: number; }
interface TimeUnit { id: number; name: string; hours: number; sort_order: number; }

export default function AdminSettingsPage() {
  const [types, setTypes] = useState<EquipmentType[]>([]);
  const [specs, setSpecs] = useState<EquipmentSpec[]>([]);
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const [t, s, tu] = await Promise.all([
      supabase.from("equipment_types").select("*").order("sort_order"),
      supabase.from("equipment_specs").select("*").order("sort_order"),
      supabase.from("time_units").select("*").order("sort_order"),
    ]);
    if (t.data) { setTypes(t.data as unknown as EquipmentType[]); setSelectedType((t.data[0] as unknown as EquipmentType)?.id ?? null); }
    if (s.data) setSpecs(s.data as unknown as EquipmentSpec[]);
    if (tu.data) setTimeUnits(tu.data as unknown as TimeUnit[]);
  };

  const filteredSpecs = specs.filter((s) => s.equipment_type_id === selectedType);

  return (
    <div>
      <PageHeader title="마스터 데이터 설정" description="장비 종류, 규격, 시간 단위 관리" />

      {/* 장비 종류 */}
      <Card className="mb-4">
        <h3 className="font-bold text-lg mb-3">장비 종류 (8종)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`p-3 rounded-xl border-2 text-center transition ${
                selectedType === t.id
                  ? "border-primary bg-blue-50"
                  : "border-border hover:border-primary-light"
              }`}
            >
              <span className="text-2xl block">{t.icon}</span>
              <span className="text-sm font-semibold">{t.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* 선택된 장비의 규격 */}
      {selectedType && (
        <Card className="mb-4">
          <h3 className="font-bold text-lg mb-3">
            {types.find((t) => t.id === selectedType)?.name} 규격
          </h3>
          <div className="flex flex-wrap gap-2">
            {filteredSpecs.map((s) => (
              <span
                key={s.id}
                className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium"
              >
                {s.spec_name}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* 시간 단위 */}
      <Card>
        <h3 className="font-bold text-lg mb-3">시간 단위</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {timeUnits.map((tu) => (
            <div key={tu.id} className="p-3 bg-gray-50 rounded-xl text-center">
              <span className="font-semibold">{tu.name}</span>
              <p className="text-xs text-text-muted">{tu.hours}시간</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

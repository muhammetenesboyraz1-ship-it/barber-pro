"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Settings = {
  id: number;
  business_name: string;
  phone: string;
  closed_days: string[];
};

const days = [
  { value: "monday", label: "Pazartesi" },
  { value: "tuesday", label: "Salı" },
  { value: "wednesday", label: "Çarşamba" },
  { value: "thursday", label: "Perşembe" },
  { value: "friday", label: "Cuma" },
  { value: "saturday", label: "Cumartesi" },
  { value: "sunday", label: "Pazar" },
];

export default function SettingsPage() {

const router = useRouter();

  const [settings, setSettings] = useState<Settings | null>(null);

 useEffect(() => {
  async function checkAuthAndLoadSettings() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("business_settings")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setSettings({
      ...data,
      closed_days: data.closed_days || [],
    });
  }

  checkAuthAndLoadSettings();
}, [router]);

  function toggleClosedDay(day: string) {
    if (!settings) return;

    const isClosed = settings.closed_days.includes(day);

    const newClosedDays = isClosed
      ? settings.closed_days.filter((item) => item !== day)
      : [...settings.closed_days, day];

    setSettings({
      ...settings,
      closed_days: newClosedDays,
    });
  }

  async function handleSave() {
    if (!settings) return;

    const { error } = await supabase
      .from("business_settings")
      .update({
        business_name: settings.business_name,
        phone: settings.phone,
        closed_days: settings.closed_days,
      })
      .eq("id", settings.id);

    if (error) {
      console.error(error);
      alert("Kaydedilemedi!");
    } else {
      alert("İşletme bilgileri başarıyla kaydedildi.");
    }
  }

  if (!settings) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Yükleniyor...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        <p className="text-yellow-500 uppercase tracking-[4px]">
          Barber Pro
        </p>

        <h1 className="text-4xl font-bold mt-3">
          İşletme Ayarları
        </h1>

        <p className="text-gray-400 mt-3">
          İşletmenizin bilgilerini ve çalışma günlerini yönetin.
        </p>

        <div className="bg-[#111] p-8 rounded-3xl border border-yellow-500/20 mt-10 space-y-8">

          <div>
            <label className="block mb-2 font-semibold">
              İşletme Adı
            </label>

            <input
              type="text"
              value={settings.business_name}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business_name: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Telefon
            </label>

            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  phone: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
            />
          </div>

          {/* KAPALI GÜNLER */}

          <div>
            <h2 className="text-2xl font-bold">
              Kapalı Günler
            </h2>

            <p className="text-gray-400 mt-2 mb-5">
              İşletmenizin kapalı olduğu günleri seçin.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {days.map((day) => {
                const isClosed =
                  settings.closed_days.includes(day.value);

                return (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleClosedDay(day.value)}
                    className={`p-4 rounded-xl border font-semibold transition ${
                      isClosed
                        ? "bg-red-500/20 border-red-500 text-red-400"
                        : "bg-black border-gray-700 text-gray-300 hover:border-yellow-500"
                    }`}
                  >
                    {isClosed ? "🚫 " : "✓ "}
                    {day.label}
                  </button>
                );
              })}

            </div>

            {settings.closed_days.length > 0 && (
              <p className="text-red-400 mt-4">
                Kapalı:{" "}
                {days
                  .filter((day) =>
                    settings.closed_days.includes(day.value)
                  )
                  .map((day) => day.label)
                  .join(", ")}
              </p>
            )}
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition"
          >
            Ayarları Kaydet
          </button>

        </div>
      </div>
    </main>
  );
}
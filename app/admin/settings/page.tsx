"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase
        .from("business_settings")
        .select("*")
        .single();

      if (!error) {
        setSettings(data);
      }
    }

    loadSettings();
  }, []);

  async function handleSave() {
    const { error } = await supabase
      .from("business_settings")
      .update({
        business_name: settings.business_name,
        phone: settings.phone,
      })
      .eq("id", settings.id);

    if (error) {
      alert("Kaydedilemedi!");
    } else {
      alert("Bilgiler başarıyla kaydedildi.");
    }
  }

  if (!settings) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Yükleniyor...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8">
        İşletme Bilgileri
      </h1>

      <div className="bg-zinc-900 p-8 rounded-xl border border-yellow-500 max-w-2xl space-y-6">

        <div>
          <label className="block mb-2 font-semibold">İşletme Adı</label>
          <input
            type="text"
            value={settings.business_name}
            onChange={(e) =>
              setSettings({ ...settings, business_name: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Telefon</label>
          <input
            type="text"
            value={settings.phone}
            onChange={(e) =>
              setSettings({ ...settings, phone: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg"
        >
          Kaydet
        </button>

      </div>
    </main>
  );
}
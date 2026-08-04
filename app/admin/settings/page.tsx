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
        İşletme Ayarları
      </h1>

      <div className="space-y-4 bg-zinc-900 p-8 rounded-xl border border-yellow-500">
        <p><strong>İşletme:</strong> {settings.business_name}</p>
        <p><strong>Telefon:</strong> {settings.phone}</p>
        <p><strong>WhatsApp:</strong> {settings.whatsapp}</p>
        <p><strong>Instagram:</strong> {settings.instagram}</p>
        <p><strong>Adres:</strong> {settings.address}</p>
        <p><strong>Başlangıç:</strong> {settings.start_time}</p>
        <p><strong>Bitiş:</strong> {settings.end_time}</p>
        <p><strong>Randevu Süresi:</strong> {settings.slot_duration} dk</p>
        <p><strong>Kapalı Gün:</strong> {settings.closed_day}</p>
      </div>
    </main>
  );
}
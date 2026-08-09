"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const router = useRouter();

  const pendingBookings = bookings.filter(
    (b) => b.status === "Bekliyor"
  ).length;

  const completedBookings = bookings.filter(
    (b) => b.status === "Tamamlandı"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.status === "İptal"
  ).length;

  const totalBookings = bookings.length;

  useEffect(() => {
    async function loadPage() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      getBookings();
    }

    loadPage();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("new-bookings")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
        },
        (payload) => {
          console.log("YENİ RANDEVU:", payload.new);

          alert(
            `🔔 Yeni Randevu!\n\n${payload.new.full_name}\n${payload.new.appointment_date} - ${payload.new.appointment_time}`
          );

          getBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function getBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setBookings(data || []);
    } else {
      console.error("Randevular alınamadı:", error);
    }
  }

  // 🔔 GERÇEK PUSH BİLDİRİMİ AKTİFLEŞTİR
  async function enableNotifications() {
    try {
      if (!("Notification" in window)) {
        alert("Bu cihaz bildirimleri desteklemiyor.");
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        alert("Bildirim izni verilmedi.");
        return;
      }

      // Service Worker kaydı
      const registration =
        await navigator.serviceWorker.register("/sw.js");

      // Service Worker hazır olana kadar bekle
      await navigator.serviceWorker.ready;

      // Daha önce abonelik var mı?
      const existingSubscription =
        await registration.pushManager.getSubscription();

      // Varsa onu kullan, yoksa yeni oluştur
      const subscription =
        existingSubscription ||
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        });

      const subscriptionJson = subscription.toJSON();

      console.log("Push subscription:", subscriptionJson);

      if (
        !subscriptionJson.endpoint ||
        !subscriptionJson.keys?.p256dh ||
        !subscriptionJson.keys?.auth
      ) {
        alert("Push aboneliği oluşturulamadı.");
        return;
      }

      // Supabase'e kaydet
      const { error } = await supabase
        .from("push_subscriptions")
        .upsert(
          {
            endpoint: subscriptionJson.endpoint,
            p256dh: subscriptionJson.keys.p256dh,
            auth: subscriptionJson.keys.auth,
            business_id: "9e429d42-7b6b-47e6-8cad-5d0cbd1bcb75",
          },
          {
            onConflict: "endpoint",
          }
        );

      if (error) {
        console.error(
          "Push aboneliği kaydedilemedi:",
          error
        );

        alert(
          "Bildirim kaydedilemedi!\n\n" +
            error.message
        );

        return;
      }

      alert("Bildirimler başarıyla aktif edildi! 🔔");
    } catch (error) {
      console.error(
        "Bildirim sistemi hatası:",
        error
      );

      alert(
        "Bildirim sistemi kurulamadı!\n\n" +
          String(error)
      );
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      {/* BAŞLIK */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-5xl font-bold text-yellow-500">
          Admin Paneli
        </h1>

        <div className="flex flex-wrap gap-3">
          {/* 🔔 BİLDİRİM BUTONU */}
          <button
            onClick={enableNotifications}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-lg font-bold"
          >
            🔔 Bildirimleri Aç
          </button>

          {/* ÇIKIŞ */}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* ARAMA */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="🔍 İsim veya telefon ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-4 rounded-xl bg-zinc-900 border border-yellow-500/20 text-white outline-none"
        />

        {/* TARİH */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="w-full mb-6 p-4 rounded-xl bg-zinc-900 border border-yellow-500/20 text-white outline-none"
        />
      </div>

      {/* İSTATİSTİKLER */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-zinc-900 border border-yellow-500/20 rounded-xl p-6">
          <p className="text-gray-400">Toplam</p>
          <h2 className="text-4xl font-bold text-yellow-500">
            {totalBookings}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-400">Bekliyor</p>
          <h2 className="text-4xl font-bold text-blue-500">
            {pendingBookings}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-6">
          <p className="text-gray-400">Tamamlandı</p>
          <h2 className="text-4xl font-bold text-green-500">
            {completedBookings}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-6">
          <p className="text-gray-400">İptal</p>
          <h2 className="text-4xl font-bold text-red-500">
            {cancelledBookings}
          </h2>
        </div>
      </div>

      {/* RANDEVULAR */}
      <div className="mt-8 space-y-4">
        {bookings
          .filter((booking) => {
            const searchText =
              search.toLowerCase();

            const matchesSearch =
              booking.full_name
                ?.toLowerCase()
                .includes(searchText) ||
              booking.phone
                ?.toLowerCase()
                .includes(searchText);

            const matchesDate =
              selectedDate === "" ||
              booking.appointment_date ===
                selectedDate;

            return (
              matchesSearch && matchesDate
            );
          })
          .map((booking) => (
            <div
              key={booking.id}
              className="bg-zinc-900 border border-yellow-500/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold text-yellow-500">
                {booking.full_name}
              </h3>

              <p className="text-gray-300 mt-2">
                📞 {booking.phone}
              </p>

              <p className="text-gray-300">
                ✂️ {booking.service}
              </p>

              <p className="text-gray-300">
                📅 {booking.appointment_date}
              </p>

              <p className="text-gray-300">
                🕒 {booking.appointment_time}
              </p>

              <p className="text-gray-300">
                📌 Durum:{" "}
                <span className="text-yellow-400">
                  {booking.status}
                </span>
              </p>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/90${booking.phone.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
              >
                💬 WhatsApp
              </a>

              {/* DURUM BUTONLARI */}
              <div className="flex flex-wrap gap-3 mt-4">
                {/* SADECE TAMAMLA */}
                <button
                  onClick={async () => {
                    const { error } =
                      await supabase
                        .from("bookings")
                        .update({
                          status: "Tamamlandı",
                        })
                        .eq(
                          "id",
                          booking.id
                        );

                    if (!error) {
                      getBookings();
                    } else {
                      console.error(
                        error
                      );
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
                >
                  ✅ Tamamlandı
                </button>

                {/* SADECE İPTAL */}
                <button
                  onClick={async () => {
                    const { error } =
                      await supabase
                        .from("bookings")
                        .update({
                          status: "İptal",
                        })
                        .eq(
                          "id",
                          booking.id
                        );

                    if (!error) {
                      getBookings();
                    } else {
                      console.error(
                        error
                      );
                    }
                  }}
                  className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-white"
                >
                  ❌ İptal
                </button>
              </div>

              {/* SİL */}
              <button
                onClick={async () => {
                  const { error } =
                    await supabase
                      .from("bookings")
                      .delete()
                      .eq(
                        "id",
                        booking.id
                      );

                  if (!error) {
                    setBookings(
                      bookings.filter(
                        (b) =>
                          b.id !==
                          booking.id
                      )
                    );
                  } else {
                    console.error(
                      error
                    );
                  }
                }}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
              >
                🗑️ Randevuyu Sil
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}
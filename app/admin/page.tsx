"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  async function getBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setBookings(data || []);
    }
  }

const totalBookings = bookings.length;





const cancelledBookings = bookings.filter(
  (b) => b.status === "İptal"
).length;

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-500">
          Admin Paneli
        </h1>


<input
  type="text"
  placeholder="🔍 İsim veya telefon ara..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-6 p-4 rounded-xl bg-zinc-900 border border-yellow-500/20 text-white outline-none"
/>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Çıkış Yap
        </button>
      </div>


      <div className="mt-8 space-y-4">
<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
  <div className="bg-zinc-900 rounded-xl p-6 border border-yellow-500/20">
   <p className="text-gray-400">Toplam</p>
    
    <h2 className="text-4xl font-bold text-yellow-500">{totalBookings}</h2>
  </div>

  <div className="bg-zinc-900 rounded-xl p-6 border border-blue-500/20">
    <p className="text-gray-400">Bekliyor</p>
    <h2 className="text-4xl font-bold text-blue-400">{pendingBookings}</h2>
  </div>

  <div className="bg-zinc-900 rounded-xl p-6 border border-green-500/20">
    <p className="text-gray-400">Tamamlandı</p>
    <h2 className="text-4xl font-bold text-green-400">{completedBookings}</h2>
  </div>

  <div className="bg-zinc-900 rounded-xl p-6 border border-red-500/20">
    <p className="text-gray-400">İptal</p>
    <h2 className="text-4xl font-bold text-red-400">{cancelledBookings}</h2>
  </div>
</div>
        {bookings
  .filter(
    (booking) =>
      booking.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.phone
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )
  .map((booking) => (
          <div
            key={booking.id}
            className="bg-zinc-900 border border-yellow-500/20 rounded-xl p-5"
          >
            <h2 className="text-xl text-yellow-500 font-bold">
              {booking.full_name}
            </h2>

            <p className="text-gray-300">📞 {booking.phone}</p>
            <p className="text-gray-300">✂️ {booking.service}</p>
            <p className="text-gray-300">📅 {booking.appointment_date}</p>
            <p className="text-gray-300">🕒 {booking.appointment_time}</p>

            <p className="text-gray-300">
              📌 Durum:{" "}
              <span className="text-yellow-400">{booking.status}</span>
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from("bookings")
                    .update({ status: "Tamamlandı" })
                    .eq("id", booking.id);

                  if (!error) getBookings();
                }}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
              >
                ✅ Tamamlandı
              </button>

              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from("bookings")
                    .update({ status: "İptal" })
                    .eq("id", booking.id);

                  if (!error) getBookings();
                }}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-white"
              >
                ❌ İptal
              </button>
            </div>

            <button
              onClick={async () => {
                const { error } = await supabase
                  .from("bookings")
                  .delete()
                  .eq("id", booking.id);

                if (!error) {
                  setBookings(bookings.filter((b) => b.id !== booking.id));
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
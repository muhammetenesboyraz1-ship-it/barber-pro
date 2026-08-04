"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
export default function BookingPage() {
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [service, setService] = useState("Premium Saç Kesimi");
const [appointmentDate, setAppointmentDate] = useState("");
const [appointmentTime, setAppointmentTime] = useState("");
 

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data: existingBooking } = await supabase
  .from("bookings")
  .select("*")
  .eq("appointment_date", appointmentDate)
  .eq("appointment_time", appointmentTime)
  .maybeSingle();

if (existingBooking) {
  alert("Bu tarih ve saat için zaten bir randevu bulunmaktadır.");
  return;
}

  const { error } = await supabase.from("bookings").insert([
    {
      full_name: fullName,
      phone,
      service,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
    },
  ]);

  if (error) {
    alert("Randevu oluşturulamadı!");
    console.log(error);
  } else {
    alert("Randevunuz başarıyla oluşturuldu!");

    setFullName("");
    setPhone("");
    setService("Premium Saç Kesimi");
    setAppointmentDate("");
    setAppointmentTime("");
  }
};

return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-[#161616] w-full max-w-xl p-10 rounded-3xl border border-yellow-500/20">

        <h1 className="text-4xl font-bold text-yellow-500 text-center">
          Online Randevu
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Lütfen bilgilerinizi doldurun.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">

          <input
  type="text"
  placeholder="Ad Soyad"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
/>
          

          <input
  type="tel"
  placeholder="Telefon"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
/>

          <select
  value={service}
  onChange={(e) => setService(e.target.value)}
  className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
>

            <option>Premium Saç Kesimi</option>
            <option>Sakal Tasarımı</option>
            <option>Saç + Sakal</option>
          </select>

          <input
  type="date"
  value={appointmentDate}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) => setAppointmentDate(e.target.value)}
  className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
/>

          
        <input
  type="time"
  value={appointmentTime}
  onChange={(e) => setAppointmentTime(e.target.value)}
  className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
/>

          




          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl hover:bg-yellow-400 transition"
          >
            Randevu Oluştur
          </button>

        </form>

      </div>

    </main>
  );
}
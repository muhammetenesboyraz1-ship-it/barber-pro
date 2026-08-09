"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
};

export default function BookingPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // YENİ: Kapalı günleri tutuyoruz
  const [closedDays, setClosedDays] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      // Hizmetleri getir
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

      if (serviceError) {
        console.error("Hizmetler alınamadı:", serviceError);
      } else {
        setServices(serviceData || []);

        if (serviceData && serviceData.length > 0) {
          setService(serviceData[0].name);
        }
      }

      // İşletme ayarlarını getir
      const { data, error } = await supabase
        .from("business_settings")
        .select("*")
        .single();

      if (error || !data) {
        console.error("İşletme ayarları alınamadı:", error);
        return;
      }

      // KAPALI GÜNLERİ AL
     let normalizedClosedDays: string[] = [];

if (Array.isArray(data.closed_days)) {
  normalizedClosedDays = data.closed_days;
} else if (typeof data.closed_days === "string") {
  try {
    const parsed = JSON.parse(data.closed_days);

    if (Array.isArray(parsed)) {
      normalizedClosedDays = parsed;
    }
  } catch {
    console.log("Kapalı günler okunamadı.");
  }
}

setClosedDays(normalizedClosedDays);

      // Çalışma saatlerini oluştur
      const times: string[] = [];

      let [hour, minute] = data.start_time.split(":").map(Number);
      const [endHour, endMinute] = data.end_time.split(":").map(Number);

      while (
        hour < endHour ||
        (hour === endHour && minute <= endMinute)
      ) {
        times.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );

        minute += data.slot_duration;

        while (minute >= 60) {
          minute -= 60;
          hour++;
        }
      }

      setAvailableTimes(times);
    }

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) {
      alert("Lütfen bir hizmet seçin.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(appointmentDate + "T00:00:00");

    if (selectedDate < today) {
      alert("Geçmiş tarihe randevu oluşturamazsınız.");
      return;
    }

    // Seçilen günün adını bul
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const selectedDay = dayNames[selectedDate.getDay()];

    // Kapalı gün kontrolü
    if (closedDays.includes(selectedDay)) {
      alert("Bu gün işletme kapalıdır. Lütfen başka bir gün seçin.");
      return;
    }

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

      if (services.length > 0) {
        setService(services[0].name);
      } else {
        setService("");
      }

      setAppointmentDate("");
      setAppointmentTime("");
    }
  };

  // TARİH SEÇİLDİĞİNDE KAPALI GÜNÜ KONTROL ET
  function handleDateChange(value: string) {
    if (!value) {
      setAppointmentDate("");
      setAppointmentTime("");
      return;
    }

    const selectedDate = new Date(value + "T00:00:00");

    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const selectedDay = dayNames[selectedDate.getDay()];

    if (closedDays.includes(selectedDay)) {
      alert("Bu gün işletme kapalıdır. Lütfen başka bir gün seçin.");
      setAppointmentDate("");
      setAppointmentTime("");
      return;
    }

    setAppointmentDate(value);
    setAppointmentTime("");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">

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
            required
          />

          <input
            type="tel"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
            required
          />

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
            required
          >
            {services.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name} - {item.price} ₺ ({item.duration} dk)
              </option>
            ))}
          </select>

          <input
            type="date"
            value={appointmentDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
            required
          />

          <select
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
            required
          >
            <option value="">Saat seçin</option>

            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

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
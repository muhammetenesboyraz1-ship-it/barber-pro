"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
};

export default function ServicesAdmin() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  async function getServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setServices(data || []);
  }

 useEffect(() => {
  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    getServices();
  }

  checkAuth();
}, []);

  async function addService() {
    if (!name || !price || !duration) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const { error } = await supabase.from("services").insert([
      {
        name,
        price: Number(price),
        duration: Number(duration),
      },
    ]);

    if (error) {
      alert("Hizmet eklenirken hata oluştu.");
      console.error(error);
      return;
    }

    setName("");
    setPrice("");
    setDuration("");

    getServices();
  }

  async function deleteService(id: number) {
    const confirmDelete = confirm(
      "Bu hizmeti silmek istediğinize emin misiniz?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Hizmet silinemedi.");
      console.error(error);
      return;
    }

    getServices();
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setName(service.name);
    setPrice(String(service.price));
    setDuration(String(service.duration));
  }

  async function updateService() {
    if (!editingId) return;

    const { error } = await supabase
      .from("services")
      .update({
        name,
        price: Number(price),
        duration: Number(duration),
      })
      .eq("id", editingId);

    if (error) {
      alert("Hizmet güncellenemedi.");
      console.error(error);
      return;
    }

    setEditingId(null);
    setName("");
    setPrice("");
    setDuration("");

    getServices();
  }

  function cancelEdit() {
    setEditingId(null);
    setName("");
    setPrice("");
    setDuration("");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <p className="text-yellow-500 uppercase tracking-[4px]">
            Barber Pro
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Hizmet Yönetimi
          </h1>

          <p className="text-gray-400 mt-3">
            Hizmetlerinizi, fiyatlarını ve sürelerini buradan yönetin.
          </p>
        </div>

        <div className="bg-[#111] border border-yellow-500/20 rounded-3xl p-6 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Hizmet adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              placeholder="Fiyat"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              placeholder="Süre (dakika)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

          </div>

          <div className="flex gap-3 mt-6">

            <button
              onClick={editingId ? updateService : addService}
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
            >
              {editingId ? "Güncelle" : "Hizmet Ekle"}
            </button>

            {editingId && (
              <button
                onClick={cancelEdit}
                className="border border-gray-600 px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition"
              >
                Vazgeç
              </button>
            )}

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {services.map((service) => (

            <div
              key={service.id}
              className="bg-[#111] border border-yellow-500/20 rounded-3xl p-6"
            >

              <h3 className="text-2xl font-bold">
                {service.name}
              </h3>

              <p className="text-yellow-500 text-3xl font-bold mt-5">
                {service.price} ₺
              </p>

              <p className="text-gray-400 mt-2">
                {service.duration} Dakika
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => startEdit(service)}
                  className="flex-1 border border-yellow-500 text-yellow-500 py-2 rounded-full hover:bg-yellow-500 hover:text-black transition"
                >
                  Düzenle
                </button>

                <button
                  onClick={() => deleteService(service.id)}
                  className="flex-1 border border-red-500 text-red-500 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
                >
                  Sil
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}
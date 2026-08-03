"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();
async function handleLogin() {
const { data, error } = await supabase.auth.signInWithPassword({
    email: "admin@barberpro.com",
    password: password,
  });

  console.log("DATA:", data);
console.log("ERROR:", error);


  if (error) {
    alert(error.message);
    return;
  }

  router.push("/admin");
}

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md border border-yellow-500">
        <h1 className="text-3xl font-bold text-yellow-500 text-center">
          Admin Girişi
        </h1>

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-8 p-4 rounded-lg bg-zinc-800 text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-yellow-500 text-black font-bold py-4 rounded-lg hover:bg-yellow-400"
        >
          Giriş Yap
        </button>
      </div>
    </main>
  );
}
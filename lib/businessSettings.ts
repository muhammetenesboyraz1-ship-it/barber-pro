import { supabase } from "./supabase";

export async function getBusinessSettings() {
  const { data, error } = await supabase
    .from("business_settings")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
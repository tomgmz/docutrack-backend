import { supabase } from "../lib/supabase";

export interface CreateProfileInput {
  auth_id: string;
  // email: string;
  // username: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  role?: "user" | "admin";
}

export const createProfile = async (profileData: CreateProfileInput) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profileData])
    .select()
    .single(); 

  if (error) throw error;
  return data;
};

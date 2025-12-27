import { supabase } from "../lib/supabase";

export const createAuthUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data.user?.id;
  } catch (err: any) {
    console.error("Error creating auth user: ", err.message);
    throw err;
  }
};
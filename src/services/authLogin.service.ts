import { supabase } from "../lib/supabase";

export const authlogin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error; 

    return data;
  } catch (error: any) {
    console.error("Error logging in: ", error.message);
    throw error;
  }
};
import { supabase } from "../lib/supabase";

export const authSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (err: any) {
    console.error("Error signing out:", err.message);
    throw new Error("Unable to sign out. Please try again.");
  }
};

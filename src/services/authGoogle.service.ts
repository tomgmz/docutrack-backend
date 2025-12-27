import { supabase } from "../lib/supabase";
import crypto from "crypto";

export const generateGoogleNonce = (): { raw: string; hashed: string } => {
  const raw = crypto.randomBytes(32).toString("base64url");
  const hashed = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hashed };
};

export const exchangeGoogleCode = async (code: string) => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) throw new Error(error.message);
  return data.session;
};


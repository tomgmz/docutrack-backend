import { Request, Response } from "express";
import { generateGoogleNonce, exchangeGoogleCode } from "../services/authGoogle.service";
import { query } from "../lib/database";
import { supabase } from "../lib/supabase";

export const redirectToGoogle = async (req: Request, res: Response) => {
  const { raw: nonce, hashed: hashedNonce } = generateGoogleNonce();

  res.cookie("supabase_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 5 * 60 * 1000,
  });

  const backendBaseUrl = process.env.BACKEND_BASE_URL || "http://localhost:4000";
  const redirectTo = `${backendBaseUrl}/api/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
      skipBrowserRedirect: true, 
    },
  });

  if (error || !data.url) {
    console.error("Supabase OAuth Error:", error);
    return res.status(500).send("Auth initialization failed");
  }

  const finalUrl = `${data.url}&nonce=${hashedNonce}`;
  
  res.redirect(finalUrl);
};

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const next = (req.query.next as string) || process.env.FRONTEND_BASE_URL || "http://localhost:3000";
  const nonce = req.cookies.supabase_nonce;

  console.log("Callback Params:", req.query);
  console.log("Cookie Presence - Nonce:", !!nonce);

  if (!code) {
    return res.status(400).send("Missing OAuth code. Ensure the redirect_to URL is whitelisted in Supabase.");
  }
  if (!nonce) {
    return res.status(400).send("Missing nonce cookie. Ensure cookies are being sent and haven't expired.");
  }

  try {
    const session = await exchangeGoogleCode(code);
    if (!session) throw new Error("Failed to retrieve session from Supabase.");

    const user = session.user;
    
    const result = await query("SELECT * FROM profiles WHERE auth_id = $1", [user.id]);

    if (result.rows.length === 0) {
      const fullName = user.user_metadata.full_name || "";
      const names = fullName.split(" ");
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || "";

      try {
        await query(
          `INSERT INTO profiles (auth_id, first_name, last_name, middle_name)
           VALUES ($1, $2, $3, $4)`,
          [user.id, firstName, lastName, null]
        );
        console.log(`Profile created for auth_id: ${user.id}`);
      } catch (dbErr: any) {
        console.error("Database Error: Failed to create profile:", dbErr.message);
      }
    }

    res.cookie("supabase_session", session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: session.expires_in ? session.expires_in * 1000 : 3600 * 1000,
    });

    res.clearCookie("supabase_nonce");

    res.redirect(next);
    
  } catch (err: any) {
    console.error("Google OAuth callback error:", err.message);
    res.status(500).send(`Authentication failed: ${err.message}`);
  }
};
import { Request, Response } from "express";
import { query } from "../lib/database";
import { supabase } from "../lib/supabase";

export const redirectToGoogle = async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.BACKEND_BASE_URL}/api/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
    },
  });

  if (error || !data.url) {
    return res.status(500).json({ error: "Auth initialization failed" });
  }

  res.redirect(data.url);
};

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const frontendUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";

  if (!code) return res.status(400).send("No code provided");

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;

    const { session, user } = data;

    // Database Sync
    const result = await query("SELECT * FROM profiles WHERE auth_id = $1", [user.id]);
    if (result.rows.length === 0) {
      const fullName = user.user_metadata.full_name || "";
      const [firstName, ...lastNameParts] = fullName.split(" ");
      await query(
        "INSERT INTO profiles (auth_id, first_name, last_name) VALUES ($1, $2, $3)",
        [user.id, firstName, lastNameParts.join(" ")]
      );
    }

    // Set cookie for Next.js
    res.cookie("sb-access-token", session.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: session.expires_in * 1000,
    });

    res.redirect(`${frontendUrl}/userHome`);
  } catch (err: any) {
  res.status(500).json({
    message: "Authentication failed",
    error: err.message,
    details: err.stack,
    code: err.code
  });
}
};
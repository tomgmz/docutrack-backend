import { Request, Response } from "express";
import { generateGoogleNonce, exchangeGoogleCode } from "../services/authGoogle.service";

export const redirectToGoogle = (req: Request, res: Response) => {
  const next = (req.query.next as string) || "/";

  // Dynamically use origin or fallback to env or localhost
  const frontendBaseUrl =
    req.headers.origin?.toString() || process.env.FRONTEND_BASE_URL || "http://localhost:3000";

  const { raw: nonce, hashed: hashedNonce } = generateGoogleNonce();

  res.cookie("supabase_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 5 * 60 * 1000,
  });

  const url = `https://rwxxmhqtwcgumihhimxg.supabase.co/auth/v1/authorize?provider=google&redirect_to=${frontendBaseUrl}/auth/callback&nonce=${hashedNonce}`;

  res.redirect(url);
};

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const next = (req.query.next as string) || "/";
  const nonce = req.cookies.supabase_nonce;

  if (!code) return res.status(400).send("Missing OAuth code");
  if (!nonce) return res.status(400).send("Missing nonce cookie");

  try {
    // Only pass the code; nonce handling is via cookies / OAuth redirect
    const session = await exchangeGoogleCode(code);

    res.cookie("supabase_session", session?.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: session?.expires_in ? session.expires_in * 1000 : undefined,
    });

    res.clearCookie("supabase_nonce");
    res.redirect(next);
  } catch (err: any) {
    console.error("Google OAuth callback error:", err.message);
    res.status(500).send("Failed to sign in with Google");
  }
};

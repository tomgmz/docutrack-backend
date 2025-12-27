import { Request, Response } from "express";
import { createAuthUser } from "../services/auth.service";
import { createProfile, CreateProfileInput } from "../services/profile.service";
import { SignUpInput } from "../schema/signUp.schema";

export const signUp = async (req: Request<{}, {}, SignUpInput>, res: Response) => {
  const { email, password, username, first_name, last_name, middle_name } = req.body;

  try {
    // create user in Supabase Auth
    const authId = await createAuthUser(email, password);

    if (!authId) {
      return res.status(400).json({ message: "Failed to create auth user" });
    }

    // insert profile in profiles table
    const profileInput: CreateProfileInput = {
      auth_id: authId,
      first_name,
      last_name,
      middle_name,
      role: "user",
    };

    const profile = await createProfile(profileInput);

    res.status(201).json({ message: "User successfully signed up", profile });
  } catch (err: any) {
    console.error("Sign-up error: ", err.message);
    res.status(400).json({ message: "Failed to sign up user", error: err.message });
  }
};

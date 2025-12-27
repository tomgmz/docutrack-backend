import { authlogin } from '../services/authLogin.service';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const data = await authlogin(email, password);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Failed to login.");
  }
};
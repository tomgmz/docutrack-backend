import express from 'express';
import authRoutes from './routes/auth.routes';
import googleRoutes from './routes/authGoogle.routes'
import cors from 'cors'
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://docutracker.vercel.app"],
    credentials: true,
    exposedHeaders: ["x-access-token"],
  })
);

// Root route
app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("Server running");
});

// Auth routes
app.use("/api", authRoutes);
app.use("/api", googleRoutes);

export default app;

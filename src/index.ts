import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://docutracker.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser('dev'));
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("Document tracker API is running");
});

//put api routes here

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port HTTP://LOCALHOST:${PORT}`);
});
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { pool, testConnection } from './database';

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

testConnection();

app.get("/time", async (req, res) => {
  console.log(`Query parameter: ${JSON.stringify(req.query)}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Method: ${JSON.stringify(req.method)}`);

  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ dbTime: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failed");
  }
});


//use api routes here

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port HTTP://LOCALHOST:${PORT}`);
});
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const dbConnectionstring = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionstring,
});

const port = 8080;
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "There are no bad root route jokes, only bad taste." });
});

app.get("/ramen", async (req, res) => {
  const value = 240;
  const result = await db.query(
    `
     SELECT * FROM ramen WHERE Time_To_Cook < $1 AND price < $2`,
    [value, 2]
  );
  res.json(result.rows);
});

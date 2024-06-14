import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
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

app.post("/ramen", async (req, res) => {
  const { Flavour, Price, Spiciness, Time_To_Cook } = req.body;

  try {
    await db.query(
      `INSERT into ramen (Flavour, Price, Spiciness, Time_To_Cook) VALUES ($1, $2, $3, $4)`,
      [Flavour, Price, Spiciness, Time_To_Cook]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("NOOOOOOOO NO INSERT FOR YOU", error);
    res.status(500).json({ success: false });
  }
});

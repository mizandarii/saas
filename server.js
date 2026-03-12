const express = require("express");
const PocketBase = require("pocketbase/cjs");

const app = express();

// переменные окружения
const PORT = process.env.PORT || 3000;
const PB_URL = process.env.PB_URL;

if (!PB_URL) {
  console.error("PB_URL environment variable puudub!");
  process.exit(1);
}

const pb = new PocketBase(PB_URL);

// главная страница
app.get("/", async (req, res) => {
  try {
    const records = await pb.collection("grades").getFullList();

    let html = `
    <html>
    <head>
        <title>Kursantide hinded</title>
        <style>
            body { font-family: Arial; text-align:center; }
            table { border-collapse: collapse; margin:auto; width:60%; }
            th, td { border:1px solid #ccc; padding:8px; }
            th { background:#f2f2f2; }
        </style>
    </head>
    <body>
    <h2>Kursantide hinded</h2>

    <table>
    <tr>
        <th>Student</th>
        <th>Subject</th>
        <th>Score</th>
        <th>Status</th>
    </tr>
    `;

    records.forEach(r => {
      html += `
      <tr>
        <td>${r.student_name || ""}</td>
        <td>${r.subject || ""}</td>
        <td>${r.score || ""}</td>
        <td>${r.status || ""}</td>
      </tr>
      `;
    });

    html += `
    </table>
    </body>
    </html>
    `;

    res.send(html);

  } catch (err) {

    console.error("Database error:", err);

    res.status(500).send(`
      <h2>Andmebaasi viga</h2>
      <p>Andmebaas ei ole praegu kättesaadav.</p>
      <p>Palun proovige hiljem uuesti.</p>
    `);
  }
});

// сервер должен слушать 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server töötab port ${PORT}`);
});

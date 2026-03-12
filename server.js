const express = require('express');
const PocketBase = require('pocketbase/cjs');
const app = express();

const PORT = process.env.PORT || 3000;  
const PB_URL = process.env.PB_URL;      

if (!PB_URL) {
  console.error("PB_URL ei ole määratud!");
  process.exit(1);
}

const pb = new PocketBase(PB_URL);

app.get('/', async (req, res) => {
  try {
    // Loeme grades collection andmed
    const records = await pb.collection('grades').getFullList();

    // Loome HTML tabeli
    let html = `
      <html>
        <head>
          <title>Kursantide Hinded</title>
          <style>
            table { border-collapse: collapse; width: 50%; margin: 20px auto; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h2 style="text-align:center;">Kursantide Hinded</h2>
          <table>
            <tr>
              <th>Õpilase nimi</th>
              <th>Aine</th>
              <th>Hinne</th>
            </tr>
    `;

    records.forEach(r => {
      html += `
        <tr>
          <td>${r.student_name || ''}</td>
          <td>${r.subject || ''}</td>
          <td>${r.grade || ''}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;

    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Viga PocketBase andmete lugemisel!");
  }
});

app.listen(PORT, () => {
  console.log(`Server käivitunud port ${PORT}`);
});

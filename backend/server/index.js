const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // importando o sqlite3
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

const db = new sqlite3.Database('./homecare.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the HomeCare database.');
});

app.get('/', (req, res) => {
  res.send('Home Care API is running!');
});

app.get('/equipment', (req, res) => {
  const sql = `SELECT * FROM equipment`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('Data received!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const updateQuery = `UPDATE equipment SET last_power_on = datetime('now') WHERE tag = 'poweron'`;

// Função que executa a consulta SQL de atualização
function updateLastPowerOn() {
  db.run(updateQuery, [], (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Last power on updated at ${new Date().toLocaleString()}`);
    }
  });
}

// Executar a função de atualização a cada 10 segundos
setInterval(updateLastPowerOn, 10000);
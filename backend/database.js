const sqlite3 = require('sqlite3').verbose();

// Abre a conexão com o banco de dados
let db = new sqlite3.Database('./homecare.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Home Care database.');
});

// Cria a tabela de equipamentos
db.run(`CREATE TABLE IF NOT EXISTS equipment (
  imei INTEGER PRIMARY KEY,
  last_power_on TEXT,
  last_power_off TEXT
)`);

// Cria a tabela de dados dos equipamentos
db.run(`CREATE TABLE IF NOT EXISTS equipment_data (
  imei INTEGER NOT NULL,
  tag TEXT NOT NULL,
  value TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY(imei) REFERENCES equipment(imei)
)`);

// Fecha a conexão com o banco de dados
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});

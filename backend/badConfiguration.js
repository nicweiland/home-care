const sqlite3 = require('sqlite3').verbose();

// Abre a conexão com o banco de dados
let db = new sqlite3.Database('./homecare.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Home Care database.');
});

// Consulta os equipamentos com código de falha BAD_CONFIGURATION
db.all(`SELECT * FROM equipment WHERE error_code = 'BAD_CONFIGURATION'`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
});

// Fecha a conexão com o banco de dados
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});

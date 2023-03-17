const sqlite3 = require('sqlite3').verbose();

// Abre a conexão com o banco de dados
let db = new sqlite3.Database('./homecare.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Home Care database.');
});

// Define a lista de equipamentos a serem adicionados
const equipmentList = [
  {imei: '123456789', last_power_on: '2023-03-15 10:00:00', last_power_off: null},
  {imei: '234567890', last_power_on: '2023-03-15 11:00:00', last_power_off: '2023-03-15 14:00:00'},
  {imei: '345678901', last_power_on: '2023-03-15 12:00:00', last_power_off: null},
  {imei: '456789012', last_power_on: '2023-03-15 09:30:00', last_power_off: '2023-03-15 16:00:00'},
  {imei: '567890123', last_power_on: '2023-03-16 11:00:00', last_power_off: null},
  {imei: '678901234', last_power_on: '2023-03-15 01:00:00', last_power_off: '2023-03-15 06:00:00'},
  {imei: '789012345', last_power_on: '2023-03-15 02:00:00', last_power_off: '2023-03-15 07:00:00'},
];

// Percorre a lista de equipamentos e insere cada um na tabela equipment
equipmentList.forEach((equipment) => {
  db.run(`INSERT INTO equipment (imei, last_power_on, last_power_off)
          VALUES (?, ?, ?)`, [equipment.imei, equipment.last_power_on, equipment.last_power_off], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A new equipment has been added with row id ${this.lastID}`);
  });
  db.run(`ALTER TABLE equipment ADD COLUMN errorCode TEXT DEFAULT NULL`);
  db.run(`ALTER TABLE equipment ADD COLUMN errorDescription TEXT DEFAULT NULL`);
  db.run(`ALTER TABLE equipment ADD COLUMN tag TEXT DEFAULT NULL`);
});

// Fecha a conexão com o banco de dados
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});

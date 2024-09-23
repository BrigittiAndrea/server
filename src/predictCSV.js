const fs = require('fs');
const mysql = require('mysql');
const fastcsv = require('fast-csv');

const db = require('./models/db');

db.query('SELECT * FROM anomalias_historicas', (err, rows) => {
  if (err) throw err;

  const ws = fs.createWriteStream('anomalias_historicas.csv');
  fastcsv
    .write(rows, { headers: true })
    .pipe(ws);
  
  console.log("CSV file created");
});



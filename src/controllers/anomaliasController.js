const connection = require('../models/db');

module.exports.anomalias = (req, res) => {
    const consult = 'SELECT * FROM anomalias_historicas'

    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' }); 
    }
}
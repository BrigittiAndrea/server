const connection = require('../models/db')

module.exports.register = (req, res) => {
    const consult = 'SELECT * FROM admin_usuarios';

    try {
        connection.query(consult, (err, results)=> {
            console.log(results)
            res.json(results)
        })
    } catch (e) {
        console.error(e);
    }
}

//No está siendo usado
const crypto = require('crypto');
const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { username, password} = req.body;

    // Crear un hash MD5 de la contraseña ingresada por el usuario
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const consult = 'SELECT * FROM admin_usuarios WHERE username = ? AND password = ?';
    try {
        connection.query(consult, [username, hashedPassword], (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length > 0) {
                const user = result[0];
                const token = jwt.sign({ username: user.username}, "Stack", {
                    expiresIn: '3m'
                });
                console.log('Login Succesfully')
                res.send({ token, username: user.username});

            } else {
                console.log('Wrong user');
                res.send({ message: 'Wrong user' }); 
            }
        });
    } catch (e) {
        console.error(e);
    }
}
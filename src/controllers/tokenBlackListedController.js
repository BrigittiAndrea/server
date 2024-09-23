const connection = require('../models/db');

function isTokenBlacklisted(token, callback) {
    const query = 'SELECT * FROM blacklisted_tokens WHERE token = ?';

    connection.query(query, [token], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        if (results.length > 0) {
            return callback(null, true); // Token está en la lista negra
        }

        return callback(null, false); // Token no está en la lista negra
    });
}

// Ejemplo de middleware en una ruta protegida
app.use((req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    isTokenBlacklisted(token, (err, isBlacklisted) => {
        if (err) {
            return res.status(500).send({ message: 'Error checking token' });
        }

        if (isBlacklisted) {
            return res.status(401).send({ message: 'Token is invalid' });
        }

        try {
            const decoded = jwt.verify(token, 'Stack');
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).send({ message: 'Please authenticate' });
        }
    });
});

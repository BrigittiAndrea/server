const connection = require('../models/db');

module.exports.logout = (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    const query = 'INSERT INTO blacklisted_tokens (token) VALUES (?)';

    connection.query(query, [token], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error logging out' });
        }

        res.send({ message: 'Logout successful' });
    });
}

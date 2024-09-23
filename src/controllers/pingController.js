const connection = require('../models/db');
const crypto = require('crypto');

// Función existente
module.exports.ping = (req, res) => {
    const consult = 'SELECT * FROM admin_usuarios';

    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
};

// Función para eliminar un usuario
module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM admin_usuarios WHERE id_usuario = ?';

    try {
        connection.query(deleteQuery, [id], (err, results) => {
            if (err) throw err;
            res.json({ message: `Usuario con ID ${id} eliminado correctamente` });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

/*
module.exports.updateUser = (req, res) => {
    const { id_usuario } = req.params;
    const { nombre_usuario, fecha_update } = req.body; // Asegúrate de recibir fecha_actualizacion

    const updateQuery = 'UPDATE admin_usuarios SET nombre_usuario = ?, fecha_update = ? WHERE id_usuario = ?';
    const values = [nombre_usuario, fecha_update, id_usuario];

    try {
        connection.query(updateQuery, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al actualizar el usuario' });
            }
            // Devuelve los datos actualizados como respuesta
            res.json({
                id_usuario,
                nombre_usuario,
                fecha_update,
            });
        });
    } catch (e) {
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
*/
//Función para editar usuario
module.exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, id_estado } = req.body;
    const updateQuery = 'UPDATE admin_usuarios SET nombre_usuario = ?, id_estado = ?, fecha_actualizacion = NOW() WHERE id_usuario = ?';
    try {
        connection.query(updateQuery, [nombre_usuario, id_estado, id], (err, results) => {
            if (err) throw err;
            res.json({ id_usuario: id, nombre_usuario, id_estado, fecha_actualizacion: new Date() });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
//Crear Usuario
module.exports.createUser = (req, res) => {
    const { username, nombre_usuario, id_estado, password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    // Encriptar la contraseña usando MD5
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    const insertQuery = 'INSERT INTO admin_usuarios (username, nombre_usuario, id_estado, password, fecha_registro, fecha_actualizacion) VALUES (?, ?, ?, ?, NOW(), NOW())';
    connection.query(insertQuery, [username, nombre_usuario, id_estado, hashedPassword], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.status(500).json({ error: 'Error al agregar el usuario' });
        }
        res.json({
            id_usuario: results.insertId,
            username,
            nombre_usuario,
            id_estado,
            fecha_registro: new Date(),
            fecha_actualizacion: new Date()
        });
    });
};



/*
module.exports.createUser = (req, res) => {
    const { username, nombre_usuario, id_estado } = req.body;
    const insertQuery = 'INSERT INTO admin_usuarios (username, nombre_usuario,password, id_estado, fecha_registro, fecha_actualizacion) VALUES (?, ?, ?, NOW(), NOW())';

    try {
        connection.query(insertQuery, [username, nombre_usuario, id_estado], (err, results) => {
            if (err) throw err;
            res.json({
                id_usuario: results.insertId, 
                username,
                nombre_usuario,
                password,
                id_estado,
                fecha_registro: new Date(),
                fecha_actualizacion: new Date()
            });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al agregar el usuario' });
    }
};
*/

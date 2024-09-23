const connection = require('../models/db');

// Función existente
module.exports.tareas = (req, res) => {
    const consult = 'SELECT * FROM admin_proyectos';

    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
};
module.exports.addTask = (req, res) => {
    const { nombre, id_task, id_empresa } = req.body;
    
    console.log('Datos recibidos:', { nombre, id_task, id_empresa });

    const insertQuery = 'INSERT INTO admin_proyectos (nombre, id_task, id_empresa) VALUES (?, ?, ?)';
    connection.query(insertQuery, [nombre, id_task, id_empresa], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.status(500).json({ error: 'Error al agregar la tarea' });
        }
        res.json({
            id: results.insertId,
            nombre,
            id_task,
            id_empresa
        });
    });

};

// Función para eliminar un usuario
module.exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM admin_proyectos WHERE id = ?';

    try {
        connection.query(deleteQuery, [id], (err, results) => {
            if (err) throw err;
            res.json({ message: `Tarea con ID ${id} eliminado correctamente` });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al eliminar el tarea' });
    }
};
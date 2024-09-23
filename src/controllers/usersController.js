const connection = require('../models/db');

module.exports.cliPro = (req, res) => {
    const consult = 'SELECT t.CODIGO, t.CIA, c.DES,  td.`DESABR`, t.`NRODOC`, t.`RAZSOC`, t.`DIRECC`, t.`RAZCOM` FROM tg_clipro t JOIN tabcia c ON t.CIA = c.CIA JOIN tg_tipdoc td ON t.TIPDOC = td.COD;'
    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
}
// USUARIOS CIA
module.exports.userCia = (req, res) => {
    const consult = 'SELECT * FROM tabcia';
    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
};
module.exports.createUserCia = (req, res) => {
    const { CIA, DES, RUC, CODIGO, CAMBIO, TIPMON, PORIGV } = req.body;

    const insertQuery = 'INSERT INTO tabcia (CIA, DES, RUC, CODIGO, CAMBIO, TIPMON, PORIGV) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(insertQuery, [CIA, DES, RUC, CODIGO, CAMBIO, TIPMON, PORIGV], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.status(500).json({ error: 'Error al agregar el usuario.' });
        }
        res.json({
            CIA: results.insertId,
            DES,
            RUC,
            CODIGO,
            CAMBIO,
            TIPMON,
            PORIGV
        });
    });
};
module.exports.updateUserCia = (req, res) => {
    const { id } = req.params;  // El valor de 'CIA' se recibe en los parámetros
    const { DES, ST } = req.body;  // Descripción y Estado recibidos del cuerpo de la solicitud

    const updateQuery = 'UPDATE tabcia SET DES = ?, ST = ? WHERE CIA = ?';

    try {
        connection.query(updateQuery, [DES, ST, id], (err, results) => {
            if (err) throw err;

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({ CIA: id, DES, ST });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
module.exports.deleteUserCia = (req, res) => {
    const { CIA } = req.params;
    const deleteQuery = 'DELETE FROM tabcia WHERE CIA = ?';

    try {
        connection.query(deleteQuery, [CIA], (err, results) => {
            if (err) throw err;
            res.json({ message: `Usuario ${CIA} eliminado correctamente` });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};



// USUARIO CARGOS
module.exports.userCargos = (req, res) => {
    const consult = 'SELECT * FROM tg_usrcar'

    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
}

module.exports.userGrupos = (req, res) => {
    const consult = 'SELECT * FROM tg_usrgru'

    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' }); 
    }
}

//Users de prueba de la tabla tg_usr
module.exports.users = (req, res) => {
    const consult = 'SELECT usr.`COD`, usr.`CIA`, usr.`NOMUSR`, usr.`APEUSR`, usrcar.`DES`, usr.`FECALT`, usr.`PWD` FROM tg_usr usr JOIN tg_usrcar usrcar ON usr.`CODCAR` = usrcar.`COD`'

    try {
        connection.query(consult, (err, results)=> {
            if (err) throw err;
            res.json(results);
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
}

const express = require('express');
const router = express.Router();
const { ping, deleteUser, updateUser, createUser } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { tareas, addTask, deleteTask } = require('../controllers/tareasController');
const { logout } = require('../controllers/logout.controller');
const { users, userCia, userCargos, cliPro, userGrupos, updateUserCia, createUserCia, deleteUserCia } = require('../controllers/usersController');
const { anomalias } = require('../controllers/anomaliasController');

//Prueba
router.get('/ping' , ping);
router.post('/login', login);
router.delete('/ping/:id', deleteUser);  // Ruta para eliminar un usuario
router.put('/ping/:id', updateUser);  // Ruta para actualizar un usuario
router.post('/ping/createUser', createUser);

router.post('/logout', logout);

//Taks - Manejo de ruas e las tareas
router.get('/task', tareas);
router.post('/task/addTask', addTask);
router.delete('/task/deleteTask/:id', deleteTask);

//Usuarios CIA
router.get('/userCia', userCia);
router.put('/userCia/:id', updateUserCia);
router.delete('/userCia/:id', deleteUserCia);
router.post('/userCia/createUserCia', createUserCia);


router.get('/usuarios/cargos', userCargos);
router.get('/usuarios/grupos', userGrupos);
router.get('/clipro', cliPro);
router.get('/usersPrueba', users);

//Datos historicos
router.get('/anomalias', anomalias);

module.exports = router;

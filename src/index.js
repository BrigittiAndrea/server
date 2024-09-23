const express = require('express')
const app = express()
const port = 3000
const routes = require('./api/endPoint')
const cors = require('cors')

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: "*", //ruta del frontend
    methods: ["GET", "POST", "DELETE", "PUT"],
}));

app.use('/', routes);

// app.get('/', (req, res) => {
//     res.send('Hola')
// })

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})

const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`)
})
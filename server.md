'use strict';

require('dotenv').config();
const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.send({ message:  "You have reached the landing page!" });
});

//Route Handlers


//Start server
const PORT = process.env.PORT;
if (!parseInt(PORT)) throw 'Invalid PORT';

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

function handleError(err, res) {
    console.error(err);
    res.status(500).send('Ugh!  Server error.');
}
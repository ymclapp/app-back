'use strict';

require('dotenv').config();
const express = require('express');


const app = express();

const cors = require('cors');
app.use(cors());

//app.use(express.urlencoded({ extended:  true }));
app.use(express.json());
//app.use(express.static('./public'));
//const pg = require('pg');



//Application Setup



app.get('/', (request, response) => {
    response.send({ message:  "You have reached the landing page!!!" });
});

app.get('*'), (request, response) => 
response.status(404).send('This route does not exist'); 




//app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
if(!parseInt(PORT)) throw 'Invalid PORT';

app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));




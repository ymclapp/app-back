'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();

var corsOptions = {
    origin:  "http://localhost:3001"
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended:  true }));
app.use(express.json());
//app.use(express.static('./public'));
const pg = require('pg');
const db = require('./app/models');
const Role = db.role;
db.sequelize.sync();

//db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
//  });



//Application Setup



app.get('/', (request, response) => {
    response.send({ message:  "You have reached the landing page!!!" });
});

app.get('*'), (request, response) => 
response.status(404).send('This route does not exist'); 


require('./app/routes/tutorial.routes')(app);
const PORT = process.env.PORT || 3000;
if(!parseInt(PORT)) throw 'Invalid PORT';
app.listen(PORT, () => 
{console.log(`App is listening on http://localhost:${PORT}`);
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }

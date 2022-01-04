const { user } = require("pg/lib/defaults");

moddule.exports = (sequelize, Sequelize) => {
const User = sequelize.define("users", {
    email:  {
        type:  Sequelize.STRING
    },
    first_name:  {
        type:  Sequelize.STRING
    },
    last_name:  {
        type:  Sequelize.STRING
    },
    username:  {
        type:  Sequelize.STRING
    },
    password:  {
        type:  Sequelize.STRING
    },
    active:  {
        type:  Sequelize.BOOLEAN
    }
});

return User;

};
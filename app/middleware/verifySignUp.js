const { USER } = require('../config/db.config');
const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (request, response, next) => {
    //Username
    User.findOne ({
        where:  {
            username:  request.body.username
        }        
    }).then(user => {
        if (user) {
            response.status(400).send({
                message:  "Failed!  Username is already in use!"
            });

            return;
        }

        //Email
        User.findOne({
            where:  {
                email:  request.body.email
            }
        }).then(user => {
            if (user) {
                response.status(400).send({
                    message:  "Failed!  Email is already in use!"
                });

                return;
            }

            next();
        });
    });
};

checkRolesExisted = (request, response, next) => {
    if (request.body.roles) {
        for (let i = 0; i < request.body.roles.length; i++) {
            if (!ROLES.includes(request.body.roles[i])) {
                response.status(400).send({
                    message:  "Failed!  Role does not exist = " + request.body.roles[i]
                });

                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail:  checkDuplicateUsernameOrEmail,
    checkRolesExisted:  checkRolesExisted
};

module.exports = verifySignUp;


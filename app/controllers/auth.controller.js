const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (request, response) => {
  // Save User to Database
  User.create({
    username: request.body.username,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 8),
    first_name:  request.body.first_name,
    last_name:  request.body.last_name,
    active:  true
  })
    .then(user => {
      if (request.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: request.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            response.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          response.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      response.status(500).send({ message: err.message });
    });
};

exports.signin = (request, response) => {
  User.findOne({
    where: {
      username: request.body.username
    }
  })
    .then(user => {
      if (!user) {
        return response.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        request.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return response.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        response.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      response.status(500).send({ message: err.message });
    });
};
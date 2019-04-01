
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')


class UsersController {

  static findAll (req, res) {
    User
    .findAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static findOne (req, res) {
    User
    .findByPk(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static create (req, res) {
    let newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role
    }

    User
      .findOne({
        where: {
          role: "admin"
        }
      })
      .then((foundAdmin) => {
        if(foundAdmin) {
          res.status(404).json({
            message: 'You cannot signup as another admin'
          })
        } else {
          User
        .create(newUser)
        .then(user => {
          res.status(201).json(user)
        })
        .catch(err => {
          res.status(500).json(err)
        })
        }
      })
    }

  static update (req, res) {
    let updatedData = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role
    }

    if(req.body.role == 'admin') {
      res.status(401).json({
        message: "You cannot change your role to admin"
      })
    } else {
      User
      .update(
        updatedData,
        {where: {
          id: req.params.id
        }}
      )
      .then(affectedRows => {
        // console.log(data)
        // console.log(count)
        res.status(200).json(affectedRows)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
  }

  static delete (req, res) {

    if(req.authenticatedUser.id == req.params.id) {
      res.status(400).json({
        message: 'You cannot delete yourself'
      })
    } else {
      User
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
  }

  static signup (req, res) {
    let newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role
    }

    User
      .findOne({
        where: {
          role: "admin"
        }
      })
      .then((foundAdmin) => {
        if(foundAdmin) {
          res.status(404).json({
            message: 'You cannot signup as another admin'
          })
        } else {
          User
        .create(newUser)
        .then(user => {
          res.status(201).json(user)
        })
        .catch(err => {
          res.status(500).json(err)
        })
        }
      })
    }

  static signin (req, res) {
    // console.log('masuk')
    User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then(user => {
        // console.log(user)
        // if user is not found
        if(!user) {
          res.status(401).json({
            message: 'You are not registered !'
          })
        } else {
          // console.log('masuk')
          // console.log(req.body)
          //if user exist then check the hash password
          const verifyPassword = bcrypt.compareSync(req.body.password, user.password)
          console.log(verifyPassword)
          if(!verifyPassword) {
            res.status(401).json({
              message: 'Wrong password input'
            })
          } else {
            const token = jwt.sign({
              id: user.id,
              role: user.role
            }, process.env.JWT_SECRET)
            // console.log(token)

            res.status(200).json({
              message: 'Successfull sign in',
              token: token
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = UsersController
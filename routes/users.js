const router = require('express').Router()
const usersController = require('../controllers/usersController')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const {userauthorization} = require('../middlewares/userAuthorization')

router.get('/users', authentication, authorization, usersController.findAll)
router.get('/users/:id', authentication, usersController.findOne)
router.post('/users',authentication, authorization, usersController.create)
router.delete('/users/:id', authentication, authorization, usersController.delete)
router.put('/users/:id', authentication, userauthorization, usersController.update)
router.post('/signup', usersController.signup)
router.post('/signin', usersController.signin)


module.exports = router
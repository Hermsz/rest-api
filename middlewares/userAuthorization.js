module.exports = {
  userauthorization: function(req, res, next) {

    if(req.authenticatedUser.role == "admin" || req.params.id == req.authenticatedUser.id) {
      next()
    } else {
      res.status(401).json({
        message: 'You are not authorized'
      })
    }
  }
}
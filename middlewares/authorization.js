module.exports = {
  authorization: function(req, res, next) {
    if(req.authenticatedUser.role === "admin") {
      next()
    } else {
      res.status(401).json({
        message: 'You are not authorized'
      })
    }
  }
}
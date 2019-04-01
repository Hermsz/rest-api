const jwt = require('jsonwebtoken')

module.exports = {
  authentication : function(req, res, next) {
    // console.log(req.authenticatedUser)
    console.log(req.headers.token)

    try {
      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      req.authenticatedUser = decoded
      // console.log(req.authenticatedUser)
      next()
    } 
    catch {
      res.status(401).json({
        message:'Failed to authenticate user'
      })
    }
  }
}
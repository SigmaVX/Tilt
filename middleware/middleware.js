// ============================================
//
// middleware.js
// middleware for authentication modules
//
// ============================================

module.exports = {
  
  testMiddleware: function(req, res, next) {
    if(req.method === "PUT") {
        res.end("PUT method not supported");
    } else {
        next();
    }
  },
  isUserLoggedIn: function(req, res, next) {
    // check if session exists
    if (req.session && req.session.userId) {
      return next();
    } else {
      // if user is not authenticated send back to home page
      res.redirect("/");
    }
  },
  isAdmin: function(req, res, next) {
    // check if session exists and user type is 'admin'
    if (req.session && req.session.userId && req.session.userType === "admin") {
      return next();
    } else {
      // if user is not authenticated send back to home page
      res.redirect("/");
    }
  }  
}
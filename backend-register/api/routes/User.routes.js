const AuthMiddleware = require("../middlewares/auth.middleware")
function registerUserRoutes(server,userController) {
    server.post("/login",userController.login.bind(userController))
    console.log("login route registered")
    server.post("/signup", userController.signup.bind(userController))
    console.log("signup route registered")
    server.get("/user/:email",AuthMiddleware.authorization.bind(AuthMiddleware),userController.findUserByEmail.bind(userController))
}


module.exports = registerUserRoutes
const AuthMiddleware = require("../middlewares/auth.middleware")

function registerRegisterRoutes(server,registerController) {
    server.post("/register",AuthMiddleware.authorization.bind(AuthMiddleware),registerController.registerHour.bind(registerController))
    console.log("post register route added")
    server.get("/registers",AuthMiddleware.authorization.bind(AuthMiddleware), registerController.findRegisters.bind(registerController))
    console.log("list register route added")
    server.put('/register/:id', AuthMiddleware.authorization.bind(AuthMiddleware),registerController.updateRegister.bind(registerController))
    console.log("update register route added")
    server.del('/register/:id', AuthMiddleware.authorization.bind(AuthMiddleware), registerController.deleteRegister.bind(registerController))
    console.log("delete register routed added")
}


module.exports = registerRegisterRoutes
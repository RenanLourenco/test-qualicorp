var restify = require('restify');
const UsersService = require('./services/Users.service');
const UsersController = require('./controllers/Users.controller');
const registerUserRoutes = require('./routes/User.routes');
const registerRegisterRoutes = require('./routes/Register.routes')
const LoggerMiddleware = require('./middlewares/logger.middleware');
const RegistersService = require('./services/Registers.service');
const RegistersController = require('./controllers/Registers.controller');
const corsMiddleware = require('restify-cors-middleware')

const server = restify.createServer({
    name:'registers',
    version:'1.0.0'
})

const cors = corsMiddleware({
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
})
server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(LoggerMiddleware.requestLogger.bind(LoggerMiddleware))

const userService = new UsersService()
const usersController = new UsersController(userService)

const registersService = new RegistersService()
const registerController = new RegistersController(registersService)



registerUserRoutes(server, usersController);
registerRegisterRoutes(server, registerController);

server.listen(8080,function(){
    console.log('%s listening at %s', server.name, server.url);
})
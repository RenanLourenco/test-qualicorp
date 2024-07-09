
const moment = require('moment-timezone');
class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    async findUserByEmail(req,res,next){
        const {email} = req.params
        if (!email) {
            res.send(400, {
                error: true,
                message: "missing data to query user"
            });
            return next();
        }

        try {
            const user = await this.usersService.findUserByEmail(email)
            res.send(200, {
                error: false,
                message: "",
                data: user,
            });
            return next();
        } catch (error) {
            console.log(error);
            res.send(400, {
                error: true,
                message: error.message
            });
            return next();
        }
    }

    async signup(req, res, next) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.send(400, {
                error: true,
                message: "missing data to signup"
            });
            return next();
        }
        try {
            const verifyIfUserExists = await this.usersService.verifyIfUserExists(email);
            if (!verifyIfUserExists) {
                const creation = await this.usersService.register(name, email, password);
                if (creation) {
                    res.send(200, {
                        error: false,
                        message: "signup successfully"
                    });
                    return next();
                }
            } else {
                res.send(400, {
                    error: true,
                    message: "already exists"
                });
                return next();
            }
        } catch (error) {
            console.log(error);
            res.send(400, {
                error: true,
                message: error.message
            });
            return next();
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        
        if (!email || !password) {
            res.send(400, {
                error: true,
                message: "missing data to login"
            });
            return next();
        }
        
        try {
            const token = await this.usersService.login(email, password);
            if (!token) {
                res.send(400, {
                    error: true,
                    message: "invalid credentials"
                });
                return next();
            }

            const date = moment.tz("America/Sao_Paulo");
            date.add(1, 'hour');

            res.send(200, {
                error: false,
                message: "login successfully",
                token,
                expiresAt: date.format()
            });

            return next();

        } catch (error) {
            console.log(error);
            res.send(400, {
                error: true,
                message: error.message
            });
            return next();
        }
    }
}

module.exports = UsersController;

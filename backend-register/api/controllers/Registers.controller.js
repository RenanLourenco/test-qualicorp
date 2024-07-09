const moment = require('moment-timezone');
class RegistersController {
    constructor(registersService){
        this.registersService = registersService
    }

    async registerHour(req,res,next){
        const {email} = req.user
        const {name} = req.body
        
        try {
            const createRegister = await this.registersService.registerHour(name,email)
            if (createRegister) {
                res.send(200, {
                    error: false,
                    message: "register created"
                });
                return next();
            } else {
                res.send(400, {
                    error: true,
                    message: "error creating register" 
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
    
    async findRegisters(req,res,next) {
        const {email} = req.user
        let {date} = req.query
        
        if (!date) {
            date = moment.tz("America/Sao_Paulo").format("DD/MM/YYYY")
        }
        

        try {
            const registers = await this.registersService.findRegister(email,date)

            if(registers) {
                res.send(200, {
                    error: false,
                    message: "",
                    data: registers
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

    async updateRegister(req,res,next){
        const registerId = req.params.id
        const {name} = req.body

        if (!name) {
            res.send(400, {
                error: true,
                message: "missing 'name' field in body request"
            });
            return next();
        }

        try {
            const update = await this.registersService.updateRegister(registerId, name)
            if (update) {
                res.send(200, {
                    error: true,
                    message: "register updated"
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

    async deleteRegister(req,res,next) {
        const registerId = req.params.id
        try {
            const del = await this.registersService.deleteRegister(registerId)
            if(del) {
                res.send(200, {
                    error: true,
                    message: "register deleted"
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
}

module.exports = RegistersController
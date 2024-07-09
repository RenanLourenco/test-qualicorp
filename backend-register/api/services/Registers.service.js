const Register = require("../models/Register");
const moment = require('moment-timezone');
class RegistersService {
    async registerHour(name, userEmail) {
        const date = moment.tz("America/Sao_Paulo").toISOString(true);
        const dateOnly =  moment.tz("America/Sao_Paulo").format("DD/MM/YYYY")
        
    
        try {
            const register = new Register(name,date,dateOnly);
            await register.create(userEmail);
            
            return true

        } catch (error) {
            console.log("Error creating register: ", error)
            return null
        }
    }

    async findRegister(email, dateOnly) {
        try {
            
            const registers = await Register.find(email,dateOnly)
            if (!registers) {
                console.log("Error retrieving register: ", error)
                return registers
            }

            return registers
        } catch (error) {
            console.log("Error retrieving register: ", error)
            return null
        }
    }

    async updateRegister(id, name) {
        try {
            await Register.update(id, name)
            return true
        } catch (error) {
            console.log("Error updating register: ", error)
            return null
        }
    }
    async deleteRegister(id) {
        try {
            await Register.delete(id)
            return true
        } catch (error) {
            console.log("Error deleting register: ", error)
            return null
        }
    }
}

module.exports = RegistersService
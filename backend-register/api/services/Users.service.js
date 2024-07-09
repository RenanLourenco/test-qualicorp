const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersService {
    async findUserByEmail(email) {
        try {
            const user = await User.find(email)
        
            return user
        } catch (error) {
            console.log("Error verifying if user exists: ", error)
            return null
        }
    }

    async verifyIfUserExists(email){
        try {
            const user = await User.find(email)
            if (user == null) {
                return null
            }
            return true
        } catch (error) {
            console.log("Error verifying if user exists: ", error)
            return null
        }
    }

    async login(email, password) {
        try {
            const user = await User.find(email)
            if (user !== null){
                const verify = await bcrypt.compare(password, user.password)

                if (verify) {
                    const token = jwt.sign({
                        name: user.name,
                        email: user.email
                    },process.env.JWT_SECRET, {expiresIn: "1h"})

                    return token
                }
            }

            
        } catch (error) {
            console.log("Error login user: ", error)
            return null
        }
    }

    async register(name,email,password) {
        try {
            const user = new User(name,email)
            bcrypt.hash(password, 10, async (err,hash) => {
                if (err) {
                    console.log("Error register user: ", err)
                    return null
                }
                user.password = hash

                try {
                    await user.create();
                    return true
                } catch (error) {
                    console.log("Error register user: ", error)
                    return null
                }
            })

            return true
        } catch (error) {
            console.log("Error register user: ", error)
            return null
        }
    }
}


module.exports = UsersService
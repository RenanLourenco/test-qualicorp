const Database = require("../infra/db/db");

class User{
    constructor(name, email, password){
        //user info
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async create(){
        const driver = await Database.connect()
        const session = driver.session();
        try {
            await session.run(
                `create (p: User{name:$name, email:$email,password:$password})`,
                {name: this.name, email: this.email, password: this.password},
            );

            console.log("User created")
            return true
        } catch (error) {
            console.log("Error creating user: ", error);
        } finally {
            await session.close();
            await Database.disconnect(driver);
        }
    }

    static async find(email){
        const driver = await Database.connect()
        const session = driver.session();
        try {
            
            const result = await session.run(
                `MATCH (p: User{email:$email}) RETURN p.name AS name, p.password AS password`,
                {email: email},
            );

            if (result.records.length === 0) {
                console.log('No user found with this email:', email);
                return null;
            } else {
                const record = result.records[0];
                const name = record.get('name');
                const password = record.get('password');
        
                return {
                    email,
                    name,
                    password
                }
            }
        } catch (error) {
            console.log("Error finding user: ", error);
            return null;
        } finally {
            await session.close();
            await Database.disconnect(driver);
        }
    }
}

module.exports = User;
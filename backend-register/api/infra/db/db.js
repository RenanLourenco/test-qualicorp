const neo4j = require(`neo4j-driver`)
require('dotenv').config()
class Database {
    static async connect() {
        let dbDriver;
        try {
            dbDriver = neo4j.driver(process.env.DB_URI, neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD))
            return dbDriver
        } catch (error) {
            console.log("Connection error: ", error.cause)
            await dbDriver.close()
            return
        }
    }

    static async disconnect(dbDriver){
        await dbDriver.close()
    }
}

module.exports = Database
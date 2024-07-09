const Database = require("../infra/db/db");
const uuid = require('uuid');

class Register{
    constructor(name, registeredAt, dateOnly){
        this.name = name
        //date iso string
        this.registeredAt = registeredAt
        //dd/mm/yyyy
        this.dateOnly = dateOnly
    }

    
    //need userEmail to create relation
    async create(userEmail){
        const driver = await Database.connect()
        const session = driver.session();

        const id = uuid.v4()
        try {
            //create register
            await session.run(
                `CREATE (r:Register {
                    id: $id,
                    name: $name,
                    registered_at: $registeredAt,
                    date_only: $dateOnly
                }) RETURN r`,
                {id: id, name: this.name, registeredAt: this.registeredAt ,dateOnly: this.dateOnly},
            );
    

            //create relation
            await session.run(
                `
                MATCH (r:Register {name: $registerName}), (u:User {email: $userEmail})
                CREATE (r)-[:CREATED_BY]->(u)
                RETURN r, u
                `,
                {registerName: this.name, userEmail: userEmail}
            )

        } catch (error) {
            console.log("Erro creating register: ", error);
        } finally {
            await session.close();
            await Database.disconnect(driver);
        }
    }

    static async find(userEmail, dateOnly){
        const driver = await Database.connect()
        
        try {
            const query = `MATCH (r:Register {date_only:$dateOnly} )-[:CREATED_BY]->(u:User {email: $userEmail}) RETURN r.id AS id, r.date_only AS date_only, r.name AS name, r.registered_at AS registered_at LIMIT 25`
            
            let  { records } = await driver.executeQuery(
                query,
                {dateOnly, userEmail},
                {database: 'neo4j'}
            )
        

            const registers = []
            for (let record of records) {
                
                const register = {
                    id: record.get("id"),
                    dateOnly: record.get("date_only"),
                    name: record.get("name"),
                    registeredAt: record.get("registered_at")
                }

                registers.push(register)
            }

            return registers
        } catch (error) {
            console.log("Error finding register: ", error);
            return null;
        } finally {
            
            await Database.disconnect(driver);
        }
    }

    static async update(id, name) {
        const driver = await Database.connect()
        
        try {
            const query = `MATCH (r:Register {id: $id} ) SET r.name = $name`
            await driver.executeQuery(
                query,
                {id, name},
                {database: "neo4j"}
            )

        } catch (error) {
            console.log("Error updating register: ", error);
            return null;
        } finally {
            
            await Database.disconnect(driver);
        }
    }

    static async delete(id) {
        const driver = await Database.connect()
        try {
            // delele relationships first
            let query = `MATCH (r:Register {id: $id})-[rel]->() DELETE rel`
            await driver.executeQuery(
                query,
                {id},
                {database: "neo4j"}
            )

            // now delete the register
            query = `MATCH (r:Register {id: $id}) DELETE r`
            await driver.executeQuery(
                query,
                {id},
                {database: "neo4j"}
            )

            return true
        } catch (error) {
            console.log("Error deleting register: ", error);
            return null;
        } finally {
            await Database.disconnect(driver);
        }
    }
    
}

module.exports = Register;
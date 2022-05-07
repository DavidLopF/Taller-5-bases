const neo4j = require('neo4j-driver')

class Neo4j {
    constructor() {
        this.driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "admin"))
        this.session = this.driver.session()
    }

    createSeller(name) {
        return this.session.run(`CREATE (n:seller {name: '${name}'}) RETURN n`)
    }

    createBuyer(name) {
        return this.session.run(`CREATE (n:buyer {name: '${name}'}) RETURN n`)
    }
}

module.exports = Neo4j

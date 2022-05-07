const neo4j = require('neo4j-driver')

class Neo4j {
    constructor() {
        this.driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "root"))
        this.driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "admin"))
        this.session = this.driver.session()
    }

    recommendProduct(name, product) {
        return this.session.run(`MATCH (product:product{Nombre: '${product}'}) MATCH (buyer:buyer{Nombre: '${name}'}) create (buyer)-[:recommend]->(product)`)
    }

    getAllBuyer(){
        return this.session.run('MATCH (n:buyer) RETURN n')
    }

    createSeller(name) {
        return this.session.run(`CREATE (n:seller {name: '${name}'}) RETURN n`)
    }

    createBuyer(name) {
        return this.session.run(`CREATE (n:buyer {name: '${name}'}) RETURN n`)
    }

    findSellerByName(name) {
        return this.session.run(`MATCH (n:seller {name: '${name}'}) RETURN n`)
    }

    async createProduct(name, category_name, seller) {
        //create product
        let product = await this.session.run(`CREATE (n:product {name: '${name}', category_name: '${category_name}'}) RETURN n`)
        //create relationship
        let relationship = await this.session.run(`MATCH (n:seller {name: '${seller}'}), (m:product {name: '${name}'}) CREATE (n)-[:sells]->(m) RETURN n`)
        return product.records[0]._fields[0].properties
    }

}


module.exports = Neo4j


const neo4j = require('neo4j-driver')

class Neo4j {
    constructor() {
        this.driver = neo4j.driver(process.env.DB_URL, neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS))
        this.session = this.driver.session()
    }

    recommendProduct(name, product) {
        return this.session.run(`MATCH (product:product{name: '${product}'}) MATCH (buyer:buyer{name: '${name}'}) create (buyer)-[:recommend]->(product)`)
    }

    buy(name, product) {
        return this.session.run(`MATCH (n:buyer {name: '${name}'}) MATCH (m:product {name: '${product}'}) CREATE (n)-[:buy]->(m)`)
    }

    getAllBuyer() {
        return this.session.run('MATCH (n:buyer) RETURN n')
    }

    getBuyerByName(name) {
        return this.session.run(`MATCH (n:buyer {name: '${name}'}) RETURN n`)
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
        let product = await this.session.run(`CREATE (n:product {name: '${name}', category_name: '${category_name}'}) RETURN n`)
        await this.session.run(`MATCH (n:seller {name: '${seller}'}), (m:product {name: '${name}'}) CREATE (n)-[:sells]->(m) RETURN n`)
        return product.records[0]._fields[0].properties
    }

    top5Products() {
        //traer los 5 productos que tengan mas relaciones con los compradores
        return this.session.run(`
        MATCH (buyer:buyer)
        MATCH (product:product)
        MATCH (buyer)-[:buy]->(product)
        RETURN product.name, count(*)
        ORDER BY count(*) DESC
        LIMIT 5
        `)
    }

    async getALlProducts() {
        //traer los productos con la cantidad de veces que se ha comprado por los compradores y saber si esta recomendado por medio de una relacion de recomendacion
        let products = await this.session.run(`
        MATCH (buyer:buyer)
        MATCH (product:product)
        MATCH (buyer)-[:buy]->(product)
        RETURN product.name, count(*)
        ORDER BY count(*) DESC
        `)
        products = products.records.map(product => {
            //retornar el nombre del producto y la cantidad de compras
            return {
                name: product._fields[0],
                sales: product._fields[1].low
            }
        })
        return products
    }

    async isRecommended(product) {
        //abrir una nueva session para que no se cierren las otras
        let session = this.driver.session()
        const recomendated = await session.run(`
        MATCH (buyer:buyer)
        MATCH (product:product)
        MATCH (buyer)-[:recommend]->(product)
        WHERE product.name = '${product}'
        RETURN true
        `)
        session.close()
        return recomendated.records[0]     
    }


}


module.exports = Neo4j


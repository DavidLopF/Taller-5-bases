const Neo4j = require('../config/neo4j')

class sellerController {
    constructor() {
        this.neo4j = new Neo4j()
    }

    async create(req, res) {
        const { name } = req.body
        let seller = await this.neo4j.createSeller(name)
        seller = seller.records[0]._fields[0].properties
        res.status(201).json({
            message: 'seller created',
            seller
        })
    }
}

module.exports = sellerController
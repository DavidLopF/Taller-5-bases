const Neo4j = require('../config/neo4j')


class buyerController {

    constructor() {
        this.neo4j = new Neo4j()
    }
    async create(req, res) {
        const { name } = req.body
        let buyer = await this.neo4j.createBuyer(name)
        buyer = buyer.records[0]._fields[0].properties
        res.status(201).json({
            message: 'buyer created',
            buyer
        })
    }
}

module.exports = buyerController
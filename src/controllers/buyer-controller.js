const Neo4j = require('../config/neo4j')
const neo4j = new Neo4j()


class buyerController {
    async create(req, res) {
        const { name } = req.body
        let buyer = await neo4j.createBuyer(name)
        buyer = buyer.records[0]._fields[0].properties
        res.status(201).json({
            message: 'buyer created',
            buyer
        })
    }    
}

module.exports = buyerController
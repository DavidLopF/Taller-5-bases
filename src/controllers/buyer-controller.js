const Neo4j = require('../config/neo4j')



class BuyerController {

    constructor() {
        this.neo4j = new Neo4j()
    }

    async create(req, res) {
        try {
            const { name } = req.body
            const buyer = await this.neo4j.createBuyer(name)
            res.status(201).json({
                message: 'Buyer created successfully',
                buyer
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error creating buyer',
                error: err
            })
        }
    }
}

module.exports = BuyerController    
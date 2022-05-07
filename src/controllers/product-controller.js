const Neo4j = require('../config/neo4j')

class productController {
    constructor() {
        this.neo4j = new Neo4j()
    }
    async create(req, res) {
        let { name, category_name, seller } = req.body
        seller = await this.neo4j.findSellerByName(seller)
        try {
            seller = seller.records[0]._fields[0].properties
        } catch (e) {
            return res.status(404).json({
                message: 'seller not found'
            })
        }
    
        let product = await this.neo4j.createProduct(name, category_name, seller.name)
        try {
            res.status(201).json({
                message: 'product created',
                product
            })
        } catch (e) {
            res.status(500).json({
                message: 'product not created',
                error: e
            })
        }
    }
}

module.exports = productController
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
    async getTop5(req, res) {
        try {
            let products = await this.neo4j.top5Products()
            products = products.records.map(product => {
                return product._fields[0]
            })
            res.status(200).json({
                message: 'Top 5 products retrieved successfully',
                products
            })
        } catch (e) {
            res.status(500).json({
                message: 'products not retrieved',
                error: e
            })
        }
    }
    async suggestProduct(req, res) {
        try {
            let products = await this.neo4j.getALlProducts()
            products = await products.map(async product => {
                const isRecommended = await this.neo4j.isRecommended(product.name)
                if (typeof isRecommended === 'undefined') {
                    product.isRecommended = false
                } else {
                    product.isRecommended = true
                }
                return product
            })
            products = await Promise.all(products)
            products = products.map(product => {
                if (product.isRecommended === true) {
                    product.ranking = 5
                } else if (product.isRecommended === false) {
                    product.ranking = 0
                }
                product.ranking_sugerencia = 0.4 * product.sales + 0.6 * product.ranking
                return product
            })
            products = products.sort((a, b) => {
                return b.ranking_sugerencia - a.ranking_sugerencia
            })
            products = products.slice(0, 3)
            res.status(200).json({
                message: 'products retrieved successfully',
                products
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'products not retrieved',
                error: e
            })
        }

    }
}

module.exports = productController
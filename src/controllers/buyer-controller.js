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

    async recommendProduct(req, res) {
        try {
            const { name, product } = req.body
            console.log(name, product)
            const recommendation = await this.neo4j.recommendProduct(name, product)
            
            res.status(201).json({
                message: 'Recomendation created successfully',
                recommendation
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error creating recommendation',
                error: err
            })
        }
    }

    async buy(req, res){
        try {
            const { name, product } = req.body
            const buy = await this.neo4j.buy(name, product)
            res.status(201).json({
                message: 'buy created successfully',
                buy
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error creating buy',
                error: err
            })

        }
    }


    async getAll(req, res) {
        try {
            const buyers = await this.neo4j.getAllBuyer()
            res.status(200).json({
                message: 'Buyers retrieved successfully',
                buyers
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error retrieving buyers',
                error: err
            })
        }
    }

    /*async recomendation(req, res) {
        try {
            const { name } = req.body
            const buyer = await this.neo4j.getBuyer(name)
            const recomendation = await this.neo4j.getRecomendation(buyer)
            res.status(200).json({
                message: 'Recomendation successfully created',  
    */
}

module.exports = buyerController
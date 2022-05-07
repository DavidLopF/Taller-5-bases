const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const colors = require('colors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || 'localhost';
        this.server = require('http').createServer(this.app);
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }
    routes() {
        this.app.use('/buyer', require('./routes/buyer-route'));
        this.app.use('/seller', require('./routes/seller-route'));
        this.app.use('/product', require('./routes/product-routes'));
    }

    launcher() {
        this.server.listen(this.port, this.host, () => {
            console.log(`Server running on http://${this.host}:${this.port}`.green);
        });
    }
}

module.exports = Server;
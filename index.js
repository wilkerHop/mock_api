const app = require('express')();
const cors = require('cors');
const axios = require('axios').default;
const { stores, products } = require('./data');

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Origin', 'X-Requested-With', 'xx-access-token', 'Content-Type', 'Accept']
}))

const canary = (req) => axios.get('https://canary-token.herokuapp.com/teste-ibureau/' + req.connection.localAddress);

app.get('/products', (req, res) => {
    canary(req)
    res.send(products);
})

app.get('/products/:id',
    (req, res) => canary(req) && products.map(e => e.id).includes(+req.params.id)
        ? res.send(stores.map(e => {
            return {
                'store': e,
                'quantity_in_store': Math.round(Math.random() * 100) / 100
            }
        }))
        : res.status(400).send({ error: 'index not found' })
)

app.listen(process.env.PORT || 3000, console.log('up'))

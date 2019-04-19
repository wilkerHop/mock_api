const app = require('express')();
const { stores, products } = require('./data')

app.get('/products', (req, res) => { res.send(products) })

app.get('/products/:id',
    (req, res) => products.map(e => e.id).includes(+req.params.id)
        ? res.send(stores.map(e => {
            return {
                'store': e,
                'quantity_in_store': Math.round(Math.random() * 100) / 100
            }
        }))
        : res.status(400).send({ error: 'index not found' })
)

app.listen(process.env.PORT || 3000, console.log('up'))

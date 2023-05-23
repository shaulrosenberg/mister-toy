const express = require('express')
const app = express()
const toyService = require('./services/toy.service')
const labelService = require('./services/label.service')
const storeService = require('./services/store.service')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


// App Configuration
// const corsOptions = {
//     origin: [
//         'http://127.0.0.1:8080',
//         'http://localhost:8080',
//         'http://127.0.0.1:3000',
//         'http://localhost:3000'
//     ],
//     credentials: true
// }
// app.use(cors(corsOptions))
// app.use(express.static('public'))
app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body


/******************************* label API ************************************/

app.get('/api/label', (req, res) => {
    // TODO: get sortBy too
    labelService.query()
        .then(labels => {
            res.send(labels)
        })
        .catch(err => {
            console.log('Cannot load labels')
            res.status(400).send('Cannot load labels')
        })
})

/******************************* store API ************************************/

app.get('/api/store', (req, res) => {
    return storeService.query()
        .then(branches => res.send(branches))
        .catch(err => {
            console.log("Cannot load branches")
            res.status(401).send('Cannot load branches')
        })
})


/******************************* toys API *************************************/
// List
app.get('/api/toy', (req, res) => {
    // TODO: get sortBy too
    const filterBy = req.query
    toyService.query(filterBy)
        .then(toys => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Cannot load toys')
            res.status(400).send('Cannot load toys')
        })
})

// Add
app.post('/api/toy', (req, res) => {

    const { name, inStock, price, labels } = req.body

    const toy = {
        name,
        price: +price,
        inStock,
        labels,
        createdAt: Date.now()
    }
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot add toy')
            res.status(400).send('Cannot add toy')
        })

})

// Edit
app.put('/api/toy', (req, res) => {

    const { name, price, _id, inStock, labels, createdAt } = req.body
    const toy = {
        _id,
        name,
        inStock,
        price: +price,
        labels: [...labels],
    }
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot update toy')
            res.status(400).send('Cannot update toy')
        })
})

// Read - getById
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => res.send(toy))
        .catch(err => res.status(403).send(err))
})

// Remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(msg => {
            res.send({ msg, toyId })
        })
        .catch(err => {
            console.log('err:', err)
            res.status(400).send('Cannot remove toy, ' + err)
        })
})




// Listen will always be the last line in our server!
const port = process.env.PORT || 3030;

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
    console.log('Hello render.com')
});
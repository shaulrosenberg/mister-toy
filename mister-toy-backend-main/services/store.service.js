let stores = require('../data/store.json')


function query() {
    return Promise.resolve(stores)
}

module.exports = {
    query
}


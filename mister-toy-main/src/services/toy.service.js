
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}



// TODO: add sortBy as 2nd parameter for query and support sorting
function query(filterBy = {}) {
    // TODO : add query params to address
    return httpService.get(BASE_URL, filterBy)
    // return storageService.query(STORAGE_KEY).then(toys => toys)
}
function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
    // return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    const method = (toy._id) ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
    // return storageService[method](BASE_URL, toy)
}


function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: true,
        labels: []
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', labels: [], sortBy: '', sortOrder: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Talking Oshri',
                price: 200,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't103',
                name: 'Talking Hemos',
                price: 199,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't104',
                name: 'Talking Puki',
                price: 90,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't105',
                name: 'Talking Muki',
                price: 150,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            }
        ]

        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}




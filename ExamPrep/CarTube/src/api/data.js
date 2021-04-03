import * as api from './api.js'

// Set the server host adress
const host = 'http://localhost:3030'
api.settings.host = host

// Pass the authentication functionality
const login = api.login
const register = api.register
const logout = api.logout

// Implement application-specific request
async function getAllCars() {
    return await api.get('/data/cars?sortBy=_createdOn%20desc')
}

async function getCarById(id) {
    return await api.get('/data/cars/' + id)
}

async function getMyCars() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

async function createCar(data) {
    return await api.post('/data/cars', data)
}

async function editCar(id, data) {
    return await api.put('/data/cars/' + id, data)
}

async function deleteCar(id) {
    return await api.del('/data/cars/' + id)
}

async function getCarsByYear(query) {
    return await api.get(`/data/cars?where=year%3D${query}`)
}

export {
    login,
    register,
    logout,
    getAllCars,
    getCarById,
    getMyCars,
    createCar,
    editCar,
    deleteCar,
    getCarsByYear
}
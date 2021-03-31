import * as api from './api.js'

// Set the server host adress
const host = 'http://localhost:3030'
api.settings.host = host

// Pass the authentication functionality
const login = api.login
const register = api.register
const logout = api.logout

// Implement application-specific request
async function getFurniture() {
    return await api.get('/data/catalog')
}

async function getItemById(id) {
    return await api.get('/data/catalog/' + id)
}

async function getMyFurniture() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}

async function createFurniture(data) {
    return await api.post('/data/catalog', data)
}

async function editFurniture(id, data) {
    return await api.put('/data/catalog/' + id, data)
}

async function deleteRecord(id) {
    return await api.del('/data/catalog/' + id)
}

export {
    login,
    register,
    logout,
    getFurniture,
    getItemById,
    getMyFurniture,
    createFurniture,
    editFurniture,
    deleteRecord
}
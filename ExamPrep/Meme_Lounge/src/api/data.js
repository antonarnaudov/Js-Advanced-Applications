import * as api from './api.js'

// Set the server host adress
const host = 'http://localhost:3030'
api.settings.host = host

// Pass the authentication functionality
const login = api.login
const register = api.register
const logout = api.logout

// Implement application-specific request
async function getAllMemes() {
    return await api.get('/data/memes?sortBy=_createdOn%20desc')
}

async function getMemeById(id) {
    return await api.get('/data/memes/' + id)
}

async function getMyMemes() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

async function createMeme(data) {
    return await api.post('/data/memes', data)
}

async function editMeme(id, data) {
    return await api.put('/data/memes/' + id, data)
}

async function deleteMeme(id) {
    return await api.del('/data/memes/' + id)
}

export {
    login,
    register,
    logout,
    getAllMemes,
    getMemeById,
    getMyMemes,
    createMeme,
    editMeme,
    deleteMeme
}
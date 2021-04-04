import * as api from './api.js'

// Set the server host adress
const host = 'http://localhost:3030'
api.settings.host = host

// Pass the authentication functionality
const login = api.login
const register = api.register
const logout = api.logout

// Implement application-specific request
async function getAllArticles() {
    return await api.get('/data/wiki?sortBy=_createdOn%20desc')
}

async function getRecentArticles() {
    return await api.get('/data/wiki?sortBy=_createdOn%20desc&distinct=category')
}

async function getArticleById(id) {
    return await api.get('/data/wiki/' + id)
}

async function createArticle(data) {
    return await api.post('/data/wiki', data)
}

async function editArticle(id, data) {
    return await api.put('/data/wiki/' + id, data)
}

async function deleteArticle(id) {
    return await api.del('/data/wiki/' + id)
}

async function searchArticles(query) {
    return await api.get(`/data/wiki?where=title%20LIKE%20%22${query}%22`)
}

export {
    login,
    register,
    logout,
    getAllArticles,
    getRecentArticles,
    getArticleById,
    createArticle,
    editArticle,
    deleteArticle,
    searchArticles
}
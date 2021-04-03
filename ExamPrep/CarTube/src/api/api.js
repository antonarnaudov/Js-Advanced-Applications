export const settings = {
    host: '',
}

async function request(url, options) {
    try {
        const response = await fetch(settings.host + url, options)

        if (response.ok === false) {
            const error = await response.json()
            throw new Error(error.message)
        }

        try {
            const data = await response.json()
            return data
        } catch (error) {
            return response
        }

    } catch (err) {
        alert(err.message)
            // Throw prevents returning undefined
        throw err;
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {},
    }

    const token = sessionStorage.getItem('authToken')
    if (token !== null) {
        options.headers['X-Authorization'] = token
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }
    return options
}

async function get(url) {
    return await request(url, getOptions())
}

async function post(url, data) {
    return await request(url, getOptions('post', data))
}

async function put(url, data) {
    return await request(url, getOptions('put', data))
}

async function del(url) {
    return await request(url, getOptions('delete'))
}

async function login(username, password) {
    const result = await post('/users/login', { username, password })

    sessionStorage.setItem('username', result.username)
    sessionStorage.setItem('authToken', result.accessToken)
    sessionStorage.setItem('userId', result._id)

    return result
}

async function register(username, password) {
    const result = await post('/users/register', { username, password })

    sessionStorage.setItem('username', result.username)
    sessionStorage.setItem('authToken', result.accessToken)
    sessionStorage.setItem('userId', result._id)

    return result
}

async function logout() {
    const result = await get('/users/logout')

    sessionStorage.removeItem('username', result.username)
    sessionStorage.removeItem('authToken', result.accessToken)
    sessionStorage.removeItem('userId', result._id)

    return result
}

export {
    get,
    post,
    put,
    del,
    login,
    register,
    logout
}
// + settings exported on top of the file
import {setupCatalog, showCatalog} from "./catalog.js";
import {setupLogin, showLogin} from "./login.js";

await main()

async function main() {
    setUserNav()

    const main = document.querySelector('main');
    const catalogSection = document.getElementById('catalogSection')
    const loginSection = document.getElementById('loginSection')

    const links = {
        'catalogLink': showCatalog,
        'loginLink': showLogin,

    }

    setupCatalog(main, catalogSection)
    setupLogin(main, loginSection, () => {setUserNav(); showCatalog();})

    setupNavigation()

    // Start App with catalog view
    await showCatalog()

    function setupNavigation() {
        document.querySelector('nav').addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const view = links[event.target.id]
                if (typeof view === 'function') {
                    event.preventDefault();
                    view();
                }
            }
        })
    }

}

function setUserNav() {
    if (sessionStorage.getItem('userToken') !== null) {
        document.getElementById('user')
            .style.display = 'inline-block'

        document.getElementById('guest')
            .style.display = 'none'

        document.getElementById('logoutBtn')
            .addEventListener('click', logoutUser)
    } else {
        document.getElementById('guest')
            .style.display = 'inline-block'
        document.getElementById('user')
            .style.display = 'none'
    }
}

async function logoutUser() {
    const token = sessionStorage.getItem('userToken')

    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {'X-Authorization': token}
    })

    if (response.ok === false) {
        const error = await response.json()
        return alert(error.message)
    }

    sessionStorage.removeItem('userToken')
    window.location.pathname = 'Js-Advanced-Applications/data-and-auth/auth/lab/index.html'
}



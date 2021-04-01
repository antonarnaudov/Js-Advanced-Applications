import page from "//unpkg.com/page/page.mjs";
import { render } from "https://unpkg.com/lit-html?module"

import { createPage } from './views/create.js'
import { dashboardPage } from './views/dashboard.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { registerPage } from './views/register.js'
import { loginPage } from './views/login.js'
import { myPage } from './views/myFurniture.js'
import { logout } from './api/data.js'

import * as api from './api/data.js'

const main = document.querySelector('.container')

// Implement the routing

page('/', decorateContext, dashboardPage)
page('/dashboard', decorateContext, dashboardPage)

page('/details/:id', decorateContext, detailsPage)
page('/my-furniture', decorateContext, myPage)

page('/create', decorateContext, createPage)
page('/edit/:id', decorateContext, editPage)

page('/register', decorateContext, registerPage)
page('/login', decorateContext, loginPage)

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout()
    setUserNav()
    page.redirect('/')
})

setUserNav()

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main)
    ctx.setUserNav = setUserNav
    next()
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId')
    const user = document.getElementById('user')
    const guest = document.getElementById('guest')

    if (userId != null) {
        user.style.display = 'inline-block'
        guest.style.display = 'none'
    } else {
        user.style.display = 'none'
        guest.style.display = 'inline-block'
    }
}
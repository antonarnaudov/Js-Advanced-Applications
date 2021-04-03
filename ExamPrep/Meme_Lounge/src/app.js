import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from './api/data.js'
import page from "../node_modules/page/page.mjs";

import { homePage } from './views/home.js'
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { allMemePage } from "./views/allMemes.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { detailsPage } from "./views/details.js";
import { profilePage } from "./views/profile.js";

const main = document.querySelector('main')

page('/', decorateContext, homePage)
page('/login', decorateContext, loginPage)
page('/register', decorateContext, registerPage)
page('/all-memes', decorateContext, allMemePage)
page('/create', decorateContext, createPage)
page('/edit/:id', decorateContext, editPage)
page('/details/:id', decorateContext, detailsPage)
page('/profile', decorateContext, profilePage)

// window.login = login

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout()
    setUserNav()
    page.redirect('/')
})

setUserNav()
page.start()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main)
    ctx.setUserNav = setUserNav
    next()
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId')
    const user = document.querySelector('nav .user')
    const guest = document.querySelector('nav .guest')

    if (userId != null) {
        const span = document.querySelector('nav .user .profile span')
        const email = sessionStorage.getItem('email')
        span.textContent = `Welcome ${email}`

        user.style.display = ''
        guest.style.display = 'none'
    } else {
        user.style.display = 'none'
        guest.style.display = ''
    }
}
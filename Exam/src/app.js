import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from './api/data.js'
import page from "../node_modules/page/page.mjs";

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { allArticlesPage } from "./views/catalogue.js";
import { detailsPage } from "./views/details.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";

const main = document.getElementById('main-content')

page('/', decorateContext, homePage)
page('/home', decorateContext, homePage)
page('/login', decorateContext, loginPage)
page('/register', decorateContext, registerPage)
page('/catalogue', decorateContext, allArticlesPage)
page('/create', decorateContext, createPage)
page('/edit/:id', decorateContext, editPage)
page('/details/:id', decorateContext, detailsPage)
page('/search', decorateContext, searchPage)


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
    const user = document.getElementById('user')
    const guest = document.getElementById('guest')

    if (userId != null) {
        user.style.display = ''
        guest.style.display = 'none'
    } else {
        user.style.display = 'none'
        guest.style.display = ''
    }
}
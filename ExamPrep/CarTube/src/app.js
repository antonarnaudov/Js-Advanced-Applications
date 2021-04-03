import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from './api/data.js'
import page from "../node_modules/page/page.mjs";

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { allCarsPage } from "./views/allCars.js";
import { detailsPage } from "./views/details.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { myCarsPage } from "./views/myCars.js";
import { filterPage } from "./views/filterByYear.js";


const main = document.getElementById('site-content')

page('/', decorateContext, homePage)
page('/login', decorateContext, loginPage)
page('/register', decorateContext, registerPage)
page('/all-cars', decorateContext, allCarsPage)
page('/create', decorateContext, createPage)
page('/edit/:id', decorateContext, editPage)
page('/details/:id', decorateContext, detailsPage)
page('/my-cars', decorateContext, myCarsPage)
page('/filter', decorateContext, filterPage)


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
    const user = document.getElementById('profile')
    const guest = document.getElementById('guest')

    if (userId != null) {
        const a = document.querySelector('#profile a')
        const username = sessionStorage.getItem('username')
        a.textContent = `Welcome ${username}`

        user.style.display = ''
        guest.style.display = 'none'
    } else {
        user.style.display = 'none'
        guest.style.display = ''
    }
}
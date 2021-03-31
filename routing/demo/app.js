import page from "//unpkg.com/page/page.mjs";
import { content } from "./content.js"
import { html, render } from "https://unpkg.com/lit-html?module"

const mainContent = (page) => html `
    <h2>${page.title}</h2>
    <p>${page.paragraph}</p>
`

page('/home', updateContent);
page('/catalog', updateContent);
page('/about', updateContent);
page.start()


function updateContent(context) {
    const page = content.filter(c => c.adress === context.pathname)[0]

    if (page === undefined) {
        page = content.filter(c => c.adress === '/error')
    }

    const main = mainContent(page)

    render(main, document.querySelector('main'))
}
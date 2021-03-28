import { render } from "https://unpkg.com/lit-html?module"
import { contacts } from "./contacts.js"
import articleTemplate from "./card.js"

const main = document.getElementById('contacts');

main.addEventListener('click', event => {
    if (event.target.textContent === 'Details') {
        const details = event.target.parentNode.querySelector('.details')

        if (details.style.display == 'block') {
            details.style.display = 'none'

        } else {
            details.style.display = 'block'
        }

    }
});

document.getElementById('render').addEventListener('click', () => {
    const article = contacts.map(articleTemplate)

    render(article, main)
})
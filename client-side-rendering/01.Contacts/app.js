import { html, render } from "https://unpkg.com/lit-html?module"
import { contacts } from "./contacts.js"

const articleTemplate = (contact) => html `
<div class="contact card">
<div>
    <i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
    <h2>Name: ${contact.name}</h2>
    <button class="detailsBtn">Details</button>
    <div class="details" id="1">
        <p>Phone number: ${contact.phoneNumber}</p>
        <p>Email: ${contact.email}</p>
    </div>
</div>
</div>`




function start() {
    const main = document.getElementById('contacts');

    document.getElementById('render').addEventListener('click', () => {
        const article = contacts.map(contact => articleTemplate(contact))

        render(article, main)
    })
}
start();

document.getElementById('contacts').addEventListener('click', (event) => {
    if (event.target.textContent === 'Details') {
        const details = event.target.parentNode.querySelector('div')
        if (details.style.display == '') {
            details.style.display = 'block'
        } else {
            details.style.display = ''
        }

    }
})
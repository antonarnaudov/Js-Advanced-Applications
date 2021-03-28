import { html } from "https://unpkg.com/lit-html?module"

// <button @click=${detailsClick} class="detailsBtn">Details</button>

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
    </div>
`;

export default articleTemplate


// function detailsClick(event) {
//     if (event.target.textContent === 'Details') {
//         const details = event.target.parentNode.querySelector('.details')

//         if (details.style.display == 'block') {
//             details.style.display = 'none'

//         } else {
//             details.style.display = 'block'
//         }

//     }
// };
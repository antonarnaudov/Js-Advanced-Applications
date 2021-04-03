import { html } from "../../node_modules/lit-html/lit-html.js";

export const ntfTemplate = (message) => html `
<!-- Notifications -->
<section id="notifications">
    <div id="errorBox" class="notification">
        <span>${message}</span>
    </div>
</section>`

export function showNotification() {
    const notification = document.querySelector('.notification')
    return notification.style.display = 'block'
}
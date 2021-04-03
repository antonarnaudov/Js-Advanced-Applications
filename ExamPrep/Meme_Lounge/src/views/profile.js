import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyMemes } from "../api/data.js";


const profileTemplate = (userMemes, user) => html `
<!-- Profile Page ( Only for logged users ) -->
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender === 'male' ? 'male.png' : 'female.png'}">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${user.memesCount}</p>
        </div>
    </article>

    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${userMemes.length > 0 ? userMemes.map(memeTemplate) : html `
        <!-- Display : If there are no memes in database -->
        <p class="no-memes">No memes in database.</p>`}
    </div>
</section>
`

const memeTemplate = (meme) => html`
<!-- Display : All created memes by this user (If any) --> 
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button"  href="/details/${meme._id}">Details</a>
</div>`

export async function profilePage(context) {
    const userMemes = await getMyMemes()

    const user = {
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        gender: sessionStorage.getItem('gender'),
        memesCount: userMemes.length
    }

    return context.render(profileTemplate(userMemes, user))

}
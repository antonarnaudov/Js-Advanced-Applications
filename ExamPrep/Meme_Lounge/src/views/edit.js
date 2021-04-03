import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMeme, getMemeById } from "../api/data.js";
import { ntfTemplate, showNotification } from "./notifications.js"

const editTemplate = (meme, onSubmit, message) => html `        
<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
${ message ? ntfTemplate(message) : ''}
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" value="${meme.title}"/>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                ${meme.description}
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value='${meme.imageUrl}'>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`


export async function editPage(context) {
    const id = context.params.id
    const meme = await getMemeById(id)
    context.render(editTemplate(meme, onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)

        const title = formData.get('title').trim()
        const description = formData.get('description').trim()
        const imageUrl = formData.get('imageUrl').trim()

        const meme = { title, description, imageUrl }

        if (title === '' || description === '' || imageUrl === '') {
            const message = 'All fields are required!'
            context.render(editTemplate(meme, onSubmit, message))
            return showNotification()
        }

        await editMeme(id, meme)
        context.page.redirect(`/details/${id}`)
    }
}
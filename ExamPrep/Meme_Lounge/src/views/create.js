import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMeme } from "../api/data.js";
import { ntfTemplate, showNotification } from "./notifications.js"

const createTemplate = (onSubmit, message) => html `        
<!-- Create Meme Page ( Only for logged users ) -->
${ message ? ntfTemplate(message) : ''}

<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`

export async function createPage(context) {
    context.render(createTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)

        const data = getAllFields(formData);

        if (title === '' || description === '' || imageUrl === '') {

        }
        if (Object.values(validFields(data)).some(el => el === false)) {
            const message = 'All fields are required!'
            return alert(message)
        }

        await createMeme({ title, description, imageUrl })
        context.page.redirect('/all-memes')
    }
}

function getAllFields(formData) {
    const make = formData.get('make').trim()
    const model = formData.get('model').trim()
    const year = formData.get('year').trim()
    const description = formData.get('description').trim()
    const price = formData.get('price').trim()
    const img = formData.get('img').trim()
    const material = formData.get('material').trim()

    return {
        make,
        model,
        year,
        description,
        price,
        img,
        material
    }
}

function validFields(data) {
    return {
        make: data.make !== '',
        model: data.model !== '',
        year: data.year !== '',
        description: data.description !== '',
        price: data.price !== '',
        img: data.img !== ''
    }
}
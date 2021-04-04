import { html } from "../../node_modules/lit-html/lit-html.js";
import { editArticle, getArticleById } from "../api/data.js";

const editTemplate = (data, onSubmit) => html `
<!-- Edit -->
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" value="${data.title}">
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" value="${data.category}">
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content">${data.content}</textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>
`


export async function editPage(context) {
    const id = context.params.id

    const data = await getArticleById(id)
    context.render(editTemplate(data, onSubmit))

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)

        const title = formData.get('title').trim()
        const category = formData.get('category').trim()
        const content = formData.get('content').trim()

        if (title === '' || category === '' || content === '') {
            return alert('All fields are required!')
        } else if (category !== 'JavaScript' && category !== 'C#' && category !== 'Java' && category !== 'Python') {
            return alert('The category must be one of "JavaScript", "C#", "Java", or "Python".')
        }

        await editArticle(id, { title, category, content })

        return context.page.redirect('/details/' + id)
    }
}
import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchArticles } from "../api/data.js";

const searchTemplate = (onSubmit, articles) => html `

<!-- Search  -->
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSubmit} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>

    <div class="search-container">

        ${articles.length > 0 ? articles.map(articleTemplate) : html `
        <h3 class="no-articles">No matching articles</h3>`}

    </div>
</section>
`

const articleTemplate = (article) => html `
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`

export async function searchPage(context) {
    let articles = []

    context.render(searchTemplate(onClick, articles))

    async function onClick(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const title = formData.get('search').trim()

        if (title === '') {
            return alert('Please enter a title!')
        }

        const articles = await searchArticles(title)

        return context.render(searchTemplate(onClick, articles))
    }
}
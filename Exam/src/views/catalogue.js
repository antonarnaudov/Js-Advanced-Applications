import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllArticles } from "../api/data.js";

const allArticlesTemplate = (allArticles) => html `
<!-- catalogue -->
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>

    ${allArticles.length > 0 ? allArticles.map(articleTemplate) : html `
    <!-- No articles message -->
    <h3 class="no-articles">No articles yet</h3>`}
    
</section>
`

const articleTemplate = (article) => html `
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`

export async function allArticlesPage(context) {
    const allArticles = await getAllArticles();
    return context.render(allArticlesTemplate(allArticles))
}
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getRecentArticles } from "../api/data.js";

const homeTemplate = (js, cSharp, java, python) => html `
<!-- Home -->
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${cSharp === undefined ? html`<h3 class="no-articles">No articles yet</h3>` : html`
        <article>
            <h3>${js.title}</h3>
            <p>${js.content}</p>
            <a href="/details/${js._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>
    
    <section class="recent csharp">
        <h2>C#</h2>
        ${cSharp === undefined ? html`<h3 class="no-articles">No articles yet</h3>` : html`
        <article>
            <h3>${cSharp.title}</h3>
            <p>${cSharp.content}</p>
            <a href="/details/${cSharp._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>
    
    <section class="recent java">
        <h2>Java</h2>
        ${java === undefined ? html`<h3 class="no-articles">No articles yet</h3>` : html`
        <article>
            <h3>${java.title}</h3>
            <p>${java.content}</p>
            <a href="/details/${java._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>

    <section class="recent python">
        <h2>Python</h2>
        ${python === undefined ? html`<h3 class="no-articles">No articles yet</h3>` : html`
        <article>
            <h3>${python.title}</h3>
            <p>${python.content}</p>
            <a href="/details/${python._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>
</section>
`

export async function homePage(context) {
    const articles = await getRecentArticles()

    const js = articles.filter(article => article.category === 'JavaScript')[0]
    const cSharp = articles.filter(article => article.category === 'C#')[0]
    const java = articles.filter(article => article.category === 'Java')[0]
    const python = articles.filter(article => article.category === 'Python')[0]

    context.render(homeTemplate(js, cSharp, java, python))
}
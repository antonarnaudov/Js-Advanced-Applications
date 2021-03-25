import {e} from './dom.js'

async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    const recipes = await response.json();

    return recipes
}

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    return await response.json();
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: toggleCard },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;

    async function toggleCard() {
        const fullRecipe = await getRecipeById(recipe._id);

        result.replaceWith(createRecipeCard(fullRecipe));
    }
}

function createRecipeCard(recipe) {
    return e('article', {},
        e('h2', {}, recipe.name),
        e('div', {className: 'band'},
            e('div', {className: 'thumb'}, e('img', {src: recipe.img})),
            e('div', {className: 'ingredients'},
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', {className: 'description'},
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );
}

let main;
let section;

export function setupCatalog(mainTarget, sectionTarget) {
    main = mainTarget
    section = sectionTarget

}

export async function showCatalog() {
    section.innerHTML = '<p style="color: white">Loading...</p>'
    main.innerHTML = '';
    main.appendChild(section)

    const recipes = await getRecipes()
    const cards = recipes.map(createRecipePreview);

    const fragment = document.createDocumentFragment()

    cards.forEach(c => fragment.appendChild(c));
    section.innerHTML = ''
    section.appendChild(fragment)

}

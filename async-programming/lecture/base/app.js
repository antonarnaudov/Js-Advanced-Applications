window.addEventListener('load', () => {
    getRecipeList()
})


async function getRecipeList() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes'
    const main = document.querySelector('main');

    try {
        const response = await fetch(url)

        if (response.ok == false) {
            throw new Error(response.statusText)
        }

        const recipes = await response.json()

        main.innerHTML = ''

        Object.values(recipes).map(createPreview).forEach(r => main.appendChild(r))


    } catch (err) {
        alert(err.message)
    }
}

function createPreview(recipe) {
    const result = createElement('article', { className: 'preview' },

        createElement('div', { className: 'title' },
            createElement('h2', {}, recipe.name)
        ),

        createElement('div', { className: 'small' },
            createElement('img', { src: recipe.img })
        )
    )

    result.addEventListener('click', () => getRecipeDetails(recipe._id, result))

    return result
}


async function getRecipeDetails(id, preview) {
    const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`

    try {
        const response = await fetch(url)

        if (response.ok == false) {
            throw new Error(response.statusText)
        }

        const details = await response.json()

        const result = createDetails(details, preview)

        // preview.parentNode.replaceChild(result, preview)
        preview.replaceWith(result)

    } catch (err) {
        alert(err.message)
    }

}

function createDetails(details, preview) {
    const result = createElement('article', {},

        createElement('h2', { onClick: toggleCard }, details.name),

        createElement('div', { className: 'band' },
            createElement('div', { className: 'thumb' },
                createElement('img', { src: details.img })
            ),

            createElement('div', { className: 'ingredients' },
                createElement('h3', {}, 'Ingredients:'),
                createElement('ul', {}, details.ingredients.map(i => createElement('li', {}, i))),
            ),
        ),

        createElement('div', { className: 'description' },
            createElement('h3', {}, 'Preparation:'),
            details.steps.map(s => createElement('p', {}, s))
        )
    )

    function toggleCard() {
        result.replaceWith(preview)
    }

    return result
}


function createElement(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}
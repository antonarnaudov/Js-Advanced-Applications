async function getRecipeList() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes'

    const main = document.querySelector('main');

    try {
        const response = await fetch(url)

        if (response.status == 404) {
            throw new Error('Recipes not found')
        }

        const recipes = await response.json()

        main.innerHTML = ''

        Object.values(recipes).forEach(el => {


            const result = createElement('article', { className: 'preview' },

                createElement('div', { className: 'title' },
                    createElement('h2', {}, el.name)
                ),

                createElement('div', { className: 'small' },
                    createElement('img', { src: el.img })
                )
            )

            main.appendChild(result)
        })


    } catch (err) {
        alert(err.message)
    }
}

window.addEventListener('load', () => {
    getRecipeList()
})

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
/*
<article class="preview">
            <div class="title">
                <h2>Title</h2>
            </div>
            <div class="small">
                <img src="assets/lasagna.jpg">
            </div>
        </article>
*/
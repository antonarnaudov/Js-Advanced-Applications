import { html } from "https://unpkg.com/lit-html?module"
import { editFurniture, getItemById } from "../api/data.js"

const editTemplate = (item, onSubmit, errorMsg, isValid) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>

${errorMsg ? html`
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <p style="color:red;">${errorMsg}</p>
            </div>
        </div>
    </div>
` : ''}

<form @submit=${onSubmit}>

    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (isValid.make ? ' is-valid' : '') + (isValid.make === false ? ' is-invalid' : '')}
                    id="new-make" type="text" name="make" value="${item.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (isValid.model ? ' is-valid' : '') + (isValid.model === false ? ' is-invalid' : '')}
                    id="new-model" type="text" name="model" value="${item.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (isValid.year ? ' is-valid' : '') + (isValid.year === false ? ' is-invalid' : '')}
                    id="new-year" type="number" name="year" value="${item.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (isValid.description ? ' is-valid' : '') + (isValid.description === false ? ' is-invalid' : '')}
                    id="new-description" type="text" name="description" value="${item.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (isValid.price ? ' is-valid' : '') + (isValid.price === false ? ' is-invalid' : '')}
                    id="new-price" type="number" name="price" value="${item.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (isValid.img ? ' is-valid' : '') + (isValid.img === false ? ' is-invalid' : '')}
                    id="new-image" type="text" name="img" value="${item.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`

export async function editPage(context) {
    const id = context.params.id
    const item = await getItemById(id)
    
    context.render(editTemplate(item, onSubmit, '', {}))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)

        const data = getAllFields(formData)

        if (Object.values(validFields(data)).some(el => el === false)) {
            const message = 'Missing fields!'
            return context.render(editTemplate(data, onSubmit(), message, validFields(data)))

        } else if (data.make.length < 4) {
            const message = '"Make" field should be at least 4 characters long!'
            const validation = validFields(data)
            validation.make = false
            return context.render(editTemplate(data, onSubmit(), message, validation))

        } else if (data.model.length < 4) {
            const message = '"Model" field should be at least 4 characters long!'
            const validation = validFields(data)
            validation.model = false
            return context.render(editTemplate(data, onSubmit(), message, validation))

        } else if ((1950 < Number(data.year) && Number(data.year) < 2050) === false) {
            const message = '"Year" must be between 1950 and 2050!'
            const validation = validFields(data)
            validation.year = false
            return context.render(editTemplate(data, onSubmit(), message, validation))

        } else if (data.description.length < 10) {
            const message = '"Description" field should be at least 10 characters long!'
            const validation = validFields(data)
            validation.description = false
            return context.render(editTemplate(data, onSubmit(), message, validation))

        } else if (Number(data.price) < 0) {
            const message = '"Price" must be a positive number!'
            const validation = validFields(data)
            validation.price = false
            return context.render(editTemplate(data, onSubmit(), message, validation))

        } else if (isURL(data.img) === false) {
            const message = '"Image" must be a valid URL!'
            const validation = validFields(data)
            validation.img = false
            return context.render(editTemplate(data, onSubmit(), message, validation))
        }

        await editFurniture(id, data)
        context.page.redirect('/')
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

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}
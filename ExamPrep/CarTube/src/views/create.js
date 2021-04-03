import { html } from "../../node_modules/lit-html/lit-html.js";
import { createCar } from "../api/data.js";

const createTemplate = (onSubmit) => html `        
<!-- Create Listing Page -->
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`

export async function createPage(context) {
    context.render(createTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)

        const data = getAllFields(formData)

        if (Object.values(validFields(data)).some(el => el === false)) {
            const message = 'All fields are required!'
            return alert(message)
        } else if (data.year === NaN || data.year < 0) {
            return alert('Year must be a positive number!')
        } else if (data.price === NaN || data.price < 0) {
            return alert('Price must be a positive number!')
        }

        await createCar(data)
        context.page.redirect('/all-cars')
    }
}



function getAllFields(formData) {
    const brand = formData.get('brand').trim()
    const model = formData.get('model').trim()
    const year = Number(formData.get('year').trim())
    const description = formData.get('description').trim()
    const price = Number(formData.get('price').trim())
    const imageUrl = formData.get('imageUrl').trim()

    return {
        brand,
        model,
        year,
        description,
        price,
        imageUrl,
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
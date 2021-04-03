import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCarById, editCar } from "../api/data.js";

const editTemplate = (car, onSubmit) => html `        
<!-- Edit Listing Page -->
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value="${car.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value="${car.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value="${car.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value="${car.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${car.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value="${car.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`

export async function editPage(context) {
    const id = context.params.id
    const car = await getCarById(id)
    context.render(editTemplate(car, onSubmit))

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

        await editCar(id, data)
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
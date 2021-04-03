import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCars } from "../api/data.js";

const allCarsTemplate = (allCars) => html `
<!-- All Listings Page -->
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

        ${allCars.length > 0 ? allCars.map(carTemplate) : html `
        <!-- Display if there are no records -->
        <p class="no-cars">No cars in database.</p>`}

    </div>
</section>
`

const carTemplate = (car) => html`
<!-- Display all records -->
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`

export async function allCarsPage(context) {
    const allCars = await getAllCars();
    return context.render(allCarsTemplate(allCars))
}
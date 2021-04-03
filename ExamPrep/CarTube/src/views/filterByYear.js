import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCarsByYear } from "../api/data.js";

const filterTemplate = (onClick, cars) => html `
<!-- Search Page -->
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${cars.length > 0 ? cars.map(carTemplate) : html `
        <!-- Display if there are no matches -->
        <p class="no-cars"> No results.</p>`}


        
    </div>
</section>
`

const carTemplate = (car) => html `
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

export async function filterPage(context) {
    let cars = []
    context.render(filterTemplate(onClick, cars))

    async function onClick(event) {
        const input = event.target.parentNode.querySelector('input')
        const year = Number(input.value)

        if (year === NaN) {
            return alert('Year must be a number!')
        } else if (year === '') {
            return alert('Please fill a year!')
        }

        const cars = await getCarsByYear(year)

        return context.render(filterTemplate(onClick, cars))
    }
}
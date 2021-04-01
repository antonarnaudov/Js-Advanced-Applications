import { html } from "https://unpkg.com/lit-html?module"
import { getMyFurniture } from "../api/data.js"

const myFurnitureTemplate = (myFurniture) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>

<div class="row space-top">
    ${myFurniture.map(itemTemplate)}
</div>
`

const itemTemplate = (furniture) => html `
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src="${furniture.img}"/>

            <p>${furniture.description}</p>
            
            <footer>
                <p>Price: <span>${furniture.price} $</span></p>
            </footer>
            
            <div>
                <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>
`

export async function myPage(context) {
    const myFurniture = await getMyFurniture()

    context.render(myFurnitureTemplate(myFurniture))
}
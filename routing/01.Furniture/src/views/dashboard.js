import { html } from "https://unpkg.com/lit-html?module"
import { getFurniture } from "../api/data.js"

const dashboardTemplate = (allFurniture) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>

<div class="row space-top">
    ${allFurniture.map(itemTemplate)}
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

export async function dashboardPage(ctx) {
    const allFurniture = await getFurniture()

    ctx.render(dashboardTemplate(allFurniture))
}

/*
description: "Medium table"
img: "./images/table.png"
make: "Table"
material: "Hardwood"
model: "Swedish"
price: 235
year: 2015
_createdOn: 1615545143015
_id: "53d4dbf5-7f41-47ba-b485-43eccb91cb95"
_ownerId: "35c62d76-8152-4626-8712-eeb96381bea8"
*/
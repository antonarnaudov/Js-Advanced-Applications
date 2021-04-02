import { html } from "https://unpkg.com/lit-html?module"
import { getItemById, deleteRecord } from "../api/data.js"

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

const itemTemplate = (data, isOwner, onDelete) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${data.img.split("")[0] === '.' ? data.img.replace('.', '') : data.img}"/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        ${isOwner ? html`
            <div>
                <a href="/edit/${data._id}" class="btn btn-info">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)"  class="btn btn-red">Delete</a>
            </div>
        ` : ''}
    </div>
</div>`

export async function detailsPage(context) {
    const id = context.params.id
    const itemDetails = await getItemById(id);

    const isOwner = sessionStorage.getItem('userId') === itemDetails._ownerId

    context.render(itemTemplate(itemDetails, isOwner, onDelete))

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this item?')
        if (confirmed) {
            await deleteRecord(id)
            context.page.redirect('/')
        }
    }
}
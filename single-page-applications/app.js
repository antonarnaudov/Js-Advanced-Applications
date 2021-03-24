import { sum } from "./module.js";

const result = sum(7, 9);
document.querySelector('main').textContent = `The result is ${result}`

const main = document.querySelector('main');
const title = document.querySelector('h1');

document.querySelector('nav').addEventListener('click', ev => {
    switch (ev.target.id) {
        case 'home':
            title.textContent = 'Home Page';
            main.innerHTML = '<p>Home page main content</p>'
            break;
        case 'catalog':
            title.textContent = 'Catalog';
            main.innerHTML = '<p>Catalog view: list of articles</p>'
            break;
        case 'about':
            title.textContent = 'About Us page';
            main.innerHTML = '<p>Contact Information</p>'
            break;
    }
})
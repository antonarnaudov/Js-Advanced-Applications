async function getInfo() {
    const input = document.getElementById('stopId')

    const url = `http://localhost:3030/jsonstore/bus/businfo/${input.value}`

    const stopName = document.getElementById('stopName')
    const ul = document.getElementById('buses')

    try {
        ul.innerHTML = ''

        const response = await fetch(url)
        const data = await response.json()

        stopName.textContent = data.name


        for (let [bus, time] of Object.entries(data.buses)) {
            const li = document.createElement('li')
            li.textContent = `Bus ${bus} arrives in ${time}`

            ul.appendChild(li)
        }

        input.value = ''
    } catch (error) {
        stopName.textContent = 'Error'
    }

}

function createElement(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) === 'on') {
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
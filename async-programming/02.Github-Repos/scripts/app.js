/*function loadRepos() {
    const username = document.getElementById('username').value;

    const url = `https://api.github.com/users/${username}/repos`

    // fetch(url).then(response => response.json().then(handleData));

    // function handleData(data) {
    //     console.log(data)
    // }
    // https://github.com/antonarnaudov/Js-Advanced

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Request error')
            }
            response.json()
        })
        .then(data => {
            const ulElement = document.getElementById('repos')
            ulElement.innerHTML = ''
            data.forEach(repo => {
                const aEl = document.createElement('a')
                aEl.href = repo.html_url
                aEl.textContent = repo.full_name

                const liElement = document.createElement('li')
                liElement.appendChild(aEl)

                ulElement.appendChild(liElement)
            });
        })
        .catch(err => {
            console.log('promise rejected')
            console.log(err)
        })
}
*/

async function loadRepos() {
    const username = document.getElementById('username').value;

    const url = `https://api.github.com/users/${username}/repos`

    try {
        const response = await fetch(url)

        if (response.status == 404) {
            throw new Error('User not found')
        }

        const data = await response.json()

        const ulElement = document.getElementById('repos')
        ulElement.innerHTML = ''

        data.forEach(repo => {
            const aEl = document.createElement('a')
            aEl.href = repo.html_url
            aEl.textContent = repo.full_name

            const liElement = document.createElement('li')
            liElement.appendChild(aEl)

            ulElement.appendChild(liElement)
        })

    } catch (error) {
        console.log('promise rejected')
        console.log(err)
    }

}
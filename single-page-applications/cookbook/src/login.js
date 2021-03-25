// async function onSubmit(event) {
//     event.preventDefault();
//
//     const formData = new FormData(event.target)
//
//     const email = formData.get('email')
//     const password = formData.get('password')
//
//     if (email === '' || password === '') {
//         return alert('Both fields are required!')
//     }
//
//     const response = await fetch('http://localhost:3030/users/login', {
//         method: 'POST',
//         headers: {'Content-type': 'application/json'},
//         body: JSON.stringify({email, password})
//     })
//
//     if (response.ok === false) {
//         const error = await response.json()
//         return alert(error.message)
//     }
//
//     const data = await response.json()
//     sessionStorage.setItem('userToken', data.accessToken)
//     onSuccess();
// }

let main;
let section;
let onSuccess;

export function setupLogin(mainTarget, sectionTarget, onSuccessTarget) {
    main = mainTarget;
    section = sectionTarget;
    onSuccess = onSuccessTarget;

    document.querySelector('form')
        .addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target)

            const email = formData.get('email')
            const password = formData.get('password')

            if (email === '' || password === '') {
                return alert('Both fields are required!')
            }

            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            if (response.ok === false) {
                const error = await response.json()
                return alert(error.message)
            }

            const data = await response.json()
            sessionStorage.setItem('userToken', data.accessToken)
            onSuccess();
        })
}

export function showLogin() {
    main.innerHTML = ''
    main.appendChild(section)
}

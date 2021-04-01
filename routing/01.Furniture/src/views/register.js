import { html } from "https://unpkg.com/lit-html?module"
import { register } from "../api/data.js"

const registerTemplate = (onSubmit, errorMsg, invalidEmail, invalidPass, invalidRePass) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>

<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMsg ? html`
                <div class="form-group">
                    <p style="color:red;">${errorMsg}</p>
                </div>
            ` : ''}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (invalidEmail ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (invalidPass ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${'form-control' + (invalidRePass ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>
`



export async function registerPage(context) {
    context.render(registerTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)

        const email = formData.get('email').trim()
        const password = formData.get('password').trim()
        const rePass = formData.get('rePass').trim()

        if (email === '' || password === '' || rePass === '') {
            const message = 'All fields are required!'
            return context.render(registerTemplate(onSubmit, message, email === '', password === '', rePass === ''))
            // return alert('All fields are required!')
        } else if (password !== rePass) {
            const message = 'Passwords do not match!'
            return context.render(registerTemplate(onSubmit, message, false, true, true))
            // return alert('Passwords do not match!')
        }

        await register(email, password)
        
        context.setUserNav()
        context.page.redirect('/')
    }
}
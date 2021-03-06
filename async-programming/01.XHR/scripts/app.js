function loadRepos() {
    const username = document.getElementById('username').value;

    const url = `https://api.github.com/users/${username}/repos`

    fetch(url).then(handleResponse)

    function handleResponse(params) {

    }
}
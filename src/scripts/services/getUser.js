import { baseUrl } from "../variables.js"

// FUNÇÃO QUE BUSCA OS USUÁRIOS NO GITHUB
async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

export { getUser }
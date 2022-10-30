//! requires
const express = require("express")
const uuid = require("uuid")
//! cors = permissão do front-end se conectar com o back-end
const cors = require("cors")

//! consts
const port = 3001
const app = express()
const users = []

app.use(express.json())
app.use(cors())

//! middleware
const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "user not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

//! get
app.get('/users', (request, response) => {
    return response.json(users)
})

//! post
app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user)
})

//! put
app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    
    const id = request.userId

    const uptadeUser = { id, name, age }

    users[index] = uptadeUser

    return response.json(uptadeUser)
})

//! delete
app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

// saber que está rodando
app.listen(port, () => {
    console.log(`Server started on port ${port}🚀`)
})
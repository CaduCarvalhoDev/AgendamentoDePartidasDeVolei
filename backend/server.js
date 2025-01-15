import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.listen(3030)

const users = []

app.post('/users', async (req, res) => {

    await prisma.usuario.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            login: req.body.login,
            senha: senha.body.senha
        }
    })

    res.status(201).send('OK, tudo certo')

})

app.get('/users', async (req, res) => {
    res.status(200).json(users)
})
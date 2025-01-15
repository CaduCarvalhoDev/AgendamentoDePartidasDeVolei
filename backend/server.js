import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// ------------ USUARIOS ------------

app.post('/usuarios', async (req, res) => {

    await prisma.usuario.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            login: req.body.login,
            senha: req.body.senha,
            adm: req.body.adm
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    const users = await prisma.usuario.findMany()

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            login: req.body.login,
            senha: req.body.senha,
            adm: req.body.adm
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário deletado com Sucesso!" })

})




// ---------------- QUADRAS ----------------

app.post('/quadras', async (req, res) => {

    await prisma.quadras.create({
        data: {
            nome: req.body.nome
        }
    })

    res.status(201).json(req.body)
})

app.get('/quadras', async (req, res) => {

    const quadras = await prisma.quadras.findMany()

    res.status(200).json(quadras)

})

app.put('/quadras/:id', async (req, res) => {

    await prisma.quadras.update({
        where: {
            id: req.params.id
        },
        data: {
            nome: req.body.nome
        }
    })

    res.status(201).json(req.body)

})

app.delete('/quadras/:id', async (req, res) => {

    await prisma.quadras.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Quadra deletada com Sucesso!" })

})




// -------------------- EVENTOS --------------------

app.post('/eventos', async (req, res) => {
    
    await prisma.eventos.create({
        data: {
            nome: req.body.nome,
            data: req.body.data,
            horario: req.body.horario,
            confirmacao: req.body.confirmacao,
            id_usuario: req.body.id_usuario,
            id_quadra: req.body.id_quadra,
            usuario: req.body.usuario,
            quadra: req.body.quadra
        }
    })

    res.status(201).json(req.body)
})

app.get('/eventos', async (req, res) => {
    
    const eventos = await prisma.eventos.findMany()

    res.status(200).json(eventos)

})

app.put('/eventos/:id', async (req, res) => {

    await prisma.eventos.update({
        where: {
            id: req.params.id
        },
        data: {
            nome: req.body.nome,
            data: req.body.data,
            horario: req.body.horario,
            confirmacao: req.body.confirmacao,
            id_usuario: req.body.id_usuario,
            id_quadra: req.body.id_quadra,
            usuario: req.body.usuario,
            quadra: req.body.quadra
        }
    })

    res.status(201).json(req.body)

})

app.delete('/eventos/:id', async (req, res) => {
    
    await prisma.eventos.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Evento deletado com Sucesso!" })
})


app.listen(3030)
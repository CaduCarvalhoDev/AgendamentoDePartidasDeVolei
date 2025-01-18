import express from 'express'
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


const validarUsuario = [
    body('email').isEmail(),
    body('name').notEmpty(),
    body('login').notEmpty(),
    body('senha').notEmpty(),
    body('adm').isBoolean(),
]

// ------------ USUARIOS ------------

app.post('/usuarios', validarUsuario, async (req, res) => {

    const erros = validationResult(req)
    
    if (!erros.isEmpty()){
        return res.status(400).json({erros: erros.array()})
    }

    try {
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
    }

    catch (erro){
        res.status(500).json({message: 'Erro ao criar o usuário', erro})
    }
})


// GET
app.get('/usuarios', async (req, res) => {

    let filtros = {}

    if (req.query.name) filtros.name = req.query.name
    if (req.query.email) filtros.email = req.query.email
    if (req.query.id) filtros.id = req.query.id
    if (req.query.login) filtros.login = req.query.login

    if (req.query.adm !== undefined) {
        filtros.adm = req.query.adm === 'true'
    }


    try{
        const users = await prisma.usuario.findMany({
            where: filtros
        })

        if (users.length === 0){
            return res.status(404).json({message: "Usuário não encontrado"})
        }

        res.status(200).json(users)
    }
    catch{
        res.status(400).json({message: "Informação errada!"})
    }

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

    res.status(200).json(req.body)
})


app.delete('/usuarios/:id', async (req, res) => {

    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(204).json({ message: "Usuário deletado com Sucesso!" })

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

    let quadras = []


    try{
        quadras = await prisma.quadras.findMany({
            where: {
                nome: req.query.nome,
                id: req.query.id
            }
        })

        if (quadras.length === 0){
            return res.status(404).json({message: "Quadra não encontrada"})
        }


        res.status(200).json(quadras)
    }
    catch{
        res.status(400).json({message: "Informação errada!"})
    }
})


app.delete('/quadras/:id', async (req, res) => {

    await prisma.quadras.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(204).json({ message: "Quadra deletada com Sucesso!" })

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

    res.status(200).json(req.body)
})

app.get('/eventos', async (req, res) => {

    let filtros = {}

    if (req.query.nome) filtros.nome = req.query.nome
    if (req.query.data_horario) filtros.data_horario = req.query.data_horario
    if (req.query.id) filtros.id = req.query.id
    if (req.query.id_quadra) filtros.id_quadra = req.query.id_quadra
    if (req.query.id_usuario) filtros.id_usuario = req.query.id_usuario
    

    if (req.query.confirmacao !== undefined) {
        filtros.confirmacao= req.query.confirmacao === 'true'
    }
    

    try{
        const eventos = await prisma.eventos.findMany({
            where: filtros
        })

        if (eventos.length === 0){
            return res.status(404).json({message: "Evento não encontrado"})
        }


        res.status(200).json(eventos)
    }
    catch{
        res.status(400).json({message: "informação errada!"})
    }
    

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

    res.status(200).json(req.body)

})

app.patch('/eventos/:id_usuario/:nome/', async (req, res) => {
    const { id_usuario, nome } = req.params;

    const conf = await prisma.eventos.findUnique({
        where: {
            id_usuario: id_usuario,
            nome: nome
        }
    });
    
    const confirma = await prisma.eventos.update({
        where: {
            id_usuario: id_usuario,
            nome: nome
        },
        data: {
            confirmacao: !conf.confirmacao
        }
    });

    res.status(201).json({ message: `Evento ${confirma.confirmacao ? 'confirmado' : 'desconfirmado'} com sucesso!` });

});


app.delete('/eventos/:id', async (req, res) => {
    
    await prisma.eventos.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(204).json({ message: "Evento deletado com Sucesso!" })
})


app.listen(3030, () => {
    console.log('Servidor rodando na porta 3030')
})
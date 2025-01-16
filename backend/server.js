import express from 'express'
import { PrismaClient } from '@prisma/client'
// import { body, validationResult } from 'express-validator'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


// const validarUsuario = [
//     body('email').isEmail(),
//     body('name').notEmpty(),
//     body('login').notEmpty(),
//     body('senha').notEmpty(),
//     body('adm').isBoolean(),
// ]

// ------------ USUARIOS ------------

app.post('/usuarios',  async (req, res) => {

    // const erros = validationResult(req)
    
    // if (!erros.isEmpty()){
    //     return res.status(400).json({erros: erros.array()})
    // }

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


// GET em todos os usuários
app.get('/usuarios', async (req, res) => {

    const users = await prisma.usuario.findMany()

    res.status(200).json(users)
})

// GET pelo id
app.get('/usuarios/:id', async (req, res) => {

    const { id } = req.params;

    const user = await prisma.usuario.findUnique({
        where: { id: id },
    });

    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({message: "Usuário não encontrado."});
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

    const quadras = await prisma.quadras.findMany()

    res.status(200).json(quadras)

})


app.get('/quadras/:id', async (req,res) => {
    
    const {id} = req.params;

    const quadra = await prisma.quadras.findUnique({
        where: { id: id},
    })

    if (quadra){
        res.status(200).json(quadra);
    }
    else {
        res.status(404).json({message: 'Quadra não encontrada'})
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
    
    const eventos = await prisma.eventos.findMany()

    res.status(201).json(eventos)

})



app.get('/eventos/:id', async (req,res) => {
    
    const {id} = req.params;

    const evento = await prisma.eventos.findUnique({
        where: {id: id,}
    })

    if (evento){
        res.status(200).json(evento);
    }
    else{
        res.status(404).json({message: 'Evento não encontrado'});
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
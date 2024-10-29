import express from 'express'
import contatos from './data/contatos.mjs'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1 style='color: blue;'>
            Hands-On Docker: Backend
        </h1>
        <p>Olá Mundo - DevOps</p>`)
});

app.get('/contatos', (req, res) => {
    res.status(200).json({
        error: false,
        contatos
    })
});

app.get('/contatos/:id', (req, res) => {
    const id = req.params.id;
    const contato = contatos.find((contato) => contato.id == id);

    if(!contato)
        return res.status(404).json({
            error: true,
            message: "Contato não encontrado!"
        });
    
    res.status(200).json({
        error: false,
        contato
    });
});

app.post('/contatos', (req, res) => {
    const { nome, genero, telefone, email } = req.body;
    if(!nome || !genero || !telefone || !email )
        return res.status(400).json({
        error: true,
        message: "Entrada inválida"
    });
    
    if(contatos.find((contato) => contato.email === email))
        return res.status(400).json({
            error: true,
            message: "Email já cadastrado!"
        })

        id = (contatos.length == 0)
            ? 1
            : contatos[contatos.lenght-1].id + 1;
        const contato = { id: uuid(), nome, genero, telefone, email };
        res.status(201).json({
            error: false,
            contato
        });
})

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000!")
});
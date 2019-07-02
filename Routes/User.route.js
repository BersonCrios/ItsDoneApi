const express = require('express');
const router = express.Router();
const Users = require('../Models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');
const Authorization = require('../Middlewares/Authorization');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, 'peN4s1uW3MdMHaQMtZ1JIgYhHnN3R5kUM6jGHjXAektSZOD0dSJJrytKODJGWRx7XeuKblYKnbpVe0KTDx3exB0fbHPdZFKOeZDegiL4GpAHYZISSfKsAu70bNGSkH8bft04qj6oOzhY4e9btpNrgWEATvH8vIWdH7Ln7xjxZYNvtqtIgvljPRCrFNgfcupsjip0qr0Tsc71MTyOtR5k8YPyuhWpBjciycQmD1dQbpsgbJBFcY3wsKckyKgYb7KU', { expiresIn: '1d' });
}

//ROTAS

//cADASTRAR USUÁRIOS
router.post('/create', async (req, res) => {
    const {name, username, email, password } = req.body;

    if (!name || !username || !email || !password) return res.status(400).send({messagem: {
        title: "Erro ao cadastrar", error: 'Dados insuficientes!' }
    });

    try {
        if (await Users.findOne({ username })) {
            return res.status(400).send({messagem: {
                title: "Erro ao cadastrar", error: 'Usuário existente!' }
            });
        
        }
        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({messagem: {title: "Sucesso", messagem: "Usuário Cadastrado com sucesso!"}, user, token: createUserToken(user.id)});
    }
    catch (err) {
        return res.status(500).send({ error: {title: 'Algo deu errado', erro: 'Erro ao buscar usuário!'} });
    }
});

//REALIZAR LOGIN DO USUÁRIO NA APLICAÇÃO
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send({messagem: {
        title: "Erro ao logar",
        error: 'Dados insuficientes!'
     }}
     );

    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const user = await Users.findOne({ username }).select('+password');
        if (!user) {
            return res.status(400).send({
                message:{
                    title: 'Erro ao logar',
                    error: 'Usuário não registrado!'
                }}
            )
        };

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) {
            return res.status(401).send({
                message:{
                    title: 'Erro ao logar',
                    error: 'Erro ao autênticar o usuário'
                }});
        }

        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id) });
    }
    catch (err) {
        console.log(err);
        
        return res.status(500).send({ error: 'Erro ao buscar usuário!' , erromesmo: err});
    }
});

router.get('/',Authorization, async (req, res) => {
    try {
        const users = await Users.findOne({_id: jwt.decode(req.headers['authorization']).id}).populate("notes");
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});
module.exports = router;
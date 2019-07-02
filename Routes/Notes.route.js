const express = require('express');
const router = express.Router();
const Notes = require('../Models/Notes.model');
const User = require('../Models/User.model');

const Authorization = require('../Middlewares/Authorization');

const jwt = require('jsonwebtoken');


//LISTA MATÉRIAS
router.get('/',Authorization, async (req, res) => {
    // Decodificação do token de acesso do usuário logado
    var tokenDecode = jwt.decode(req.headers['authorization'])

    try {
        let queryGeneric = { _id: tokenDecode.id }

        let finded_user = await User.findOne(queryGeneric).populate('notes')

        return res.send({Message: {title: 'Sucesso', message: 'Sucesso ao buscar notas'}, Notas: finded_user.notes});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de Matérias!' });
    }
});


//CADASTRA Nota
router.post('/create',Authorization, async (req, res) => {
        // Decodificação do token de acesso do usuário logado
        var tokenDecode = jwt.decode(req.headers['authorization'])

        const { title, text, is_active} = req.body;
        
        if (!title || !text || !is_active) {
            return res.status(400).send({ error: 'Dados insuficientes!' });
        }
        try {
            const note = await Notes.create(req.body);

            let user_logged = await User.findOne({_id: tokenDecode.id}).exec()

            user_logged.notes.push(note)
            await user_logged.save()

            return res.status(201).send({Message: {title: 'Sucesso', message: 'Sucesso ao cadastrar nova nota'}, note});
        }
        catch (err) {
            console.log(err);
            
            return res.status(500).send({ error: 'Erro ao cadastrar nota!' });
        }
});
module.exports = router;
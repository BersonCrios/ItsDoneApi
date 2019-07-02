const jwt = require('jsonwebtoken');
const config = require('../Config/config');


const Authorization = (req, res, next) => {
    const token_header = req.headers.authorization;
    if(!token_header) return res.send({message:{title: "Erro no Token", message: 'Token não enviado!'}});

    jwt.verify(token_header, config.jwt_pass , (err, decoded) => {
        if (err) return res.send({message:{title: "Erro na autênticação", message: 'Token inválido!'}});
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = Authorization;
const jwt = require('jsonwebtoken');
const config = require('../Config/config');


const Authorization = (req, res, next) => {
    const token_header = req.headers.authorization;
    if(!token_header) return res.send({message:{title: "Erro no Token", message: 'Token não enviado!'}});

    jwt.verify(token_header, 'peN4s1uW3MdMHaQMtZ1JIgYhHnN3R5kUM6jGHjXAektSZOD0dSJJrytKODJGWRx7XeuKblYKnbpVe0KTDx3exB0fbHPdZFKOeZDegiL4GpAHYZISSfKsAu70bNGSkH8bft04qj6oOzhY4e9btpNrgWEATvH8vIWdH7Ln7xjxZYNvtqtIgvljPRCrFNgfcupsjip0qr0Tsc71MTyOtR5k8YPyuhWpBjciycQmD1dQbpsgbJBFcY3wsKckyKgYb7KU' , (err, decoded) => {
        if (err) return res.send({message:{title: "Erro na autênticação", message: 'Token inválido!'}});
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = Authorization;
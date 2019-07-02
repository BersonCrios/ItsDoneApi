const express  = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    return res.send({message: "API - V1"});
});

module.exports = router;
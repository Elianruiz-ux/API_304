import express  from "express";

const server = express();

server.get('/api', (req, res) => {
    res.send({message: 'hello'});
});


server.listen(80, () => {console.log('servidor en el puerto 80')});
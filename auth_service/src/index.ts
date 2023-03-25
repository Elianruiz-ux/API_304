import express, { json }  from "express";

const server = express();
server.use(json());

const users: {[key: string | number]: any} ={};

server.get('/api', (req, res) => {
    res.send(users);
});

server.get('/api/:id', (req, res) => {
    res.send(users[req.params.id]);
});

server.post('/api', (req, res) => {
    console.log(req.body, "Este es el body que enviamos desde la aplicacion");
    const id = Math.ceil((Math.random() * 10000))
    users[id] = {
        id, 
        ...req.body
    }
    res.send(users[id]);
});

server.patch('/api/:id', (req, res) => {
    const {id} = req.params;
    users[id] = {
        id,
        ...req.body
    }

    res.send(users);
});

server.delete('/api/:id', (req, res) => {
    const {id} = req.params;
    delete users[id];
    res.send();
});


server.listen(80, () => {console.log('servidor en el puerto 80')});
import express, { json }  from "express";



const server = express();
server.use(json());
const path = require('path');
const bodyParser = require('body-parser');
import fs from 'fs';
// Configuración de middleware
server.use(bodyParser.urlencoded({ extended: false }));

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

// Ruta para mostrar el formulario de inicio de sesión
server.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../../frontend/index.html');
  res.sendFile(filePath);
  });

  server.post('/login', (req, res) => {
    const username: string = req.body.email;
    const password: string = req.body.password;
  
    // Verificar las credenciales en la variable usersData
    const user = usersData.users.find(
      (user: { email: string; password: string }) =>
        user.email === username && user.password === password
    );
  
    if (user) {
        const filePath = path.join(__dirname, '../../frontend/pages/inicio.html');
        res.sendFile(filePath);
    } else {
      res.send('Credenciales incorrectas');
    }
  });



// Datos de usuarios almacenados en una variable
const usersData = {
    users: [
        {
            email: "juan@gmail.com",
            password: "Password123*"
          },
          {
            email: "elian123@gmail.com",
            password: "Ej123456*"
          }
    ]
  };

  
server.listen(80, () => {console.log('servidor en el puerto 80')});
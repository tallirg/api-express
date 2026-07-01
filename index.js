const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Arreglo temporal
let usuarios = [
    {
        id: 1,
        usuario: "admin",
        password: "12345",
        rol: "Administrador"
    },
    {
        id: 2,
        usuario: "juan",
        password: "abc123",
        rol: "Usuario"
    }
];

// GET sin parámetros
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// GET con parámetro
app.get('/usuarios/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    res.json(usuario);

});

// POST
app.post('/usuarios', (req, res) => {

    const { usuario, password, rol } = req.body;

    if (!usuario || !password || !rol) {
        return res.status(400).json({
            mensaje: "Faltan datos"
        });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        usuario,
        password,
        rol
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json({
        mensaje: "Usuario agregado",
        usuario: nuevoUsuario
    });

});

// PUT con parámetro
app.put('/usuarios/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    usuario.usuario = req.body.usuario || usuario.usuario;
    usuario.password = req.body.password || usuario.password;
    usuario.rol = req.body.rol || usuario.rol;

    res.json({
        mensaje: "Usuario actualizado",
        usuario
    });

});

// DELETE con parámetro
app.delete('/usuarios/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    usuarios.splice(indice, 1);

    res.json({
        mensaje: "Usuario eliminado"
    });

});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

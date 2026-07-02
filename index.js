require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Importamos los 3 modelos de la carpeta models
const Usuario = require('./models/Usuario');
const Articulo = require('./models/Articulo');
const Cliente = require('./models/Cliente');

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión al MongoDB local
const MONGO_LOCAL_URI = 'mongodb://127.0.0.1:27017/practica_backend';

mongoose.connect(MONGO_LOCAL_URI)
.then(() => console.log("Conectado exitosamente a MongoDB Local"))
.catch(err => {
    console.log("Error al conectar a MongoDB Local:");
    console.log("Nombre:", err.name);
    console.log("Mensaje:", err.message);
});

// =========================================================================
// RUTA DE PRUEBA INICIAL
// =========================================================================
app.get('/', (req, res) => {
    res.json({ mensaje: "API corriendo y conectada a MongoDB local" });
});

// =========================================================================
// CRUD: USUARIOS
// =========================================================================

// GET sin parámetros (Listar todos)
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
});

// GET con parámetro (Buscar uno)
app.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: "ID inválido o error en la búsqueda" });
    }
});

// POST (Crear)
app.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario({
            usuario: req.body.usuario,
            password: req.body.password,
            rol: req.body.rol
        });
        await nuevoUsuario.save();
        res.status(201).json({
            mensaje: "Usuario agregado",
            usuario: nuevoUsuario
        });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el usuario", error });
    }
});

// PUT (Actualizar)
app.put('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario actualizado", usuario });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar", error });
    }
});

// DELETE (Eliminar)
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar", error });
    }
});


// =========================================================================
// CRUD: ARTÍCULOS
// =========================================================================

// GET sin parámetros (Listar todos)
app.get('/articulos', async (req, res) => {
    try {
        const articulos = await Articulo.find();
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los artículos", error });
    }
});

// GET con parámetro (Buscar uno)
app.get('/articulos/:id', async (req, res) => {
    try {
        const articulo = await Articulo.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({ mensaje: "Artículo no encontrado" });
        }
        res.json(articulo);
    } catch (error) {
        res.status(400).json({ mensaje: "ID inválido o error en la búsqueda" });
    }
});

// POST (Crear)
app.post('/articulos', async (req, res) => {
    try {
        const nuevoArticulo = new Articulo(req.body);
        await nuevoArticulo.save();
        res.status(201).json({ mensaje: "Artículo agregado", articulo: nuevoArticulo });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el artículo", error });
    }
});

// PUT (Actualizar)
app.put('/articulos/:id', async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!articulo) {
            return res.status(404).json({ mensaje: "Artículo no encontrado" });
        }
        res.json({ mensaje: "Artículo actualizado", articulo });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar el artículo", error });
    }
});

// DELETE (Eliminar)
app.delete('/articulos/:id', async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndDelete(req.params.id);
        if (!articulo) {
            return res.status(404).json({ mensaje: "Artículo no encontrado" });
        }
        res.json({ mensaje: "Artículo eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar el artículo", error });
    }
});


// =========================================================================
// CRUD: CLIENTES
// =========================================================================

// GET sin parámetros (Listar todos)
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los clientes", error });
    }
});

// GET con parámetro (Buscar uno)
app.get('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        res.status(400).json({ mensaje: "ID inválido o error en la búsqueda" });
    }
});

// POST (Crear)
app.post('/clientes', async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json({ mensaje: "Cliente agregado", cliente: nuevoCliente });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el cliente", error });
    }
});

// PUT (Actualizar)
app.put('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        res.json({ mensaje: "Cliente actualizado", cliente });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar el cliente", error });
    }
});

// DELETE (Eliminar)
app.delete('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        res.json({ mensaje: "Cliente eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar el cliente", error });
    }
});


// Encendemos el servidor apuntando a todas las interfaces locales
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

const mongoose = require('mongoose');

const ArticuloSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Articulo', ArticuloSchema);

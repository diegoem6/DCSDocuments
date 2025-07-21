const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    trim: true,
    select: false // 🔐 evita que se incluya por defecto en queries
  },
  name: {
    type: String,
    required: [true, 'El nombre del reporte es obligatorio'],
    trim: true,
    unique: true
  },
  datasource: {
    type: String,
    required: [true, 'El origen de datos es obligatorio'],
    trim: true
  },
  query: {
    type: String,
    required: [true, 'La consulta SQL es obligatoria']
  }
}, {
  timestamps: true // ⏱ createdAt y updatedAt automáticos
});

module.exports = mongoose.model('Report', ReportSchema);

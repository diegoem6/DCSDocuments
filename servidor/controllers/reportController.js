const Report = require('../models/Report');
const { validationResult } = require('express-validator');
const sql = require('mssql');
const bcryptjs = require('bcryptjs');

// Crear un nuevo reporte
exports.addReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, password, name, datasource, query } = req.body;

  try {
    const existingReport = await Report.findOne({ name });
    if (existingReport) {
      return res.status(400).json({ msg: 'Ya existe un reporte con ese nombre' });
    }

    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(password, salt);

    const newReport = new Report({ user, password: passwordHashed, name, datasource, query });
    await newReport.save();

    const reportObj = newReport.toObject();
    delete reportObj.password;

    res.json({ report: [reportObj] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'No se pudo crear el reporte, contacte al administrador' });
  }
};

// Actualizar un reporte existente
exports.updateReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, password, name, datasource, query } = req.body;

  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).send({ msg: 'No existe el reporte' });
    }

    // Solo validar nombre si cambió
    if (name !== report.name) {
      const existingReport = await Report.findOne({ name });
      if (existingReport) {
        return res.status(400).json({ msg: 'Ya existe un reporte con ese nombre' });
      }
    }

    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(password, salt);

    report.user = user;
    report.password = passwordHashed;
    report.name = name;
    report.datasource = datasource;
    report.query = query;

    await report.save();

    const reportObj = report.toObject();
    delete reportObj.password;

    res.json({ report: [reportObj] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Error actualizando el reporte' });
  }
};

// Obtener un reporte por ID
exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).send({ msg: 'No existe el reporte' });
    }

    const reportObj = report.toObject();
    delete reportObj.password;

    res.json({ report: [reportObj] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};

// Obtener todos los reportes
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ name: 1 });
    const reportsSanitized = reports.map(rep => {
      const obj = rep.toObject();
      delete obj.password;
      return obj;
    });

    res.json({ reports: reportsSanitized });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};

// Ejecutar un reporte
exports.executeReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Reporte no encontrado' });
    }

    const result = await executeReport(report); // usa el servicio de SQL
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al ejecutar el reporte', error: error.message });
  }
};

// Eliminar un reporte
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).send({ msg: 'No existe el reporte' });
    }

    await Report.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Reporte eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};

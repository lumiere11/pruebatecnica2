import pkg from 'body-parser';
import cors from 'cors';

import express from 'express';
import { check } from 'express-validator';
import { buscarEntradas, crearEntrada, obtenerEntradaPorId, obtenerEntradas } from './controllers/entradaController.js';
import { sequelize } from './databases/database.js';
const { json } = pkg;

const app = express();
const port = 3000;
app.use(json());
app.use(cors());

// Middleware de validación para la creación de entradas
const validateEntrada = [
  check('titulo').notEmpty().withMessage('El título no puede estar vacío'),
  check('autor').notEmpty().withMessage('El autor no puede estar vacío'),
  check('fechaPublicacion').isISO8601().toDate().withMessage('Fecha de publicación inválida'),
  check('contenido').notEmpty().withMessage('El contenido no puede estar vacío'),
];

// Rutas
app.get('/entrada/:id', obtenerEntradaPorId);
app.get('/entradas', obtenerEntradas);
app.post('/entradas', validateEntrada, crearEntrada);
app.get('/entradas/busqueda', validateEntrada, buscarEntradas);

// Sincronizar el modelo con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    // Iniciar el servidor después de sincronizar la base de datos
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

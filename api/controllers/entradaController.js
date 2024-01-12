import { validationResult } from "express-validator";
import { Op } from "sequelize";
import Entrada from "../models/Entrada.js";

const obtenerEntradas = async (req, res) => {
  try {
    const entradas = await Entrada.findAll();
    const entradasTruncadas = entradas.map((entrada) => ({
      ...entrada.toJSON(),
      contenido: entrada.contenido.slice(0, 70),
    }));

    res.json(entradasTruncadas);
  } catch (error) {
    console.error("Error al obtener las entradas:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
const buscarEntradas = async (req, res) => {
  const { titulo, contenido, autor } = req.query;

  try {
    const condicionesDeBusqueda = {};

    if (titulo) {
      condicionesDeBusqueda.titulo = { [Op.like]: `%${titulo}%` };
    }

    if (contenido) {
      condicionesDeBusqueda.contenido = { [Op.like]: `%${contenido}%` };
    }

    if (autor) {
      condicionesDeBusqueda.autor = { [Op.like]: `%${autor}%` };
    }

    const entradasEncontradas = await Entrada.findAll({
      where: condicionesDeBusqueda,
    });

    res.json(entradasEncontradas);
  } catch (error) {
    console.error("Error al buscar las entradas:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
const obtenerEntradaPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const entradaEncontrada = await Entrada.findByPk(id);
  
      if (entradaEncontrada) {
        res.json(entradaEncontrada);
      } else {
        res.status(404).json({ mensaje: 'Entrada no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la entrada:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
const obtenerEntradaPorTitulo = async (req, res) => {
  try {
    const entradaEncontrada = await Entrada.findOne({
      where: {
        titulo: req.params.titulo,
      },
    });

    if (entradaEncontrada) {
      res.json(entradaEncontrada);
    } else {
      res.status(404).json({ mensaje: "Entrada no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la entrada:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const crearEntrada = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nuevaEntrada = await Entrada.create({
      titulo: req.body.titulo,
      autor: req.body.autor,
      fechaPublicacion: req.body.fechaPublicacion,
      contenido: req.body.contenido,
    });

    res.status(201).json(nuevaEntrada);
  } catch (error) {
    console.error("Error al crear la entrada:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export { buscarEntradas, crearEntrada, obtenerEntradaPorId, obtenerEntradaPorTitulo, obtenerEntradas };


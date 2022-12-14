"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventoById = exports.deleteEventoById = exports.getAllEvento = exports.getEventoById = exports.addEvento = void 0;
const database_1 = __importDefault(require("../database"));
function addEvento(req, res) {
    try {
        const newEvento = {
            nombreEvento: req.body.nombreEvento,
            precio: req.body.precio,
            fecha: req.body.fecha,
            imagenEvento: req.body.imagenEvento,
            idLoc: req.body.idLoc,
            idArt: req.body.idArt
        };
        database_1.default.query("INSERT INTO evento SET ?", [newEvento], function (error, results) {
            if (error)
                throw error;
            else
                res.status(201).json({ message: "Evento creado correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.addEvento = addEvento;
function getEventoById(req, res) {
    let idEvento = req.params.id;
    try {
        database_1.default.query("SELECT * from evento where idEvento = (?)", (idEvento), (error, results) => {
            if (error)
                throw error;
            if (!results)
                return res.status(400).json({ message: "No existe informacion de este evento" });
            res.status(200).send(results);
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.getEventoById = getEventoById;
function getAllEvento(req, res) {
    try {
        database_1.default.query("SELECT * FROM evento", (error, results) => {
            if (error)
                throw error;
            if (!results.length)
                return res.status(400).json({ message: "No existe informacion de eventos" });
            res.status(200).send(results);
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.getAllEvento = getAllEvento;
function deleteEventoById(req, res) {
    let idEvento = req.params.id;
    try {
        database_1.default.query("DELETE from evento where idEvento = (?)", (idEvento), (error, results) => {
            if (error)
                throw error;
            if (!results)
                return res.status(400).json({ message: "No existe el evento que se quiere eliminar" });
            res.status(200).json({ message: "Evento eliminado correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.deleteEventoById = deleteEventoById;
function updateEventoById(req, res) {
    let idEvento = req.params.id;
    const updatedEvento = {
        nombreEvento: req.body.nombreEvento,
        precio: req.body.precio,
        fecha: req.body.fecha,
        imagenEvento: req.body.imagenEvento,
        idEvento: req.body.idEvento,
        idLoc: req.body.idLoc
    };
    try {
        database_1.default.query("UPDATE evento SET ? WHERE ID = ?", [updatedEvento, idEvento], (error, results) => {
            if (error)
                throw error;
            res.status(200).json({ message: "Evento actualizado correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.updateEventoById = updateEventoById;

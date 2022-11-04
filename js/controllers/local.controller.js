"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalByName = exports.getAllLocals = exports.createLocal = void 0;
const database_1 = __importDefault(require("../database"));
function createLocal(req, res) {
    try {
        const newLocal = { nombre: req.body.nombre, direccion: req.body.direccion, contacto: req.body.contacto, redSocial: req.body.redSocial };
        database_1.default.query("INSERT INTO local SET ?", [newLocal], function (error, results) {
            if (error)
                throw error;
            else
                res.status(201).json({ message: "Local creado correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.createLocal = createLocal;
function getAllLocals(req, res) {
    try {
        database_1.default.query("SELECT nombre, direccion, contacto, redSocial FROM local", function (error, results) {
            if (error) {
                throw error;
            }
            if (!results.length)
                return res.status(400).json({ message: "No existe informacion de locales" });
            else {
                res.status(200).send(results);
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.getAllLocals = getAllLocals;
function getLocalByName(req, res) {
    let localName = req.body.localName;
    try {
        database_1.default.query('CALL getArtistByName(?)', [localName], (error, results) => {
            if (error)
                throw error;
            if (!results.length)
                return res.status(400).json({ message: "No existe local cno el nombre ingresado" });
            res.status(200).send(results[0]);
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.getLocalByName = getLocalByName;

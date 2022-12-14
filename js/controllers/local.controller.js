"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocal = exports.getLocalById = exports.getAllLocals = exports.createLocal = void 0;
const database_1 = __importDefault(require("../database"));
function createLocal(req, res) {
    try {
        const newLocal = {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            contacto: req.body.contacto,
            web: req.body.web,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            linkImagen: req.body.linkImagen,
            latitud: req.body.latitud,
            longitud: req.body.longitud
        };
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
        database_1.default.query("SELECT * FROM local", function (error, results) {
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
function getLocalById(req, res) {
    let idLocal = req.params.idLocal;
    try {
        database_1.default.query('select * from local where idLocal = ?', [idLocal], (error, results) => {
            res.status(200).send(results[0]);
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.getLocalById = getLocalById;
function updateLocal(req, res) {
    const updateLocal = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        contacto: req.body.contacto,
        web: req.body.web,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        linkImagen: req.body.linkImagen,
        latitud: req.body.latitud,
        longitud: req.body.longitud
    };
    let idLocal = req.param.idLocal;
    database_1.default.query("UPDATE local SET ? WHERE ID = ?", [updateLocal, idLocal], (req_, results) => {
        if (!results) {
            res.status(400).send('No existe informacion del local.');
        }
        res.status(200).send(`Local Actualizado correctamente`);
    });
}
exports.updateLocal = updateLocal;

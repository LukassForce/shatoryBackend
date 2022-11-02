"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArtistById = exports.deleteArtistById = exports.getArtistsByName = exports.getAllArtists = exports.createArtist = void 0;
const database_1 = __importDefault(require("../database"));
function createArtist(req, res) {
    try {
        const newArtist = { nombreArtista: req.body.nombreArtista, descripcion: req.body.descripcion, linkImagen: req.body.linkImagen };
        database_1.default.query("INSERT INTO artista SET ?", [newArtist], function (error, results) {
            if (error)
                throw error;
            else
                res.status(201).json({ message: "Artista creado correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.createArtist = createArtist;
function getAllArtists(req, res) {
    try {
        database_1.default.query("SELECT nombreArtista, descripcion, linkImagen FROM artista", function (error, results) {
            if (error) {
                throw error;
            }
            if (!results.length)
                return res.status(400).json({ message: "No existe informacion de artistas" });
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
exports.getAllArtists = getAllArtists;
function getArtistsByName(req, res) {
    let nameArtist = req.body.nombreArtista;
    try {
        database_1.default.query('CALL getArtistByName(?)', [nameArtist], (error, results) => {
            res.status(200).send(results[0]);
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.getArtistsByName = getArtistsByName;
function deleteArtistById(req, res) {
    let id = req.params.id;
    try {
        database_1.default.query('Delete * from artista where id = ?'[id], (error, results) => {
            res.status(200).json({ message: "Artista elimindao correctamente" });
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.deleteArtistById = deleteArtistById;
function updateArtistById(req, res) {
    let id = req.params.id;
    const updatedArtist = { nombreArtista: req.body.nombreArtista, descripcion: req.body.descripcion, linkImagen: req.body.linkImagen };
    try {
        database_1.default.query("UPDATE tickets SET ? WHERE ID = ?", [updatedArtist, id], (req_, results) => {
            res.status(204).send(`Ticket actualizado!`);
        });
    }
    catch (error) {
    }
}
exports.updateArtistById = updateArtistById;

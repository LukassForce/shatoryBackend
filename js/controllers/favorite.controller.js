"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFav = exports.getFavByRutAndIdArtist = exports.getFavByRut = exports.addFav = void 0;
const database_1 = __importDefault(require("../database"));
function addFav(req, res) {
    let rutUser = req.body.rutUser;
    let idArtist = req.body.idArtist;
    try {
        database_1.default.query("INSERT INTO Favorito (rutUser, idArtista) VALUES (?, ?)", [rutUser, idArtist], (error, results) => {
            if (error)
                throw error;
            res.status(201).json({ message: "Agregado a favorito correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.addFav = addFav;
function getFavByRut(req, res) {
    let rutUser = req.params.rut;
    try {
        database_1.default.query("CALL getFavoritesByRut(?)", [rutUser], (error, results) => {
            if (error)
                throw error;
            res.status(200).send(results[0]);
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.getFavByRut = getFavByRut;
function getFavByRutAndIdArtist(req, res) {
    let rutUser = req.params.rut;
    let idArtist = req.params.idArtist;
    try {
        database_1.default.query("SELECT * FROM Favorito WHERE rutUser = (?) AND idArtista = (?)", [rutUser, idArtist], (error, results) => {
            if (error)
                throw error;
            if (!results.length)
                return res.status(400).json({ message: "No se encuentra relacion" });
            res.status(200).send(results);
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.getFavByRutAndIdArtist = getFavByRutAndIdArtist;
function deleteFav(req, res) {
    let rutUser = req.params.rut;
    let idArtist = req.params.idArtist;
    try {
        database_1.default.query("DELETE FROM Favorito WHERE rutUser = (?) AND idArtista = (?)", [rutUser, idArtist], (error, results) => {
            if (error)
                throw error;
            res.status(200).json({ message: "Eliminado de favorito correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.deleteFav = deleteFav;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavByRut = exports.addFav = void 0;
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
    let rutUser = req.body.rutUser;
    try {
        database_1.default.query("Select * FROM Favorito where rut = ?", [rutUser], (error, results) => {
            if (error)
                throw error;
            res.status(201).send(results);
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
exports.getFavByRut = getFavByRut;

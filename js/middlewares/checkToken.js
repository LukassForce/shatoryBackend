"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
require('dotenv').config();
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["access-token"];
    if (!token)
        return res.status(401).json({ message: "¡No has especificado el token de acceso!" });
    try {
        if (process.env.API_KEY) {
            jsonwebtoken_1.default.verify(token, process.env.API_KEY, (err, decoded) => {
                if (err)
                    return res.status(401).json({ message: "¡El token especificado es inválido o ha expirado!" });
                req.userId = decoded.id;
                next();
            });
        }
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
exports.checkToken = checkToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        database_1.default.query("SELECT isAdmin FROM users WHERE ID = ?", [req.userId], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (!results.length)
                return res.status(403).json({ message: "¡No tienes permisos de administrador!" });
            if (!results[0].isAdmin)
                return res.status(403).json({ message: "¡No tienes permisos de administrador!" });
            next();
        }));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.isAdmin = isAdmin;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.listar = exports.getProfile = exports.signIn = exports.signUp = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const passwordEncryptor = __importStar(require("../utils/passwordEncryptor"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            name: req.body.name,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            rut: req.body.rut,
            rol: req.body.rol
        };
        newUser.password = yield passwordEncryptor.encryptPassword(req.body.password);
        database_1.default.query("INSERT INTO usuario SET ?", [newUser], function (error, results) {
            if (error)
                throw error;
            if (process.env.API_KEY) {
                newUser.rut = results.insertId;
                const token = jsonwebtoken_1.default.sign({ id: newUser.rut }, process.env.API_KEY, {
                    expiresIn: "7d",
                });
                res.status(201).json({ token });
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        database_1.default.query("SELECT rut, email, password FROM usuario WHERE email = ? LIMIT 1", [req.body.email], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (!results.length)
                return res.status(400).json({ message: "¡El correo que has introducido no está registrado!" });
            const matchPassword = yield passwordEncryptor.comparePassword(req.body.password, results[0].password);
            if (matchPassword == false)
                return res.status(401).json({ token: null, message: "¡La contraseña que has introducido es incorrecta!" });
            const selectedUser = results[0];
            if (process.env.API_KEY) {
                const token = jsonwebtoken_1.default.sign({ id: selectedUser.rut }, process.env.API_KEY, {
                    expiresIn: "7d",
                });
                res.status(200).json({ token });
            }
        }));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.signIn = signIn;
function getProfile(req, res) {
    const profileRut = req.userId;
    try {
        database_1.default.query("SELECT * FROM usuario WHERE rut = ?", [profileRut], (error, results) => {
            if (error)
                throw error;
            if (!results.length)
                return res.status(400).json({ message: "¡El usuario no existe!" });
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
exports.getProfile = getProfile;
const listar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        database_1.default.query("SELECT * FROM `usuario`", (error, results) => {
            if (!results) {
                res.status(400).send('No existe informacion');
            }
            res.status(200).send(results);
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.listar = listar;

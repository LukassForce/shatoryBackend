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
exports.checkDuplicateUser = void 0;
const database_1 = __importDefault(require("../database"));
const checkDuplicateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query("SELECT rut FROM usuario WHERE email = ? OR rut = ?", [req.body.email, req.body.rut], function (error, results) {
        if (error)
            throw error;
        if (results.length != 0)
            return res.status(400).json({ message: "¡El correo y/o el rut que has introducido ya están registrados!" });
        next();
    });
});
exports.checkDuplicateUser = checkDuplicateUser;

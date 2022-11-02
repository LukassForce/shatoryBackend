import jwt from "jsonwebtoken";
import connection from "../database";
require('dotenv').config();

export const checkToken = async (req: any, res: any, next: any) => {

    const token = req.headers["access-token"];

    if (!token) return res.status(401).json({ message: "¡No has especificado el token de acceso!" });

    try {

        if (process.env.API_KEY) {

            jwt.verify(token, process.env.API_KEY, (err: any, decoded: any) => {

                if (err) return res.status(401).json({ message: "¡El token especificado es inválido o ha expirado!" });
                req.userId = decoded.id;
                next();
            });
        }
    }
    catch (error) {

        return res.status(401).json({ message: error });
    }
}

export const isAdmin = async (req: any, res: any, next: any) => {

    try {

        connection.query("SELECT isAdmin FROM users WHERE ID = ?", [req.userId], async (error: any, results: any) => {

            if (error) throw error;
            if (!results.length) return res.status(403).json({ message: "¡No tienes permisos de administrador!" });
            if (!results[0].isAdmin) return res.status(403).json({ message: "¡No tienes permisos de administrador!" });
            next();
        });
    }
    catch (error) {
        
        return res.status(500).json(error);
    }
}
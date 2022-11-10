import connection from "../database";
import { Local } from "../models/local";

export function createLocal(req: any, res: any) {

    try {

        const newLocal: Local = {
            nombre: req.body.nombre, 
            direccion: req.body.direccion,
            contacto: req.body.contacto, 
            web: req.body.web, 
            facebook: req.body.facebook, 
            instagram: req.body.instagram,
            twitter: req.body.twitter, 
            linkImagen: req.body.linkImagen
        };

        connection.query("INSERT INTO local SET ?", [newLocal], function (error: any, results: any) {

            if (error) throw error;
            else
                res.status(201).json({ message: "Local creado correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export function getAllLocals(req: any, res: any) {

    try {

        connection.query("SELECT * FROM local", function (error: any, results: any) {

            if (error) { throw error; }
            if (!results.length) return res.status(400).json({ message: "No existe informacion de locales" });
            else { res.status(200).send(results); }
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json(error)
    }
}

export function getLocalById(req: any, res: any) {

    let idLocal = req.params.idLocal;

    try {
        connection.query('select * from local where idLocal = ?', [idLocal], (error: any, results: any) => {
            res.status(200).send(results[0]);
        });

    } catch (error) {

        return res.status(500).json(error)
    }
}

export function updateLocal(req: any, res: any) {

    const updateLocal: Local = { 

        nombre: req.body.nombre, 
        direccion: req.body.direccion,
        contacto: req.body.contacto, 
        web: req.body.web, 
        facebook: req.body.facebook, 
        instagram: req.body.instagram,
        twitter: req.body.twitter, 
        linkImagen: req.body.linkImagen 
    };

    let idLocal: number = req.param.idLocal;

    connection.query("UPDATE local SET ? WHERE ID = ?", [updateLocal, idLocal], (req_: any, results: any) => {
        if (!results) {
            res.status(400).send('No existe informacion del local.');
        }
        res.status(200).send(`Local Actualizado correctamente`);
    });
}